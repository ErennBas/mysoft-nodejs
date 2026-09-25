import { BaseService } from "./base.service";
import { ApiResult } from "../types/common";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";
import {
	SendDespatchWithUblXmlRequest,
	SendDespatchResponse,
	DespatchStatusItem,
	ReceiptAdviceRequest,
	ReceiptAdviceResponse,
} from "../types/despatch.types";

/**
 * E-İrsaliye, Giden ve Gelen İrsaliye ve İrsaliye Yanıtları Servisi
 * Toplam 78 REST Endpoint içerir.
 */
export class DespatchService extends BaseService {
	/**
	 * ZIP sıkıştırmalı ve Base64 kodlu UBL-TR XML formatında e-İrsaliye gönderir.
	 */
	public async sendDespatchWithUblXml(
		request: SendDespatchWithUblXmlRequest
	): Promise<ApiResult<SendDespatchResponse>> {
		return await this.httpClient.post<ApiResult<SendDespatchResponse>>(
			"/api/DespatchOutbox/despatchOutboxWithUblXml",
			request
		);
	}

	/**
	 * Portalda taslak olarak bekleyen irsaliyeleri GİB'e iletir.
	 */
	public async sendDraftToGib(uuids: string[]): Promise<ApiResult<unknown>> {
		return await this.httpClient.post<ApiResult<unknown>>("/api/DespatchOutbox/sendDraftDespatchToGIB", uuids);
	}

	/**
	 * Gelen e-İrsaliye için GİB İrsaliye Yanıtı (Kabul, Red, Kısmi Kabul) oluşturur ve iletir.
	 */
	public async sendReceiptAdvice(request: ReceiptAdviceRequest): Promise<ApiResult<ReceiptAdviceResponse>> {
		return await this.httpClient.post<ApiResult<ReceiptAdviceResponse>>(
			"/api/ReceiptOutbox/receiptOutbox",
			request
		);
	}

	/**
	 * Giden irsaliyelerin durumunu sorgular.
	 */
	public async getOutboxStatus(uuids: string[]): Promise<ApiResult<DespatchStatusItem[]>> {
		return await this.httpClient.post<ApiResult<DespatchStatusItem[]>>(
			"/api/DespatchOutbox/getDespatchOutboxStatus",
			uuids
		);
	}

	/**
	 * Gelen irsaliyelerin durumunu sorgular.
	 */
	public async getInboxStatus(uuids: string[]): Promise<ApiResult<DespatchStatusItem[]>> {
		return await this.httpClient.post<ApiResult<DespatchStatusItem[]>>(
			"/api/DespatchInbox/getDespatchInboxStatus",
			uuids
		);
	}

	/**
	 * Giden irsaliyenin PDF ZIP Base64 verisini indirir.
	 */
	public async getOutboxPdfAsZip(uuid: string): Promise<ApiResult<string>> {
		return await this.httpClient.get<ApiResult<string>>(
			`/api/DespatchOutbox/getDespatchOutboxPdfAsZip?uuid=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * Giden irsaliyenin XML ZIP Base64 verisini indirir.
	 */
	public async getOutboxXmlAsZip(uuid: string): Promise<ApiResult<string>> {
		return await this.httpClient.get<ApiResult<string>>(
			`/api/DespatchOutbox/getDespatchOutboxXMLAsZip?uuid=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * Gelen irsaliyenin PDF ZIP Base64 verisini indirir.
	 */
	public async getInboxPdfAsZip(uuid: string): Promise<ApiResult<string>> {
		return await this.httpClient.get<ApiResult<string>>(
			`/api/DespatchInbox/getDespatchInboxPdfAsZip?uuid=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * Gelen irsaliyenin XML ZIP Base64 verisini indirir.
	 */
	public async getInboxXmlAsZip(uuid: string): Promise<ApiResult<string>> {
		return await this.httpClient.get<ApiResult<string>>(
			`/api/DespatchInbox/getDespatchInboxUBLXMLAsZip?uuid=${encodeURIComponent(uuid)}`
		);
	}

	/**
	 * Yeni Gelen İrsaliye Listesi
	 * [POST /api/DespatchInbox/getNewDespatchInboxList]
	 *
	 * Yeni gelen, daha önce alınmamış irsaliyelerin ETTN'lerini dönen metod. Maksimum 100 kayıt döner. Bu 100 kaydı sisteminize işledikten sonra, her bir gelen irsaliye kaydı için DespatchInboxSavedByCustomer metodunu çağırmalısınız. Böylece bu metod tekrar çağrıldığında, daha önce alınan gelen irsaliyeler alınmaz.
	 */
	public async getNewDespatchInboxList(
		data: Types.GetDespatchInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringListResultModel> {
		return await this.httpClient.post<Types.StringListResultModel>(
			`/api/DespatchInbox/getNewDespatchInboxList`,
			data,
			config
		);
	}
	/**
	 * Yeni Gelen İrsaliye Listesi (Başlıklı)
	 * [POST /api/DespatchInbox/getNewDespatchInboxWithHeaderInfoList]
	 *
	 * Yeni gelen, daha önce alınmamış irsaliyelerin başlık bilgilerini dönen metod. Maksimum 100 kayıt döner. Bu 100 kaydı sisteminize işledikten sonra, her bir gelen irsaliye kaydı için DespatchInboxSavedByCustomer metodunu çağırmalısınız. Böylece bu metod tekrar çağrıldığında, daha önce alınan gelen irsaliyeler alınmaz.
	 */
	public async getNewDespatchInboxWithHeaderInfoList(
		data: Types.GetDespatchInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.DespatchHeaderInfoModelListResultModel>(
			`/api/DespatchInbox/getNewDespatchInboxWithHeaderInfoList`,
			data,
			config
		);
	}
	/**
	 * Gelen İrsaliye Durumu
	 * [GET /api/DespatchInbox/getDespatchInboxStatus]
	 *
	 * Bir irsaliyenin durum bilgisini dönen metod.
	 */
	public async getDespatchInboxStatus(
		params?: Record<string, unknown>
	): Promise<Types.DespatchInboxStatusResultModelResultModel> {
		return await this.httpClient.get<Types.DespatchInboxStatusResultModelResultModel>(
			`/api/DespatchInbox/getDespatchInboxStatus`,
			{ params }
		);
	}
	/**
	 * Gelen İrsaliye Listesi
	 * [POST /api/DespatchInbox/getDespatchInboxListForPeriod]
	 *
	 * Belirli bir tarih aralığındaki irsaliyeleri almak için kullanılan metod.
	 */
	public async getDespatchInboxListForPeriod(
		data: Types.GetDespatchInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringListResultModel> {
		return await this.httpClient.post<Types.StringListResultModel>(
			`/api/DespatchInbox/getDespatchInboxListForPeriod`,
			data,
			config
		);
	}
	/**
	 * Gelen İrsaliye Listesi (Başlıklı)
	 * [POST /api/DespatchInbox/getDespatchInboxWithHeaderInfoListForPeriod]
	 *
	 * Belirli bir tarih aralığındaki irsaliyeleri almak için kullanılan metod.
	 */
	public async getDespatchInboxWithHeaderInfoListForPeriod(
		data: Types.GetDespatchInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.DespatchHeaderInfoModelListResultModel>(
			`/api/DespatchInbox/getDespatchInboxWithHeaderInfoListForPeriod`,
			data,
			config
		);
	}
	/**
	 * Gelen İrsaliye Listesi (Başlıklı)(Sayfalama)
	 * [POST /api/DespatchInbox/getDespatchInboxWithHeaderInfoListForPeriodPaging]
	 *
	 * Belirli bir tarih aralığındaki irsaliyeleri almak için kullanılan metod.
	 */
	public async getDespatchInboxWithHeaderInfoListForPeriodPaging(
		data: Types.GetDespatchInboxListForPeriodPagingRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchHeaderInfoModelListPagingResultModel> {
		return await this.httpClient.post<Types.DespatchHeaderInfoModelListPagingResultModel>(
			`/api/DespatchInbox/getDespatchInboxWithHeaderInfoListForPeriodPaging`,
			data,
			config
		);
	}
	/**
	 * Gelen İrsaliye PDF
	 * [GET /api/DespatchInbox/getDespatchInboxPdfAsZip]
	 *
	 * İlgili irsaliyenin PDF dosyasını zip olarak geri dönen metod
	 */
	public async getDespatchInboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/DespatchInbox/getDespatchInboxPdfAsZip`, {
			params,
		});
	}
	/**
	 * Gelen İrsaliye PDF (Çoklu)(POST)
	 * [POST /api/DespatchInbox/getMultipleDespatchInboxAsOnePdfAsZipWithPost]
	 *
	 * İlgili irsaliyelerin PDF dosyasını tek bir pdf zip olarak geri dönen metod. paperSize parametresi olarak gönderibilecek değerler 1(A4), 2(A4Extra), 3(A4Plus), 4(A4Rotated),5(A5), 6(A5Extra), 7(A5Rotated),8(B5),9(B5Extra), 10(A3), 11(A3Extra),12(A3Rotated), 13(A6), 14(A6Rotated). Özel olarak istenen bir boy var ise, paperSize parametresi null olarak gönderilip, paperWidth ve paperHegiht parametrelerine değer gönderilebilir.
	 */
	public async getMultipleDespatchInboxAsOnePdfAsZipWithPost(
		data: Types.MultipleDespatchInboxOnePdfPostRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/DespatchInbox/getMultipleDespatchInboxAsOnePdfAsZipWithPost`,
			data,
			config
		);
	}
	/**
	 * Gelen İrsaliye XML
	 * [GET /api/DespatchInbox/getDespatchInboxUBLXMLAsZip]
	 *
	 * Gelen irsaliyenin UBL formatında XML dosyasını zip olarak döner
	 */
	public async getDespatchInboxUBLXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/DespatchInbox/getDespatchInboxUBLXMLAsZip`, {
			params,
		});
	}
	/**
	 * Gelen İrsaliye XML ve Zarf
	 * [GET /api/DespatchInbox/getDespatchInboxUBLXMLWithEnvelopeInfoAsZip]
	 *
	 * Gelen irsaliyenin, Zarf bilgilerini ve UBL formatında XML dosyasını zip olarak döner
	 */
	public async getDespatchInboxUBLXMLWithEnvelopeInfoAsZip(
		params?: Record<string, unknown>
	): Promise<Types.DespatchInboxEnvelopeInfoResponseResultModel> {
		return await this.httpClient.get<Types.DespatchInboxEnvelopeInfoResponseResultModel>(
			`/api/DespatchInbox/getDespatchInboxUBLXMLWithEnvelopeInfoAsZip`,
			{ params }
		);
	}
	/**
	 * Gelen İrsaliye HTML
	 * [GET /api/DespatchInbox/getDespatchInboxHTMLAsZip]
	 *
	 * İlgili faturanın HTML dosyasını zip olarak geri döner
	 */
	public async getDespatchInboxHTMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/DespatchInbox/getDespatchInboxHTMLAsZip`, {
			params,
		});
	}
	/**
	 * Gelen İrsaliye Model
	 * [GET /api/DespatchInbox/getDespatchInboxModel]
	 *
	 * İlgili irsaliyeyi, gelen irsaliye modeli olarak dönen metod
	 */
	public async getDespatchInboxModel(params?: Record<string, unknown>): Promise<Types.DespatchInboxModelResultModel> {
		return await this.httpClient.get<Types.DespatchInboxModelResultModel>(
			`/api/DespatchInbox/getDespatchInboxModel`,
			{ params }
		);
	}
	/**
	 * Gelen İrsaliye Alındı
	 * [GET /api/DespatchInbox/despatchInboxSavedByCustomer]
	 *
	 * Gelen irsaliye, müşteri sistemi tarafından başarılı bir şekilde kaydedildiğinde, bu metod ile mysoft sistemine bildirilir. Bu metoda gönderilen ETTN'ler, GetNewDespatchInboxList metodu ile artık dönülmezler.
	 */
	public async despatchInboxSavedByCustomer(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/DespatchInbox/despatchInboxSavedByCustomer`, {
			params,
		});
	}
	/**
	 * Gelen İrsaliye Arşiv Durumu Güncelle
	 * [GET /api/DespatchInbox/updateDespatchInboxArchiveStatus]
	 *
	 * Gelen irsaliyenin Portaldaki arşiv durumunu değiştirmek için kullanılır
	 */
	public async updateInvoiceInboxArchiveStatus(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(
			`/api/DespatchInbox/updateDespatchInboxArchiveStatus`,
			{ params }
		);
	}
	/**
	 * Gelen İrsaliye XML - Tepe Bilişim
	 * [GET /api/DespatchInbox/getDespatchInboxUBLXMLAsZipTepeBilisim]
	 *
	 * Gelen irsaliyenin Tepe Bilişim XML formatında XML dosyasını zip olarak döner
	 */
	public async getDespatchInboxUBLXMLAsZipTepeBilisim(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/DespatchInbox/getDespatchInboxUBLXMLAsZipTepeBilisim`,
			{ params }
		);
	}
	/**
	 * Yeni Gelen İrsaliye Yanıt Listesi
	 * [POST /api/ReceiptInbox/getNewReceiptInboxList]
	 *
	 * Yeni gelen, daha önce alınmamış irsaliye yanıtlarının ETTN'lerini dönen metod. Maksimum 100 kayıt döner. Bu 100 kaydı sisteminize işledikten sonra, her bir gelen irsaliye yanıt kaydı için ReceiptInboxSavedByCustomer metodunu çağırmalısınız. Böylece bu metod tekrar çağrıldığında, daha önce alınan gelen irsaliyeler alınmaz.
	 */
	public async getNewReceiptInboxList(
		data: Types.GetReceiptInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ReceiptInboxEttnResultModelListResultModel> {
		return await this.httpClient.post<Types.ReceiptInboxEttnResultModelListResultModel>(
			`/api/ReceiptInbox/getNewReceiptInboxList`,
			data,
			config
		);
	}
	/**
	 * Yeni Gelen İrsaliye Yanıt Listesi (Başlıklı)
	 * [POST /api/ReceiptInbox/getNewReceiptInboxWithHeaderInfoList]
	 *
	 * Yeni gelen, daha önce alınmamış irsaliye yanıtlarının ETTN'lerini dönen metod. Maksimum 100 kayıt döner. Bu 100 kaydı sisteminize işledikten sonra, her bir gelen irsaliye yanıt kaydı için ReceiptInboxSavedByCustomer metodunu çağırmalısınız. Böylece bu metod tekrar çağrıldığında, daha önce alınan gelen irsaliyeler alınmaz.
	 */
	public async getNewReceiptInboxWithHeaderInfoList(
		data: Types.GetReceiptInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ReceiptHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.ReceiptHeaderInfoModelListResultModel>(
			`/api/ReceiptInbox/getNewReceiptInboxWithHeaderInfoList`,
			data,
			config
		);
	}
	/**
	 * Gelen İrsaliye Yanıt Listesi
	 * [POST /api/ReceiptInbox/getReceiptInboxListForPeriod]
	 *
	 * Belirli bir tarih aralığındaki irsaliye yanıtlarını almak için kullanılan metod.
	 */
	public async getReceiptInboxListForPeriod(
		data: Types.GetReceiptInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ReceiptInboxEttnResultModelListResultModel> {
		return await this.httpClient.post<Types.ReceiptInboxEttnResultModelListResultModel>(
			`/api/ReceiptInbox/getReceiptInboxListForPeriod`,
			data,
			config
		);
	}
	/**
	 * Gelen İrsaliye Yanıt Listesi (Başlıklı)
	 * [POST /api/ReceiptInbox/getReceiptInboxWithHeaderInfoListForPeriod]
	 *
	 * Belirli bir tarih aralığındaki irsaliye yanıtlarını almak için kullanılan metod.
	 */
	public async getReceiptInboxWithHeaderInfoListForPeriod(
		data: Types.GetReceiptInboxListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ReceiptHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.ReceiptHeaderInfoModelListResultModel>(
			`/api/ReceiptInbox/getReceiptInboxWithHeaderInfoListForPeriod`,
			data,
			config
		);
	}
	/**
	 * Gelen İrsaliye Yanıt PDF
	 * [GET /api/ReceiptInbox/getReceiptInboxPdfAsZip]
	 *
	 * İlgili irsaliye yanıtının PDF dosyasını zip olarak geri dönen metod
	 */
	public async getReceiptInboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/ReceiptInbox/getReceiptInboxPdfAsZip`, {
			params,
		});
	}
	/**
	 * Gelen İrsaliye Yanıt XML
	 * [GET /api/ReceiptInbox/getReceiptInboxUBLXMLAsZip]
	 *
	 * Gelen irsaliye yanıtının UBL formatında XML dosyasını zip olarak döner
	 */
	public async getReceiptInboxUBLXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/ReceiptInbox/getReceiptInboxUBLXMLAsZip`, {
			params,
		});
	}
	/**
	 * Gelen İrsaliye Yanıt HTML
	 * [GET /api/ReceiptInbox/getReceiptInboxHTMLAsZip]
	 *
	 * İlgili irsaliye yanıtının HTML dosyasını zip olarak geri döner
	 */
	public async getReceiptInboxHTMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/ReceiptInbox/getReceiptInboxHTMLAsZip`, {
			params,
		});
	}
	/**
	 * Gelen İrsaliye Yanıt PDF(İrsaliye ETTN)
	 * [GET /api/ReceiptInbox/getReceiptInboxByDespatchETTNPdfAsZip]
	 *
	 * İlgili irsaliye yanıtının PDF dosyasını zip olarak geri dönen metod
	 */
	public async getReceiptInboxByDespatchETTNPdfAsZip(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ReceiptInbox/getReceiptInboxByDespatchETTNPdfAsZip`,
			{ params }
		);
	}
	/**
	 * Gelen İrsaliye Yanıt XML(İrsaliye ETTN)
	 * [GET /api/ReceiptInbox/getReceiptInboxUBLXMLByDespatchETTNAsZip]
	 *
	 * Gelen irsaliye yanıtının UBL formatında XML dosyasını zip olarak döner
	 */
	public async getReceiptInboxUBLXMLByDespatchETTNAsZip(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ReceiptInbox/getReceiptInboxUBLXMLByDespatchETTNAsZip`,
			{ params }
		);
	}
	/**
	 * Gelen İrsaliye Yanıt HTML(İrsaliye ETTN)
	 * [GET /api/ReceiptInbox/getReceiptInboxHTMLByDespatchETTNAsZip]
	 *
	 * İlgili irsaliye yanıtının HTML dosyasını zip olarak geri döner
	 */
	public async getReceiptInboxHTMLByDespatchETTNAsZip(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ReceiptInbox/getReceiptInboxHTMLByDespatchETTNAsZip`,
			{ params }
		);
	}
	/**
	 * Gelen İrsaliye Yanıt XML ve Zarf
	 * [GET /api/ReceiptInbox/getReceiptInboxUBLXMLWithEnvelopeInfoAsZip]
	 *
	 * Gelen irsaliye yanıtının, Zarf bilgilerini ve UBL formatında XML dosyasını zip olarak döner
	 */
	public async getGetDespatchInboxUBLXMLWithEnvelopeInfoAsZip(
		params?: Record<string, unknown>
	): Promise<Types.ReceiptInboxEnvelopeInfoResponseResultModel> {
		return await this.httpClient.get<Types.ReceiptInboxEnvelopeInfoResponseResultModel>(
			`/api/ReceiptInbox/getReceiptInboxUBLXMLWithEnvelopeInfoAsZip`,
			{ params }
		);
	}
	/**
	 * Gelen İrsaliye Yanıtı Alındı
	 * [GET /api/ReceiptInbox/receiptInboxSavedByCustomer]
	 *
	 * Gelen irsaliye yanıtı, müşteri sistemi tarafından başarılı bir şekilde kaydedildiğinde, bu metod ile mysoft sistemine bildirilir. Bu metoda gönderilen ETTN'ler, GetNewReceiptInboxList metodu ile artık dönülmezler.
	 */
	public async receiptInboxSavedByCustomer(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/ReceiptInbox/receiptInboxSavedByCustomer`, {
			params,
		});
	}
	/**
	 * Gelen İrsaliye Yanıt XML - Tepe Bilişim
	 * [GET /api/ReceiptInbox/getReceiptInboxUBLXMLAsZipTepeBilisim]
	 *
	 * Gelen irsaliye yanıtının UBL formatında XML dosyasını zip olarak döner
	 */
	public async getReceiptInboxUBLXMLAsZipTepeBilisim(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ReceiptInbox/getReceiptInboxUBLXMLAsZipTepeBilisim`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye Ekleme
	 * [POST /api/DespatchOutbox/despatchOutbox]
	 *
	 * Giden İrsaliye Ekleme çağrısıdır. GİB'e direkt gönderilecek irsaliyeler için bu metod kullanılır.
	 */
	public async despatchOutbox(
		data: Types.DespatchOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.DespatchOutboxResultModelResultModel>(
			`/api/DespatchOutbox/despatchOutbox`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Gönderimi XML
	 * [POST /api/DespatchOutbox/despatchOutboxWithUblXml]
	 *
	 * GİB'e gönderilecek UBL xml formatındaki irsaliyenin gönderimi için kullanılır.
	 */
	public async despatchOutboxWithUblXml(
		data: Types.DespatchForUblXmlModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.DespatchOutboxResultModelResultModel>(
			`/api/DespatchOutbox/despatchOutboxWithUblXml`,
			data,
			config
		);
	}
	/**
	 * Taslak Giden İrsaliye Gönder
	 * [POST /api/DespatchOutbox/sendDraftDespatchToGIB]
	 *
	 * Taslak olarak kaydedilen giden irsaliyenin GİB'e gönderilmesini sağlar.
	 */
	public async sendDraftDespatchToGIB(
		data: Types.SendDraftDespatchRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.DespatchOutboxResultModelResultModel>(
			`/api/DespatchOutbox/sendDraftDespatchToGIB`,
			data,
			config
		);
	}
	/**
	 * Taslak Giden İrsaliye Silme
	 * [GET /api/DespatchOutbox/deleteDraftDespatchOutbox]
	 *
	 * Taslak olarak kaydedilen giden irsaliye kayıtlarını silmek için kullanılan metod
	 */
	public async deleteDraftDespatchOutbox(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/DespatchOutbox/deleteDraftDespatchOutbox`, {
			params,
		});
	}
	/**
	 * Giden İrsaliye Değişenler
	 * [POST /api/DespatchOutbox/getDespatchOutboxStatusChanged]
	 *
	 * İlgili tarih aralığında durumları değişen irsaliyeleri dönen metoddur.
	 */
	public async getDespatchOutboxStatusChanged(
		data: Types.GetDespatchOutboxStatusChangedRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchOutboxStatusResultModelListResultModel> {
		return await this.httpClient.post<Types.DespatchOutboxStatusResultModelListResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxStatusChanged`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Durumu
	 * [GET /api/DespatchOutbox/getDespatchOutboxStatus]
	 *
	 * Bir irsaliye durum bilgisini dönen metod.
	 */
	public async getDespatchOutboxStatus(
		params?: Record<string, unknown>
	): Promise<Types.DespatchOutboxStatusResultModelResultModel> {
		return await this.httpClient.get<Types.DespatchOutboxStatusResultModelResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxStatus`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye PDF
	 * [GET /api/DespatchOutbox/getDespatchOutboxPdfAsZip]
	 *
	 * İlgili irsaliyenin PDF dosyasını zip olarak geri dönen metod
	 */
	public async getDespatchOutboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/DespatchOutbox/getDespatchOutboxPdfAsZip`, {
			params,
		});
	}
	/**
	 * Giden İrsaliye PDF (Çoklu)
	 * [GET /api/DespatchOutbox/getMultipleDespatchOutboxAsOnePdfAsZip]
	 *
	 * İlgili irsaliyelerin PDF dosyasını tek bir pdf zip olarak geri dönen metod. paperSize parametresi olarak gönderibilecek değerler 1(A4), 2(A4Extra), 3(A4Plus), 4(A4Rotated),5(A5), 6(A5Extra), 7(A5Rotated),8(B5),9(B5Extra), 10(A3), 11(A3Extra),12(A3Rotated), 13(A6), 14(A6Rotated). Özel olarak istenen bir boy var ise, paperSize parametresi null olarak gönderilip, paperWidth ve paperHegiht parametrelerine değer gönderilebilir.
	 */
	public async getMultipleDespatchOutboxAsOnePdfAsZip(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/DespatchOutbox/getMultipleDespatchOutboxAsOnePdfAsZip`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye PDF (Çoklu)(POST)
	 * [POST /api/DespatchOutbox/getMultipleDespatchOutboxAsOnePdfAsZipPost]
	 *
	 * İlgili irsaliyelerin PDF dosyasını tek bir pdf zip olarak geri dönen metod. paperSize parametresi olarak gönderibilecek değerler 1(A4), 2(A4Extra), 3(A4Plus), 4(A4Rotated),5(A5), 6(A5Extra), 7(A5Rotated),8(B5),9(B5Extra), 10(A3), 11(A3Extra),12(A3Rotated), 13(A6), 14(A6Rotated). Özel olarak istenen bir boy var ise, paperSize parametresi null olarak gönderilip, paperWidth ve paperHegiht parametrelerine değer gönderilebilir.
	 */
	public async getMultipleDespatchOutboxAsOnePdfAsZipPost(
		data: Types.MultipleDespatchOutboxOnePdfPostRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/DespatchOutbox/getMultipleDespatchOutboxAsOnePdfAsZipPost`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye XML
	 * [GET /api/DespatchOutbox/getDespatchOutboxXMLAsZip]
	 *
	 * İlgili faturanın XML dosyasını zip olarak geri döner
	 */
	public async getDespatchOutboxXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/DespatchOutbox/getDespatchOutboxXMLAsZip`, {
			params,
		});
	}
	/**
	 * Giden İrsaliye Zarf XML
	 * [GET /api/DespatchOutbox/getDespatchOutboxEnvelopeXMLAsZip]
	 *
	 * İlgili faturanın XML dosyasını zip olarak geri döner
	 */
	public async getDespatchOutboxEnvelopeXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxEnvelopeXMLAsZip`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye XML ve Zarf
	 * [GET /api/DespatchOutbox/getDespatchOutboxXMLWithEnvelopeInfoAsZip]
	 *
	 * İlgili faturanın XML dosyasını zip olarak geri döner
	 */
	public async getDespatchOutboxXMLWithEnvelopeInfoAsZip(
		params?: Record<string, unknown>
	): Promise<Types.DespatchOutboxEnvelopeInfoResponseResultModel> {
		return await this.httpClient.get<Types.DespatchOutboxEnvelopeInfoResponseResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxXMLWithEnvelopeInfoAsZip`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye HTML
	 * [GET /api/DespatchOutbox/getDespatchOutboxHTMLAsZip]
	 *
	 * İlgili irsaliyenin HTML dosyasını zip olarak geri döner
	 */
	public async getDespatchOutboxHTMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/DespatchOutbox/getDespatchOutboxHTMLAsZip`, {
			params,
		});
	}
	/**
	 * İrsaliye Önizleme - PDF
	 * [POST /api/DespatchOutbox/getDespatchOutboxDraftPdfAsZip]
	 *
	 * Verilen irsaliye nesnesinin PDF olarak çıktısını döner.
	 */
	public async getDespatchOutboxDraftPdfAsZip(
		data: Types.DespatchOutboxModelForDraft,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxDraftPdfAsZip`,
			data,
			config
		);
	}
	/**
	 * İrsaliye Önizleme - HTML
	 * [POST /api/DespatchOutbox/getDespatchOutboxDraftHTMLAsZip]
	 *
	 * Verilen irsaliye nesnesinin HTML olarak çıktısını döner.
	 */
	public async getDespatchOutboxDraftHTMLAsZip(
		data: Types.DespatchOutboxModelForDraft,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxDraftHTMLAsZip`,
			data,
			config
		);
	}
	/**
	 * İrsaliye Önizleme - XML
	 * [POST /api/DespatchOutbox/getDespatchOutboxDraftXMLAsZip]
	 *
	 * Verilen irsaliye nesnesinin XML olarak çıktısını döner.
	 */
	public async getDespatchOutboxDraftXMLAsZip(
		data: Types.DespatchOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxDraftXMLAsZip`,
			data,
			config
		);
	}
	/**
	 * İrsaliye Önizleme XML - PDF
	 * [POST /api/DespatchOutbox/getDespatchOutboxForUblXmlDraftPdfAsZip]
	 *
	 * Verilen irsaliye UBL xml'in PDF olarak çıktısını döner.
	 */
	public async getDespatchOutboxForUblXmlDraftPdfAsZip(
		data: Types.DespatchForUblXmlDraftModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxForUblXmlDraftPdfAsZip`,
			data,
			config
		);
	}
	/**
	 * İrsaliye Önizleme XML - HTML
	 * [POST /api/DespatchOutbox/getDespatchOutboxForUblXmlDraftHTMLAsZip]
	 *
	 * Verilen irsaliye UBL xml'in HTML olarak çıktısını döner.
	 */
	public async getDespatchOutboxForUblXmlDraftHTMLAsZip(
		data: Types.DespatchForUblXmlDraftModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxForUblXmlDraftHTMLAsZip`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Listesi
	 * [POST /api/DespatchOutbox/getDespatchOutboxList]
	 *
	 * İlgili tarihler arasındaki irsaliye belgelerini listeler
	 */
	public async getDespatchOutboxList(
		data: Types.GetDespatchOutboxListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringListResultModel> {
		return await this.httpClient.post<Types.StringListResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxList`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Listesi (Başlıklı)
	 * [POST /api/DespatchOutbox/getDespatchOutboxWithHeaderInfoList]
	 *
	 * İlgili tarihler arasındaki irsaliye belgelerini Başlık bilgileriyle birlikte listeler
	 */
	public async getDespatchOutboxWithHeaderInfoList(
		data: Types.GetDespatchOutboxListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.DespatchHeaderInfoModelListResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxWithHeaderInfoList`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye XML Schema Kontrol
	 * [POST /api/DespatchOutbox/checkSchemaSchematronForDespatchUBL]
	 *
	 * GİB'e gönderilecek UBL xml formatındaki irsaliyenin schema ve schematron kontrollerini yapar. İrsaliye gönderim öncesinde schema schematrondan geçip geçmediği görülmek istenirse bu metod kullanılabilir. İrsaliye gönderim metodunda yine de schema schematron kontrolü yapılmaktadır. Bu metod irsaliyeyi sisteme göndermeden schema schematron kontrolü yapabilmek için eklenmiştir.
	 */
	public async checkSchemaSchematronForDespatchUBL(
		data: Types.DespatchForUblXmlModel,
		config?: MysoftRequestConfig
	): Promise<Types.BooleanResultModel> {
		return await this.httpClient.post<Types.BooleanResultModel>(
			`/api/DespatchOutbox/checkSchemaSchematronForDespatchUBL`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Gönderimi XML - Tepe Bilisim
	 * [POST /api/DespatchOutbox/despatchOutboxTepeBilisim]
	 *
	 * Tepe bilişim firmasına ait xml standartındaki irsaliye xmlini göndermek için kullanılır.
	 */
	public async despatchOutboxTepeBilisim(
		data: Types.DespatchForUblXmlTepeBilisimModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchOutboxResultTepeBilisimModelResultModel> {
		return await this.httpClient.post<Types.DespatchOutboxResultTepeBilisimModelResultModel>(
			`/api/DespatchOutbox/despatchOutboxTepeBilisim`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye XML - Tepe Bilisim
	 * [GET /api/DespatchOutbox/getDespatchOutboxXMLAsZipTepeBilisim]
	 *
	 * İlgili irsaliyenin XML dosyasını zip olarak geri döner
	 */
	public async getDespatchOutboxXMLAsZipTepeBilisim(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/DespatchOutbox/getDespatchOutboxXMLAsZipTepeBilisim`,
			{ params }
		);
	}
	/**
	 * İrsaliye URL
	 * [GET /api/DespatchOutbox/getDespatchOutboxPublicUrl]
	 *
	 * Gönderilen irsaliyenin görüntülenmesini sağlayan URL'i döner
	 */
	public async getDespatchOutboxPublicUrl(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/DespatchOutbox/getDespatchOutboxPublicUrl`, {
			params,
		});
	}
	/**
	 * Giden İrsaliye Ekleme - NetleBelge
	 * [POST /api/DespatchOutbox/despatchOutboxNetleBelge]
	 *
	 * NetleBelge tipinde İrsaliye göndermek için kullanılır.
	 */
	public async despatchOutboxNetleBelge(
		data: Types.NetleBelgeRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.DespatchOutboxResultModelResultModel>(
			`/api/DespatchOutbox/despatchOutboxNetleBelge`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Ekleme Örnek JSON
	 * [GET /api/DespatchOutbox/createDespatchOutboxTestJson]
	 *
	 * İrsaliye Eklemek için örnek json oluşturur
	 */
	public async createDespatchOutboxTestJson(config?: MysoftRequestConfig): Promise<Types.DespatchOutboxModel> {
		return await this.httpClient.get<Types.DespatchOutboxModel>(
			`/api/DespatchOutbox/createDespatchOutboxTestJson`,
			config
		);
	}
	/**
	 * Giden İrsaliye Yanıt Ekleme
	 * [POST /api/ReceiptOutbox/receiptOutbox]
	 *
	 * Giden İrsaliye Yanıt Ekleme çağrısıdır. GİB'e direkt gönderilecek irsaliye yanıtları için bu metod kullanılır.
	 */
	public async receiptOutbox(
		data: Types.ReceiptOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.ReceiptOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.ReceiptOutboxResultModelResultModel>(
			`/api/ReceiptOutbox/receiptOutbox`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Yanıtı XML Gönderimi
	 * [POST /api/ReceiptOutbox/receiptOutboxWithUblXml]
	 *
	 * GİB'e gönderilecek UBL xml formatındaki irsaliye yanıtının gönderimi için kullanılır.
	 */
	public async receiptOutboxWithUblXml(
		data: Types.ReceiptForUblXmlModel,
		config?: MysoftRequestConfig
	): Promise<Types.ReceiptOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.ReceiptOutboxResultModelResultModel>(
			`/api/ReceiptOutbox/receiptOutboxWithUblXml`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Yanıtı Değişenler
	 * [POST /api/ReceiptOutbox/getReceiptOutboxStatusChanged]
	 *
	 * İlgili tarih aralığında durumları değişen irsaliye yanıtlarını dönen metoddur.
	 */
	public async getReceiptOutboxStatusChanged(
		data: Types.GetReceiptOutboxStatusChangedRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ReceiptOutboxStatusResultModelListResultModel> {
		return await this.httpClient.post<Types.ReceiptOutboxStatusResultModelListResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxStatusChanged`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Yanıt Durumu
	 * [GET /api/ReceiptOutbox/getReceiptOutboxStatus]
	 *
	 * Bir irsaliye yanıtı durum bilgisini dönen metod.
	 */
	public async getReceiptOutboxStatus(
		params?: Record<string, unknown>
	): Promise<Types.ReceiptOutboxStatusResultModelResultModel> {
		return await this.httpClient.get<Types.ReceiptOutboxStatusResultModelResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxStatus`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye Yanıtı PDF
	 * [GET /api/ReceiptOutbox/getReceiptOutboxPdfAsZip]
	 *
	 * İlgili irsaliye yanıtının PDF dosyasını zip olarak geri dönen metod
	 */
	public async getReceiptOutboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/ReceiptOutbox/getReceiptOutboxPdfAsZip`, {
			params,
		});
	}
	/**
	 * Giden İrsaliye Yanıtı PDF - İrsaliye ETTN
	 * [GET /api/ReceiptOutbox/getReceiptOutboxWithDespatchEttnPdfAsZip]
	 *
	 * İlgili irsaliye yanıtının PDF dosyasını zip olarak geri dönen metod
	 */
	public async getReceiptOutboxWithDespatchEttnPdfAsZip(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxWithDespatchEttnPdfAsZip`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye Yanıtı XML
	 * [GET /api/ReceiptOutbox/getReceiptOutboxXMLAsZip]
	 *
	 * İlgili irsaliye yanıtının XML dosyasını zip olarak geri döner
	 */
	public async getReceiptOutboxXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/ReceiptOutbox/getReceiptOutboxXMLAsZip`, {
			params,
		});
	}
	/**
	 * Giden İrsaliye Yanıtı Zarf XML
	 * [GET /api/ReceiptOutbox/getReceiptOutboxEnvelopeXMLAsZip]
	 *
	 * İlgili irsaliye yanıtının Zarf XML dosyasını zip olarak geri döner
	 */
	public async getReceiptOutboxEnvelopeXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxEnvelopeXMLAsZip`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye Yanıtı XML - İrsaliye ETTN
	 * [GET /api/ReceiptOutbox/getReceiptOutboxWithDespatchETTNXMLAsZip]
	 *
	 * İlgili irsaliye yanıtının XML dosyasını zip olarak geri döner
	 */
	public async getReceiptOutboxWithDespatchETTNXMLAsZip(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxWithDespatchETTNXMLAsZip`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye Yanıt HTML
	 * [GET /api/ReceiptOutbox/getReceiptOutboxHTMLAsZip]
	 *
	 * İlgili irsaliye yanıtının HTML dosyasını zip olarak geri döner
	 */
	public async getReceiptOutboxHTMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/ReceiptOutbox/getReceiptOutboxHTMLAsZip`, {
			params,
		});
	}
	/**
	 * Giden İrsaliye Yanıt HTML - İrsaliye ETTN
	 * [GET /api/ReceiptOutbox/getReceiptOutboxWithDespatchETTNHTMLAsZip]
	 *
	 * İlgili irsaliye yanıtının HTML dosyasını zip olarak geri döner
	 */
	public async getReceiptOutboxWithDespatchETTNHTMLAsZip(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxWithDespatchETTNHTMLAsZip`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye Yanıtı XML ve Zarf
	 * [GET /api/ReceiptOutbox/getReceiptOutboxXMLWithEnvelopeInfoAsZip]
	 *
	 * İlgili faturanın XML dosyasını zip olarak geri döner
	 */
	public async getReceiptOutboxXMLWithEnvelopeInfoAsZip(
		params?: Record<string, unknown>
	): Promise<Types.ReceiptOutboxEnvelopeInfoResponseResultModel> {
		return await this.httpClient.get<Types.ReceiptOutboxEnvelopeInfoResponseResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxXMLWithEnvelopeInfoAsZip`,
			{ params }
		);
	}
	/**
	 * İrsaliye Yanıt Önizleme - PDF
	 * [POST /api/ReceiptOutbox/getReceiptOutboxDraftPdfAsZip]
	 *
	 * Verilen irsaliye yanıt nesnesinin PDF olarak çıktısını döner.
	 */
	public async getReceiptOutboxDraftPdfAsZip(
		data: Types.ReceiptOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxDraftPdfAsZip`,
			data,
			config
		);
	}
	/**
	 * İrsaliye Yanıt Önizleme - HTML
	 * [POST /api/ReceiptOutbox/getReceiptOutboxDraftHTMLAsZip]
	 *
	 * Verilen irsaliye yanıt nesnesinin HTML olarak çıktısını döner.
	 */
	public async getReceiptOutboxDraftHTMLAsZip(
		data: Types.ReceiptOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxDraftHTMLAsZip`,
			data,
			config
		);
	}
	/**
	 * İrsaliye Yanıt Önizleme XML - PDF
	 * [POST /api/ReceiptOutbox/getReceiptOutboxForUblXmlDraftPdfAsZip]
	 *
	 * Verilen irsaliye UBL xml'in PDF olarak çıktısını döner.
	 */
	public async getReceiptOutboxForUblXmlDraftPdfAsZip(
		data: Types.ReceiptForUblXmlDraftModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxForUblXmlDraftPdfAsZip`,
			data,
			config
		);
	}
	/**
	 * İrsaliye Yanıt Önizleme XML - HTML
	 * [POST /api/ReceiptOutbox/getReceiptOutboxForUblXmlDraftHTMLAsZip]
	 *
	 * Verilen irsaliye Yanıt UBL xml'in HTML olarak çıktısını döner.
	 */
	public async getReceiptOutboxForUblXmlDraftHTMLAsZip(
		data: Types.ReceiptForUblXmlDraftModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxForUblXmlDraftHTMLAsZip`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Yanıt Listesi
	 * [POST /api/ReceiptOutbox/getReceiptOutboxList]
	 *
	 * İlgili tarihler arasındaki irsaliye yanıt belgelerini listeler
	 */
	public async getReceiptOutboxList(
		data: Types.GetReceiptOutboxListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringListResultModel> {
		return await this.httpClient.post<Types.StringListResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxList`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Yanıt Listesi (Başlıklı)
	 * [POST /api/ReceiptOutbox/getReceiptOutboxWithHeaderInfoList]
	 *
	 * İlgili tarihler arasındaki irsaliye yanıt belgelerini Başlık bilgileriyle birlikte listeler
	 */
	public async getReceiptOutboxWithHeaderInfoList(
		data: Types.GetReceiptOutboxListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ReceiptHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.ReceiptHeaderInfoModelListResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxWithHeaderInfoList`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Yanıtı XML - Tepe Bilişim
	 * [POST /api/ReceiptOutbox/receiptOutboxTepeBilisim]
	 *
	 * Tepe bilişim firmasına ait xml standartındaki irsaliye yanıtı xmlini göndermek için kullanılır.
	 */
	public async receiptOutboxTepeBilisim(
		data: Types.ReceiptForUblXmlTepeBilisimModel,
		config?: MysoftRequestConfig
	): Promise<Types.ReceiptOutboxResultTepeBilisimModelResultModel> {
		return await this.httpClient.post<Types.ReceiptOutboxResultTepeBilisimModelResultModel>(
			`/api/ReceiptOutbox/receiptOutboxTepeBilisim`,
			data,
			config
		);
	}
	/**
	 * Giden İrsaliye Yanıtı XML - Tepe Bilişim
	 * [GET /api/ReceiptOutbox/getReceiptOutboxXMLAsZipTepeBilisim]
	 *
	 * İlgili irsaliye yanıtının Tepe Bilişime özel XML dosyasını zip olarak geri döner
	 */
	public async getReceiptOutboxXMLAsZipTepeBilisim(
		params?: Record<string, unknown>
	): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ReceiptOutbox/getReceiptOutboxXMLAsZipTepeBilisim`,
			{ params }
		);
	}
	/**
	 * Giden İrsaliye Yanıt Ekleme Örnek JSON
	 * [GET /api/ReceiptOutbox/createReceiptOutboxTestJson]
	 *
	 * İrsaliye Yanıt Eklemek için örnek json oluşturur
	 */
	public async createReceiptOutboxTestJson(config?: MysoftRequestConfig): Promise<Types.ReceiptOutboxModel> {
		return await this.httpClient.get<Types.ReceiptOutboxModel>(
			`/api/ReceiptOutbox/createReceiptOutboxTestJson`,
			config
		);
	}
	/**
	 * Portal İrsaliye Ekleme
	 * [POST /api/Despatch/despatchDraft]
	 *
	 * Portal İrsaliye Ekranına kayıt gönderir. Gönderilen kayıt taslak olarak kaydedilir. Gerekli düzenlemeler yapıldıktan sonra, Portal ekranından İmzala/Gönder yapılmalıdır.
	 */
	public async despatchDraft(
		data: Types.DespatchModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Despatch/despatchDraft`, data, config);
	}
	/**
	 * İrsaliye Ekleme Örnek JSON
	 * [GET /api/Despatch/createDespatchTestJson]
	 *
	 * İrsaliye Eklemek için örnek json oluşturur
	 */
	public async createDespatchTestJson(config?: MysoftRequestConfig): Promise<Types.DespatchModel> {
		return await this.httpClient.get<Types.DespatchModel>(`/api/Despatch/createDespatchTestJson`, config);
	}
	/**
	 * İrsaliye Model Liste
	 * [POST /api/Despatch/getDespatchModelList]
	 *
	 * İlgili irsaliyeyi, irsaliye modeli olarak dönen metod
	 */
	public async getDespatchModelList(
		data: Types.DespatchResultListForPeriodRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.DespatchResultModelListResultModel> {
		return await this.httpClient.post<Types.DespatchResultModelListResultModel>(
			`/api/Despatch/getDespatchModelList`,
			data,
			config
		);
	}
}
