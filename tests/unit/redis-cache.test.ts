import { describe, it, expect, vi } from "vitest";
import { RedisCacheAdapter, GenericRedisClient } from "../../src/cache/redis-cache";

describe("RedisCacheAdapter", () => {
	it("should throw error if invalid redis client is provided", () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(() => new RedisCacheAdapter({} as any)).toThrow();
	});

	it("should get, set and delete values using mock redis client", async () => {
		const mockRedis: GenericRedisClient = {
			get: vi.fn().mockResolvedValue("redis_token_val"),
			set: vi.fn().mockResolvedValue("OK"),
			del: vi.fn().mockResolvedValue(1),
		};

		const adapter = new RedisCacheAdapter(mockRedis);

		// Get test
		const val = await adapter.get("test_key");
		expect(mockRedis.get).toHaveBeenCalledWith("test_key");
		expect(val).toBe("redis_token_val");

		// Set test
		await adapter.set("test_key", "new_val", 120);
		expect(mockRedis.set).toHaveBeenCalledWith("test_key", "new_val", "EX", 120);

		// Delete test
		await adapter.delete("test_key");
		expect(mockRedis.del).toHaveBeenCalledWith("test_key");
	});

	it("should fallback to node-redis set format when ioredis signature fails", async () => {
		const mockRedis: GenericRedisClient = {
			get: vi.fn().mockResolvedValue(null),
			set: vi.fn().mockRejectedValueOnce(new Error("Wrong args for EX")).mockResolvedValueOnce("OK"),
			del: vi.fn().mockResolvedValue(1),
		};

		const adapter = new RedisCacheAdapter(mockRedis);
		await adapter.set("test_key", "val", 60);

		expect(mockRedis.set).toHaveBeenCalledTimes(2);
		expect(mockRedis.set).toHaveBeenNthCalledWith(1, "test_key", "val", "EX", 60);
		expect(mockRedis.set).toHaveBeenNthCalledWith(2, "test_key", "val", { EX: 60 });
	});
});
