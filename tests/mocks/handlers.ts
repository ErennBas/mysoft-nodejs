import { MockMysoftApi } from "./mock-api";

/**
 * Mysoft Standart API Mock Yanıt Setini Yükler
 */
export function setupStandardMockApi(): MockMysoftApi {
	const mockApi = new MockMysoftApi();

	// 1. OAuth Token
	mockApi.on("POST", "/oauth/token", () => [
		200,
		{
			access_token: "mock_jwt_access_token_valid",
			token_type: "bearer",
			expires_in: 300,
			refresh_token: null,
		},
	]);

	// 2. Mükellef Sorgulama
	mockApi.on("GET", "/api/Taxpayer/getTaxPayerDetailInfo", (config) => {
		const url = config.url || "";
		if (url.includes("identifierNumber=1234567890")) {
			return [
				200,
				{
					succeed: true,
					data: {
						vknTckn: "1234567890",
						title: "Örnek Teknoloji Anonim Şirketi",
						isTaxpayer: true,
						eInvoiceStatus: true,
						eDespatchStatus: true,
						aliases: [
							{
								alias: "urn:mail:defaultpk@mysoft.com.tr",
								type: "PK",
								creationTime: "2020-01-01T00:00:00",
							},
							{
								alias: "urn:mail:defaultgb@mysoft.com.tr",
								type: "GB",
								creationTime: "2020-01-01T00:00:00",
							},
						],
					},
				},
			];
		}

		return [
			200,
			{
				succeed: true,
				data: {
					vknTckn: "9999999999",
					title: "Bireysel Müşteri",
					isTaxpayer: false,
					eInvoiceStatus: false,
					aliases: [],
				},
			},
		];
	});

	// 3. Fatura Gönderme (JSON ve UBL XML)
	mockApi.on("POST", "/api/InvoiceOutbox/invoiceOutbox", (config) => {
		const body = JSON.parse(config.data || "{}");
		return [
			200,
			{
				succeed: true,
				data: {
					invoiceId: 1001,
					invoiceETTN: body.ettn || "4ad402f0-b951-4aa2-acd6-6b6d74a79a10",
					docNo: body.docNo || "MYF2026000000001",
				},
				message: "Fatura başarıyla oluşturuldu ve kuyruğa alındı.",
			},
		];
	});

	mockApi.on("POST", "/api/Invoice/invoiceDraft", (config) => {
		const body = JSON.parse(config.data || "{}");
		return [
			200,
			{
				succeed: true,
				data: {
					invoiceId: 1002,
					invoiceETTN: body.ettn || "4ad402f0-b951-4aa2-acd6-6b6d74a79a10",
					docNo: body.docNo || "TASLAK2026000001",
				},
				message: "Taslak fatura başarıyla portalda oluşturuldu.",
			},
		];
	});

	mockApi.on("POST", "/api/InvoiceOutbox/invoiceOutboxWithUblXml", () => [
		200,
		{
			succeed: true,
			data: {
				uuid: "4ad402f0-b951-4aa2-acd6-6b6d74a79a10",
				invoiceNumber: "MYF2026000000001",
				succeed: true,
				message: "Fatura başarıyla kuyruğa alındı.",
			},
		},
	]);

	// 4. Fatura Durum Sorgulama
	mockApi.on("POST", "/api/InvoiceOutbox/getInvoiceOutboxStatus", () => [
		200,
		{
			succeed: true,
			data: [
				{
					uuid: "4ad402f0-b951-4aa2-acd6-6b6d74a79a10",
					invoiceNumber: "MYF2026000000001",
					gibStatusCode: 1200,
					gibStatusDescription: "Başarıyla İşlendi",
					responseStatus: "KABUL",
				},
			],
		},
	]);

	// 5. Fatura PDF İndirme (ZIP Base64)
	mockApi.on("GET", "/api/InvoiceOutbox/getInvoiceOutboxPdfAsZip", () => [
		200,
		{
			succeed: true,
			data: "UEsDBBQAAAAIAPB9I1KH6EuJkgcAAI8mAAAoAAAAbW9ja19pbnZvaWNlLnBkZlBLBQYAAAAAAQAA=",
		},
	]);

	// 6. E-Arşiv Fatura İptal
	mockApi.on("POST", "/api/InvoiceOutbox/cancelEArchiveInvoice", () => [
		200,
		{
			succeed: true,
			data: {
				uuid: "4ad402f0-b951-4aa2-acd6-6b6d74a79a10",
				succeed: true,
				message: "E-Arşiv fatura başarıyla iptal edildi.",
			},
		},
	]);

	// 7. Ticari Fatura Kabul
	mockApi.on("POST", "/api/InvoiceInbox/acceptInvoice", () => [
		200,
		{
			succeed: true,
			message: "Fatura kabul yanıtı oluşturuldu.",
		},
	]);

	// 8. İrsaliye Gönderme
	mockApi.on("POST", "/api/DespatchOutbox/despatchOutboxWithUblXml", () => [
		200,
		{
			succeed: true,
			data: {
				uuid: "despatch-uuid-123",
				invoiceNumber: "IRS2026000000001",
				succeed: true,
			},
		},
	]);

	// 9. İrsaliye Yanıtı
	mockApi.on("POST", "/api/DespatchInbox/sendReceiptAdvice", () => [
		200,
		{
			succeed: true,
			message: "İrsaliye kabul yanıtı iletildi.",
		},
	]);

	mockApi.on("POST", "/api/ReceiptOutbox/receiptOutbox", () => [
		200,
		{
			succeed: true,
			message: "İrsaliye yanıtı başarıyla iletildi.",
		},
	]);

	// 10. Kontör Sorgulama
	mockApi.on("GET", "/api/Tenant/getCreditInfo", () => [
		200,
		{
			succeed: true,
			data: {
				totalCredit: 10000,
				usedCredit: 3420,
				remainingCredit: 6580,
				expiryDate: "2027-01-01",
			},
		},
	]);

	mockApi.on("GET", "/api/Firm/getCreditInfo", () => [
		200,
		{
			succeed: true,
			data: {
				totalCredit: 10000,
				usedCredit: 3420,
				remainingCredit: 6580,
				expiryDate: "2027-01-01",
			},
		},
	]);

	return mockApi;
}
