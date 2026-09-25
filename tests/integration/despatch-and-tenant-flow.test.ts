import { describe, it, expect, beforeEach } from "vitest";
import { MysoftClient, DespatchResponseStatus, UnitCode } from "../../src";
import { setupStandardMockApi } from "../mocks/handlers";

describe("Integration: Despatch and Tenant Flow", () => {
	let client: MysoftClient;

	beforeEach(() => {
		client = new MysoftClient({
			clientId: "demo_client_id",
			clientSecret: "demo_client_secret",
			environment: "TEST",
		});

		const mockApi = setupStandardMockApi();
		mockApi.attachTo(client.httpClient.getAxiosInstance());
	});

	it("should send despatch and receive receipt advice successfully", async () => {
		// 1. Kontör Sorgulama
		const creditRes = await client.tenant.getCreditInfo();
		expect(creditRes.succeed).toBe(true);
		expect(creditRes.data?.remainingCredit).toBe(6580);

		// 2. İrsaliye Gönderme
		const despatchRes = await client.despatches.sendDespatchWithUblXml({
			despatchTypeUblString: "MOCK_DESPATCH_BASE64_ZIP",
			prefix: "IRS",
		});
		expect(despatchRes.succeed).toBe(true);

		// 3. İrsaliye Yanıtı Gönderme (ReceiptAdvice)
		const adviceRes = await client.despatches.sendReceiptAdvice({
			despatchUuid: "despatch-uuid-123",
			responseStatus: DespatchResponseStatus.KABUL,
			issueDate: "2026-09-25",
			lineResponses: [
				{
					lineId: 1,
					receivedQuantity: 10,
					unitCode: UnitCode.ADET,
				},
			],
		});
		expect(adviceRes.succeed).toBe(true);
	});
});
