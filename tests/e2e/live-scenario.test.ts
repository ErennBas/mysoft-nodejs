import { describe, it, expect, beforeAll } from "vitest";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { MysoftClient, InvoiceProfile, InvoiceType, UnitCode, UuidHelper } from "../../src";

// .env.test veya .env yükle
const envFiles = [".env.test", ".env"];
for (const file of envFiles) {
	const fullPath = path.resolve(process.cwd(), file);
	if (fs.existsSync(fullPath)) {
		dotenv.config({ path: fullPath });
		break;
	}
}

const clientId = process.env.MYSOFT_CLIENT_ID;
const clientSecret = process.env.MYSOFT_CLIENT_SECRET;
const isLiveTest = !!clientId && !!clientSecret && clientId !== "your_test_client_id_here";

describe.skipIf(!isLiveTest)("Mysoft E2E Live Test Scenario (TEST Environment)", () => {
	let client: MysoftClient;

	beforeAll(() => {
		// 🚨 GÜVENLİK ENGELİ (PROD GUARD)
		const env = (process.env.MYSOFT_ENVIRONMENT || "TEST").toUpperCase();
		if (
			env === "PRODUCTION" ||
			process.env.NODE_ENV === "production" ||
			(process.env.MYSOFT_BASE_URL &&
				process.env.MYSOFT_BASE_URL.includes("edonusum.mysoft.com.tr") &&
				!process.env.MYSOFT_BASE_URL.includes("edonusumpilottest"))
		) {
			throw new Error("🚨 GÜVENLİK ENGELİ: Canlı (PRODUCTION) ortamda test senaryoları çalıştırılamaz!");
		}

		client = new MysoftClient({
			clientId: clientId!,
			clientSecret: clientSecret!,
			environment: "TEST",
		});

		// İstemci URL kontrolü
		if (
			client.config.baseUrl.includes("edonusum.mysoft.com.tr") &&
			!client.config.baseUrl.includes("edonusumpilottest")
		) {
			throw new Error("🚨 GÜVENLİK ENGELİ: Base URL canlı ortamı işaret ediyor!");
		}
	});

	it("1. should successfully authenticate and acquire short-lived token", async () => {
		const token = await client.tokenManager.getToken();
		expect(token).toBeDefined();
		expect(typeof token).toBe("string");
		expect(token.length).toBeGreaterThan(10);
	});

	it("2. should query taxpayer information for test VKN", async () => {
		const testVkn = process.env.MYSOFT_TEST_BUYER_VKN || "1234567890";
		const isUser = await client.taxpayers.isEInvoiceUser(testVkn);
		expect(typeof isUser).toBe("boolean");
	});

	it("3. should query outbox invoices header info list from real API", async () => {
		const list = await client.invoices.getInvoiceWithHeaderInfoList({
			startDate: "2026-09-01",
			endDate: new Date().toISOString().split("T")[0],
		});
		expect(list).toBeDefined();
		expect(list.succeed).toBe(true);
	});

	it("4. should successfully create and send e-Archive test invoice", async () => {
		const testEttn = UuidHelper.generateEttn();
		const result = await client.invoices.sendInvoice({
			profile: InvoiceProfile.EARSIV,
			type: InvoiceType.SATIS,
			prefix: "ADZ",
			ettn: testEttn,
			issueDate: new Date().toISOString().split("T")[0],
			buyer: {
				vknTckn: process.env.MYSOFT_TEST_BUYER_TCKN || "11742049738",
				title: "mysoft-nodejs-sdk E2E Test Müşterisi",
				country: "TÜRKİYE",
				city: "İstanbul",
				district: "Kadıköy",
				address: "Moda Cad. No:1",
			},
			lines: [
				{
					name: "[mysoft-nodejs-sdk] Otomasyon Kalemi",
					quantity: 1,
					unitCode: UnitCode.ADET,
					unitPrice: 50,
					vatRate: 20,
				},
			],
		});

		expect(result).toBeDefined();
		expect(result.succeed).toBe(true);
		expect(result.data?.uuid || result.data?.invoiceNumber).toBeDefined();
	});
});
