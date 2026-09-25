import { describe, it, expect, vi, beforeEach } from "vitest";
import { MysoftClient } from "../../src/client";

describe("Additional Swagger Services Unit Tests", () => {
	let client: MysoftClient;

	beforeEach(() => {
		client = new MysoftClient({
			clientId: "test_client",
			clientSecret: "test_secret",
		});
	});

	it("should call BookService endpoints", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValue({
			succeed: true,
			data: [],
		});

		await client.books.getBookList();
		expect(getSpy).toHaveBeenCalledWith("/api/Book/getBook", undefined);

		await client.books.getBookXMLAsZip({ uuid: "book-1" });
		expect(getSpy).toHaveBeenCalledWith("/api/Book/getBookXMLAsZip", { params: { uuid: "book-1" } });

		getSpy.mockRestore();
	});

	it("should call AccountingService & FinanceService endpoints", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValue({
			succeed: true,
			data: [],
		});
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValue({
			succeed: true,
			data: {},
		});

		await client.accounting.bankAccountBalance({
			params: { startDate: "2026-01-01", endDate: "2026-01-31" },
		} as any);
		expect(getSpy).toHaveBeenCalledWith("/api/PreAccounting/bankAccountBalance", {
			params: { startDate: "2026-01-01", endDate: "2026-01-31" },
		});

		await client.finance.financeDetailedList();
		expect(getSpy).toHaveBeenCalledWith("/api/Finance/financeDetailedList", undefined);

		await client.finance.createFinanceReceipt({ id: 1 } as any);
		expect(postSpy).toHaveBeenCalledWith("/api/Finance/createFinanceReceipt", { id: 1 }, undefined);

		getSpy.mockRestore();
		postSpy.mockRestore();
	});

	it("should call IysService & CampaignService endpoints", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValue({
			succeed: true,
			data: { succeed: true },
		});

		await client.iys.sendConsent({ recipient: "test@example.com" } as any);
		expect(postSpy).toHaveBeenCalledWith("/api/Etk/sendConsent", { recipient: "test@example.com" }, undefined);

		await client.campaigns.sendSMSConsentImmediate({ phone: "5551234567" } as any);
		expect(postSpy).toHaveBeenCalledWith(
			"/api/Campaign/sendSMSConsentImmediate",
			{ phone: "5551234567" },
			undefined
		);

		postSpy.mockRestore();
	});

	it("should call ReconciliationService, OrderService, and IframeService", async () => {
		const postSpy = vi.spyOn(client.httpClient, "post").mockResolvedValue({
			succeed: true,
			data: {},
		});

		await client.reconciliation.createAccountAgreement({ agreementId: "ag-1" } as any);
		expect(postSpy).toHaveBeenCalledWith(
			"/api/Agreement/createAccountAgreement",
			{ agreementId: "ag-1" },
			undefined
		);

		await client.orders.getOrderList({ orderId: "ord-1" } as any);
		expect(postSpy).toHaveBeenCalledWith("/api/Order/getOrderList", { orderId: "ord-1" }, undefined);

		await client.iframe.getPortalUrl({ token: "tok-1" } as any);
		expect(postSpy).toHaveBeenCalledWith("/api/Iframe/getIframeUrl", { token: "tok-1" }, undefined);

		postSpy.mockRestore();
	});
});
