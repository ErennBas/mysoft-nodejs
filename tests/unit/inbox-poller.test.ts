import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { InboxInvoicePoller } from "../../src/watcher/inbox-invoice-poller";
import { InboxDespatchPoller } from "../../src/watcher/inbox-despatch-poller";
import { InvoiceService } from "../../src/services/invoice.service";
import { DespatchService } from "../../src/services/despatch.service";
import { InvoiceHeaderInfoModel, DespatchHeaderInfoModel } from "../../src/types/generated.types";
import { HttpClient } from "../../src/core/http-client";
import { resolveConfig } from "../../src/core/config";
import { TokenManager } from "../../src/auth/token-manager";
import { MemoryCacheAdapter } from "../../src/cache/memory-cache";

describe("Inbox Poller Tests", () => {
	let invoiceService: InvoiceService;
	let despatchService: DespatchService;

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
				timeout: 5000,
				tokenBufferSeconds: 300,
			}),
			tokenManager
		);

		invoiceService = new InvoiceService(httpClient);
		despatchService = new DespatchService(httpClient);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("InboxInvoicePoller", () => {
		it("should fetch new invoices, emit events and auto-ack by default", async () => {
			const mockInvoices: InvoiceHeaderInfoModel[] = [
				{
					id: 101,
					ettn: "uuid-inv-1",
					docNo: "GIB2026000000001",
					accountName: "Ahmet Ticaret",
					payableAmount: 1500,
				},
				{
					id: 102,
					ettn: "uuid-inv-2",
					docNo: "GIB2026000000002",
					accountName: "Mehmet Ltd",
					payableAmount: 2500,
				},
			];

			const fetchSpy = vi
				.spyOn(invoiceService, "getNewInvoiceInboxWithHeaderInfoList")
				.mockResolvedValue({ succeed: true, data: mockInvoices });

			const ackSpy = vi
				.spyOn(invoiceService, "invoiceInboxSavedByCustomer")
				.mockResolvedValue({ succeed: true, data: true });

			const poller = new InboxInvoicePoller(invoiceService, {
				intervalMs: 10000,
				autoAck: true,
			});

			const receivedInvoices: InvoiceHeaderInfoModel[] = [];
			const ackedIds: string[] = [];
			let batchCount = 0;

			poller.on("invoice", (inv) => {
				receivedInvoices.push(inv);
			});

			poller.on("batch", (batch) => {
				batchCount = batch.length;
			});

			poller.on("ack", (ettn) => {
				ackedIds.push(ettn);
			});

			const polled = await poller.pollNow();

			expect(fetchSpy).toHaveBeenCalledTimes(1);
			expect(polled).toHaveLength(2);
			expect(receivedInvoices).toHaveLength(2);
			expect(receivedInvoices[0].ettn).toBe("uuid-inv-1");
			expect(batchCount).toBe(2);
			expect(ackSpy).toHaveBeenCalledTimes(2);
			expect(ackedIds).toEqual(["uuid-inv-1", "uuid-inv-2"]);

			const stats = poller.getStatus();
			expect(stats.totalProcessed).toBe(2);
			expect(stats.lastPollCount).toBe(2);
			expect(stats.totalErrors).toBe(0);
		});

		it("should not auto-ack when autoAck is false, but allow manual ack", async () => {
			const mockInvoices: InvoiceHeaderInfoModel[] = [
				{
					id: 201,
					ettn: "uuid-inv-manual",
					docNo: "GIB2026000000003",
				},
			];

			vi.spyOn(invoiceService, "getNewInvoiceInboxWithHeaderInfoList").mockResolvedValue({
				succeed: true,
				data: mockInvoices,
			});

			const ackSpy = vi
				.spyOn(invoiceService, "invoiceInboxSavedByCustomer")
				.mockResolvedValue({ succeed: true, data: true });

			const poller = new InboxInvoicePoller(invoiceService, {
				autoAck: false,
			});

			await poller.pollNow();
			expect(ackSpy).not.toHaveBeenCalled();

			// Manual ack
			const success = await poller.ack("uuid-inv-manual");
			expect(success).toBe(true);
			expect(ackSpy).toHaveBeenCalledWith({
				invoiceETTN: "uuid-inv-manual",
				tenantIdentifierNumber: undefined,
			});
		});

		it("should apply client-side filter if provided", async () => {
			const mockInvoices: InvoiceHeaderInfoModel[] = [
				{ id: 1, ettn: "inv-1", payableAmount: 50 },
				{ id: 2, ettn: "inv-2", payableAmount: 5000 },
			];

			vi.spyOn(invoiceService, "getNewInvoiceInboxWithHeaderInfoList").mockResolvedValue({
				succeed: true,
				data: mockInvoices,
			});

			vi.spyOn(invoiceService, "invoiceInboxSavedByCustomer").mockResolvedValue({
				succeed: true,
				data: true,
			});

			const poller = new InboxInvoicePoller(invoiceService, {
				filter: (inv) => (inv.payableAmount ?? 0) > 1000,
				autoAck: true,
			});

			const received: InvoiceHeaderInfoModel[] = [];
			poller.on("invoice", (inv) => received.push(inv));

			const result = await poller.pollNow();

			expect(result).toHaveLength(1);
			expect(result[0].ettn).toBe("inv-2");
			expect(received).toHaveLength(1);
		});

		it("should handle polling errors gracefully and emit error event", async () => {
			vi.spyOn(invoiceService, "getNewInvoiceInboxWithHeaderInfoList").mockRejectedValue(
				new Error("Network timeout")
			);

			const onErrorMock = vi.fn();
			const poller = new InboxInvoicePoller(invoiceService, {
				onError: onErrorMock,
			});

			let emittedError: Error | null = null;
			poller.on("error", (err) => {
				emittedError = err;
			});

			const result = await poller.pollNow();

			expect(result).toEqual([]);
			expect(emittedError).toBeDefined();
			expect((emittedError as unknown as Error).message).toBe("Network timeout");
			expect(onErrorMock).toHaveBeenCalledTimes(1);

			const stats = poller.getStatus();
			expect(stats.totalErrors).toBe(1);
		});

		it("should manage start and stop lifecycle", async () => {
			vi.spyOn(invoiceService, "getNewInvoiceInboxWithHeaderInfoList").mockResolvedValue({
				succeed: true,
				data: [],
			});

			const poller = new InboxInvoicePoller(invoiceService, { intervalMs: 2000 });

			let started = false;
			let stopped = false;

			poller.on("started", () => {
				started = true;
			});
			poller.on("stopped", () => {
				stopped = true;
			});

			await poller.start();
			expect(poller.getStatus().isRunning).toBe(true);
			expect(started).toBe(true);

			await poller.stop();
			expect(poller.getStatus().isRunning).toBe(false);
			expect(stopped).toBe(true);
		});

		it("should broadcast to Socket.IO if configured", async () => {
			const mockInvoice: InvoiceHeaderInfoModel = {
				id: 301,
				ettn: "uuid-socket-inv",
				docNo: "GIB2026000000005",
			};

			vi.spyOn(invoiceService, "getNewInvoiceInboxWithHeaderInfoList").mockResolvedValue({
				succeed: true,
				data: [mockInvoice],
			});
			vi.spyOn(invoiceService, "invoiceInboxSavedByCustomer").mockResolvedValue({
				succeed: true,
				data: true,
			});

			const socketEmitMock = vi.fn();
			const poller = new InboxInvoicePoller(invoiceService, {
				socketIo: { emit: socketEmitMock },
			});

			await poller.pollNow();

			expect(socketEmitMock).toHaveBeenCalledWith("invoice:received", mockInvoice);
			expect(socketEmitMock).toHaveBeenCalledWith("mysoft:inbox:item", {
				event: "invoice",
				item: mockInvoice,
			});
		});

		it("should fetch XML, PDF, HTML helper methods", async () => {
			vi.spyOn(invoiceService, "getInvoiceInboxUBLXMLAsZip").mockResolvedValue({
				succeed: true,
				data: "UEsDBBQAAAAIA...",
			});
			vi.spyOn(invoiceService, "getInvoiceInboxPdfAsZip").mockResolvedValue({
				succeed: true,
				data: "JVBERi0xLjQK...",
			});
			vi.spyOn(invoiceService, "getInvoiceInboxHTMLAsZip").mockResolvedValue({
				succeed: true,
				data: "PGh0bWw+...",
			});

			const poller = new InboxInvoicePoller(invoiceService);

			const xml = await poller.getInvoiceXml("test-uuid");
			const pdf = await poller.getInvoicePdf("test-uuid");
			const html = await poller.getInvoiceHtml("test-uuid");

			expect(xml).toBe("UEsDBBQAAAAIA...");
			expect(pdf).toBe("JVBERi0xLjQK...");
			expect(html).toBe("PGh0bWw+...");
		});
	});

	describe("InboxDespatchPoller", () => {
		it("should fetch new despatches and emit despatch events", async () => {
			const mockDespatches: DespatchHeaderInfoModel[] = [
				{
					id: 501,
					ettn: "uuid-dsp-1",
					docNo: "IRS2026000000001",
					accountName: "Kargo Lojistik A.Ş.",
				},
			];

			const fetchSpy = vi
				.spyOn(despatchService, "getNewDespatchInboxWithHeaderInfoList")
				.mockResolvedValue({ succeed: true, data: mockDespatches });

			const ackSpy = vi
				.spyOn(despatchService, "despatchInboxSavedByCustomer")
				.mockResolvedValue({ succeed: true, data: true });

			const poller = new InboxDespatchPoller(despatchService, {
				intervalMs: 10000,
				autoAck: true,
			});

			const received: DespatchHeaderInfoModel[] = [];
			poller.on("despatch", (dsp) => received.push(dsp));

			const polled = await poller.pollNow();

			expect(fetchSpy).toHaveBeenCalledTimes(1);
			expect(polled).toHaveLength(1);
			expect(received[0].ettn).toBe("uuid-dsp-1");
			expect(ackSpy).toHaveBeenCalledWith({
				despatchETTN: "uuid-dsp-1",
				tenantIdentifierNumber: undefined,
			});
		});
	});
});
