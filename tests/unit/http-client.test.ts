import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpClient, ITokenProvider } from "../../src/core/http-client";
import { resolveConfig } from "../../src/core/config";
import { MYSOFT_URLS, DEFAULT_CONFIG } from "../../src/core/constants";
import { MysoftAuthError, MysoftApiError, MysoftNetworkError } from "../../src/errors";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

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

	describe("HttpClient Interceptors & Requests", () => {
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

		it("should create axios instance with default baseUrl and headers", () => {
			const instance = client.getAxiosInstance();
			expect(instance.defaults.baseURL).toBe(MYSOFT_URLS.TEST);
			expect(instance.defaults.timeout).toBe(DEFAULT_CONFIG.TIMEOUT_MS);
			expect(instance.defaults.headers["Content-Type"]).toBe("application/json");
		});

		it("should inject Bearer token into requests via Request Interceptor", async () => {
			const axiosInstance = client.getAxiosInstance();
			let capturedAuthHeader: string | undefined;

			axiosInstance.defaults.adapter = async (config) => {
				capturedAuthHeader = config.headers.Authorization as string;
				return {
					data: { succeed: true, data: "ok" },
					status: 200,
					statusText: "OK",
					headers: {},
					config,
				};
			};

			const res = await client.get<{ succeed: boolean; data: string }>("/api/test");
			expect(mockTokenProvider.getToken).toHaveBeenCalled();
			expect(capturedAuthHeader).toBe("Bearer mock_token_123");
			expect(res).toEqual({ succeed: true, data: "ok" });
		});

		it("should skip Bearer token when skipAuth is true", async () => {
			const axiosInstance = client.getAxiosInstance();
			let capturedAuthHeader: string | undefined;

			axiosInstance.defaults.adapter = async (config) => {
				capturedAuthHeader = config.headers.Authorization as string;
				return {
					data: { access_token: "xyz" },
					status: 200,
					statusText: "OK",
					headers: {},
					config,
				};
			};

			const res = await client.post<{ access_token: string }>(
				"/oauth/token",
				{ grant_type: "client_credentials" },
				{ skipAuth: true }
			);

			expect(mockTokenProvider.getToken).not.toHaveBeenCalled();
			expect(capturedAuthHeader).toBeUndefined();
			expect(res).toEqual({ access_token: "xyz" });
		});

		it("should automatically retry request once upon 401 Unauthorized", async () => {
			const axiosInstance = client.getAxiosInstance();
			let requestCount = 0;
			const tokensUsed: (string | undefined)[] = [];

			axiosInstance.defaults.adapter = async (config) => {
				requestCount++;
				tokensUsed.push(config.headers.Authorization as string | undefined);

				if (requestCount === 1) {
					const error = new AxiosError(
						"Request failed with status code 401",
						"ERR_BAD_REQUEST",
						config,
						{},
						{
							status: 401,
							statusText: "Unauthorized",
							data: { error_description: "The token is expired." },
							headers: {},
							config,
						}
					);
					throw error;
				}

				return {
					data: { succeed: true, result: "retried_successfully" },
					status: 200,
					statusText: "OK",
					headers: {},
					config,
				};
			};

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

		it("should transform Axios network timeout error to MysoftNetworkError", () => {
			const timeoutError = new AxiosError("timeout of 30000ms exceeded", "ECONNABORTED", {
				url: "/api/invoice",
				method: "POST",
			} as InternalAxiosRequestConfig);

			const transformed = client.handleError(timeoutError);
			expect(transformed instanceof MysoftNetworkError).toBe(true);
			const netErr = transformed as MysoftNetworkError;
			expect(netErr.isTimeout).toBe(true);
			expect(netErr.endpoint).toBe("/api/invoice");
		});

		it("should transform Axios 401 error to MysoftAuthError", () => {
			const authError = new AxiosError(
				"Unauthorized",
				"ERR_BAD_REQUEST",
				{ url: "/api/invoice", method: "GET" } as InternalAxiosRequestConfig,
				{},
				{
					status: 401,
					statusText: "Unauthorized",
					data: { error_description: "Token geçersiz" },
					headers: {},
					config: {} as InternalAxiosRequestConfig,
				}
			);

			const transformed = client.handleError(authError);
			expect(transformed instanceof MysoftAuthError).toBe(true);
			expect(transformed.message).toBe("Token geçersiz");
		});

		it("should transform Axios 400 error with validation messages to MysoftApiError", () => {
			const apiError = new AxiosError(
				"Bad Request",
				"ERR_BAD_REQUEST",
				{ url: "/api/send", method: "POST" } as InternalAxiosRequestConfig,
				{},
				{
					status: 400,
					statusText: "Bad Request",
					data: {
						message: "Fatura doğrulanamadı",
						errorCode: "INV_001",
						errors: { prefix: ["Prefix 3 karakter olmalıdır"] },
					},
					headers: {},
					config: {} as InternalAxiosRequestConfig,
				}
			);

			const transformed = client.handleError(apiError);
			expect(transformed instanceof MysoftApiError).toBe(true);
			const mysoftErr = transformed as MysoftApiError;
			expect(mysoftErr.message).toBe("Fatura doğrulanamadı");
			expect(mysoftErr.errorCode).toBe("INV_001");
			expect(mysoftErr.statusCode).toBe(400);
		});
	});
});
