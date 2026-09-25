# mysoft-nodejs

[![npm version](https://img.shields.io/npm/v/mysoft-nodejs.svg)](https://www.npmjs.com/package/mysoft-nodejs)
[![CI](https://github.com/erennbas/mysoft-nodejs/actions/workflows/test.yml/badge.svg)](https://github.com/erennbas/mysoft-nodejs/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)

**Mysoft GİB E-Dönüşüm REST API (v8)** için geliştirilmiş; **311 REST Endpoint**, **315 Tip Güvenli Metod**, otomatik token & mutex yönetimi, dağıtık Redis önbellek desteği ve zengin yardımcı araçlar (JSON & UBL-TR) sunan resmi standartlarda **Node.js & TypeScript SDK** kütüphanesi.

---

## 🚀 Temel Özellikler

- **100% API Kapsamı:** Mysoft API v8'deki tüm 311 endpoint ve 544 şemanın tamamı SDK içinde tip güvenli olarak yer alır.
- **Normal (JSON) & UBL-TR XML Fatura Desteği:** İster basit JavaScript nesneleriyle tek fonksiyonda fatura kesin, ister ham UBL-TR XML kullanın.
- **Akıllı Token Yönetimi:** 5 dakikalık kısa ömürlü token'ları arka planda otomatik yeniler; eşzamanlı isteklerde mükerrer token taleplerini (Thundering Herd) Mutex Lock ile engeller.
- **Esnek Önbellek Katmanı:** Varsayılan dahili bellek içi (In-Memory) önbellek veya mikroservis/küme mimarileri için Redis (`ioredis` / `redis`) adaptörü.
- **Çift Modül Desteği (Dual CJS/ESM):** Hem ESM (`import`) hem de CommonJS (`require`) projeleriyle tam uyumlu.
- **GİB & UBL-TR Yardımcıları:** XML ZIP Base64 sıkıştırma/açma, v4 ETTN üretimi ve 10/11 haneli VKN/TCKN checksum algoritmaları.
- **Anlaşılır Hata Yönetimi:** Mysoft API hata kodlarını, doğrulama hatalarını ve HTTP durumlarını yakalayan özel hata sınıfları (`MysoftApiError`, `MysoftAuthError`, `MysoftNetworkError`).

---

## 📦 Kurulum

```bash
npm install mysoft-nodejs
# veya
pnpm add mysoft-nodejs
# veya
yarn add mysoft-nodejs
```

---

## ⚡ Hızlı Başlangıç

```typescript
import { MysoftClient } from "mysoft-nodejs";

const client = new MysoftClient({
	clientId: process.env.MYSOFT_CLIENT_ID!,
	clientSecret: process.env.MYSOFT_CLIENT_SECRET!,
	environment: "TEST", // Canlı ortam için: "PRODUCTION"
});
```

---

## 📑 Modül ve Servis Mimarisi (14 Servis)

SDK içindeki tüm servisler `client` örneği üzerinden erişilebilir:

| Servis Özelliği | Servis Sınıfı | Metod Sayısı | Kapsam |
| :--- | :--- | :---: | :--- |
| `client.invoices` | `InvoiceService` | **79** | E-Fatura, E-Arşiv, Giden/Gelen Fatura, Taslak, İptal, PDF/XML İndirme |
| `client.despatches` | `DespatchService` | **78** | E-İrsaliye, Giden/Gelen İrsaliye, İrsaliye Yanıtları (Kabul/Red) |
| `client.vouchers` | `VoucherService` | **40** | E-SMM, E-Müstahsil, E-Adisyon, E-Dekont, E-Gider Pusulası, E-Döviz |
| `client.general` | `GeneralService` | **33** | Ülke, İl, İlçe, Birim Kodları, Vergi Daireleri, GTİP Kodları |
| `client.tenant` / `client.firms` | `TenantService` | **32** | Firma Bilgileri, Kontör Sorgulama, Şubeler, Portal Ayarları |
| `client.taxpayers` | `TaxpayerService` | **1** | VKN/TCKN ile e-Belge Mükellefiyeti ve Posta Kutusu (PK/GB) Aliasları |
| `client.accounting` / `client.preAccounting` | `AccountingService` | **13** | Ön Muhasebe, Kasa/Banka/Cari Bakiyeleri, Stok Ekstresi, Fatura Raporları |
| `client.books` | `BookService` | **11** | E-Defter Yükleme, Berat Listeleri, Defter Parçaları ve XML İndirme |
| `client.finance` / `client.finances` | `FinanceService` | **5** | Finans Fişleri, Muhasebe Fişleri, Banka Hareket Listesi |
| `client.iys` | `IysService` | **15** | İleti Yönetim Sistemi (IYS) Tekil/Çoklu İzinler, IYS Via ve KVKK |
| `client.campaigns` | `CampaignService` | **5** | Kampanya İzinleri, Anlık SMS Doğrulama Kodu Gönderme & Onay |
| `client.reconciliation` | `ReconciliationService` | **1** | Cari Hesap Mutabakatı Oluşturma |
| `client.orders` | `OrderService` | **1** | Sipariş Listesi Entegrasyonu |
| `client.iframe` | `IframeService` | **1** | Mysoft Portal Iframe Güvenli Giriş URL'i |

> 📖 **311 endpoint'in tamamının parametre ve detay listesi için:** [Tam API Referansı Dokümanına (docs/api-reference.md)](./docs/api-reference.md) göz atabilirsiniz.

---

## 💡 Kullanım Örnekleri

### 1. Fatura İşlemleri (`client.invoices`)

#### A. Standart JSON ile Normal Fatura Kesme ve Gönderme (Önerilen)
UBL XML ile uğraşmadan, doğrudan JavaScript nesnesi olarak alıcı ve kalem bilgilerini iletebilirsiniz:

```typescript
import { MysoftClient, InvoiceProfile, InvoiceType, UnitCode } from "mysoft-nodejs";

const client = new MysoftClient({
	clientId: process.env.MYSOFT_CLIENT_ID!,
	clientSecret: process.env.MYSOFT_CLIENT_SECRET!,
	environment: "TEST",
});

const result = await client.invoices.sendInvoice({
	profile: InvoiceProfile.TICARI, // "TICARI", "TEMEL" veya "EARSIV"
	type: InvoiceType.SATIS, // "SATIS", "IADE", "ISTISNA" vb.
	prefix: "MYF",
	issueDate: "2026-09-25",
	buyer: {
		vknTckn: "1234567890",
		title: "ABC Teknoloji A.Ş.",
		taxOffice: "Maslak Vergi Dairesi",
		country: "TÜRKİYE",
		city: "İstanbul",
		district: "Sarıyer",
		address: "Büyükdere Cad. No:123",
		email: "fatura@abcteknoloji.com",
	},
	lines: [
		{
			name: "Yazılım Geliştirme Danışmanlığı",
			quantity: 10,
			unitCode: UnitCode.SAAT,
			unitPrice: 1500, // KDV Hariç 1.500 TL
			vatRate: 20, // %20 KDV
		},
		{
			name: "Sunucu Bakım Desteği",
			quantity: 1,
			unitCode: UnitCode.ADET,
			unitPrice: 5000,
			vatRate: 20,
			discountRate: 10, // %10 İskonto
		},
	],
	notes: ["Bedeli 15 gün içinde ödenmelidir."],
});

console.log("Fatura ETTN:", result.data?.uuid);
console.log("Fatura Numarası:", result.data?.invoiceNumber);
```

#### B. Portalda Taslak (Draft) Fatura Kaydetme
```typescript
const draft = await client.invoices.createDraftInvoice({
	profile: InvoiceProfile.TICARI,
	type: InvoiceType.SATIS,
	issueDate: "2026-09-25",
	buyer: { vknTckn: "1234567890", title: "Örnek Müşteri Ltd." },
	lines: [{ name: "Hizmet", quantity: 1, unitCode: UnitCode.ADET, unitPrice: 1000, vatRate: 20 }],
});

// Taslağı daha sonra GİB'e iletmek için:
await client.invoices.sendDraftToGib([draft.data!.uuid]);
```

#### C. UBL-TR XML ile Fatura Gönderme
```typescript
import { UblHelper, EDocumentType } from "mysoft-nodejs";

const base64Zip = UblHelper.xmlToBase64Zip(rawXmlString);
const res = await client.invoices.sendInvoiceWithUblXml({
	invoiceTypeUblString: base64Zip,
	eDocumentType: EDocumentType.EFATURA,
	prefix: "MYF",
	pkAlias: "urn:mail:defaultpk@mysoft.com.tr",
});
```

#### D. Fatura Durumu, PDF/XML İndirme ve İptal
```typescript
// Durum sorgulama
const status = await client.invoices.getOutboxStatus(["4ad402f0-b951-4aa2-acd6-6b6d74a79a10"]);

// PDF görselini ZIP formatında indirme
const pdfZip = await client.invoices.getOutboxPdfAsZip("4ad402f0-b951-4aa2-acd6-6b6d74a79a10");

// E-Arşiv Fatura İptal
await client.invoices.cancelEArchiveInvoice({
	uuid: "4ad402f0-b951-4aa2-acd6-6b6d74a79a10",
	cancelReason: "Hatalı fatura düzenlendi",
});
```

---

### 2. İrsaliye İşlemleri (`client.despatches`)

```typescript
import { DespatchResponseStatus, UnitCode } from "mysoft-nodejs";

// Gelen İrsaliyeye Yanıt (Kabul / Kısmi Kabul / Red) Verme
await client.despatches.sendReceiptAdvice({
	despatchUuid: "4ad402f0-b951-4aa2-acd6-6b6d74a79a10",
	responseStatus: DespatchResponseStatus.KISMIKABUL,
	issueDate: "2026-09-25",
	lineResponses: [
		{
			lineId: 1,
			receivedQuantity: 8,
			rejectedQuantity: 2,
			unitCode: UnitCode.ADET,
			rejectionReason: "2 adet kırık ürün teslim alınmadı",
		},
	],
});
```

---

### 3. Mükellef Sorgulama (`client.taxpayers`)

```typescript
// Mükellefiyet kontrolü (boolean)
const isEfatura = await client.taxpayers.isEInvoiceUser("1234567890");

// Posta Kutusu (PK) ve Gönderici Birim (GB) etiketleri
const { pkAliases, gbAliases } = await client.taxpayers.getAliases("1234567890");
console.log("Varsayılan Posta Kutusu:", pkAliases[0]);
```

---

### 4. Makbuz & Özel Belgeler (`client.vouchers`)

```typescript
import { UnitCode } from "mysoft-nodejs";

// E-SMM (Serbest Meslek Makbuzu) Gönderme
await client.vouchers.sendFreelancerVoucher({
	issueDate: "2026-09-25",
	customer: { vknTckn: "1234567890", title: "Müşteri A.Ş." },
	lines: [
		{
			name: "Mali Müşavirlik Hizmeti",
			quantity: 1,
			unitCode: UnitCode.ADET,
			unitPrice: 5000,
			vatRate: 20,
			stopageRate: 20, // %20 Stopaj
		},
	],
});
```

---

### 5. Ön Muhasebe & Finans (`client.accounting` & `client.finance`)

```typescript
// Banka bakiyeleri raporu
const bankBalances = await client.accounting.bankAccountBalance();

// Kasa bakiyeleri raporu
const cashBalances = await client.accounting.cashboxBalance();

// Cari hesap hareketleri
const transactions = await client.accounting.accountTransaction();

// Portal finans fişi oluşturma
await client.finance.createFinanceReceipt({
	id: 1,
	// Finans modeli alanları...
});
```

---

### 6. E-Defter İşlemleri (`client.books`)

```typescript
// Defter kayıtlarını listeleme
const bookList = await client.books.getBookList();

// Defter XML ZIP verisini indirme
const bookXml = await client.books.getBookXMLAsZip({ uuid: "book-uuid-123" });
```

---

### 7. İleti Yönetim Sistemi (IYS) & Kampanya (`client.iys` & `client.campaigns`)

```typescript
// IYS Tekil İzin Gönderme
await client.iys.sendConsent({
	recipient: "ornek@email.com",
	type: "EPOSTA",
	source: "HS_WEB",
	status: "ONAY",
	consentDate: "2026-09-25 10:00:00",
});

// Kampanya Anlık SMS İzin Kodu Gönderme
await client.campaigns.sendSMSConsentImmediate({
	recipient: "5551234567",
	type: "MESAJ",
});
```

---

### 8. Genel Tanımlar & Kartlar (`client.general`)

```typescript
const countries = await client.general.getCountries();
const cities = await client.general.getCities("TR");
const districts = await client.general.getDistricts(34); // İstanbul
const unitCodes = await client.general.getUnitCodes(); // C62, HUR, KGM...
const taxOffices = await client.general.getTaxOffices("34");
```

---

### 9. Firma & Kontör Bilgileri (`client.tenant`)

```typescript
const credits = await client.tenant.getCreditInfo();
console.log(`Kalan Kontör: ${credits.data?.remainingCredit} / ${credits.data?.totalCredit}`);

const firmInfo = await client.tenant.getTenantInfo();
const branches = await client.tenant.getBranches();
```

---

## 🗄️ Dağıtık Sistemler için Redis Önbellek

Mikroservis, küme veya serverless ortamlarda tüm sunucuların tek bir token'ı paylaşması ve gereksiz token isteklerini engellemek için `RedisCacheAdapter` kullanabilirsiniz:

```typescript
import Redis from "ioredis";
import { MysoftClient, RedisCacheAdapter } from "mysoft-nodejs";

const redisClient = new Redis(process.env.REDIS_URL!);

const client = new MysoftClient({
	clientId: process.env.MYSOFT_CLIENT_ID!,
	clientSecret: process.env.MYSOFT_CLIENT_SECRET!,
	cache: new RedisCacheAdapter(redisClient),
});
```

---

## 🛠️ Yardımcı Araçlar (Helpers & Validators)

```typescript
import { UblHelper, UuidHelper, Validators } from "mysoft-nodejs";

// VKN Doğrulama (10 hane checksum)
Validators.isValidVkn("1234567890"); // boolean

// TCKN Doğrulama (11 hane checksum)
Validators.isValidTckn("12345678901"); // boolean

// GİB Uyumlu v4 ETTN (UUID) Üretme
const ettn = UuidHelper.generateEttn();

// XML Metnini Base64 ZIP'e Sıkıştırma / Açma
const base64Zip = UblHelper.xmlToBase64Zip(xmlString);
const originalXml = UblHelper.base64ZipToXml(base64Zip);
```

---

## ⚠️ Hata Yönetimi (Error Handling)

```typescript
import { MysoftApiError, MysoftAuthError, MysoftNetworkError } from "mysoft-nodejs";

try {
	await client.invoices.sendInvoice({ ... });
} catch (error) {
	if (error instanceof MysoftApiError) {
		console.error("API Hata Mesajı:", error.message);
		console.error("Mysoft Hata Kodu:", error.errorCode);
		console.error("Doğrulama Detayları:", error.validationErrors);
	} else if (error instanceof MysoftAuthError) {
		console.error("Kimlik Doğrulama Hatası (Client ID / Secret):", error.message);
	} else if (error instanceof MysoftNetworkError) {
		console.error("Bağlantı Kopması / Zaman Aşımı:", error.message);
	}
}
```

---

## 🧪 Geliştirme ve Test

```bash
# Bağımlılıkları yükle
npm install

# Testleri çalıştır (Vitest)
npm test

# Test kapsamını (coverage) gör
npm run test:coverage

# Dual-bundle (ESM + CJS + DTS) derleme
npm run build

# Tip kontrolü ve Lint
npm run typecheck
npm run lint
```

---

## 📄 Lisans

Bu proje [MIT](./LICENSE) lisansı ile lisanslanmıştır.

Geliştirici: [Eren Baş](https://github.com/erennbas) (<erenbas.info@gmail.com>)
