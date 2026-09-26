import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpClient, ITokenProvider } from "../../src/core/http-client";
import { resolveConfig } from "../../src/core/config";
import { MYSOFT_URLS, DEFAULT_CONFIG } from "../../src/core/constants";
import { MysoftAuthError, MysoftApiError, MysoftNetworkError } from "../../src/errors";

describe("HttpClient & Config", () => {
	describe("resolveConfig", () => {
		it("should correctly resolve default configuration", () => {
			const config = resolveConfig({
				clientId: "test_client",
				clientSecret: "test_secret",
			});

			expect(config.clientId).toBe("test_client");
			expect(config.clientSecret).toBe("test_secret");
			expect(config.environment).toBe("TEST");
			expect(config.baseUrl).toBe(MYSOFT_URLS.TEST);
			expect(config.timeout).toBe(DEFAULT_CONFIG.TIMEOUT_MS);
			expect(config.tokenBufferSeconds).toBe(DEFAULT_CONFIG.TOKEN_BUFFER_SEC);
			expect(config.autoRetryAuth).toBe(true);
		});

		it("should resolve production environment URL", () => {
			const config = resolveConfig({
				clientId: "prod_client",
				clientSecret: "prod_secret",
				environment: "PRODUCTION",
			});

			expect(config.baseUrl).toBe(MYSOFT_URLS.PRODUCTION);
		});

		it("should allow custom baseUrl and remove trailing slash", () => {
			const config = resolveConfig({
				clientId: "client",
				clientSecret: "secret",
				baseUrl: "https://custom-proxy.internal.com///",
			});

			expect(config.baseUrl).toBe("https://custom-proxy.internal.com");
		});

		it("should throw error if clientId or clientSecret is missing", () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(() => resolveConfig({} as any)).toThrow();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(() => resolveConfig({ clientId: "" } as any)).toThrow();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(() => resolveConfig({ clientId: "id", clientSecret: " " } as any)).toThrow();
		});
	});

	describe("HttpClient Requests & Resilience (Native Fetch)", () => {
		const resolvedConfig = resolveConfig({
			clientId: "mock_client",
			clientSecret: "mock_secret",
		});

		let mockTokenProvider: ITokenProvider;
		let client: HttpClient;

		beforeEach(() => {
			mockTokenProvider = {
				getToken: vi.fn().mockResolvedValue("mock_token_123"),
				clearToken: vi.fn().mockResolvedValue(undefined),
			};
			client = new HttpClient(resolvedConfig, mockTokenProvider);
		});

		it("should configure baseUrl and timeout properly", () => {
			expect(client.getBaseUrl()).toBe(MYSOFT_URLS.TEST);
			expect(client.getTimeout()).toBe(DEFAULT_CONFIG.TIMEOUT_MS);
		});

		it("should inject Bearer token into requests automatically", async () => {
			let capturedAuthHeader: string | undefined;

			client.setCustomFetch(async (_input, init) => {
				const headers = init?.headers as Record<string, string>;
				capturedAuthHeader = headers["Authorization"];
				return new Response(JSON.stringify({ succeed: true, data: "ok" }), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				});
			});

			const res = await client.get<{ succeed: boolean; data: string }>("/api/test");
			expect(mockTokenProvider.getToken).toHaveBeenCalled();
			expect(capturedAuthHeader).toBe("Bearer mock_token_123");
			expect(res).toEqual({ succeed: true, data: "ok" });
		});

		it("should skip Bearer token when skipAuth is true", async () => {
			let capturedAuthHeader: string | undefined;

			client.setCustomFetch(async (_input, init) => {
				const headers = init?.headers as Record<string, string>;
				capturedAuthHeader = headers["Authorization"];
				return new Response(JSON.stringify({ access_token: "xyz" }), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				});
			});

			const res = await client.post<{ access_token: string }>(
				"/oauth/token",
				{ grant_type: "client_credentials" },
				{ skipAuth: true }
			);

			expect(mockTokenProvider.getToken).not.toHaveBeenCalled();
			expect(capturedAuthHeader).toBeUndefined();
			expect(res).toEqual({ access_token: "xyz" });
		});

		it("should format URL query parameters correctly", async () => {
			let capturedUrl = "";

			client.setCustomFetch(async (input) => {
				capturedUrl = String(input);
				return new Response(JSON.stringify({ ok: true }), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				});
			});

			await client.get("/api/query", {
				params: {
					vkn: "1234567890",
					active: true,
					limit: 10,
				},
			});

			expect(capturedUrl).toContain("vkn=1234567890");
			expect(capturedUrl).toContain("active=true");
			expect(capturedUrl).toContain("limit=10");
		});

		it("should automatically retry request once upon 401 Unauthorized", async () => {
			let requestCount = 0;
			const tokensUsed: (string | undefined)[] = [];

			client.setCustomFetch(async (_input, init) => {
				requestCount++;
				const headers = init?.headers as Record<string, string>;
				tokensUsed.push(headers["Authorization"]);

				if (requestCount === 1) {
					return new Response(JSON.stringify({ error_description: "The token is expired." }), {
						status: 401,
						headers: { "Content-Type": "application/json" },
					});
				}

				return new Response(JSON.stringify({ succeed: true, result: "retried_successfully" }), {
					status: 200,
					headers: { "Content-Type": "application/json" },
				});
			});

			(mockTokenProvider.getToken as ReturnType<typeof vi.fn>)
				.mockResolvedValueOnce("expired_token")
				.mockResolvedValueOnce("fresh_token");

			const result = await client.get<{ succeed: boolean; result: string }>("/api/protected");

			expect(mockTokenProvider.clearToken).toHaveBeenCalledTimes(1);
			expect(mockTokenProvider.getToken).toHaveBeenCalledTimes(2);
			expect(requestCount).toBe(2);
			expect(tokensUsed[0]).toBe("Bearer expired_token");
			expect(tokensUsed[1]).toBe("Bearer fresh_token");
			expect(result).toEqual({ succeed: true, result: "retried_successfully" });
		});

		it("should transform network timeout error to MysoftNetworkError", () => {
			const timeoutError = new Error("The operation was aborted due to timeout");
			timeoutError.name = "AbortError";

			const transformed = client.handleError(timeoutError, { url: "/api/invoice", method: "POST" });
			expect(transformed instanceof MysoftNetworkError).toBe(true);
			const netErr = transformed as MysoftNetworkError;
			expect(netErr.isTimeout).toBe(true);
			expect(netErr.endpoint).toBe("/api/invoice");
		});

		it("should transform 401 response to MysoftAuthError", async () => {
			client.setCustomFetch(async () => {
				return new Response(JSON.stringify({ error_description: "Token geçersiz" }), {
					status: 401,
					headers: { "Content-Type": "application/json" },
				});
			});

			await expect(client.get("/api/invoice", { skipRetry: true })).rejects.toThrow(MysoftAuthError);
		});

		it("should transform 400 error with validation messages to MysoftApiError", async () => {
			client.setCustomFetch(async () => {
				return new Response(
					JSON.stringify({
						message: "Fatura doğrulanamadı",
						errorCode: "INV_001",
						errors: { prefix: ["Prefix 3 karakter olmalıdır"] },
					}),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					}
				);
			});

			try {
				await client.post("/api/send", {});
				expect.fail("Should have thrown error");
			} catch (err) {
				expect(err instanceof MysoftApiError).toBe(true);
				const mysoftErr = err as MysoftApiError;
				expect(mysoftErr.message).toBe("Fatura doğrulanamadı");
				expect(mysoftErr.errorCode).toBe("INV_001");
				expect(mysoftErr.statusCode).toBe(400);
			}
		});
	});
});
