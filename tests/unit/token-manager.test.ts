import { describe, it, expect, vi, beforeEach } from "vitest";
import { TokenManager } from "../../src/auth/token-manager";
import { HttpClient } from "../../src/core/http-client";
import { resolveConfig } from "../../src/core/config";
import { MemoryCacheAdapter } from "../../src/cache/memory-cache";
import { MysoftAuthError } from "../../src/errors/auth-error";

describe("TokenManager", () => {
	let memoryCache: MemoryCacheAdapter;
	let tokenManager: TokenManager;
	let httpClient: HttpClient;

	beforeEach(() => {
		memoryCache = new MemoryCacheAdapter();
		const config = resolveConfig({
			clientId: "app_id_123",
			clientSecret: "app_secret_456",
		});
		httpClient = new HttpClient(config);

		tokenManager = new TokenManager(
			{
				clientId: "app_id_123",
				clientSecret: "app_secret_456",
				tokenBufferSeconds: 30,
				cache: memoryCache,
			},
			httpClient
		);
	});

	it("should throw error if clientId or clientSecret is empty", () => {
		expect(() => new TokenManager({ clientId: "", clientSecret: "sec" })).toThrow(MysoftAuthError);
		expect(() => new TokenManager({ clientId: "id", clientSecret: "" })).toThrow(MysoftAuthError);
	});

	it("should fetch token from API and cache it on first call", async () => {
		const postSpy = vi.spyOn(httpClient, "post").mockResolvedValueOnce({
			access_token: "jwt_token_sample",
			token_type: "bearer",
			expires_in: 300,
			refresh_token: null,
		});

		const token = await tokenManager.getToken();

		expect(token).toBe("jwt_token_sample");
		expect(postSpy).toHaveBeenCalledTimes(1);

		// Önbellekte de saklanmış olmalı
		const cached = memoryCache.get("mysoft:token:app_id_123");
		expect(cached).toBe("jwt_token_sample");

		// İkinci çağrıda API'ye tekrar gitmemeli
		const secondToken = await tokenManager.getToken();
		expect(secondToken).toBe("jwt_token_sample");
		expect(postSpy).toHaveBeenCalledTimes(1);

		postSpy.mockRestore();
	});

	it("should prevent Thundering Herd with single-flight mutex on concurrent calls", async () => {
		let resolveCall: (value: unknown) => void;
		const delayPromise = new Promise((resolve) => {
			resolveCall = resolve;
		});

		const postSpy = vi.spyOn(httpClient, "post").mockImplementation(async () => {
			await delayPromise;
			return {
				access_token: "mutex_token_shared",
				token_type: "bearer",
				expires_in: 300,
				refresh_token: null,
			};
		});

		// Aynı anda 50 paralel istek başlat
		const promises = Array.from({ length: 50 }, () => tokenManager.getToken());

		// Bekleyen token talebini çöz
		resolveCall!(null);

		const results = await Promise.all(promises);

		// Hepsi aynı token'ı almış olmalı
		expect(results.every((t) => t === "mutex_token_shared")).toBe(true);
		// API sadece 1 kez çağrılmış olmalı
		expect(postSpy).toHaveBeenCalledTimes(1);

		postSpy.mockRestore();
	});

	it("should clear cached token when clearToken is called", async () => {
		memoryCache.set("mysoft:token:app_id_123", "old_token", 300);
		expect(await tokenManager.getToken()).toBe("old_token");

		await tokenManager.clearToken();
		expect(memoryCache.get("mysoft:token:app_id_123")).toBeNull();
	});

	it("should throw MysoftAuthError on API failure", async () => {
		const postSpy = vi.spyOn(httpClient, "post").mockRejectedValueOnce(new Error("Invalid credentials"));

		await expect(tokenManager.getToken()).rejects.toThrow(MysoftAuthError);

		postSpy.mockRestore();
	});
});
