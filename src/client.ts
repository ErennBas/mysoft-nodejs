import { MysoftConfig, ResolvedMysoftConfig, resolveConfig } from "./core/config";
import { HttpClient } from "./core/http-client";
import { TokenManager } from "./auth/token-manager";
import { MemoryCacheAdapter } from "./cache/memory-cache";
import { InvoiceService } from "./services/invoice.service";
import { DespatchService } from "./services/despatch.service";
import { TaxpayerService } from "./services/taxpayer.service";
import { GeneralService } from "./services/general.service";
import { VoucherService } from "./services/voucher.service";
import { TenantService } from "./services/tenant.service";
import { BookService } from "./services/book.service";
import { AccountingService } from "./services/accounting.service";
import { FinanceService } from "./services/finance.service";
import { IysService } from "./services/iys.service";
import { CampaignService } from "./services/campaign.service";
import { ReconciliationService } from "./services/reconciliation.service";
import { OrderService } from "./services/order.service";
import { IframeService } from "./services/iframe.service";

/**
 * Mysoft GİB E-Dönüşüm SDK Ana İstemcisi.
 *
 * E-Fatura, E-Arşiv, E-İrsaliye, E-SMM, E-Defter, Mükellef Sorgulama, Ön Muhasebe,
 * Finans, IYS, Kampanya, Mutabakat, Sipariş ve Firma İşlemlerini tek bir çatı altında koordine eder.
 * Token yönetimini ve önbellekleme mekanizmasını otomatik olarak yürütür.
 *
 * @example
 * ```typescript
 * import { MysoftClient, EDocumentType } from "mysoft-nodejs";
 *
 * const client = new MysoftClient({
 *     clientId: process.env.MYSOFT_CLIENT_ID!,
 *     clientSecret: process.env.MYSOFT_CLIENT_SECRET!,
 *     environment: "TEST", // veya "PRODUCTION"
 * });
 *
 * // Mükellef Kontrolü
 * const isUser = await client.taxpayers.isEInvoiceUser("1234567890");
 *
 * // Kalan Kontör Sorgulama
 * const credits = await client.tenant.getCreditInfo();
 * console.log("Kalan Kontör:", credits.data?.remainingCredit);
 * ```
 */
export class MysoftClient {
	/**
	 * İstemci yapılandırma ayarları
	 */
	public readonly config: ResolvedMysoftConfig;

	/**
	 * Çekirdek HTTP motoru (Axios sarmalayıcısı)
	 */
	public readonly httpClient: HttpClient;

	/**
	 * Otomatik Token yöneticisi (TTL takibi ve Mutex koruması sağlar)
	 */
	public readonly tokenManager: TokenManager;

	/**
	 * E-Fatura ve E-Arşiv Fatura İşlemleri Servisi (79 REST Endpoint)
	 */
	public readonly invoices: InvoiceService;

	/**
	 * E-İrsaliye ve İrsaliye Yanıtı İşlemleri Servisi (78 REST Endpoint)
	 */
	public readonly despatches: DespatchService;

	/**
	 * GİB Mükellef Sorgulama ve Posta Kutusu (PK/GB) Etiket Yönetimi Servisi
	 */
	public readonly taxpayers: TaxpayerService;

	/**
	 * Genel Tanımlar (Ülke, Şehir, İlçe, Ölçü Birimleri, Vergi Daireleri) Servisi (33 REST Endpoint)
	 */
	public readonly general: GeneralService;

	/**
	 * E-SMM, E-Müstahsil, E-Adisyon, E-Dekont ve E-Gider Pusulası Servisi (40 REST Endpoint)
	 */
	public readonly vouchers: VoucherService;

	/**
	 * Firma Profili ve Kontör/Kredi Bilgileri Servisi (32 REST Endpoint)
	 */
	public readonly tenant: TenantService;

	/**
	 * Firma Profili ve Kontör Bilgileri Servisi (`tenant` alternatifi)
	 */
	public readonly firms: TenantService;

	/**
	 * E-Defter ve Berat Yükleme İşlemleri Servisi (11 REST Endpoint)
	 */
	public readonly books: BookService;

	/**
	 * Ön Muhasebe ve Bakiye Raporları Servisi (13 REST Endpoint)
	 */
	public readonly accounting: AccountingService;

	/**
	 * Ön Muhasebe Raporları Servisi (`accounting` alternatifi)
	 */
	public readonly preAccounting: AccountingService;

	/**
	 * Finans, Kasa ve Banka Hareketleri Servisi (5 REST Endpoint)
	 */
	public readonly finance: FinanceService;

	/**
	 * Finans Servisi (`finance` alternatifi)
	 */
	public readonly finances: FinanceService;

	/**
	 * İleti Yönetim Sistemi (IYS) ve İzin Yönetimi Servisi (15 REST Endpoint)
	 */
	public readonly iys: IysService;

	/**
	 * Kampanya ve SMS İzin Yönetimi Servisi (5 REST Endpoint)
	 */
	public readonly campaigns: CampaignService;

	/**
	 * Cari Mutabakat İşlemleri Servisi (1 REST Endpoint)
	 */
	public readonly reconciliation: ReconciliationService;

	/**
	 * Sipariş Entegrasyonu Servisi (1 REST Endpoint)
	 */
	public readonly orders: OrderService;

	/**
	 * Portal Iframe Entegrasyon Servisi (1 REST Endpoint)
	 */
	public readonly iframe: IframeService;

	/**
	 * Yeni bir Mysoft SDK istemcisi örneği oluşturur.
	 *
	 * @param config - İstemci kimlik ve yapılandırma seçenekleri
	 * @throws {Error} `clientId` veya `clientSecret` boş bırakılırsa hata fırlatır.
	 */
	constructor(config: MysoftConfig) {
		this.config = resolveConfig(config);

		const cacheAdapter = this.config.cache ?? new MemoryCacheAdapter();

		// TokenManager başlat
		this.tokenManager = new TokenManager({
			clientId: this.config.clientId,
			clientSecret: this.config.clientSecret,
			tokenBufferSeconds: this.config.tokenBufferSeconds,
			cache: cacheAdapter,
		});

		// HttpClient başlat ve TokenManager'ı bağla
		this.httpClient = new HttpClient(this.config, this.tokenManager);
		this.tokenManager.setHttpClient(this.httpClient);

		// Servis katmanlarını başlat (Toplam 315 Endpoint)
		this.invoices = new InvoiceService(this.httpClient);
		this.despatches = new DespatchService(this.httpClient);
		this.taxpayers = new TaxpayerService(this.httpClient);
		this.general = new GeneralService(this.httpClient);
		this.vouchers = new VoucherService(this.httpClient);
		this.tenant = new TenantService(this.httpClient);
		this.firms = this.tenant;
		this.books = new BookService(this.httpClient);
		this.accounting = new AccountingService(this.httpClient);
		this.preAccounting = this.accounting;
		this.finance = new FinanceService(this.httpClient);
		this.finances = this.finance;
		this.iys = new IysService(this.httpClient);
		this.campaigns = new CampaignService(this.httpClient);
		this.reconciliation = new ReconciliationService(this.httpClient);
		this.orders = new OrderService(this.httpClient);
		this.iframe = new IframeService(this.httpClient);
	}

	/**
	 * Aktif access token'ı döner. Önbellekte geçerli token varsa onu, yoksa API'den yenisini alıp döner.
	 *
	 * @returns Bearer access token string
	 * @throws {MysoftAuthError} Kimlik doğrulama başarısız olursa fırlatılır.
	 *
	 * @example
	 * ```typescript
	 * const token = await client.getToken();
	 * ```
	 */
	public async getToken(): Promise<string> {
		return await this.tokenManager.getToken();
	}

	/**
	 * Önbellekte saklanan aktif access token'ı siler ve geçersiz kılar.
	 *
	 * @example
	 * ```typescript
	 * await client.clearToken();
	 * ```
	 */
	public async clearToken(): Promise<void> {
		await this.tokenManager.clearToken();
	}
}
