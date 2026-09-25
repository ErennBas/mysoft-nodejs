import { describe, it, expect, beforeEach } from "vitest";
import { MysoftClient, EDocumentType, UblHelper } from "../../src";
import { setupStandardMockApi } from "../mocks/handlers";
import { MockMysoftApi } from "../mocks/mock-api";

describe("Integration: Invoice Lifecycle Flow", () => {
	let client: MysoftClient;
	let mockApi: MockMysoftApi;

	beforeEach(() => {
		client = new MysoftClient({
			clientId: "demo_client_id",
			clientSecret: "demo_client_secret",
			environment: "TEST",
		});

		mockApi = setupStandardMockApi();
		mockApi.attachTo(client.httpClient.getAxiosInstance());
	});

	it("should execute end-to-end invoice flow seamlessly", async () => {
		// 1. Mükellef Kontrolü & Alias Alma
		const taxpayerRes = await client.taxpayers.getTaxpayerDetailInfo("1234567890");
		expect(taxpayerRes.succeed).toBe(true);
		expect(taxpayerRes.data?.isTaxpayer).toBe(true);
		expect(taxpayerRes.data?.title).toContain("Örnek Teknoloji");

		const { pkAliases } = await client.taxpayers.getAliases("1234567890");
		expect(pkAliases.length).toBeGreaterThan(0);
		const defaultPk = pkAliases[0];

		// 2. Örnek UBL XML Oluşturma ve Base64 ZIP'e Kodlama
		const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    <cbc:UUID>4ad402f0-b951-4aa2-acd6-6b6d74a79a10</cbc:UUID>
    <cbc:ID>MYF2026000000001</cbc:ID>
    <cbc:IssueDate>2026-09-25</cbc:IssueDate>
</Invoice>`;

		const base64Zip = UblHelper.xmlToBase64Zip(sampleXml);
		expect(typeof base64Zip).toBe("string");

		// 3. Faturayı Gönderme (İlk istekte otomatik /oauth/token çağrısı tetiklenir)
		const sendRes = await client.invoices.sendInvoiceWithUblXml({
			invoiceTypeUblString: base64Zip,
			eDocumentType: EDocumentType.EFATURA,
			prefix: "MYF",
			pkAlias: defaultPk,
		});

		expect(sendRes.succeed).toBe(true);
		expect(sendRes.data?.uuid).toBe("4ad402f0-b951-4aa2-acd6-6b6d74a79a10");
		expect(sendRes.data?.invoiceNumber).toBe("MYF2026000000001");

		// İstek loglarında token alındığı ve faturanın gönderildiği doğrulanır
		const oauthReq = mockApi.requestLog.find((r) => r.url === "/oauth/token");
		expect(oauthReq).toBeDefined();

		const invoiceReq = mockApi.requestLog.find((r) => r.url.includes("invoiceOutboxWithUblXml"));
		expect(invoiceReq).toBeDefined();
		// Fatura isteğinin Authorization başlığında token olmalı
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((invoiceReq?.headers as any).Authorization).toBe("Bearer mock_jwt_access_token_valid");

		// 4. GİB Durumunu Sorgulama
		const statusRes = await client.invoices.getOutboxStatus(["4ad402f0-b951-4aa2-acd6-6b6d74a79a10"]);
		expect(statusRes.succeed).toBe(true);
		expect(statusRes.data?.[0].gibStatusCode).toBe(1200);
		expect(statusRes.data?.[0].gibStatusDescription).toBe("Başarıyla İşlendi");

		// 5. PDF Görselini İndirme
		const pdfRes = await client.invoices.getOutboxPdfAsZip("4ad402f0-b951-4aa2-acd6-6b6d74a79a10");
		expect(pdfRes.succeed).toBe(true);
		expect(pdfRes.data).toBeDefined();

		// 6. E-Arşiv Fatura İptal
		const cancelRes = await client.invoices.cancelEArchiveInvoice({
			uuid: "4ad402f0-b951-4aa2-acd6-6b6d74a79a10",
			cancelReason: "Müşteri iade etti",
		});
		expect(cancelRes.succeed).toBe(true);

		// 7. Standart JSON ile Normal Fatura Gönderimi
		const jsonInvoiceRes = await client.invoices.sendInvoice({
			profile: "TICARI",
			type: "SATIS",
			prefix: "MYF",
			issueDate: "2026-09-25",
			buyer: {
				vknTckn: "1234567890",
				title: "Örnek Müşteri A.Ş.",
			},
			lines: [
				{
					name: "Yazılım Geliştirme",
					quantity: 1,
					unitCode: "C62",
					unitPrice: 10000,
					vatRate: 20,
				},
			],
		});

		expect(jsonInvoiceRes.succeed).toBe(true);
		expect(jsonInvoiceRes.data?.invoiceNumber).toBe("MYF2026000000001");
	});
});
