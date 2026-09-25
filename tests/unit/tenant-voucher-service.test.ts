import { describe, it, expect, vi, beforeEach } from "vitest";
import { MysoftClient } from "../../src/client";

describe("Tenant & Voucher Services", () => {
	let client: MysoftClient;

	beforeEach(() => {
		client = new MysoftClient({
			clientId: "mock_client",
			clientSecret: "mock_secret",
		});
	});

	it("should call getCreditInfo and getTenants", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValue({
			succeed: true,
			data: { remainingCredit: 500, totalCredit: 1000, usedCredit: 500 },
		});

		const creditRes = await client.tenant.getCreditInfo();
		expect(getSpy).toHaveBeenCalledWith("/api/Firm/getCreditInfo");
		expect(creditRes.data?.remainingCredit).toBe(500);

		await client.tenant.getTenants(0, 10);
		expect(getSpy).toHaveBeenCalledWith("/api/Firm/getTenant?afterValue=0&limit=10");

		getSpy.mockRestore();
	});

	it("should call sendSmmWithUblXml and sendProducerVoucherWithUblXml", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValue({
			succeed: true,
			data: { uuid: "voucher-1", succeed: true },
		});

		await client.vouchers.sendSmmWithUblXml({
			invoiceTypeUblString: "SMM_XML_ZIP",
			prefix: "SMM",
		});

		expect(postSpy).toHaveBeenCalledWith("/api/InvoiceOutbox/invoiceOutboxWithUblXml", {
			invoiceTypeUblString: "SMM_XML_ZIP",
			prefix: "SMM",
			eDocumentType: "ESMM",
		});

		await client.vouchers.sendProducerVoucherWithUblXml({
			invoiceTypeUblString: "MM_XML_ZIP",
			prefix: "MSM",
		});

		expect(postSpy).toHaveBeenCalledWith("/api/InvoiceOutbox/invoiceOutboxWithUblXml", {
			invoiceTypeUblString: "MM_XML_ZIP",
			prefix: "MSM",
			eDocumentType: "EMUSTAHSIL",
		});

		postSpy.mockRestore();
	});
});
