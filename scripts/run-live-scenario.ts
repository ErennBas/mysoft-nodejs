import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import {
	MysoftClient,
	InvoiceProfile,
	InvoiceType,
	UnitCode,
	UuidHelper,
	Validators,
} from "../src";

// 1. .env veya .env.test dosyasını yükle
const envFiles = [".env.test", ".env"];
for (const file of envFiles) {
	const fullPath = path.resolve(process.cwd(), file);
	if (fs.existsSync(fullPath)) {
		dotenv.config({ path: fullPath });
		console.log(`📄 Yapılandırma dosyası yüklendi: ${file}`);
		break;
	}
}

async function main() {
	console.log("==================================================================");
	console.log("🚀 MYSOFT GİB E-DÖNÜŞÜM SDK - CANLI TEST SENARYO KOŞUCUSU");
	console.log("==================================================================\n");

	const clientId = process.env.MYSOFT_CLIENT_ID?.trim();
	const clientSecret = process.env.MYSOFT_CLIENT_SECRET?.trim();
	const environment = (process.env.MYSOFT_ENVIRONMENT || "TEST").toUpperCase();

	// =========================================================================
	// 🚨 GÜVENLİK ENGELİ (PROD GUARD)
	// =========================================================================
	if (
		environment === "PRODUCTION" ||
		process.env.NODE_ENV === "production" ||
		(process.env.MYSOFT_BASE_URL &&
			process.env.MYSOFT_BASE_URL.includes("edonusum.mysoft.com.tr") &&
			!process.env.MYSOFT_BASE_URL.includes("edonusumpilottest"))
	) {
		console.error("\n❌ [GÜVENLİK ENGELİ] TEST SENARYOSU CANLI (PRODUCTION) ORTAMDA ÇALIŞTIRILAMAZ!");
		console.error("Bu test sadece TEST / PILOT ortamı (edonusumpilottest.mysoft.com.tr) için tasarlanmıştır.\n");
		process.exit(1);
	}

	if (!clientId || !clientSecret || clientId === "your_test_client_id_here") {
		console.error("❌ HATA: MYSOFT_CLIENT_ID ve MYSOFT_CLIENT_SECRET ortam değişkenleri tanımlanmamış!");
		process.exit(1);
	}

	console.log("🔧 Ortam Bilgisi :", environment, "(edonusumpilottest.mysoft.com.tr)");
	console.log("🔑 Client ID     :", clientId);
	console.log("🔒 Client Secret :", "*".repeat(Math.min(clientSecret.length, 12)) + "...");
	console.log("------------------------------------------------------------------\n");

	const client = new MysoftClient({
		clientId,
		clientSecret,
		environment: "TEST",
		timeout: 30000,
	});

	try {
		// =====================================================================
		// ADIM 1: Kimlik Doğrulama & Token Alımı
		// =====================================================================
		console.log("👉 [1/6] Kimlik Doğrulama (Auth Token Alımı) yapılıyor...");
		const token = await client.tokenManager.getToken();
		console.log(`✅ Token başarıyla alındı: ${token.substring(0, 25)}... (Geçerlilik: 300 sn)\n`);

		// =====================================================================
		// ADIM 2: Mükellef Sorgulama (GİB e-Fatura / e-İrsaliye)
		// =====================================================================
		const testVkn = process.env.MYSOFT_TEST_BUYER_VKN || "6271036106";
		const testTckn = process.env.MYSOFT_TEST_BUYER_TCKN || "11742049738";

		console.log(`👉 [2/6] Mükellef Sorgulamaları yapılıyor...`);
		console.log(`   - VKN (${testVkn}) Checksum: ${Validators.isValidVkn(testVkn) ? "GEÇERLİ" : "GEÇERSİZ"}`);
		console.log(`   - TCKN (${testTckn}) Checksum: ${Validators.isValidTckn(testTckn) ? "GEÇERLİ" : "GEÇERSİZ"}`);

		try {
			const isEInvoiceVkn = await client.taxpayers.isEInvoiceUser(testVkn);
			console.log(`✅ VKN (${testVkn}) e-Fatura Mükellefi mi? -> ${isEInvoiceVkn ? "EVET (e-Fatura Kullanıcısı)" : "HAYIR"}`);
		} catch (err: any) {
			console.warn("⚠️ VKN Mükellef sorgulama uyarısı:", err.response?.data || err.message);
		}

		try {
			const isEInvoiceTckn = await client.taxpayers.isEInvoiceUser(testTckn);
			console.log(`✅ TCKN (${testTckn}) e-Fatura Mükellefi mi? -> ${isEInvoiceTckn ? "EVET" : "HAYIR (e-Arşiv Mükellefi)"}`);
		} catch (err: any) {
			console.warn("⚠️ TCKN Mükellef sorgulama uyarısı:", err.response?.data || err.message);
		}
		console.log("");

		// =====================================================================
		// ADIM 3: E-Arşiv Fatura Kesme (mysoft-nodejs-sdk İsimli)
		// =====================================================================
		console.log("👉 [3/6] E-Arşiv Fatura Kesiliyor (Panelde: 'mysoft-nodejs-sdk Test Faturası')...");
		const eArchiveEttn = UuidHelper.generateEttn();

		const eArchiveInvoiceData = {
			profile: InvoiceProfile.EARSIV,
			type: InvoiceType.SATIS,
			prefix: "ADZ", // Paneldeki e-Arşiv prefix serisi (ADZ)
			ettn: eArchiveEttn,
			issueDate: new Date().toISOString().split("T")[0],
			buyer: {
				vknTckn: "11742049738",
				title: "mysoft-nodejs-sdk (E-Arşiv Test Faturası)",
				taxOffice: "Kadıköy Vergi Dairesi",
				country: "TÜRKİYE",
				city: "İstanbul",
				district: "Kadıköy",
				address: "Moda Cad. No:1",
				email: process.env.MYSOFT_TEST_BUYER_EMAIL || "test-sdk@mysoft.com.tr",
			},
			lines: [
				{
					name: "[mysoft-nodejs-sdk] Otomasyon Test Hizmeti",
					quantity: 1,
					unitCode: UnitCode.ADET,
					unitPrice: 250, // 250 TL
					vatRate: 20, // %20 KDV = 50 TL
				},
			],
			notes: [
				"Bu fatura [mysoft-nodejs-sdk] Node.js & TypeScript SDK canlı senaryo testi tarafından oluşturulmuştur.",
			],
		};

		const sendResult = await client.invoices.sendInvoice(eArchiveInvoiceData);
		console.log("🎉 E-Arşiv Fatura API Yanıtı:");
		console.log(JSON.stringify(sendResult, null, 2));
		console.log("");

		// =====================================================================
		// ADIM 4: E-Fatura (Ticari) Kesme
		// =====================================================================
		console.log("👉 [4/6] E-Fatura (Ticari) Kesiliyor (Panelde: 'mysoft-nodejs-sdk Test Ticari Fatura')...");
		const eInvoiceEttn = UuidHelper.generateEttn();

		const eInvoiceData = {
			profile: InvoiceProfile.TICARI,
			type: InvoiceType.SATIS,
			prefix: "MYZ", // Paneldeki e-Fatura prefix serisi
			ettn: eInvoiceEttn,
			issueDate: new Date().toISOString().split("T")[0],
			buyer: {
				vknTckn: testVkn,
				title: "MYSOFT DİJİTAL DÖNÜŞÜM A.Ş. (mysoft-nodejs-sdk Testi)",
				taxOffice: "Kozyatağı Vergi Dairesi",
				country: "TÜRKİYE",
				city: "İstanbul",
				district: "Ataşehir",
				address: "Barbaros Mah. No:10",
				email: "sdk-test@mysoft.com.tr",
			},
			lines: [
				{
					name: "[mysoft-nodejs-sdk] API Entegrasyon Paketi",
					quantity: 2,
					unitCode: UnitCode.ADET,
					unitPrice: 500, // 500 x 2 = 1000 TL
					vatRate: 20, // %20 KDV = 200 TL
				},
			],
			notes: ["[mysoft-nodejs-sdk] Canlı E2E Ticari Fatura Senaryo Testi"],
		};

		const eInvResult = await client.invoices.sendInvoice(eInvoiceData);
		console.log("🎉 E-Fatura API Yanıtı:");
		console.log(JSON.stringify(eInvResult, null, 2));
		console.log("");

		// =====================================================================
		// ADIM 5: Giden Faturaları Listeleme
		// =====================================================================
		console.log("👉 [5/7] Giden Fatura Listesi Sorgulanıyor (getInvoiceWithHeaderInfoList)...");
		try {
			const today = new Date().toISOString().split("T")[0];
			const list = await client.invoices.getInvoiceWithHeaderInfoList({
				startDate: "2026-09-01",
				endDate: today,
			});
			console.log(`✅ Giden Fatura Başlık Listesi Çekildi (Toplam Kayıt: ${Array.isArray(list.data) ? list.data.length : 0})`);
			if (Array.isArray(list.data) && list.data.length > 0) {
				console.log("Son Fatura Kayıt Özeti:", JSON.stringify(list.data[0], null, 2));
			}
		} catch (err: any) {
			console.warn("⚠️ Fatura listeleme:", err.response?.data || err.message);
		}
		console.log("");

		// =====================================================================
		// ADIM 6: Fatura Belgesi İndirme ve Durum Sorgulama (3 Saniye Gecikme ile)
		// =====================================================================
		console.log("⏳ Faturanın sistemde işlenip arşivlenmesi için 3 saniye bekleniyor...");
		await new Promise((resolve) => setTimeout(resolve, 3000));
		console.log("👉 [6/7] Fatura Belgesi İndirme ve Durum Sorgulanıyor...");

		try {
			const publicUrl = await client.invoices.getInvoiceOutboxPublicUrl({ invoiceETTN: eArchiveEttn });
			console.log("🔗 E-Arşiv Görüntüleme URL'i:", JSON.stringify(publicUrl, null, 2));
		} catch (err: any) {
			console.warn("⚠️ Görüntüleme URL'i:", err.response?.data || err.message);
		}

		try {
			const pdfRes = await client.invoices.getOutboxPdfAsZip(eArchiveEttn);
			console.log("📄 E-Arşiv PDF ZIP Base64 Yanıtı:", JSON.stringify(pdfRes, null, 2));
		} catch (err: any) {
			console.warn("⚠️ PDF indirme:", err.response?.data || err.message);
		}

		try {
			const htmlRes = await client.invoices.getOutboxHtmlAsZip(eArchiveEttn);
			console.log("📄 E-Arşiv HTML ZIP Base64 Yanıtı:", JSON.stringify(htmlRes, null, 2));
		} catch (err: any) {
			console.warn("⚠️ HTML indirme:", err.response?.data || err.message);
		}

		try {
			const statusList = await client.invoices.getInvoiceWithHeaderInfoList({
				startDate: "2026-09-01",
				endDate: new Date().toISOString().split("T")[0],
			});
			const ourInvoice = (statusList.data || []).find((inv) => inv.ettn === eArchiveEttn || inv.ettn === eInvoiceEttn);
			if (ourInvoice) {
				console.log("📊 Oluşturulan Faturanın Sistem Durumu:", JSON.stringify(ourInvoice, null, 2));
			} else {
				console.log(`📊 Sistemdeki son fatura listesi sorgulandı (Toplam ${statusList.data?.length || 0} kayıt listelendi)`);
			}
		} catch (err: any) {
			console.warn("⚠️ Durum sorgulama:", err.response?.data || err.message);
		}

		// =====================================================================
		// ADIM 7: E-İrsaliye (Despatch) Oluşturma ve Listeleme
		// =====================================================================
		console.log("👉 [7/7] E-İrsaliye (Despatch) Modülü Test Ediliyor...");
		const despatchEttn = UuidHelper.generateEttn();
		console.log(`ℹ️ Üretilen İrsaliye ETTN: ${despatchEttn}`);

		try {
			console.log("📝 Örnek İrsaliye Şablonu Çekiliyor...");
			const sampleDespatch = await client.despatches.createDespatchTestJson();
			if (sampleDespatch) {
				sampleDespatch.prefix = "ERR";
				if (sampleDespatch.account) {
					sampleDespatch.account.identifierNumber = testVkn;
					sampleDespatch.account.accountName = "MYSOFT DİJİTAL DÖNÜŞÜM A.Ş. (mysoft-nodejs-sdk İrsaliye Testi)";
				}
				if (sampleDespatch.deliveryAccount) {
					sampleDespatch.deliveryAccount.identifierNumber = testVkn;
					sampleDespatch.deliveryAccount.accountName = "MYSOFT DİJİTAL DÖNÜŞÜM A.Ş. (mysoft-nodejs-sdk İrsaliye Testi)";
					sampleDespatch.deliveryAccount.postalCode = "34758";
				}

				console.log("📦 E-İrsaliye taslağı kaydediliyor (despatchDraft)...");
				const draftRes = await client.despatches.despatchDraft(sampleDespatch);
				console.log("🎉 E-İrsaliye API Yanıtı:", JSON.stringify(draftRes, null, 2));
			}
		} catch (err: any) {
			console.warn("⚠️ E-İrsaliye oluşturma:", err.response?.data || err.message);
		}

		try {
			console.log("📑 Giden İrsaliye Listesi Çekiliyor (getDespatchOutboxWithHeaderInfoList)...");
			const despatchList = await client.despatches.getDespatchOutboxWithHeaderInfoList({
				startDate: "2026-09-01",
				endDate: new Date().toISOString().split("T")[0],
			});
			console.log(`✅ Giden İrsaliye Başlık Listesi (Toplam Kayıt: ${Array.isArray(despatchList.data) ? despatchList.data.length : 0})`);
			if (Array.isArray(despatchList.data) && despatchList.data.length > 0) {
				console.log("Son İrsaliye Kayıt Özeti:", JSON.stringify(despatchList.data[0], null, 2));
			}
		} catch (err: any) {
			console.warn("⚠️ Giden İrsaliye listeleme:", err.response?.data || err.message);
		}

		console.log("\n==================================================================");
		console.log("🎉 CANLI TEST SENARYOSU BAŞARIYLA TAMAMLANDI!");
		console.log("Panelinizde 'mysoft-nodejs-sdk' başlığıyla oluşturulan fatura ve irsaliye kayıtlarını kontrol edebilirsiniz.");
		console.log("==================================================================");
	} catch (error: any) {
		console.error("\n❌ BEKLENMEYEN HATA:", error.response?.data || error);
		process.exit(1);
	}
}

main();
