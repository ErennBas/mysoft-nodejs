import { BaseService } from "./base.service";
import { ApiResult } from "../types/common";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";
import {
	SendFreelancerVoucherRequest,
	SendProducerReceiptRequest,
	SendExpenseNoteRequest,
	VoucherSendResponse,
} from "../types/voucher.types";
import { SendInvoiceWithUblXmlRequest, SendInvoiceResponse } from "../types/invoice.types";
import { DateHelper } from "../utils/date-helper";

/**
 * E-Adisyon, E-Dekont, E-Döviz ve E-Gider Pusulası İşlemleri Servisi
 * Toplam 40 REST Endpoint içerir.
 */
export class VoucherService extends BaseService {
	/**
	 * E-SMM (Elektronik Serbest Meslek Makbuzu) gönderir.
	 */
	public async sendFreelancerVoucher(request: SendFreelancerVoucherRequest): Promise<ApiResult<VoucherSendResponse>> {
		const payload = {
			...request,
			issueDate: DateHelper.toDateString(request.issueDate) || DateHelper.today(),
		};
		return await this.httpClient.post<ApiResult<VoucherSendResponse>>("/api/Receipt/receiptOutbox", payload);
	}

	/**
	 * E-SMM UBL XML gönderir.
	 */
	public async sendSmmWithUblXml(request: SendInvoiceWithUblXmlRequest): Promise<ApiResult<SendInvoiceResponse>> {
		return await this.httpClient.post<ApiResult<SendInvoiceResponse>>(
			"/api/InvoiceOutbox/invoiceOutboxWithUblXml",
			{
				...request,
				eDocumentType: "ESMM",
			}
		);
	}

	/**
	 * E-Müstahsil Makbuzu gönderir.
	 */
	public async sendProducerReceipt(request: SendProducerReceiptRequest): Promise<ApiResult<VoucherSendResponse>> {
		const payload = {
			...request,
			issueDate: DateHelper.toDateString(request.issueDate) || DateHelper.today(),
		};
		return await this.httpClient.post<ApiResult<VoucherSendResponse>>(
			"/api/ExpenseNote/expenseNoteOutbox",
			payload
		);
	}

	/**
	 * E-Müstahsil UBL XML gönderir.
	 */
	public async sendProducerVoucherWithUblXml(
		request: SendInvoiceWithUblXmlRequest
	): Promise<ApiResult<SendInvoiceResponse>> {
		return await this.httpClient.post<ApiResult<SendInvoiceResponse>>(
			"/api/InvoiceOutbox/invoiceOutboxWithUblXml",
			{
				...request,
				eDocumentType: "EMUSTAHSIL",
			}
		);
	}

	/**
	 * E-Gider Pusulası belgesi gönderir.
	 */
	public async sendExpenseNote(request: SendExpenseNoteRequest): Promise<ApiResult<VoucherSendResponse>> {
		const payload = {
			...request,
			issueDate: DateHelper.toDateString(request.issueDate) || DateHelper.today(),
		};
		return await this.httpClient.post<ApiResult<VoucherSendResponse>>(
			"/api/ExpenseNote/expenseNoteOutbox",
			payload
		);
	}

	/**
	 * Adisyon Belgesi
	 * [POST /api/BillDocument/billDocumentOutbox]
	 *
	 * Adisyon Belgesi ekleme çağrısıdır. GİB'e direkt gönderilecek adisyon belgeleri için bu metod kullanılır.
	 */
	public async billDocumentOutbox(
		data: Types.BillDocumentOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.BillDocumentOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.BillDocumentOutboxResultModelResultModel>(
			`/api/BillDocument/billDocumentOutbox`,
			data,
			config
		);
	}
	/**
	 * Adisyon Belgesi XML Gönderimi
	 * [POST /api/BillDocument/billDocumentOutboxWithUblXml]
	 *
	 * GİB'e gönderilecek UBL xml formatındaki adisyon belgesinin gönderimi için kullanılır.
	 */
	public async billDocumentOutboxWithUblXml(
		data: Types.BillDocumentForUblXmlModel,
		config?: MysoftRequestConfig
	): Promise<Types.BillDocumentOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.BillDocumentOutboxResultModelResultModel>(
			`/api/BillDocument/billDocumentOutboxWithUblXml`,
			data,
			config
		);
	}
	/**
	 * Adisyon Belgesi İptal
	 * [GET /api/BillDocument/cancelBillDocumentOutbox]
	 *
	 * Adisyon belgesinin iptal işlemini yapar
	 */
	public async cancelBillDocumentOutbox(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/BillDocument/cancelBillDocumentOutbox`, {
			params,
		});
	}
	/**
	 * Adisyon Belgesi Durum Değişenler
	 * [POST /api/BillDocument/getBillDocumentOutboxStatusChanged]
	 *
	 * İlgili tarih aralığında durumları değişen adisyon belgelerini dönen metoddur.
	 */
	public async getBillDocumentOutboxStatusChanged(
		data: Types.GetBillDocumentOutboxStatusChangedRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.BillDocumentOutboxStatusResultModelListResultModel> {
		return await this.httpClient.post<Types.BillDocumentOutboxStatusResultModelListResultModel>(
			`/api/BillDocument/getBillDocumentOutboxStatusChanged`,
			data,
			config
		);
	}
	/**
	 * Adisyon Durum Sorgu
	 * [GET /api/BillDocument/getBillDocumentOutboxStatus]
	 *
	 * Bir adisyon belgesinin durum bilgisini dönen metod.
	 */
	public async getBillDocumentOutboxStatus(
		params?: Record<string, unknown>
	): Promise<Types.BillDocumentOutboxStatusResultModelResultModel> {
		return await this.httpClient.get<Types.BillDocumentOutboxStatusResultModelResultModel>(
			`/api/BillDocument/getBillDocumentOutboxStatus`,
			{ params }
		);
	}
	/**
	 * Adisyon PDF
	 * [GET /api/BillDocument/getBillDocumentOutboxPdfAsZip]
	 *
	 * İlgili adisyonun PDF dosyasını zip olarak geri dönen metod
	 */
	public async getBillDocumentOutboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/BillDocument/getBillDocumentOutboxPdfAsZip`, {
			params,
		});
	}
	/**
	 * Adisyon XML
	 * [GET /api/BillDocument/getBillDocumentOutboxXMLAsZip]
	 *
	 * İlgili adisyonun XML dosyasını zip olarak geri dönen metod
	 */
	public async getBillDocumentOutboxXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/BillDocument/getBillDocumentOutboxXMLAsZip`, {
			params,
		});
	}
	/**
	 * Adisyon HTML
	 * [GET /api/BillDocument/getBillDocumentOutboxHTMLAsZip]
	 *
	 * İlgili adisyonun HTML dosyasını zip olarak geri dönen metod
	 */
	public async getBillDocumentOutboxHTMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/BillDocument/getBillDocumentOutboxHTMLAsZip`, {
			params,
		});
	}
	/**
	 * Adisyon Önizleme - PDF
	 * [POST /api/BillDocument/getBillDocumentOutboxDraftPdfAsZip]
	 *
	 * Verilen adisyon nesnesinin PDF olarak çıktısını döner.
	 */
	public async getBillDocumentOutboxDraftPdfAsZip(
		data: Types.BillDocumentOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/BillDocument/getBillDocumentOutboxDraftPdfAsZip`,
			data,
			config
		);
	}
	/**
	 * Adisyon Önizleme - HTML
	 * [POST /api/BillDocument/getBillDocumentOutboxDraftHTMLAsZip]
	 *
	 * Verilen adisyon nesnesinin HTML olarak çıktısını döner.
	 */
	public async getBillDocumentOutboxDraftHTMLAsZip(
		data: Types.BillDocumentOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/BillDocument/getBillDocumentOutboxDraftHTMLAsZip`,
			data,
			config
		);
	}
	/**
	 * Adisyon Önizleme - XML
	 * [POST /api/BillDocument/getBillDocumentOutboxDraftXMLAsZip]
	 *
	 * Verilen adisyon nesnesinin XML olarak çıktısını döner.
	 */
	public async getBillDocumentOutboxDraftXMLAsZip(
		data: Types.BillDocumentOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/BillDocument/getBillDocumentOutboxDraftXMLAsZip`,
			data,
			config
		);
	}
	/**
	 * Adisyon Listesi
	 * [POST /api/BillDocument/getBillDocumentOutboxWithHeaderInfoList]
	 *
	 * İlgili tarihler arasındaki e-fatura ve e-arşiv belgelerini başlık bilgileriyle birlikte listeler
	 */
	public async getBillDocumentOutboxWithHeaderInfoList(
		data: Types.GetBillDocumentOutboxListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.BillDocumentInfoModelListResultModel> {
		return await this.httpClient.post<Types.BillDocumentInfoModelListResultModel>(
			`/api/BillDocument/getBillDocumentOutboxWithHeaderInfoList`,
			data,
			config
		);
	}
	/**
	 * Dekont Belgesi
	 * [POST /api/BankReceipt/bankReceiptOutbox]
	 *
	 * Dekont Belgesi ekleme çağrısıdır. GİB'e direkt gönderilecek dekont belgeleri için bu metod kullanılır.
	 */
	public async bankReceiptOutbox(
		data: Types.BankReceiptOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.BankReceiptOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.BankReceiptOutboxResultModelResultModel>(
			`/api/BankReceipt/bankReceiptOutbox`,
			data,
			config
		);
	}
	/**
	 * Dekont Belgesi İptal
	 * [GET /api/BankReceipt/cancelBankReceiptOutbox]
	 *
	 * Dekont belgesinin iptal işlemini yapar
	 */
	public async cancelBankReceiptOutbox(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/BankReceipt/cancelBankReceiptOutbox`, {
			params,
		});
	}
	/**
	 * Dekont XML
	 * [GET /api/BankReceipt/getBankReceiptOutboxXMLAsZip]
	 *
	 * İlgili dekontun XML dosyasını zip olarak geri dönen metod
	 */
	public async getBankReceiptOutboxXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/BankReceipt/getBankReceiptOutboxXMLAsZip`, {
			params,
		});
	}
	/**
	 * Dekont HTML
	 * [GET /api/BankReceipt/getBankReceiptOutboxHTMLAsZip]
	 *
	 * İlgili dekontun HTML dosyasını zip olarak geri dönen metod
	 */
	public async getBankReceiptOutboxHTMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/BankReceipt/getBankReceiptOutboxHTMLAsZip`, {
			params,
		});
	}
	/**
	 * Dekont PDF
	 * [GET /api/BankReceipt/getBankReceiptOutboxPdfAsZip]
	 *
	 * İlgili dekont PDF dosyasını zip olarak geri dönen metod
	 */
	public async getBankReceiptOutboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/BankReceipt/getBankReceiptOutboxPdfAsZip`, {
			params,
		});
	}
	/**
	 * Döviz/Kıymetli Maden Belgesi
	 * [POST /api/ForeignExchange/foreginExchangeOutbox]
	 *
	 * Döviz/Kıymetli Maden Belgesi ekleme çağrısıdır. GİB'e direkt gönderilecek Döviz/Kıymetli Maden belgeleri için bu metod kullanılır.
	 */
	public async foreignExchangeOutbox(
		data: Types.ForeignExchangeOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.ForeignExchangeOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.ForeignExchangeOutboxResultModelResultModel>(
			`/api/ForeignExchange/foreginExchangeOutbox`,
			data,
			config
		);
	}
	/**
	 * Döviz/Kıymetli Maden Belgesi XML Gönderimi
	 * [POST /api/ForeignExchange/foreignExchangeOutboxWithUblXml]
	 *
	 * GİB'e gönderilecek UBL xml formatındaki Döviz/Kıymetli Maden belgesinin gönderimi için kullanılır.
	 */
	public async foreignExchangeOutboxWithUblXml(
		data: Types.ForeignExchangeForUblXmlModel,
		config?: MysoftRequestConfig
	): Promise<Types.ForeignExchangeOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.ForeignExchangeOutboxResultModelResultModel>(
			`/api/ForeignExchange/foreignExchangeOutboxWithUblXml`,
			data,
			config
		);
	}
	/**
	 * Döviz/Kıymetli Maden Belgesi İptal
	 * [GET /api/ForeignExchange/cancelForeignExchangeOutbox]
	 *
	 * Döviz/Kıymetli Maden belgesinin iptal işlemini yapar
	 */
	public async cancelForeignExchangeOutbox(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/ForeignExchange/cancelForeignExchangeOutbox`, {
			params,
		});
	}
	/**
	 * Döviz/Kıymetli Maden Belgesi Durum Değişenler
	 * [POST /api/ForeignExchange/getforeignExchangeOutboxStatusChanged]
	 *
	 * İlgili tarih aralığında durumları değişen Döviz/Kıymetli Maden belgelerini dönen metoddur.
	 */
	public async getForeignExchangeOutboxStatusChanged(
		data: Types.GetForeignExchangeOutboxStatusChangedRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ForeignExchangeOutboxStatusResultModelListResultModel> {
		return await this.httpClient.post<Types.ForeignExchangeOutboxStatusResultModelListResultModel>(
			`/api/ForeignExchange/getforeignExchangeOutboxStatusChanged`,
			data,
			config
		);
	}
	/**
	 * Döviz/Kıymetli Maden Belge Durum Sorgu
	 * [GET /api/ForeignExchange/getForeignExchangeOutboxStatus]
	 *
	 * Bir Döviz/Kıymetli Maden belgesinin durum bilgisini dönen metod.
	 */
	public async getForeignExchangeOutboxStatus(
		params?: Record<string, unknown>
	): Promise<Types.ForeignExchangeOutboxStatusResultModelResultModel> {
		return await this.httpClient.get<Types.ForeignExchangeOutboxStatusResultModelResultModel>(
			`/api/ForeignExchange/getForeignExchangeOutboxStatus`,
			{ params }
		);
	}
	/**
	 * Döviz/Kıymetli Maden Belge PDF
	 * [GET /api/ForeignExchange/getForeignExchangeOutboxPdfAsZip]
	 *
	 * İlgili Döviz/Kıymetli Maden belgesinin PDF dosyasını zip olarak geri dönen metod
	 */
	public async getForeignExchangeOutboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ForeignExchange/getForeignExchangeOutboxPdfAsZip`,
			{ params }
		);
	}
	/**
	 * Döviz/Kıymetli Maden Belge XML
	 * [GET /api/ForeignExchange/getForeignExchangeOutboxXMLAsZip]
	 *
	 * İlgili Döviz/Kıymetli Maden belgesinin XML dosyasını zip olarak geri döner
	 */
	public async getForeignExchangeOutboxXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ForeignExchange/getForeignExchangeOutboxXMLAsZip`,
			{ params }
		);
	}
	/**
	 * Döviz/Kıymetli Maden Belge HTML
	 * [GET /api/ForeignExchange/getForeignExchangeOutboxHTMLAsZip]
	 *
	 * İlgili Döviz/Kıymetli Maden belgesinin HTML dosyasını zip olarak geri dönen metod
	 */
	public async getForeignExchangeOutboxHTMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ForeignExchange/getForeignExchangeOutboxHTMLAsZip`,
			{ params }
		);
	}
	/**
	 * Döviz/Kıymetli Maden Belge Listesi
	 * [POST /api/ForeignExchange/getForeignExchangeOutboxList]
	 *
	 * İlgili tarihler arasındaki Döviz/Kıymetli Maden belgelerini listeler
	 */
	public async getForeignExchangeOutboxList(
		data: Types.GetForeignExchangeOutboxListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringListResultModel> {
		return await this.httpClient.post<Types.StringListResultModel>(
			`/api/ForeignExchange/getForeignExchangeOutboxList`,
			data,
			config
		);
	}
	/**
	 * Döviz/Kıymetli Maden Belge Listesi (Başlıklı)
	 * [POST /api/ForeignExchange/getForeignExchangeOutboxWithHeaderInfoList]
	 *
	 * İlgili tarihler arasındaki Döviz/Kıymetli Maden belgelerini başlık bilgileriyle birlikte listeler
	 */
	public async getInvoiceOutboxWithHeaderInfoList(
		data: Types.GetForeignExchangeOutboxListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ForeignExchangeHeaderInfoModelListResultModel> {
		return await this.httpClient.post<Types.ForeignExchangeHeaderInfoModelListResultModel>(
			`/api/ForeignExchange/getForeignExchangeOutboxWithHeaderInfoList`,
			data,
			config
		);
	}
	/**
	 * Döviz/Kıymetli Maden belgesi Ekleme Örnek JSON
	 * [GET /api/ForeignExchange/createForeignExchangeOutboxTestJson]
	 *
	 * Döviz/Kıymetli Maden belgesi Eklemek için örnek json oluşturur
	 */
	public async createForeignExchangeOutboxTestJson(
		config?: MysoftRequestConfig
	): Promise<Types.ForeignExchangeOutboxModel> {
		return await this.httpClient.get<Types.ForeignExchangeOutboxModel>(
			`/api/ForeignExchange/createForeignExchangeOutboxTestJson`,
			config
		);
	}
	/**
	 * Gider Pusulası Belgesi
	 * [POST /api/ExpenseVoucher/expenseVoucherOutbox]
	 *
	 * Gider Pusulası Belgesi ekleme çağrısıdır. GİB'e direkt gönderilecek gider pusulası belgeleri için bu metod kullanılır.
	 */
	public async expenseVoucherOutbox(
		data: Types.ExpenseVoucherOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.ExpenseVoucherOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.ExpenseVoucherOutboxResultModelResultModel>(
			`/api/ExpenseVoucher/expenseVoucherOutbox`,
			data,
			config
		);
	}
	/**
	 * Gider Pusulası Belgesi UBL XML Gönderimi
	 * [POST /api/ExpenseVoucher/expenseVoucherOutboxWithUblXml]
	 *
	 * GİB'e gönderilecek UBL xml formatındaki gider pusulası belgesinin gönderimi için kullanılır.
	 */
	public async expenseVoucherOutboxWithUblXml(
		data: Types.ExpenseVoucherForUblXmlModel,
		config?: MysoftRequestConfig
	): Promise<Types.ExpenseVoucherOutboxResultModelResultModel> {
		return await this.httpClient.post<Types.ExpenseVoucherOutboxResultModelResultModel>(
			`/api/ExpenseVoucher/expenseVoucherOutboxWithUblXml`,
			data,
			config
		);
	}
	/**
	 * Gider Pusulası Belgesi İptal
	 * [GET /api/ExpenseVoucher/cancelExpenseVoucherOutbox]
	 *
	 * Gider pusulası belgesinin iptal işlemini yapar.
	 */
	public async cancelExpenseVoucherOutbox(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/ExpenseVoucher/cancelExpenseVoucherOutbox`, {
			params,
		});
	}
	/**
	 * Gider Pusulası Belgesi Durum Değişenler
	 * [POST /api/ExpenseVoucher/getExpenseVoucherOutboxStatusChanged]
	 *
	 * İlgili tarih aralığında durumları değişen gider pusulası belgelerini dönen metoddur.
	 */
	public async getExpenseVoucherOutboxStatusChanged(
		data: Types.GetExpenseVoucherOutboxStatusChangedRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ExpenseVoucherOutboxStatusResultModelListResultModel> {
		return await this.httpClient.post<Types.ExpenseVoucherOutboxStatusResultModelListResultModel>(
			`/api/ExpenseVoucher/getExpenseVoucherOutboxStatusChanged`,
			data,
			config
		);
	}
	/**
	 * Gider Pusulası Durum Sorgu
	 * [GET /api/ExpenseVoucher/getExpenseVoucherOutboxStatus]
	 *
	 * Bir gider pusulası belgesinin durum bilgisini dönen metod.
	 */
	public async getExpenseVoucherOutboxStatus(
		params?: Record<string, unknown>
	): Promise<Types.ExpenseVoucherOutboxStatusResultModelResultModel> {
		return await this.httpClient.get<Types.ExpenseVoucherOutboxStatusResultModelResultModel>(
			`/api/ExpenseVoucher/getExpenseVoucherOutboxStatus`,
			{ params }
		);
	}
	/**
	 * Gider Pusulası PDF
	 * [GET /api/ExpenseVoucher/getExpenseVoucherOutboxPdfAsZip]
	 *
	 * İlgili gider pusulasının PDF dosyasını zip olarak geri dönen metod
	 */
	public async getExpenseVoucherOutboxPdfAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ExpenseVoucher/getExpenseVoucherOutboxPdfAsZip`,
			{ params }
		);
	}
	/**
	 * Gider Pusulası XML
	 * [GET /api/ExpenseVoucher/getExpenseVoucherOutboxXMLAsZip]
	 *
	 * İlgili gider pusulasının XML dosyasını zip olarak geri dönen metod
	 */
	public async getExpenseVoucherOutboxXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ExpenseVoucher/getExpenseVoucherOutboxXMLAsZip`,
			{ params }
		);
	}
	/**
	 * Gider Pusulası HTML
	 * [GET /api/ExpenseVoucher/getExpenseVoucherOutboxHTMLAsZip]
	 *
	 * İlgili gider pusulasının HTML dosyasını zip olarak geri dönen metod
	 */
	public async getExpenseVoucherOutboxHTMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(
			`/api/ExpenseVoucher/getExpenseVoucherOutboxHTMLAsZip`,
			{ params }
		);
	}
	/**
	 * Gider Pusulası Önizleme - PDF
	 * [POST /api/ExpenseVoucher/getExpenseVoucherOutboxDraftPdfAsZip]
	 *
	 * Verilen gider pusulası nesnesinin PDF olarak çıktısını döner.
	 */
	public async getExpenseVoucherOutboxDraftPdfAsZip(
		data: Types.ExpenseVoucherOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/ExpenseVoucher/getExpenseVoucherOutboxDraftPdfAsZip`,
			data,
			config
		);
	}
	/**
	 * Gider Pusulası Önizleme - HTML
	 * [POST /api/ExpenseVoucher/getExpenseVoucherOutboxDraftHTMLAsZip]
	 *
	 * Verilen gider pusulası nesnesinin HTML olarak çıktısını döner.
	 */
	public async getExpenseVoucherOutboxDraftHTMLAsZip(
		data: Types.ExpenseVoucherOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/ExpenseVoucher/getExpenseVoucherOutboxDraftHTMLAsZip`,
			data,
			config
		);
	}
	/**
	 * Gider Pusulası Önizleme - XML
	 * [POST /api/ExpenseVoucher/getExpenseVoucherOutboxDraftXMLAsZip]
	 *
	 * Verilen gider pusulası nesnesinin XML olarak çıktısını döner.
	 */
	public async getExpenseVoucherOutboxDraftXMLAsZip(
		data: Types.ExpenseVoucherOutboxModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(
			`/api/ExpenseVoucher/getExpenseVoucherOutboxDraftXMLAsZip`,
			data,
			config
		);
	}
	/**
	 * Gider Pusulası Listesi
	 * [POST /api/ExpenseVoucher/getExpenseVoucherOutboxWithHeaderInfoList]
	 *
	 * İlgili tarihler arasındaki gider pusulası belgelerini başlık bilgileriyle birlikte listeler
	 */
	public async getExpenseVoucherOutboxWithHeaderInfoList(
		data: Types.GetExpenseVoucherOutboxListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ExpenseVoucherInfoModelListResultModel> {
		return await this.httpClient.post<Types.ExpenseVoucherInfoModelListResultModel>(
			`/api/ExpenseVoucher/getExpenseVoucherOutboxWithHeaderInfoList`,
			data,
			config
		);
	}
}
