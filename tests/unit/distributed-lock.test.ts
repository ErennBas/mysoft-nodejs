import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryDistributedAdapter, RedisDistributedAdapter } from "../../src/watcher/distributed-adapter";
import { InboxInvoicePoller } from "../../src/watcher/inbox-invoice-poller";
import { InvoiceService } from "../../src/services/invoice.service";
import { HttpClient } from "../../src/core/http-client";
import { resolveConfig } from "../../src/core/config";
import { TokenManager } from "../../src/auth/token-manager";
import { MemoryCacheAdapter } from "../../src/cache/memory-cache";
import { InvoiceHeaderInfoModel } from "../../src/types/generated.types";

describe("Distributed Locking and Pub/Sub Tests", () => {
	describe("MemoryDistributedAdapter", () => {
		it("should acquire lock and prevent second holder from acquiring until released or expired", async () => {
			const adapter = new MemoryDistributedAdapter();

			const lock1 = await adapter.acquireLock("test-lock", 1000, "node-1");
			expect(lock1).toBe(true);

			const lock2 = await adapter.acquireLock("test-lock", 1000, "node-2");
			expect(lock2).toBe(false);

			// Same holder can re-acquire/renew
			const renew = await adapter.acquireLock("test-lock", 1000, "node-1");
			expect(renew).toBe(true);

			// Release lock
			const released = await adapter.releaseLock("test-lock", "node-1");
			expect(released).toBe(true);

			// Now node-2 can acquire
			const lock2After = await adapter.acquireLock("test-lock", 1000, "node-2");
			expect(lock2After).toBe(true);
		});

		it("should support pub/sub and unsubscribe", async () => {
			const adapter = new MemoryDistributedAdapter();
			const received: string[] = [];

			const unsubscribe = await adapter.subscribe("channel-1", (msg) => {
				received.push(msg);
			});

			await adapter.publish("channel-1", "hello world");
			expect(received).toEqual(["hello world"]);

			await unsubscribe();
			await adapter.publish("channel-1", "should not receive");
			expect(received).toHaveLength(1);
		});
	});

	describe("RedisDistributedAdapter", () => {
		it("should acquire and release lock with mock redis", async () => {
			const store: Record<string, string> = {};

			const mockRedis = {
				get: vi.fn(async (k: string) => store[k] || null),
				set: vi.fn(async (k: string, v: string) => {
					store[k] = v;
					return "OK";
				}),
				del: vi.fn(async (k: string) => {
					delete store[k];
					return 1;
				}),
				eval: vi.fn(async (_script: string, _num: number, k: string, holder: string) => {
					if (store[k] === holder) {
						delete store[k];
						return 1;
					}
					return 0;
				}),
			};

			const adapter = new RedisDistributedAdapter(mockRedis);

			const acquired = await adapter.acquireLock("lock-key", 5000, "inst-1");
			expect(acquired).toBe(true);

			const released = await adapter.releaseLock("lock-key", "inst-1");
			expect(released).toBe(true);
		});
	});

	describe("Multi-Instance Distributed Poller Flow", () => {
		let invoiceService: InvoiceService;

		beforeEach(() => {
			const tokenManager = new TokenManager({
				clientId: "test-client",
				clientSecret: "test-secret",
				cache: new MemoryCacheAdapter(),
			});
			const httpClient = new HttpClient(
				resolveConfig({
					clientId: "test-client",
					clientSecret: "test-secret",
					environment: "TEST",
				}),
				tokenManager
			);
			invoiceService = new InvoiceService(httpClient);
		});

		it("only leader instance should call Mysoft API, non-leader should receive item via PubSub", async () => {
			const sharedDistributedAdapter = new MemoryDistributedAdapter();

			const mockInvoice = {
				id: 999,
				ettn: "uuid-shared-inv-999",
				docNo: "GIB2026000000999",
				accountName: "Dağıtık Test Ltd",
			};

			const apiSpy = vi.spyOn(invoiceService, "getNewInvoiceInboxWithHeaderInfoList").mockResolvedValue({
				succeed: true,
				data: [mockInvoice],
			});
			vi.spyOn(invoiceService, "invoiceInboxSavedByCustomer").mockResolvedValue({
				succeed: true,
				data: true,
			});

			// Instance 1 (Leader)
			const poller1 = new InboxInvoicePoller(invoiceService, {
				intervalMs: 10000,
				autoAck: true,
				redis: sharedDistributedAdapter,
				redisOptions: {
					instanceId: "instance-leader",
					lockKey: "shared-lock",
					channel: "shared-channel",
				},
			});

			// Instance 2 (Worker / Non-leader)
			const poller2 = new InboxInvoicePoller(invoiceService, {
				intervalMs: 10000,
				autoAck: true,
				redis: sharedDistributedAdapter,
				redisOptions: {
					instanceId: "instance-worker",
					lockKey: "shared-lock",
					channel: "shared-channel",
				},
			});

			const poller1Invoices: InvoiceHeaderInfoModel[] = [];
			const poller2Invoices: InvoiceHeaderInfoModel[] = [];

			poller1.on("invoice", (inv) => poller1Invoices.push(inv));
			poller2.on("invoice", (inv) => poller2Invoices.push(inv));

			await poller1.start();
			await poller2.start();

			// Instance 1 performs poll
			await poller1.pollNow();

			// Instance 2 tries to poll, but lock is held by Instance 1
			await poller2.pollNow();

			// API should only have been called ONCE (by poller1)
			expect(apiSpy).toHaveBeenCalledTimes(1);

			// Both instances should have received the event! (Instance 1 locally, Instance 2 via Pub/Sub)
			expect(poller1Invoices).toHaveLength(1);
			expect(poller1Invoices[0].ettn).toBe("uuid-shared-inv-999");

			expect(poller2Invoices).toHaveLength(1);
			expect(poller2Invoices[0].ettn).toBe("uuid-shared-inv-999");

			await poller1.stop();
			await poller2.stop();
		});
	});
});
