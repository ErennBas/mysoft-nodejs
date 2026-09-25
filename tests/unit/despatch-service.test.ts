import { describe, it, expect, vi, beforeEach } from "vitest";
import { MysoftClient } from "../../src/client";
import { DespatchResponseStatus, UnitCode } from "../../src/types/enums";

describe("DespatchService", () => {
	let client: MysoftClient;

	beforeEach(() => {
		client = new MysoftClient({
			clientId: "mock_client",
			clientSecret: "mock_secret",
		});
	});

	it("should call sendDespatchWithUblXml correctly", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValueOnce({
			succeed: true,
			data: { uuid: "despatch-uuid-1", succeed: true },
		});

		const res = await client.despatches.sendDespatchWithUblXml({
			despatchTypeUblString: "BASE64_DESPATCH_XML",
			prefix: "IRS",
		});

		expect(postSpy).toHaveBeenCalledWith("/api/DespatchOutbox/despatchOutboxWithUblXml", {
			despatchTypeUblString: "BASE64_DESPATCH_XML",
			prefix: "IRS",
		});
		expect(res.succeed).toBe(true);
		postSpy.mockRestore();
	});

	it("should call sendDraftToGib and getOutboxStatus", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValue({
			succeed: true,
		});

		await client.despatches.sendDraftToGib(["despatch-1"]);
		expect(postSpy).toHaveBeenCalledWith("/api/DespatchOutbox/sendDraftDespatchToGIB", ["despatch-1"]);

		await client.despatches.getOutboxStatus(["despatch-1"]);
		expect(postSpy).toHaveBeenCalledWith("/api/DespatchOutbox/getDespatchOutboxStatus", ["despatch-1"]);

		postSpy.mockRestore();
	});

	it("should call sendReceiptAdvice for receipt confirmation", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValueOnce({
			succeed: true,
		});

		await client.despatches.sendReceiptAdvice({
			despatchUuid: "despatch-uuid-1",
			responseStatus: DespatchResponseStatus.KISMIKABUL,
			issueDate: "2026-09-25",
			lineResponses: [
				{
					lineId: 1,
					receivedQuantity: 8,
					rejectedQuantity: 2,
					unitCode: UnitCode.ADET,
					rejectionReason: "Hasarlı ürün",
				},
			],
		});

		expect(postSpy).toHaveBeenCalledWith("/api/ReceiptOutbox/receiptOutbox", {
			despatchUuid: "despatch-uuid-1",
			responseStatus: "KISMIKABUL",
			issueDate: "2026-09-25",
			lineResponses: [
				{
					lineId: 1,
					receivedQuantity: 8,
					rejectedQuantity: 2,
					unitCode: "C62",
					rejectionReason: "Hasarlı ürün",
				},
			],
		});
		postSpy.mockRestore();
	});
});
