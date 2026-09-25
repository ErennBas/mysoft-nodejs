import { BaseInboxPoller } from "./base-inbox-poller";
import { InboxInvoicePollerOptions, InvoicePollerEventMap } from "./types";
import { InvoiceHeaderInfoModel } from "../types/generated.types";
import { InvoiceService } from "../services/invoice.service";
import { DateHelper } from "../utils/date-helper";

/**
 * Gelen e-Fatura ve e-Arşiv faturalarını periyodik olarak sorgulayan,
 * event ve webhook olarak yayan, Redis ile dağıtık çalışan Poller sınıfı.
 *
 * @example
 * ```typescript
 * const poller = client.invoices.createInboxPoller({
 *     intervalMs: 15000, // 15 saniyede bir
 *     autoAck: true,     // faturayı aldıkça Mysoft portalında otomatik onaylar
 *     redis: redisClient // çoklu pod / cluster desteği
 * });
 *
 * poller.on('invoice', (invoice) => {
 *     console.log('Yeni fatura geldi:', invoice.docNo, invoice.payableAmount, invoice.accountName);
 * });
 *
 * poller.on('error', (err) => {
 *     console.error('Poller hatası:', err);
 * });
 *
 * await poller.start();
 * ```
 */
export class InboxInvoicePoller extends BaseInboxPoller<InvoiceHeaderInfoModel> {
	private readonly invoiceService: InvoiceService;

	constructor(invoiceService: InvoiceService, options: InboxInvoicePollerOptions = {}) {
		super(options);
		this.invoiceService = invoiceService;
	}

	public getItemEventName(): string {
		return "invoice";
	}

	public getItemId(item: InvoiceHeaderInfoModel): string {
		return item.ettn || String(item.id || "");
	}

	/**
	 * Mysoft API üzerinden yeni gelen faturaları başlık bilgileriyle çeker.
	 */
	protected async fetchNewItems(): Promise<InvoiceHeaderInfoModel[]> {
		const sDate = this.options.startDate ? DateHelper.toDateString(this.options.startDate) : undefined;
		const eDate = this.options.endDate ? DateHelper.toDateString(this.options.endDate) : undefined;

		const response = await this.invoiceService.getNewInvoiceInboxWithHeaderInfoList({
			limit: this.options.limit,
			tenantIdentifierNumber: this.options.tenantIdentifierNumber,
			startDate: sDate,
			endDate: eDate,
			pkAlias: this.options.pkAlias,
		});

		if (response.data && Array.isArray(response.data)) {
			return response.data;
		}

		return [];
	}

	/**
	 * Gelen faturayı Mysoft portalında "Alındı/Kaydedildi" olarak onaylar.
	 * Böylece bir sonraki sorgulamada tekrar dönmez.
	 */
	public async acknowledgeItem(itemOrId: InvoiceHeaderInfoModel | string): Promise<boolean> {
		const uuid = typeof itemOrId === "string" ? itemOrId : this.getItemId(itemOrId);
		if (!uuid) return false;

		const res = await this.invoiceService.invoiceInboxSavedByCustomer({
			invoiceETTN: uuid,
			tenantIdentifierNumber: this.options.tenantIdentifierNumber,
		});

		return res.data === true || res.succeed === true;
	}

	/**
	 * Belirli bir faturanın UBL-TR XML içeriğini ZIP'ten açıp Base64/metin olarak indirir.
	 */
	public async getInvoiceXml(uuid: string): Promise<string | undefined> {
		const res = await this.invoiceService.getInvoiceInboxUBLXMLAsZip({ invoiceETTN: uuid });
		return res.data as string | undefined;
	}

	/**
	 * Belirli bir faturanın PDF formatını ZIP'ten Base64 olarak indirir.
	 */
	public async getInvoicePdf(uuid: string): Promise<string | undefined> {
		const res = await this.invoiceService.getInvoiceInboxPdfAsZip({ invoiceETTN: uuid });
		return res.data as string | undefined;
	}

	/**
	 * Belirli bir faturanın HTML formatını ZIP'ten Base64 olarak indirir.
	 */
	public async getInvoiceHtml(uuid: string): Promise<string | undefined> {
		const res = await this.invoiceService.getInvoiceInboxHTMLAsZip({ invoiceETTN: uuid });
		return res.data as string | undefined;
	}

	// Güçlü tiplenmiş Event dinleyicileri
	public override on<K extends keyof InvoicePollerEventMap>(event: K, listener: InvoicePollerEventMap[K]): this;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public override on(event: string | symbol, listener: (...args: any[]) => void): this {
		return super.on(event, listener);
	}

	public override once<K extends keyof InvoicePollerEventMap>(event: K, listener: InvoicePollerEventMap[K]): this;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public override once(event: string | symbol, listener: (...args: any[]) => void): this {
		return super.once(event, listener);
	}

	public override addListener<K extends keyof InvoicePollerEventMap>(
		event: K,
		listener: InvoicePollerEventMap[K]
	): this;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public override addListener(event: string | symbol, listener: (...args: any[]) => void): this {
		return super.addListener(event, listener);
	}
}
