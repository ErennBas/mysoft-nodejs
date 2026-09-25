import { describe, it, expect, vi, beforeEach } from "vitest";
import { MysoftClient } from "../../src/client";
import { EDocumentType } from "../../src/types/enums";

describe("InvoiceService", () => {
	let client: MysoftClient;

	beforeEach(() => {
		client = new MysoftClient({
			clientId: "mock_client",
			clientSecret: "mock_secret",
		});
	});

	it("should call sendInvoiceWithUblXml endpoint correctly", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValueOnce({
			succeed: true,
			data: { uuid: "inv-uuid-1", invoiceNumber: "MYF2026000000001", succeed: true },
		});

		const res = await client.invoices.sendInvoiceWithUblXml({
			invoiceTypeUblString: "BASE64_ZIP_CONTENT",
			eDocumentType: EDocumentType.EFATURA,
			prefix: "MYF",
		});

		expect(postSpy).toHaveBeenCalledWith("/api/InvoiceOutbox/invoiceOutboxWithUblXml", {
			invoiceTypeUblString: "BASE64_ZIP_CONTENT",
			eDocumentType: "EFATURA",
			prefix: "MYF",
		});
		expect(res.succeed).toBe(true);
		expect(res.data?.invoiceNumber).toBe("MYF2026000000001");
		postSpy.mockRestore();
	});

	it("should call sendDraftToGib with uuid array", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValueOnce({
			succeed: true,
		});

		await client.invoices.sendDraftToGib(["uuid-1", "uuid-2"]);
		expect(postSpy).toHaveBeenCalledWith("/api/InvoiceOutbox/sendDraftInvoiceToGIB", ["uuid-1", "uuid-2"]);
		postSpy.mockRestore();
	});

	it("should call getOutboxStatus and getInboxStatus", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValueOnce({
			succeed: true,
			data: [{ uuid: "uuid-1", invoiceNumber: "MYF1", gibStatusCode: 1200 }],
		});

		const res = await client.invoices.getOutboxStatus(["uuid-1"]);
		expect(postSpy).toHaveBeenCalledWith("/api/InvoiceOutbox/getInvoiceOutboxStatus", ["uuid-1"]);
		expect(res.data?.[0].gibStatusCode).toBe(1200);
		postSpy.mockRestore();
	});

	it("should call getInboxInvoicesForPeriod with formatted dates", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValueOnce({
			succeed: true,
			data: [],
		});

		await client.invoices.getInboxInvoicesForPeriod("2026-01-01", "2026-01-31");
		expect(getSpy).toHaveBeenCalledWith(
			"/api/InvoiceInbox/getInvoiceInboxListForPeriod?startDate=2026-01-01&endDate=2026-01-31"
		);
		getSpy.mockRestore();
	});

	it("should call getOutboxPdfAsZip and return zip base64", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValueOnce({
			succeed: true,
			data: "BASE64_PDF_ZIP",
		});

		const res = await client.invoices.getOutboxPdfAsZip("uuid-123");
		expect(getSpy).toHaveBeenCalledWith("/api/InvoiceOutbox/getInvoiceOutboxPdfAsZip?invoiceETTN=uuid-123");
		expect(res.data).toBe("BASE64_PDF_ZIP");
		getSpy.mockRestore();
	});

	it("should call cancelEArchiveInvoice", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValueOnce({
			succeed: true,
			data: { uuid: "uuid-123", succeed: true },
		});

		const res = await client.invoices.cancelEArchiveInvoice({
			uuid: "uuid-123",
			cancelReason: "Hatalı Tutar",
		});

		expect(postSpy).toHaveBeenCalledWith("/api/InvoiceOutbox/cancelEArchiveInvoice", {
			uuid: "uuid-123",
			cancelReason: "Hatalı Tutar",
		});
		expect(res.succeed).toBe(true);
		postSpy.mockRestore();
	});

	it("should call acceptInvoice and denyInvoice for commercial invoices", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValue({
			succeed: true,
		});

		await client.invoices.acceptInvoice("inv-commercial-1");
		expect(postSpy).toHaveBeenCalledWith("/api/InvoiceInbox/acceptInvoice?uuid=inv-commercial-1");

		await client.invoices.denyInvoice("inv-commercial-1", "Hatalı Fiyat");
		expect(postSpy).toHaveBeenCalledWith("/api/InvoiceInbox/denyInvoiceWithModel", {
			uuid: "inv-commercial-1",
			reason: "Hatalı Fiyat",
		});

		postSpy.mockRestore();
	});

	it("should send invoice via JSON payload with sendInvoice", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValueOnce({
			succeed: true,
			data: {
				invoiceId: 101,
				invoiceETTN: "json-inv-uuid-1",
				docNo: "MYF2026000000099",
			},
			message: "Fatura kuyruğa alındı",
		});

		const res = await client.invoices.sendInvoice({
			profile: "TICARI",
			type: "SATIS",
			prefix: "MYF",
			issueDate: "2026-09-25",
			buyer: {
				vknTckn: "1234567890",
				title: "ABC Ltd.",
			},
			lines: [
				{
					name: "Hizmet Bedeli",
					quantity: 2,
					unitCode: "C62",
					unitPrice: 500,
					vatRate: 20,
				},
			],
		});

		expect(postSpy).toHaveBeenCalledWith(
			"/api/InvoiceOutbox/invoiceOutbox",
			expect.objectContaining({
				profile: "TICARI",
				invoiceType: "SATIS",
				prefix: "MYF",
				docDate: "2026-09-25",
				invoiceAccount: expect.objectContaining({
					vknTckn: "1234567890",
					accountName: "ABC Ltd.",
				}),
				invoiceDetail: expect.arrayContaining([
					expect.objectContaining({
						qty: 2,
						unitPriceTra: 500,
						vatRate: 20,
					}),
				]),
			})
		);
		expect(res.succeed).toBe(true);
		expect(res.data?.uuid).toBe("json-inv-uuid-1");
		expect(res.data?.invoiceNumber).toBe("MYF2026000000099");
		postSpy.mockRestore();
	});

	it("should create draft invoice via JSON payload with createDraftInvoice", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValueOnce({
			succeed: true,
			data: {
				invoiceId: 202,
				invoiceETTN: "draft-inv-uuid-1",
				docNo: "TASLAK2026000001",
			},
			message: "Taslak oluşturuldu",
		});

		const res = await client.invoices.createDraftInvoice({
			profile: "TICARI",
			type: "SATIS",
			issueDate: "2026-09-25",
			buyer: {
				vknTckn: "1234567890",
				title: "ABC Ltd.",
			},
			lines: [
				{
					name: "Danışmanlık",
					quantity: 1,
					unitCode: "C62",
					unitPrice: 1000,
					vatRate: 20,
				},
			],
		});

		expect(postSpy).toHaveBeenCalledWith(
			"/api/Invoice/invoiceDraft",
			expect.objectContaining({
				profile: "TICARI",
				invoiceType: "SATIS",
			})
		);
		expect(res.succeed).toBe(true);
		expect(res.data?.uuid).toBe("draft-inv-uuid-1");
		postSpy.mockRestore();
	});

	it("should automatically convert Date objects into formatted strings in sendInvoice", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValueOnce({
			succeed: true,
			data: {
				invoiceETTN: "date-test-uuid",
				docNo: "DAT2026000000001",
			},
		});

		const issueDateObj = new Date(2026, 8, 25, 15, 45, 30); // 2026-09-25 15:45:30
		const orderDateObj = new Date(2026, 8, 20); // 2026-09-20
		const dueDateObj = new Date(2026, 9, 15); // 2026-10-15
		const paymentDateObj = new Date(2026, 8, 24); // 2026-09-24

		const res = await client.invoices.sendInvoice({
			profile: "EARSIV",
			type: "SATIS",
			issueDate: issueDateObj,
			issueTime: issueDateObj,
			buyer: {
				vknTckn: "11111111111",
				title: "Date Test Alıcı",
			},
			orderReference: {
				orderId: "ORD-999",
				issueDate: orderDateObj,
			},
			paymentInfo: {
				dueDate: dueDateObj,
			},
			internetSalesInfo: {
				webAddress: "https://test.com",
				paymentType: "KREDIKARTI/BANKAKARTI",
				paymentDate: paymentDateObj,
				cargoFirmTitle: "Test Kargo",
				cargoFirmVknTckn: "1234567890",
			},
			lines: [
				{
					name: "Test Ürün",
					quantity: 1,
					unitCode: "C62",
					unitPrice: 100,
					vatRate: 20,
				},
			],
		});

		expect(postSpy).toHaveBeenCalledWith(
			"/api/InvoiceOutbox/invoiceOutbox",
			expect.objectContaining({
				docDate: "2026-09-25",
				docTime: "15:45:30",
				orderDate: "2026-09-20",
				paymentInfo: expect.objectContaining({
					dueDate: "2026-10-15",
				}),
				internetShipmentInfo: expect.objectContaining({
					paymentDate: "2026-09-24",
				}),
			})
		);
		expect(res.succeed).toBe(true);
		postSpy.mockRestore();
	});

	it("should support Date objects in getInboxInvoicesForPeriod and cancelEArchiveInvoice", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValueOnce({
			succeed: true,
			data: [],
		});

		await client.invoices.getInboxInvoicesForPeriod(new Date(2026, 0, 1), new Date(2026, 0, 31));
		expect(getSpy).toHaveBeenCalledWith(
			"/api/InvoiceInbox/getInvoiceInboxListForPeriod?startDate=2026-01-01&endDate=2026-01-31"
		);
		getSpy.mockRestore();

		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValueOnce({
			succeed: true,
			data: { uuid: "cancel-uuid", succeed: true },
		});

		await client.invoices.cancelEArchiveInvoice({
			uuid: "cancel-uuid",
			cancelReason: "Hatalı fatura",
			cancelDate: new Date(2026, 8, 25),
		});

		expect(postSpy).toHaveBeenCalledWith(
			"/api/InvoiceOutbox/cancelEArchiveInvoice",
			expect.objectContaining({
				uuid: "cancel-uuid",
				cancelDate: "2026-09-25",
			})
		);
		postSpy.mockRestore();
	});
});

