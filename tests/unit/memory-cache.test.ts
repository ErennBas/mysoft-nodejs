import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryCacheAdapter } from "../../src/cache/memory-cache";

describe("MemoryCacheAdapter", () => {
	let cache: MemoryCacheAdapter;

	beforeEach(() => {
		vi.useFakeTimers();
		cache = new MemoryCacheAdapter();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should set and get values within TTL", () => {
		cache.set("my_key", "secret_value", 60);
		expect(cache.get("my_key")).toBe("secret_value");
		expect(cache.size()).toBe(1);
	});

	it("should return null for non-existing keys", () => {
		expect(cache.get("non_existing")).toBeNull();
	});

	it("should return null after TTL expires and delete item", () => {
		cache.set("temp_key", "temp_value", 10); // 10 seconds TTL
		expect(cache.get("temp_key")).toBe("temp_value");

		// Advance time by 11 seconds
		vi.advanceTimersByTime(11000);

		expect(cache.get("temp_key")).toBeNull();
		expect(cache.size()).toBe(0);
	});

	it("should delete key manually", () => {
		cache.set("key1", "val1", 60);
		expect(cache.get("key1")).toBe("val1");

		cache.delete("key1");
		expect(cache.get("key1")).toBeNull();
	});

	it("should clear all keys", () => {
		cache.set("key1", "val1", 60);
		cache.set("key2", "val2", 60);
		expect(cache.size()).toBe(2);

		cache.clear();
		expect(cache.size()).toBe(0);
		expect(cache.get("key1")).toBeNull();
		expect(cache.get("key2")).toBeNull();
	});
});
