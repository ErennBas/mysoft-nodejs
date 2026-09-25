import { BaseService } from "./base.service";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";

/**
 * Finans, Kasa ve Banka Hareketleri Servisi
 * Toplam 5 REST Endpoint içerir.
 */
export class FinanceService extends BaseService {
	/**
	 * Portal Finans Fişi Ekleme
	 * [POST /api/Finance/createFinanceReceipt]
	 *
	 * Portal Fatura Finans ekranına kayıt gönderir.
	 */
	public async createFinanceReceipt(
		data: Types.FinanceModel,
		config?: MysoftRequestConfig
	): Promise<Types.CreateFinanceResultModelResultModel> {
		return await this.httpClient.post<Types.CreateFinanceResultModelResultModel>(
			`/api/Finance/createFinanceReceipt`,
			data,
			config
		);
	}
	/**
	 * Detaylı Finans Listesi
	 * [GET /api/Finance/financeDetailedList]
	 *
	 * Detaylı Finans kayıtlarını döner
	 */
	public async financeDetailedList(
		config?: MysoftRequestConfig
	): Promise<Types.FinanceDetailedListResultModelQueryResultList> {
		return await this.httpClient.get<Types.FinanceDetailedListResultModelQueryResultList>(
			`/api/Finance/financeDetailedList`,
			config
		);
	}
	/**
	 * Portal  Muhasebe Fişi Ekleme
	 * [POST /api/Finance/createAccountReceipt]
	 *
	 * Portal Muhasebe Fişi ekranına kayıt gönderir.
	 */
	public async createAccountReceipt(
		data: Types.AccountReceiptModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Finance/createAccountReceipt`, data, config);
	}
	/**
	 * Banka Hareket Listesi
	 * [POST /api/Finance/getBankTransactionList]
	 *
	 * Banka hareket kayıtlarını döner
	 */
	public async getBankTransactionList(
		data: Types.BankTransactionRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.BankTransactionModelQueryResultList> {
		return await this.httpClient.post<Types.BankTransactionModelQueryResultList>(
			`/api/Finance/getBankTransactionList`,
			data,
			config
		);
	}
	/**
	 * Banka Hareketi Alındı
	 * [POST /api/Finance/bankTransactionSavedByCustomer]
	 *
	 * Banka hareketlerinin üzerine okundu işareti koymak için kullanılan metod
	 */
	public async bankTransactionSavedByCustomer(
		data: Types.BankTransactionSavedByCustomerRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.BooleanResultModel> {
		return await this.httpClient.post<Types.BooleanResultModel>(
			`/api/Finance/bankTransactionSavedByCustomer`,
			data,
			config
		);
	}
}
