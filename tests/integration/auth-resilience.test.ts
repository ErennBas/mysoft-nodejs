import { describe, it, expect, beforeEach } from "vitest";
import { MysoftClient } from "../../src";
import { MockMysoftApi } from "../mocks/mock-api";

describe("Integration: Auth Resilience and Transparent 401 Retry", () => {
	let client: MysoftClient;
	let mockApi: MockMysoftApi;

	beforeEach(() => {
		client = new MysoftClient({
			clientId: "resilience_client_id",
			clientSecret: "resilience_client_secret",
			environment: "TEST",
			autoRetryAuth: true,
		});

		mockApi = new MockMysoftApi();
		mockApi.attachTo(client.httpClient.getAxiosInstance());
	});

	it("should transparently refresh token and retry request when receiving 401 Unauthorized", async () => {
		let tokenRequestCount = 0;
		let protectedEndpointCallCount = 0;

		// OAuth mock: her çağrıda yeni token döner
		mockApi.on("POST", "/oauth/token", () => {
			tokenRequestCount++;
			return [
				200,
				{
					access_token: `token_v${tokenRequestCount}`,
					token_type: "bearer",
					expires_in: 300,
					refresh_token: null,
				},
			];
		});

		// Korumalı endpoint mock: ilk çağrıda 401, ikincisinde 200 döner
		mockApi.on("GET", "/api/Taxpayer/getTaxPayerDetailInfo", (config) => {
			protectedEndpointCallCount++;
			const authHeader = config.headers.Authorization as string | undefined;

			// İlk token (token_v1) geçersiz / süresi dolmuş gibi davransın
			if (authHeader === "Bearer token_v1") {
				return [
					401,
					{
						error: "invalid_token",
						error_description: "The access token has expired.",
					},
				];
			}

			// Yeni token (token_v2) ile başarılı yanıt
			return [
				200,
				{
					succeed: true,
					data: {
						vknTckn: "1234567890",
						title: "Yetkilendirme Başarılı",
						isTaxpayer: true,
					},
				},
			];
		});

		// Kullanıcı tek bir metot çağırır
		const res = await client.taxpayers.getTaxpayerDetailInfo("1234567890");

		// Kullanıcıya şeffaf şekilde başarılı sonuç dönmeli
		expect(res.succeed).toBe(true);
		expect(res.data?.title).toBe("Yetkilendirme Başarılı");

		// Arka planda:
		// 1. İlk token alındı (token_v1)
		// 2. İstek 401 aldı
		// 3. Token temizlendi ve yeni token alındı (token_v2)
		// 4. İstek token_v2 ile tekrar denendi ve başarılı oldu
		expect(tokenRequestCount).toBe(2);
		expect(protectedEndpointCallCount).toBe(2);
	});
});
