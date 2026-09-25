import { BaseService } from "./base.service";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";

/**
 * E-Defter ve Berat İşlemleri Servisi
 * Toplam 11 REST Endpoint içerir.
 */
export class BookService extends BaseService {
	/**
	 * Defter Listesi
	 * [GET /api/Book/getBook]
	 *
	 * Defter kayıtlarını döner
	 */
	public async getBookList(config?: MysoftRequestConfig): Promise<Types.BookModelQueryResultList> {
		return await this.httpClient.get<Types.BookModelQueryResultList>(`/api/Book/getBook`, config);
	}
	/**
	 * Defter Listesi
	 * [POST /api/Book/getBook]
	 *
	 * Defter kayıtlarını döner
	 */
	public async getBook(
		data: Types.BookRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.BookModelQueryResultList> {
		return await this.httpClient.post<Types.BookModelQueryResultList>(`/api/Book/getBook`, data, config);
	}
	/**
	 * Berat Listesi
	 * [GET /api/Book/getBookPatent]
	 *
	 * Berat kayıtlarını döner
	 */
	public async getBookPatentList(config?: MysoftRequestConfig): Promise<Types.BookPatentModelQueryResultList> {
		return await this.httpClient.get<Types.BookPatentModelQueryResultList>(`/api/Book/getBookPatent`, config);
	}
	/**
	 * Berat Listesi
	 * [POST /api/Book/getBookPatent]
	 *
	 * Berat kayıtlarını döner
	 */
	public async getBookPatent(
		data: Types.BookPatentRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.BookPatentModelQueryResultList> {
		return await this.httpClient.post<Types.BookPatentModelQueryResultList>(
			`/api/Book/getBookPatent`,
			data,
			config
		);
	}
	/**
	 * Yevmiye Defteri Belge Referans Listesi
	 * [GET /api/Book/getBookReceiptReference]
	 *
	 * Yevmiye Defteri Belge Referans Listesini Döner
	 */
	public async bookReceiptReferenceList(
		config?: MysoftRequestConfig
	): Promise<Types.BookReceiptReferenceModelQueryResultList> {
		return await this.httpClient.get<Types.BookReceiptReferenceModelQueryResultList>(
			`/api/Book/getBookReceiptReference`,
			config
		);
	}
	/**
	 * Yevmiye Defteri Belge Referans Listesi
	 * [POST /api/Book/getBookReceiptReference]
	 *
	 * Yevmiye Defteri Belge Referans Listesini Döner
	 */
	public async bookReceiptReference(
		data: Types.BookReceiptReferenceRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.BookReceiptReferenceModelQueryResultList> {
		return await this.httpClient.post<Types.BookReceiptReferenceModelQueryResultList>(
			`/api/Book/getBookReceiptReference`,
			data,
			config
		);
	}
	/**
	 * Defter XML
	 * [GET /api/Book/getBookXMLAsZip]
	 *
	 * Defter XML dosyasını zip (base64 string) olarak döner
	 */
	public async getBookXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/Book/getBookXMLAsZip`, { params });
	}
	/**
	 * Berat XML
	 * [GET /api/Book/getBookPatentXMLAsZip]
	 *
	 * Berat XML dosyasını zip (base64 string) olarak döner
	 */
	public async getBookPatentXMLAsZip(params?: Record<string, unknown>): Promise<Types.StringResultModel> {
		return await this.httpClient.get<Types.StringResultModel>(`/api/Book/getBookPatentXMLAsZip`, { params });
	}
	/**
	 * Defter Dönemi Paket Numarası Alma
	 * [POST /api/Book/getBookTempPackage]
	 *
	 * Defter kayıtlarını oluşturmak için gerekli olan Defter Dönemi Paket Numarasını döner
	 */
	public async getBookTempPackage(
		data: Types.BookTempPackageRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(`/api/Book/getBookTempPackage`, data, config);
	}
	/**
	 * Defter Yevmiye Kaydı Oluşturma
	 * [POST /api/Book/createBookTempEntryHeader]
	 *
	 * Defter yevmiye kayıdı oluşturur
	 */
	public async createBookTempEntryHeader(
		data: Types.BookTempEntryHeaderModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Book/createBookTempEntryHeader`, data, config);
	}
	/**
	 * Defter Yevmiye Kaydı Silme
	 * [POST /api/Book/removeBookTempEntryHeader]
	 *
	 * Verilen paket numarasına sahip yevmiye kayıtlarını siler
	 */
	public async removeBookTempEntryHeader(
		data: Types.BookTempEntryHeaderRemoveModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Book/removeBookTempEntryHeader`, data, config);
	}
}
