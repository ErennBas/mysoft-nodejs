import { BaseService } from "./base.service";
import { ApiResult } from "../types/common";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";
import {
	SendInvoiceWithUblXmlRequest,
	SendInvoiceJsonRequest,
	SendInvoiceResponse,
	InvoiceStatusItem,
	InvoiceListItem,
	InvoiceCancelRequest,
	InvoiceCancelResponse,
} from "../types/invoice.types";
import { InvoiceProfile, InvoiceType, EDocumentType } from "../types/enums";
import { UuidHelper } from "../utils/uuid";

/**
 * SendInvoiceJsonRequest nesnesini Mysoft API InvoiceOutboxModel formatına normalize eder.
 */
function normalizeJsonInvoiceRequest(
	request: SendInvoiceJsonRequest | Record<string, unknown>
): Record<string, unknown> {
	if ("invoiceDetail" in request || "invoiceAccount" in request) {
		return request as Record<string, unknown>;
	}

	const req = request as SendInvoiceJsonRequest;
	const uuid = req.uuid || UuidHelper.generate();
	const profile = req.profile || req.profileId || InvoiceProfile.TICARI;
	const invoiceType = req.type || req.invoiceTypeCode || InvoiceType.SATIS;
	const profileStr = String(profile);
	const isEarsiv =
		profile === InvoiceProfile.EARSIV ||
		profileStr === "EARSIV" ||
		profileStr === "EARSIVFATURA" ||
		profileStr === "EARSIVBELGE";
	const eDocType = req.eDocumentType || (isEarsiv ? "EARSIVFATURA" : EDocumentType.EFATURA);

	const buyer = req.buyer || { vknTckn: "" };
	const invoiceAccount = {
		vknTckn: buyer.vknTckn,
		accountName:
			buyer.unvan || buyer.title || buyer.name || (buyer.ad ? `${buyer.ad} ${buyer.soyad || ""}`.trim() : ""),
		taxOfficeName: buyer.vergiDairesi || buyer.taxOffice,
		countryName: buyer.country || buyer.adres?.ulke || "TÜRKİYE",
		cityName: buyer.city || buyer.adres?.il,
		district: buyer.district || buyer.adres?.ilceSemt,
		streetName: buyer.address || buyer.adres?.sokak,
		email1: buyer.email || buyer.adres?.eposta,
		telephone1: buyer.phone || buyer.adres?.tel,
		webSiteUrl: buyer.webSite || buyer.adres?.webSitesi,
	};

	const invoiceDetail = (req.lines || []).map((line, index) => {
		const qty = line.quantity;
		const unitPrice = line.unitPrice;
		const discRate = line.discountRate || 0;
		const discAmt = line.discountAmount ?? (discRate ? (qty * unitPrice * discRate) / 100 : 0);
		const taxableAmt = qty * unitPrice - discAmt;
		const vatRate = line.vatRate;
		const vatAmt = line.vatAmount ?? (taxableAmt * vatRate) / 100;

		return {
			productName: line.name,
			productCode: `PRD-${line.lineId || index + 1}`,
			product: {
				id: typeof line.lineId === "number" ? line.lineId : index + 1,
				productCode: `PRD-${line.lineId || index + 1}`,
				productName: line.name,
				productType: "Product",
			},
			unitCode: line.unitCode || "C62",
			qty: qty,
			unitPriceTra: unitPrice,
			amtTra: qty * unitPrice,
			discRate: discRate,
			discAmtTra: discAmt,
			vatRate: vatRate,
			amtVatTra: vatAmt,
			note: line.description,
			taxExemptionReasonCode: line.withholdingCode,
			isKDVInclude: false,
		};
	});

	return {
		ettn: uuid,
		profile: profile,
		invoiceType: invoiceType,
		eDocumentType: eDocType,
		prefix: req.prefix,
		docNo: req.invoiceNumber,
		docDate: req.issueDate,
		docTime: req.issueTime,
		currencyCode: req.currencyCode || "TRY",
		currencyRate: req.exchangeRate || 1,
		notes: req.notes,
		pkAlias: req.pkAlias,
		gbAlias: req.gbAlias,
		orderNo: req.orderReference?.orderId,
		orderDate: req.orderReference?.issueDate,
		internetShipmentInfo: req.internetSalesInfo
			? {
					webAddress: req.internetSalesInfo.webAddress,
					paymentType: req.internetSalesInfo.paymentType,
					paymentDate: req.internetSalesInfo.paymentDate,
					cargoAccountName: req.internetSalesInfo.cargoFirmTitle,
					cargoNumber: req.internetSalesInfo.cargoFirmVknTckn,
				}
			: undefined,
		invoiceAccount,
		invoiceDetail,
	};
}

/**
 * E-Fatura, E-Arşiv, Giden ve Gelen Fatura İşlemleri Servisi
 * Toplam 79 REST Endpoint içerir.
 */
export class InvoiceService extends BaseService {
	/**
	 * Standart JSON / JavaScript nesnesi formatında e-Fatura veya e-Arşiv faturası oluşturur ve GİB'e iletir.
	 */
	public async sendInvoice(
		request: SendInvoiceJsonRequest | Record<string, unknown>
	): Promise<ApiResult<SendInvoiceResponse>> {
		const payload = normalizeJsonInvoiceRequest(request);
		const rawResult = await this.httpClient.post<ApiResult<Record<string, unknown>>>(
			"/api/InvoiceOutbox/invoiceOutbox",
			payload
		);

		return {
			...rawResult,
			data: rawResult.data
				? {
						uuid:
							(rawResult.data.invoiceETTN as string) ||
							(rawResult.data.uuid as string) ||
							(payload.ettn as string),
						invoiceNumber: (rawResult.data.docNo as string) || (rawResult.data.invoiceNumber as string),
						succeed: rawResult.succeed,
						message: rawResult.message,
						gibStatusCode: rawResult.data.gibStatusCode as number | undefined,
					}
				: undefined,
		};
	}

	/**
	 * Standart JSON formatında Mysoft Portal'a taslak (draft) fatura kaydeder.
	 */
	public async createDraftInvoice(
		request: SendInvoiceJsonRequest | Record<string, unknown>
	): Promise<ApiResult<SendInvoiceResponse>> {
		const payload = normalizeJsonInvoiceRequest(request);
		const rawResult = await this.httpClient.post<ApiResult<Record<string, unknown>>>(
			"/api/Invoice/invoiceDraft",
			payload
		);

		return {
			...rawResult,
			data: rawResult.data
				? {
						uuid:
							(rawResult.data.invoiceETTN as string) ||
							(rawResult.data.uuid as string) ||
							(payload.ettn as string),
						invoiceNumber: (rawResult.data.docNo as string) || (rawResult.data.invoiceNumber as string),
						succeed: rawResult.succeed,
						message: rawResult.message,
					}
				: undefined,
		};
	}

	/**
	 * ZIP sıkıştırmalı ve Base64 kodlu UBL-TR XML formatında giden fatura gönderir.
	 */
	public async sendInvoiceWithUblXml(request: SendInvoiceWithUblXmlRequest): Promise<ApiResult<SendInvoiceResponse>> {
		return await this.httpClient.post<ApiResult<SendInvoiceResponse>>(
			"/api/InvoiceOutbox/invoiceOutboxWithUblXml",
			request
		);
	}

	/**
	 * Portalda taslak olarak bekleyen faturaları GİB'e iletir.
	 */
	public async sendDraftToGib(uuids: string[]): Promise<ApiResult<unknown>> {
		return await this.httpClient.post<ApiResult<unknown>>("/api/InvoiceOutbox/sendDraftInvoiceToGIB", uuids);
	}

	/**
	 * Giden faturaların durumunu sorgular.
	 */
	public async getOutboxStatus(uuids: string[]): Promise<ApiResult<InvoiceStatusItem[]>> {
		return await this.httpClient.post<ApiResult<InvoiceStatusItem[]>>(
			"/api/InvoiceOutbox/getInvoiceOutboxStatus",
			uuids
		);
	}

	/**
	 * Gelen faturaların durumunu sorgular.
	 */
	public async getInboxStatus(uuids: string[]): Promise<ApiResult<InvoiceStatusItem[]>> {
		return await this.httpClient.post<ApiResult<InvoiceStatusItem[]>>(
			"/api/InvoiceInbox/getInvoiceInboxStatus",
			uuids
		);
	}

	/**
	 * Yeni gelen faturaları listeler.
	 */
	public async getNewInboxInvoices(): Promise<ApiResult<InvoiceListItem[]>> {
		return await this.httpClient.get<ApiResult<InvoiceListItem[]>>("/api/InvoiceInbox/getNewInvoiceInboxList");
	}

	/**
	 * Tarih aralığındaki gelen faturaları listeler.
	 */
	public async getInboxInvoicesForPeriod(startDate: string, endDate: string): Promise<ApiResult<InvoiceListItem[]>> {
		return await this.httpClient.get<ApiResult<InvoiceListItem[]>>(
			`/api/InvoiceInbox/getInvoiceInboxListForPeriod?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
		);
	}

	/**
	 * Giden faturanın PDF ZIP Base64 verisini indirir.
	 */
	public async getOutboxPdfAsZip(uuid: string): Promise<ApiResult<string>> {
		return await this.httpClient.get<ApiResult<string>>(
			`/api/InvoiceOutbox/getInvoiceOutboxPdfAsZip?invoiceETTN=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * Giden faturanın XML ZIP Base64 verisini indirir.
	 */
	public async getOutboxXmlAsZip(uuid: string): Promise<ApiResult<string>> {
		return await this.httpClient.get<ApiResult<string>>(
			`/api/InvoiceOutbox/getInvoiceOutboxUBLXMLAsZip?invoiceETTN=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * Giden faturanın HTML ZIP Base64 verisini indirir.
	 */
	public async getOutboxHtmlAsZip(uuid: string): Promise<ApiResult<string>> {
		return await this.httpClient.get<ApiResult<string>>(
			`/api/InvoiceOutbox/getInvoiceOutboxHTMLAsZip?invoiceETTN=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * Gelen faturanın PDF ZIP Base64 verisini indirir.
	 */
	public async getInboxPdfAsZip(uuid: string): Promise<ApiResult<string>> {
		return await this.httpClient.get<ApiResult<string>>(
			`/api/InvoiceInbox/getInvoiceInboxPdfAsZip?invoiceETTN=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * Gelen faturanın XML ZIP Base64 verisini indirir.
	 */
	public async getInboxXmlAsZip(uuid: string): Promise<ApiResult<string>> {
		return await this.httpClient.get<ApiResult<string>>(
			`/api/InvoiceInbox/getInvoiceInboxUBLXMLAsZip?invoiceETTN=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * Gelen faturanın HTML ZIP Base64 verisini indirir.
	 */
	public async getInboxHtmlAsZip(uuid: string): Promise<ApiResult<string>> {
		return await this.httpClient.get<ApiResult<string>>(
			`/api/InvoiceInbox/getInvoiceInboxHTMLAsZip?invoiceETTN=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * E-Arşiv faturasını iptal eder.
	 */
	public async cancelEArchiveInvoice(request: InvoiceCancelRequest): Promise<ApiResult<InvoiceCancelResponse>> {
		return await this.httpClient.post<ApiResult<InvoiceCancelResponse>>(
			"/api/InvoiceOutbox/cancelEArchiveInvoice",
			request
		);
	}

	/**
	 * Gelen ticari faturayı kabul eder.
	 */
	public async acceptInvoice(uuid: string): Promise<ApiResult<unknown>> {
		return await this.httpClient.post<ApiResult<unknown>>(
			`/api/InvoiceInbox/acceptInvoice?uuid=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * Gelen ticari faturayı reddeder.
	 */
	public async denyInvoice(uuid: string, reason: string): Promise<ApiResult<unknown>> {
		return await this.httpClient.post<ApiResult<unknown>>("/api/InvoiceInbox/denyInvoiceWithModel", {
			uuid,
			reason,
		});
	}

	/**
	 * Portal Fatura Ekleme
	 * [POST /api/Invoice/invoiceDraft]
	 *
	 * Portal Fatura Ekranına kayıt gönderir. Gönderilen kayıt taslak olarak kaydedilir. Gerekli düzenlemeler yapıldıktan sonra, Portal ekranından İmzala/Gönder yapılmalıdır.
	 */
	public async invoiceDraft(
		data: Types.InvoiceDraftModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Invoice/invoiceDraft`, data, config);
	}
	/**
	 * Fatura İlaç Tıbbi Cihaz Ekleme
	 * [POST /api/Invoice/invoiceDrugAndMedical]
	 *
	 * İlaç Tıbbi Cihaz faturasına detay ekler.
	 */
	public async saveInvoiceDrugAndMedical(
		data: Types.InvoiceDrugAndMedicalRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ListResultModel> {
		return await this.httpClient.post<Types.Int32ListResultModel>(
			`/api/Invoice/invoiceDrugAndMedical`,
			data,
			config
		);
	}
	/**
	 * Fatura Not Ekleme
	 * [POST /api/Invoice/invoiceNote]
	 *
	 * Faturaya not ekler.
	 */
	public async saveInvoiceNote(
		data: Types.InvoiceNoteRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ListResultModel> {
		return await this.httpClient.post<Types.Int32ListResultModel>(`/api/Invoice/invoiceNote`, data, config);
	}
	/**
	 * Portal Fatura Ekleme(Yeni)
	 * [POST /api/Invoice/invoiceDraftNew]
	 *
	 * Portal Fatura Ekranına kayıt gönderir. Gönderilen kayıt taslak olarak kaydedilir. Gerekli düzenlemeler yapıldıktan sonra, Portal ekranından İmzala/Gönder yapılmalıdır. Portal Fatura Ekleme metodu ile aynı metoddur. Geri dönüş değerleri farklıdır sadece.
	 */
	public async invoiceDraftNew(
		data: Types.InvoiceDraftModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.InvoiceOutboxResultModelResultModel>(
			`/api/Invoice/invoiceDraftNew`,
			data,
			config
		);
	}
	/**
	 * Taslak Fatura Sil
	 * [POST /api/Invoice/deleteInvoiceDraft]
	 *
	 * Gönderilen, henüz taslak durumunda olan faturaların silinmesini sağlayan metoddur.
	 */
	public async deleteInvoiceDraft(
		data: Types.DeleteInvoiceDraftModel,
		config?: MysoftRequestConfig
	): Promise<Types.BooleanResultModel> {
		return await this.httpClient.post<Types.BooleanResultModel>(`/api/Invoice/deleteInvoiceDraft`, data, config);
	}
	/**
	 * Taslak Fatura İmzala Gönder
	 * [GET /api/Invoice/invoiceDraftSignAndSend]
	 *
	 * Kaydedilmiş taslak faturanın GİB'e gönderilmesini sağlar.
	 */
	public async invoiceDraftSignAndSend(
		params?: Record<string, unknown>
	): Promise<Types.InvoiceOutboxResultModelResultModel> {
		return await this.httpClient.get<Types.InvoiceOutboxResultModelResultModel>(
			`/api/Invoice/invoiceDraftSignAndSend`,
			{ params }
		);
	}
	/**
	 * Fatura Model
	 * [GET /api/Invoice/getInvoiceModel]
	 *
	 * İlgili faturayı, fatura modeli olarak dönen metod
	 */
	public async getInvoiceModel(params?: Record<string, unknown>): Promise<Types.InvoiceForApiModelResultModel> {
		return await this.httpClient.get<Types.InvoiceForApiModelResultModel>(`/api/Invoice/getInvoiceModel`, {
			params,
		});
	}
	/**
	 * Fatura Model Liste
	 * [POST /api/Invoice/getInvoiceModelList]
	 *
	 * İlgili faturayı, fatura model liste olarak dönen metod
	 */
	public async getInvoiceResultModelList(
		data: Types.InvoiceResultListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceResultModelListResultModel> {
		return await this.httpClient.post<Types.InvoiceResultModelListResultModel>(
			`/api/Invoice/getInvoiceModelList`,
			data,
			config
		);
	}
	/**
	 * Fatura Listesi (Başlıklı)
	 * [POST /api/Invoice/getInvoiceWithHeaderInfoList]
	 *
	 * İlgili tarihler arasındaki e-fatura ve e-arşiv belgelerini başlık bilgileriyle birlikte listeler
	 */
	public async getInvoiceWithHeaderInfoList(
		data: Types.GetInvoiceListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.InvoiceHeaderInfoModelListResultModel>(
			`/api/Invoice/getInvoiceWithHeaderInfoList`,
			data,
			config
		);
	}
	/**
	 * Taslak Fatura PDF
	 * [GET /api/Invoice/getInvoiceDraftPdfAsZip]
	 *
	 * İlgili taslak faturanın PDF dosyasını zip olarak geri dönen metod
	 */
	public async getInvoiceDraftPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/Invoice/getInvoiceDraftPdfAsZip`, { params });
	}
	/**
	 * Fatura Ekleme Örnek JSON
	 * [GET /api/Invoice/createInvoiceDraftTestJson]
	 *
	 * Fatura Eklemek için örnek json oluşturur
	 */
	public async createInvoiceDraftTestJson(config?: MysoftRequestConfig): Promise<Types.InvoiceDraftModel> {
		return await this.httpClient.get<Types.InvoiceDraftModel>(`/api/Invoice/createInvoiceDraftTestJson`, config);
	}
	/**
	 * GİB Portal'a Fatura Gönderme
	 * [POST /api/Invoice/invoiceDraftSendToGib]
	 *
	 * Portal Fatura Ekranına kayıt gönderir. Gönderilen kayıt taslak olarak kaydedilir. Devamında fatura GİB Portalı'na gönderilir ve onaylama için portala gönerilmiş fatura bilgileri ile birlikte sms onay Id(confirmId) değerleri dönülür.
	 */
	public async invoiceDraftSendToGib(
		data: Types.InvoiceDraftModel,
		config?: MysoftRequestConfig
	): Promise<Types.EArchiveSmsConfirmModelQueryResultModel> {
		return await this.httpClient.post<Types.EArchiveSmsConfirmModelQueryResultModel>(
			`/api/Invoice/invoiceDraftSendToGib`,
			data,
			config
		);
	}
	/**
	 * GİB Portal'a Fatura Gönderme XML
	 * [POST /api/Invoice/invoiceDraftSendToGibUblXml]
	 *
	 * Portal Fatura Ekranına kayıt gönderir. Gönderilen kayıt taslak olarak kaydedilir. Devamında fatura GİB Portalı'na gönderilir ve onaylama için portala gönerilmiş fatura bilgileri ile birlikte sms onay Id(confirmId) değerleri dönülür.
	 */
	public async invoiceDraftSendToGibUblXml(
		data: Types.InvoiceDraftForUblXmlModel,
		config?: MysoftRequestConfig
	): Promise<Types.EArchiveSmsConfirmModelQueryResultModel> {
		return await this.httpClient.post<Types.EArchiveSmsConfirmModelQueryResultModel>(
			`/api/Invoice/invoiceDraftSendToGibUblXml`,
			data,
			config
		);
	}
	/**
	 * GİB Portal'a Fatura Gönderme (Tekrar)
	 * [POST /api/Invoice/invoiceDraftReSendToGib]
	 *
	 * GİB Portal'a daha önceden gönderilmiş fakat onayı alınamamış faturayı tekrar onaya gönderir.
	 */
	public async invoiceDraftReSendToGib(
		data: Types.GibInvoiceOperationModel,
		config?: MysoftRequestConfig
	): Promise<Types.EArchiveSmsConfirmModelQueryResultModel> {
		return await this.httpClient.post<Types.EArchiveSmsConfirmModelQueryResultModel>(
			`/api/Invoice/invoiceDraftReSendToGib`,
			data,
			config
		);
	}
	/**
	 * GİB Portal'a Sms Onay Kodu Talebi Oluşturma
	 * [POST /api/Invoice/requestSmsConfimCodeFromGib]
	 *
	 * GİB Portal'a sms onay kodu talebi oluşturur
	 */
	public async requestSmsConfimCodeFromGib(
		data: Types.GibInvoiceSmsRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/Invoice/requestSmsConfimCodeFromGib`,
			data,
			config
		);
	}
	/**
	 * GİB Portal'a SMS Onay Kodu ile Birlikte Fatura İmza Onayı Gönderme
	 * [POST /api/Invoice/sendSmsConfirmForInvoiceToGib]
	 *
	 * GİB Portal'a Fatura Gönderim Api'sinden dönülen onay Id(confirmId), faturaya ait ETTN bilgisi ve GİB tarafından kullanıcı telefonuna SMS olarak gönderilen onay kodu(confirmCode) ile imza onayı gönderimi yapar
	 */
	public async sendSmsConfirmForInvoiceToGib(
		data: Types.GibInvoiceSmsConfirmModel,
		config?: MysoftRequestConfig
	): Promise<Types.EArchiveSmsConfirmModelQueryResultModel> {
		return await this.httpClient.post<Types.EArchiveSmsConfirmModelQueryResultModel>(
			`/api/Invoice/sendSmsConfirmForInvoiceToGib`,
			data,
			config
		);
	}
	/**
	 * GİB Portal'dan Onaylanmamış Faturayı Silme
	 * [POST /api/Invoice/removeInvoiceFromGib]
	 *
	 * GİB Portal'dan onaylanmamış ETTN bilgisi verilen faturayı siler
	 */
	public async removeInvoiceFromGib(
		data: Types.GibInvoiceOperationModel,
		config?: MysoftRequestConfig
	): Promise<Types.EArchiveSmsConfirmModelQueryResultModel> {
		return await this.httpClient.post<Types.EArchiveSmsConfirmModelQueryResultModel>(
			`/api/Invoice/removeInvoiceFromGib`,
			data,
			config
		);
	}
	/**
	 * GİB Portal'da Onaylanmış Fatura İçin İptal Talebi Oluşturma
	 * [POST /api/Invoice/createCancellationRequestToGib]
	 *
	 * GİB Portal'da onaylanmış, ETTN bilgisi verilen fatura için iptal talebi oluşturur
	 */
	public async createCancellationRequestToGib(
		data: Types.GibInvoiceCancellationModel,
		config?: MysoftRequestConfig
	): Promise<Types.EArchiveSmsConfirmModelQueryResultModel> {
		return await this.httpClient.post<Types.EArchiveSmsConfirmModelQueryResultModel>(
			`/api/Invoice/createCancellationRequestToGib`,
			data,
			config
		);
	}
	/**
	 * Yeni Gelen E-Arşiv Fatura Listesi
	 * [POST /api/EArchiveDocumentInbox/getNewEArchiveDocumentInboxList]
	 *
	 * Yeni gelen, daha önce alınmamış e-arşiv faturaları dönen metod. Maksimum 100 kayıt döner. Bu 100 kaydı sisteminize işledikten sonra, her bir gelen fatura kaydı için eArchiveDocumentInboxSavedByCustomer metodunu çağırmalısınız. Böylece bu metod tekrar çağrıldığında, daha önce alınan gelen faturalar alınmaz.
	 */
	public async getNewEArchiveDocumentInboxList(
		data: Types.GetEArchiveDocumentInboxPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.EArchiveDocumentInboxApiModelListResultModel> {
		return await this.httpClient.post<Types.EArchiveDocumentInboxApiModelListResultModel>(
			`/api/EArchiveDocumentInbox/getNewEArchiveDocumentInboxList`,
			data,
			config
		);
	}
	/**
	 * Gelen E-Arşiv Fatura Listesi
	 * [POST /api/EArchiveDocumentInbox/getEArchiveDocumentInboxList]
	 *
	 * Gelen, daha önce alınmamış e-arşiv faturaları dönen metod. Maksimum 100 kayıt döner. Bu 100 kaydı sisteminize işledikten sonra, her bir gelen fatura kaydı için eArchiveDocumentInboxSavedByCustomer metodunu çağırmalısınız. Böylece bu metod tekrar çağrıldığında, daha önce alınan gelen faturalar alınmaz.
	 */
	public async getEArchiveDocumentInboxList(
		data: Types.GetEArchiveDocumentInboxPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.EArchiveDocumentInboxApiModelListResultModel> {
		return await this.httpClient.post<Types.EArchiveDocumentInboxApiModelListResultModel>(
			`/api/EArchiveDocumentInbox/getEArchiveDocumentInboxList`,
			data,
			config
		);
	}
	/**
	 * Gelen E_arşiv Fatura Alındı
	 * [GET /api/EArchiveDocumentInbox/eArchiveDocumentInboxSavedByCustomer]
	 *
	 * Gelen e-Arşiv fatura, müşteri sistemi tarafından başarılı bir şekilde kaydedildiğinde, bu metod ile mysoft sistemine bildirilir. Bu metoda gönderilen ETTN'ler, getNewEArchiveDocumentInboxList metodu ile artık dönülmezler.
	 */
	public async eArchiveDocumentInboxSavedByCustomer(
		params?: Record<string, unknown>
	): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(
			`/api/EArchiveDocumentInbox/eArchiveDocumentInboxSavedByCustomer`,
			{ params }
		);
	}
	/**
	 * Gelen E-Arşiv Fatura XML
	 * [GET /api/EArchiveDocumentInbox/getEArchiveDocumentInboxUBLXMLAsZip]
	 *
	 * Gelen e-arşiv faturanın UBL formatında XML dosyasını zip olarak döner
	 */
	public async getEArchiveDocumentInboxUBLXMLAsZip(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/EArchiveDocumentInbox/getEArchiveDocumentInboxUBLXMLAsZip`,
			{ params }
		);
	}
	/**
	 * Gelen E-Arşiv Fatura PDF
	 * [GET /api/EArchiveDocumentInbox/getEArchiveDocumentInboxPdfAsZip]
	 *
	 * İlgili faturanın PDF dosyasını zip olarak geri dönen metod
	 */
	public async getEArchiveDocumentInboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/EArchiveDocumentInbox/getEArchiveDocumentInboxPdfAsZip`,
			{ params }
		);
	}
	/**
	 * Yeni Gelen Fatura Listesi
	 * [POST /api/InvoiceInbox/getNewInvoiceInboxList]
	 *
	 * Yeni gelen, daha önce alınmamış faturaların ETTN'lerini dönen metod. Maksimum 100 kayıt döner. Bu 100 kaydı sisteminize işledikten sonra, her bir gelen fatura kaydı için invoiceInboxSavedByCustomer metodunu çağırmalısınız. Böylece bu metod tekrar çağrıldığında, daha önce alınan gelen faturalar alınmaz.
	 */
	public async getNewInvoiceInboxList(
		data: Types.GetInvoiceInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringListResultModel> {
		return await this.httpClient.post<Types.StringListResultModel>(
			`/api/InvoiceInbox/getNewInvoiceInboxList`,
			data,
			config
		);
	}
	/**
	 * Yeni Gelen Fatura Listesi (Başlıklı)
	 * [POST /api/InvoiceInbox/getNewInvoiceInboxWithHeaderInfoList]
	 *
	 * Yeni gelen, daha önce alınmamış faturaların ETTN'lerini dönen metod. Maksimum 100 kayıt döner. Bu 100 kaydı sisteminize işledikten sonra, her bir gelen fatura kaydı için invoiceInboxSavedByCustomer metodunu çağırmalısınız. Böylece bu metod tekrar çağrıldığında, daha önce alınan gelen faturalar alınmaz. Bu metodda ek olarak faturanın başlık bilgileride yer alır.
	 */
	public async getNewInvoiceInboxWithHeaderInfoList(
		data: Types.GetInvoiceInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.InvoiceHeaderInfoModelListResultModel>(
			`/api/InvoiceInbox/getNewInvoiceInboxWithHeaderInfoList`,
			data,
			config
		);
	}
	/**
	 * Gelen Fatura Listesi
	 * [POST /api/InvoiceInbox/getInvoiceInboxListForPeriod]
	 *
	 * Belirli bir tarih aralığındaki faturaları almak için kullanılan metod.
	 */
	public async getInvoiceInboxListForPeriod(
		data: Types.GetInvoiceInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringListResultModel> {
		return await this.httpClient.post<Types.StringListResultModel>(
			`/api/InvoiceInbox/getInvoiceInboxListForPeriod`,
			data,
			config
		);
	}
	/**
	 * Gelen Fatura Listesi (Başlıklı)
	 * [POST /api/InvoiceInbox/getInvoiceInboxWithHeaderInfoListForPeriod]
	 *
	 * Belirli bir tarih aralığındaki faturaları almak için kullanılan metod.
	 */
	public async getInvoiceInboxWithHeaderInfoListForPeriod(
		data: Types.GetInvoiceInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.InvoiceHeaderInfoModelListResultModel>(
			`/api/InvoiceInbox/getInvoiceInboxWithHeaderInfoListForPeriod`,
			data,
			config
		);
	}
	/**
	 * Gelen Fatura Listesi (Başlıklı)(Sayfalama)
	 * [POST /api/InvoiceInbox/getInvoiceInboxWithHeaderInfoListForPeriodPaging]
	 *
	 * Belirli bir tarih aralığındaki faturaları almak için kullanılan metod.
	 */
	public async getInvoiceInboxWithHeaderInfoListForPeriodPaging(
		data: Types.GetInvoiceInboxListForPeriodPagingRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceHeaderInfoModelListPagingResultModel> {
		return await this.httpClient.post<Types.InvoiceHeaderInfoModelListPagingResultModel>(
			`/api/InvoiceInbox/getInvoiceInboxWithHeaderInfoListForPeriodPaging`,
			data,
			config
		);
	}
	/**
	 * Gelen Fatura PDF
	 * [GET /api/InvoiceInbox/getInvoiceInboxPdfAsZip]
	 *
	 * İlgili faturanın PDF dosyasını zip olarak geri dönen metod
	 */
	public async getInvoiceInboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/InvoiceInbox/getInvoiceInboxPdfAsZip`, {
			params,
		});
	}
	/**
	 * Gelen Fatura PDF (Çoklu)
	 * [GET /api/InvoiceInbox/getMultipleInvoiceInboxAsOnePdfAsZip]
	 *
	 * İlgili faturaların PDF dosyasını tek bir pdf zip olarak geri dönen metod. paperSize parametresi olarak gönderibilecek değerler 1(A4), 2(A4Extra), 3(A4Plus), 4(A4Rotated),5(A5), 6(A5Extra), 7(A5Rotated),8(B5),9(B5Extra), 10(A3), 11(A3Extra),12(A3Rotated), 13(A6), 14(A6Rotated). Özel olarak istenen bir boy var ise, paperSize parametresi null olarak gönderilip, paperWidth ve paperHegiht parametrelerine değer gönderilebilir.
	 */
	public async getMultipleInvoiceInboxAsOnePdfAsZip(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/InvoiceInbox/getMultipleInvoiceInboxAsOnePdfAsZip`,
			{ params }
		);
	}
	/**
	 * Gelen Fatura PDF (Çoklu)(POST)
	 * [POST /api/InvoiceInbox/getMultipleInvoiceInboxAsOnePdfAsZipWithPost]
	 *
	 * İlgili faturaların PDF dosyasını tek bir pdf zip olarak geri dönen metod. paperSize parametresi olarak gönderibilecek değerler 1(A4), 2(A4Extra), 3(A4Plus), 4(A4Rotated),5(A5), 6(A5Extra), 7(A5Rotated),8(B5),9(B5Extra), 10(A3), 11(A3Extra),12(A3Rotated), 13(A6), 14(A6Rotated). Özel olarak istenen bir boy var ise, paperSize parametresi null olarak gönderilip, paperWidth ve paperHegiht parametrelerine değer gönderilebilir.
	 */
	public async getMultipleInvoiceInboxAsOnePdfAsZipWithPost(
		data: string[],
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/InvoiceInbox/getMultipleInvoiceInboxAsOnePdfAsZipWithPost`,
			data,
			{ params }
		);
	}
	/**
	 * Gelen Fatura XML
	 * [GET /api/InvoiceInbox/getInvoiceInboxUBLXMLAsZip]
	 *
	 * Gelen faturanın UBL formatında XML dosyasını zip olarak döner
	 */
	public async getInvoiceInboxUBLXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/InvoiceInbox/getInvoiceInboxUBLXMLAsZip`, {
			params,
		});
	}
	/**
	 * Gelen Fatura XML Ve Zarf
	 * [GET /api/InvoiceInbox/getInvoiceInboxUBLXMLWithEnvelopeInfoAsZip]
	 *
	 * Gelen faturanın, zarf bilgilerini ve UBL formatında XML dosyasını zip olarak döner
	 */
	public async getInvoiceInboxUBLXMLWithEnvelopeInfoAsZip(
		params?: Record<string, unknown>
	): Promise<Types.InvoiceInboxEnvelopeInfoResponseResultModel> {
		return await this.httpClient.get<Types.InvoiceInboxEnvelopeInfoResponseResultModel>(
			`/api/InvoiceInbox/getInvoiceInboxUBLXMLWithEnvelopeInfoAsZip`,
			{ params }
		);
	}
	/**
	 * Gelen Fatura HTML
	 * [GET /api/InvoiceInbox/getInvoiceInboxHTMLAsZip]
	 *
	 * İlgili faturanın HTML dosyasını zip olarak geri dönen metod
	 */
	public async getInvoiceInboxHTMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/InvoiceInbox/getInvoiceInboxHTMLAsZip`, {
			params,
		});
	}
	/**
	 * Gelen Fatura Model
	 * [GET /api/InvoiceInbox/getInvoiceInboxModel]
	 *
	 * İlgili faturayı, gelen fatura modeli olarak dönen metod
	 */
	public async getInvoiceInboxModel(params?: Record<string, unknown>): Promise<Types.InvoiceForApiModelResultModel> {
		return await this.httpClient.get<Types.InvoiceForApiModelResultModel>(
			`/api/InvoiceInbox/getInvoiceInboxModel`,
			{ params }
		);
	}
	/**
	 * Gelen Fatura Model(Zarf)
	 * [GET /api/InvoiceInbox/getInvoiceInboxWithEnvelopeModel]
	 *
	 * İlgili faturayı, zarf bilgileriyle birlikte gelen fatura modeli olarak dönen metod
	 */
	public async getInvoiceInboxWithEnvelopeModel(
		params?: Record<string, unknown>
	): Promise<Types.InvoiceWithEnvelopeForApiModelResultModel> {
		return await this.httpClient.get<Types.InvoiceWithEnvelopeForApiModelResultModel>(
			`/api/InvoiceInbox/getInvoiceInboxWithEnvelopeModel`,
			{ params }
		);
	}
	/**
	 * Gelen Fatura Durum Sorgu
	 * [GET /api/InvoiceInbox/getInvoiceInboxStatus]
	 *
	 * Bir faturanın durum bilgisini dönen metod.
	 */
	public async getInvoiceInboxStatus(
		params?: Record<string, unknown>
	): Promise<Types.InvoiceInboxStatusResultModelResultModel> {
		return await this.httpClient.get<Types.InvoiceInboxStatusResultModelResultModel>(
			`/api/InvoiceInbox/getInvoiceInboxStatus`,
			{ params }
		);
	}
	/**
	 * Gelen Fatura Alındı
	 * [GET /api/InvoiceInbox/invoiceInboxSavedByCustomer]
	 *
	 * Gelen fatura, müşteri sistemi tarafından başarılı bir şekilde kaydedildiğinde, bu metod ile mysoft sistemine bildirilir. Bu metoda gönderilen ETTN'ler, GetNewInvoiceInboxList metodu ile artık dönülmezler.
	 */
	public async invoiceInboxSavedByCustomer(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/InvoiceInbox/invoiceInboxSavedByCustomer`, {
			params,
		});
	}
	/**
	 * Gelen Fatura Arşiv Durumu Güncelle
	 * [GET /api/InvoiceInbox/updateInvoiceInboxArchiveStatus]
	 *
	 * Gelen faturanın Portaldaki arşiv durumunu değiştirmek için kullanılır
	 */
	public async updateInvoiceInboxArchiveStatus(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(
			`/api/InvoiceInbox/updateInvoiceInboxArchiveStatus`,
			{ params }
		);
	}
	/**
	 * Gelen Fatura Yazdırıldı
	 * [GET /api/InvoiceInbox/invoiceInboxIncreasePrintCount]
	 *
	 * Gelen faturanın yazdırılmas sayısı artırmak için kullanılır.
	 */
	public async invoiceInboxIncreasePrintCount(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/InvoiceInbox/invoiceInboxIncreasePrintCount`, {
			params,
		});
	}
	/**
	 * Gelen Fatura Kabul
	 * [GET /api/InvoiceInbox/acceptInvoice]
	 *
	 * Gelen ticari faturanın kabulü için kullanılan metod
	 */
	public async getAcceptInvoice(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/InvoiceInbox/acceptInvoice`, { params });
	}
	/**
	 * Gelen Fatura Red
	 * [GET /api/InvoiceInbox/denyInvoice]
	 *
	 * Gelen ticari faturanın reddi için kullanılan metod
	 */
	public async getDenyInvoice(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/InvoiceInbox/denyInvoice`, { params });
	}
	/**
	 * Gelen Fatura Red (Model)
	 * [POST /api/InvoiceInbox/denyInvoiceWithModel]
	 *
	 * Gelen ticari faturanın reddi için kullanılan metod
	 */
	public async denyInvoiceWithModel(
		data: Types.DenyInvoiceRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.BooleanResultModel> {
		return await this.httpClient.post<Types.BooleanResultModel>(
			`/api/InvoiceInbox/denyInvoiceWithModel`,
			data,
			config
		);
	}
	/**
	 * 5000/30000 Listesi
	 * [POST /api/InvoiceInbox/getEArchiveInboxForPeriodList]
	 *
	 * Belirli bir tarih aralığındaki 5000/30000 faturaları almak için kullanılan metod.
	 */
	public async getEArchiveInboxForPeriodList(
		data: Types.GetEArchiveInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.EArchiveInboxModelListResultModel> {
		return await this.httpClient.post<Types.EArchiveInboxModelListResultModel>(
			`/api/InvoiceInbox/getEArchiveInboxForPeriodList`,
			data,
			config
		);
	}
	/**
	 * 5000/30000 Fatura Alındı
	 * [GET /api/InvoiceInbox/earchiveInboxSavedByCustomer]
	 *
	 * 5000/30000 fatura, müşteri sistemi tarafından başarılı bir şekilde kaydedildiğinde, bu metod ile mysoft sistemine bildirilir.
	 */
	public async eArchiveInboxSavedByCustomer(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/InvoiceInbox/earchiveInboxSavedByCustomer`, {
			params,
		});
	}
	/**
	 * Gelen Fatura XML - Tepe Bilişim
	 * [GET /api/InvoiceInbox/getInvoiceInboxUBLXMLAsZipTepeBilisim]
	 *
	 * Gelen faturanın Tepe bilişime özel XML formatında XML dosyasını zip olarak döner
	 */
	public async getInvoiceInboxUBLXMLAsZipTepeBilisim(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/InvoiceInbox/getInvoiceInboxUBLXMLAsZipTepeBilisim`,
			{ params }
		);
	}
	/**
	 * Giden Fatura Ekleme
	 * [POST /api/InvoiceOutbox/invoiceOutbox]
	 *
	 * Giden Fatura Ekleme çağrısıdır. GİB'e direkt gönderilecek faturalar için bu metod kullanılır.
	 */
	public async invoiceOutbox(
		data: Types.InvoiceOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.InvoiceOutboxResultModelResultModel>(
			`/api/InvoiceOutbox/invoiceOutbox`,
			data,
			config
		);
	}
	/**
	 * Giden Fatura XML Gönderimi
	 * [POST /api/InvoiceOutbox/invoiceOutboxWithUblXml]
	 *
	 * GİB'e gönderilecek UBL xml formatındaki faturanın gönderimi için kullanılır.
	 */
	public async invoiceOutboxWithUblXml(
		data: Types.InvoiceForUblXmlModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.InvoiceOutboxResultModelResultModel>(
			`/api/InvoiceOutbox/invoiceOutboxWithUblXml`,
			data,
			config
		);
	}
	/**
	 * Taslak Giden Faturayı Gönder
	 * [POST /api/InvoiceOutbox/sendDraftInvoiceToGIB]
	 *
	 * Taslak olarak kaydedilen giden faturanın GİB'e gönderilmesini sağlar.
	 */
	public async sendDraftInvoiceToGIB(
		data: Types.SendDraftInvoiceRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.InvoiceOutboxResultModelResultModel>(
			`/api/InvoiceOutbox/sendDraftInvoiceToGIB`,
			data,
			config
		);
	}
	/**
	 * Taslak Giden Fatura Silme
	 * [GET /api/InvoiceOutbox/deleteDraftInvoiceOutbox]
	 *
	 * Taslak olarak kaydedilen giden fatura kayıtlarını silmek için kullanılan metod
	 */
	public async deleteDraftInvoiceOutbox(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/InvoiceOutbox/deleteDraftInvoiceOutbox`, {
			params,
		});
	}
	/**
	 * Giden Arşiv Fatura İptal
	 * [GET /api/InvoiceOutbox/cancelEArchiveInvoice]
	 *
	 * Arşiv faturaları iptal etmek için kullanılan metod
	 */
	public async getCancelEArchiveInvoice(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/InvoiceOutbox/cancelEArchiveInvoice`, {
			params,
		});
	}
	/**
	 * Giden Fatura Durum Değişenler
	 * [POST /api/InvoiceOutbox/getInvoiceOutboxStatusChanged]
	 *
	 * İlgili tarih aralığında durumları değişen faturaları dönen metoddur.
	 */
	public async getInvoiceOutboxStatusChanged(
		data: Types.GetInvoiceOutboxStatusChangedRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceOutboxStatusResultModelListResultModel> {
		return await this.httpClient.post<Types.InvoiceOutboxStatusResultModelListResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxStatusChanged`,
			data,
			config
		);
	}
	/**
	 * Giden Fatura Durum Sorgu
	 * [GET /api/InvoiceOutbox/getInvoiceOutboxStatus]
	 *
	 * Bir faturanın durum bilgisini dönen metod.
	 */
	public async getInvoiceOutboxStatus(
		params?: Record<string, unknown>
	): Promise<Types.InvoiceOutboxStatusResultModelResultModel> {
		return await this.httpClient.get<Types.InvoiceOutboxStatusResultModelResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxStatus`,
			{ params }
		);
	}
	/**
	 * Giden Fatura PDF
	 * [GET /api/InvoiceOutbox/getInvoiceOutboxPdfAsZip]
	 *
	 * İlgili faturanın PDF dosyasını zip olarak geri dönen metod
	 */
	public async getInvoiceOutboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/InvoiceOutbox/getInvoiceOutboxPdfAsZip`, {
			params,
		});
	}
	/**
	 * Giden Fatura PDF (Çoklu)
	 * [GET /api/InvoiceOutbox/getMultipleInvoiceOutboxAsOnePdfAsZip]
	 *
	 * İlgili faturaların PDF dosyasını tek bir pdf zip olarak geri dönen metod. paperSize parametresi olarak gönderibilecek değerler 1(A4), 2(A4Extra), 3(A4Plus), 4(A4Rotated),5(A5), 6(A5Extra), 7(A5Rotated),8(B5),9(B5Extra), 10(A3), 11(A3Extra),12(A3Rotated), 13(A6), 14(A6Rotated). Özel olarak istenen bir boy var ise, paperSize parametresi null olarak gönderilip, paperWidth ve paperHegiht parametrelerine değer gönderilebilir.
	 */
	public async getMultipleInvoiceOutboxAsOnePdfAsZip(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/InvoiceOutbox/getMultipleInvoiceOutboxAsOnePdfAsZip`,
			{ params }
		);
	}
	/**
	 * Giden Fatura PDF (Çoklu)(POST)
	 * [POST /api/InvoiceOutbox/getMultipleInvoiceOutboxAsOnePdfAsZipWithPost]
	 *
	 * İlgili faturaların PDF dosyasını tek bir pdf zip olarak geri dönen metod. Özel olarak istenen bir boy var ise, paperSize parametresi null olarak gönderilip, paperWidth ve paperHegiht parametrelerine değer gönderilebilir.
	 */
	public async getMultipleInvoiceOutboxAsOnePdfAsZipWithPost(
		data: Types.MultipleInvoiceOutboxAsOnePdfRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/InvoiceOutbox/getMultipleInvoiceOutboxAsOnePdfAsZipWithPost`,
			data,
			config
		);
	}
	/**
	 * Giden Fatura XML
	 * [GET /api/InvoiceOutbox/getInvoiceOutboxXMLAsZip]
	 *
	 * İlgili faturanın XML dosyasını zip olarak geri döner
	 */
	public async getInvoiceOutboxXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/InvoiceOutbox/getInvoiceOutboxXMLAsZip`, {
			params,
		});
	}
	/**
	 * Giden Fatura Zarf XML
	 * [GET /api/InvoiceOutbox/getInvoiceOutboxEnvelopeXMLAsZip]
	 *
	 * İlgili faturanın Zarf XML dosyasını zip olarak geri döner
	 */
	public async getInvoiceOutboxEnvelopeXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxEnvelopeXMLAsZip`,
			{ params }
		);
	}
	/**
	 * Giden Fatura XML ve Zarf
	 * [GET /api/InvoiceOutbox/getInvoiceOutboxXMLWithEnvelopeInfoAsZip]
	 *
	 * İlgili faturanın Zarf bilgilerini ve XML dosyasını zip olarak geri döner
	 */
	public async getInvoiceOutboxXMLWithEnvelopeInfoAsZip(
		params?: Record<string, unknown>
	): Promise<Types.InvoiceOutboxEnvelopeInfoResponseResultModel> {
		return await this.httpClient.get<Types.InvoiceOutboxEnvelopeInfoResponseResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxXMLWithEnvelopeInfoAsZip`,
			{ params }
		);
	}
	/**
	 * Giden Fatura HTML
	 * [GET /api/InvoiceOutbox/getInvoiceOutboxHTMLAsZip]
	 *
	 * İlgili faturanın HTML dosyasını zip olarak geri dönen metod
	 */
	public async getInvoiceOutboxHTMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/InvoiceOutbox/getInvoiceOutboxHTMLAsZip`, {
			params,
		});
	}
	/**
	 * Giden Fatura Model
	 * [GET /api/InvoiceOutbox/getInvoiceOutboxModel]
	 *
	 * İlgili faturayı, giden fatura modeli olarak dönen metod
	 */
	public async getInvoiceOutboxModel(params?: Record<string, unknown>): Promise<Types.InvoiceForApiModelResultModel> {
		return await this.httpClient.get<Types.InvoiceForApiModelResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxModel`,
			{ params }
		);
	}
	/**
	 * Fatura Önizleme - PDF
	 * [POST /api/InvoiceOutbox/getInvoiceOutboxDraftPdfAsZip]
	 *
	 * Verilen fatura nesnesinin PDF olarak çıktısını döner.
	 */
	public async getInvoiceOutboxDraftPdfAsZip(
		data: Types.InvoiceOutboxModelForDraft,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxDraftPdfAsZip`,
			data,
			config
		);
	}
	/**
	 * Fatura Önizleme - HTML
	 * [POST /api/InvoiceOutbox/getInvoiceOutboxDraftHTMLAsZip]
	 *
	 * Verilen fatura nesnesinin HTML olarak çıktısını döner.
	 */
	public async getInvoiceOutboxDraftHTMLAsZip(
		data: Types.InvoiceOutboxModelForDraft,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxDraftHTMLAsZip`,
			data,
			config
		);
	}
	/**
	 * Fatura Önizleme - XML
	 * [POST /api/InvoiceOutbox/getInvoiceOutboxDraftXMLAsZip]
	 *
	 * Verilen fatura nesnesinin XML olarak çıktısını döner.
	 */
	public async getInvoiceOutboxDraftXMLAsZip(
		data: Types.InvoiceOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxDraftXMLAsZip`,
			data,
			config
		);
	}
	/**
	 * Fatura Önizleme XML - PDF
	 * [POST /api/InvoiceOutbox/getInvoiceOutboxForUblXmlDraftPdfAsZip]
	 *
	 * Verilen UBL xml'in PDF olarak çıktısını döner.
	 */
	public async getInvoiceOutboxForUblXmlDraftPdfAsZip(
		data: Types.InvoiceForUblXmlDraftModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxForUblXmlDraftPdfAsZip`,
			data,
			config
		);
	}
	/**
	 * Fatura Önizleme XML - HTML
	 * [POST /api/InvoiceOutbox/getInvoiceOutboxForUblXmlDraftHTMLAsZip]
	 *
	 * Verilen UBL xml'in HTML olarak çıktısını döner.
	 */
	public async getInvoiceOutboxForUblXmlDraftHTMLAsZip(
		data: Types.InvoiceForUblXmlDraftModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxForUblXmlDraftHTMLAsZip`,
			data,
			config
		);
	}
	/**
	 * Giden Fatura Listesi
	 * [POST /api/InvoiceOutbox/getInvoiceOutboxList]
	 *
	 * İlgili tarihler arasındaki e-fatura ve e-arşiv belgelerini listeler
	 */
	public async getInvoiceOutboxList(
		data: Types.GetInvoiceOutboxListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringListResultModel> {
		return await this.httpClient.post<Types.StringListResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxList`,
			data,
			config
		);
	}
	/**
	 * Giden Fatura Listesi (Başlıklı)
	 * [POST /api/InvoiceOutbox/getInvoiceOutboxWithHeaderInfoList]
	 *
	 * İlgili tarihler arasındaki e-fatura ve e-arşiv belgelerini başlık bilgileriyle birlikte listeler
	 */
	public async getInvoiceOutboxWithHeaderInfoList(
		data: Types.GetInvoiceOutboxListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.InvoiceHeaderInfoModelListResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxWithHeaderInfoList`,
			data,
			config
		);
	}
	/**
	 * Faturayı Mail At
	 * [GET /api/InvoiceOutbox/sendMailForInvoice]
	 *
	 * ETTN'si verilen faturayı, ilgili kişiye mail atan servistir.
	 */
	public async sendMailForInvoice(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/InvoiceOutbox/sendMailForInvoice`, { params });
	}
	/**
	 * Fatura Mail Kontrol Detay
	 * [GET /api/InvoiceOutbox/checkMailStatusForInvoice]
	 *
	 * Faturanın üzerindeki mail hesabına gönderilen mailin durumunu sorgular. Bu metod eğer mail Mysoft üzerinden gönderildiyse sonuç döner. Döndüğü sonuç da ilgili mailin hareket listesidir.
	 */
	public async checkMailStatusForInvoice(
		params?: Record<string, unknown>
	): Promise<Types.EMailEventModelListResultModel> {
		return await this.httpClient.get<Types.EMailEventModelListResultModel>(
			`/api/InvoiceOutbox/checkMailStatusForInvoice`,
			{ params }
		);
	}
	/**
	 * Fatura Mail Durum Kontrol
	 * [GET /api/InvoiceOutbox/checkGeneralMailStatusForInvoice]
	 *
	 * İlgili faturaya ait gönderilmiş maillerin son durumlarını listeler.
	 */
	public async checkGeneralMailStatusForInvoice(
		params?: Record<string, unknown>
	): Promise<Types.EMailTransactionStatusModelListResultModel> {
		return await this.httpClient.get<Types.EMailTransactionStatusModelListResultModel>(
			`/api/InvoiceOutbox/checkGeneralMailStatusForInvoice`,
			{ params }
		);
	}
	/**
	 * Çoklu Fatura Mail Durum Kontrol
	 * [POST /api/InvoiceOutbox/checkGeneralMailStatusForMultipleInvoice]
	 *
	 * İlgili faturalara ait gönderilmiş maillerin son durumlarını listeler.
	 */
	public async checkGeneralMailStatusForMultipleInvoice(
		data: Types.CheckGeneralMailStatusMultipleInvoiceRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.EMailTransactionStatusModelListResultModel> {
		return await this.httpClient.post<Types.EMailTransactionStatusModelListResultModel>(
			`/api/InvoiceOutbox/checkGeneralMailStatusForMultipleInvoice`,
			data,
			config
		);
	}
	/**
	 * Fatura URL
	 * [GET /api/InvoiceOutbox/getInvoiceOutboxPublicUrl]
	 *
	 * Gönderilen faturanın görüntülenmesini sağlayan URL'i döner
	 */
	public async getInvoiceOutboxPublicUrl(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/InvoiceOutbox/getInvoiceOutboxPublicUrl`, {
			params,
		});
	}
	/**
	 * Giden Fatura XML Schema Kontrol
	 * [POST /api/InvoiceOutbox/checkSchemaSchematronForInvoiceUBL]
	 *
	 * GİB'e gönderilecek UBL xml formatındaki faturanın schema ve schematron kontrollerini yapar. Fatura gönderim öncesinde schema schematrondan geçip geçmediği görülmek istenirse bu metod kullanılabilir. Fatura gönderim metodunda yine de schema schematron kontrolü yapılmaktadır. Bu metod faturayı sisteme göndermeden schema schematron kontrolü yapabilmek için eklenmiştir.
	 */
	public async checkSchemaSchematronForInvoiceUBL(
		data: Types.InvoiceForUblXmlModel,
		config?: MysoftRequestConfig
	): Promise<Types.BooleanResultModel> {
		return await this.httpClient.post<Types.BooleanResultModel>(
			`/api/InvoiceOutbox/checkSchemaSchematronForInvoiceUBL`,
			data,
			config
		);
	}
	/**
	 * Giden Fatura Ekleme - Tepe Bilişim
	 * [POST /api/InvoiceOutbox/invoiceOutboxTepeBilisim]
	 *
	 * Tepe bilişim firmasına ait xml standartındaki fatura xmlini göndermek için kullanılır.
	 */
	public async invoiceOutboxTepeBilisim(
		data: Types.InvoiceForUblXmlTepeBilisimModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.InvoiceOutboxResultModelResultModel>(
			`/api/InvoiceOutbox/invoiceOutboxTepeBilisim`,
			data,
			config
		);
	}
	/**
	 * Giden Fatura XML - Tepe Bilişim
	 * [GET /api/InvoiceOutbox/getInvoiceOutboxXMLAsZipTepeBilisim]
	 *
	 * İlgili faturanın XML dosyasını zip olarak geri döner (Tepe Bilişim XML Formatında)
	 */
	public async getInvoiceOutboxXMLAsZipTepeBilisim(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/InvoiceOutbox/getInvoiceOutboxXMLAsZipTepeBilisim`,
			{ params }
		);
	}
	/**
	 * Giden Fatura Ekleme - NetleBelge
	 * [POST /api/InvoiceOutbox/invoiceOutboxNetleBelge]
	 *
	 * NetleBelge tipinde Fatura göndermek için kullanılır.
	 */
	public async invoiceOutboxNetleBelge(
		data: Types.NetleBelgeRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.InvoiceOutboxResultModelResultModel>(
			`/api/InvoiceOutbox/invoiceOutboxNetleBelge`,
			data,
			config
		);
	}
	/**
	 * Excelden Fatura - SoftNet
	 * [POST /api/InvoiceOutbox/invoiceFromSoftNetExcel]
	 *
	 * SoftNet'in IBM için belirlediği Excel formatında fatura yükleme metodu
	 */
	public async invoiceFromSoftNetExcel(
		data: Types.InvoiceFromSoftNetExcelRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.InvoiceFromSoftNetExcelResponseModelResultModel> {
		return await this.httpClient.post<Types.InvoiceFromSoftNetExcelResponseModelResultModel>(
			`/api/InvoiceOutbox/invoiceFromSoftNetExcel`,
			data,
			config
		);
	}
	/**
	 * Giden Fatura Ekleme Örnek JSON
	 * [GET /api/InvoiceOutbox/createInvoiceOutboxTestJson]
	 *
	 * Fatura Eklemek için örnek json oluşturur
	 */
	public async createInvoiceOutboxTestJson(config?: MysoftRequestConfig): Promise<Types.InvoiceOutboxModel> {
		return await this.httpClient.get<Types.InvoiceOutboxModel>(
			`/api/InvoiceOutbox/createInvoiceOutboxTestJson`,
			config
		);
	}
}
