import { BaseService } from "./base.service";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";

/**
 * Ön Muhasebe ve Bakiye Raporları Servisi
 * Toplam 13 REST Endpoint içerir.
 */
export class AccountingService extends BaseService {
	/**
	 * Banka Bakiyeleri Bilgileri
	 * [GET /api/PreAccounting/bankAccountBalance]
	 *
	 * Banka Bakiyeleri listesini döner
	 */
	public async bankAccountBalance(
		config?: MysoftRequestConfig
	): Promise<Types.BankAccountBalanceResultModelQueryResultList> {
		return await this.httpClient.get<Types.BankAccountBalanceResultModelQueryResultList>(
			`/api/PreAccounting/bankAccountBalance`,
			config
		);
	}
	/**
	 * Kasa Bakiyeleri Bilgileri
	 * [GET /api/PreAccounting/cashboxBalance]
	 *
	 * Kasa Bakiyeleri listesini döner
	 */
	public async cashboxBalance(config?: MysoftRequestConfig): Promise<Types.CashboxBalanceResultModelQueryResultList> {
		return await this.httpClient.get<Types.CashboxBalanceResultModelQueryResultList>(
			`/api/PreAccounting/cashboxBalance`,
			config
		);
	}
	/**
	 * Cari Dövizli Bakiyeleri
	 * [GET /api/PreAccounting/accountCurrencyBalance]
	 *
	 * Cari Dövizli Bakiyeleri listesini döner
	 */
	public async accountCurrencyBalance(
		config?: MysoftRequestConfig
	): Promise<Types.AccountCurrencyBalanceResultModelQueryResultList> {
		return await this.httpClient.get<Types.AccountCurrencyBalanceResultModelQueryResultList>(
			`/api/PreAccounting/accountCurrencyBalance`,
			config
		);
	}
	/**
	 * Cari TL Bakiyeleri
	 * [POST /api/PreAccounting/accountTurkishLiraBalance]
	 *
	 * Cari TL Bakiyeleri listesini döner
	 */
	public async accountTurkishLiraBalance(
		data: Types.AccountTurkishLiraBalanceRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.AccountTurkishLiraBalanceResultModelQueryResultList> {
		return await this.httpClient.post<Types.AccountTurkishLiraBalanceResultModelQueryResultList>(
			`/api/PreAccounting/accountTurkishLiraBalance`,
			data,
			config
		);
	}
	/**
	 * Çek Senet Durumları
	 * [GET /api/PreAccounting/chequeBillStatus]
	 *
	 * Çek Senet Durumları listesini döner
	 */
	public async chequeBillStatus(
		config?: MysoftRequestConfig
	): Promise<Types.ChequeBillStatusResultModelQueryResultList> {
		return await this.httpClient.get<Types.ChequeBillStatusResultModelQueryResultList>(
			`/api/PreAccounting/chequeBillStatus`,
			config
		);
	}
	/**
	 * Stok Ekstresi
	 * [GET /api/PreAccounting/stockStatement]
	 *
	 * Stok Ekstresi listesini döner
	 */
	public async stockStatement(config?: MysoftRequestConfig): Promise<Types.StockStatementResultModelQueryResultList> {
		return await this.httpClient.get<Types.StockStatementResultModelQueryResultList>(
			`/api/PreAccounting/stockStatement`,
			config
		);
	}
	/**
	 * Cari Hareketleri
	 * [GET /api/PreAccounting/accountTransaction]
	 *
	 * Cari Hareketleri listesini döner
	 */
	public async accountTransaction(
		config?: MysoftRequestConfig
	): Promise<Types.AccountTransactionResultModelQueryResultList> {
		return await this.httpClient.get<Types.AccountTransactionResultModelQueryResultList>(
			`/api/PreAccounting/accountTransaction`,
			config
		);
	}
	/**
	 * Tahsilat Listesi
	 * [GET /api/PreAccounting/collectionList]
	 *
	 * Tahsilat Listesini döner
	 */
	public async collectionList(config?: MysoftRequestConfig): Promise<Types.CollectionListResultModelQueryResultList> {
		return await this.httpClient.get<Types.CollectionListResultModelQueryResultList>(
			`/api/PreAccounting/collectionList`,
			config
		);
	}
	/**
	 * Ödeme Listesi
	 * [GET /api/PreAccounting/paymentList]
	 *
	 * Ödeme Listesini döner
	 */
	public async paymentList(config?: MysoftRequestConfig): Promise<Types.PaymentListResultModelQueryResultList> {
		return await this.httpClient.get<Types.PaymentListResultModelQueryResultList>(
			`/api/PreAccounting/paymentList`,
			config
		);
	}
	/**
	 * Faturalar
	 * [GET /api/PreAccounting/invoiceList]
	 *
	 * Fatura Listesini döner
	 */
	public async invoiceList(config?: MysoftRequestConfig): Promise<Types.InvoiceListResultModelQueryResultList> {
		return await this.httpClient.get<Types.InvoiceListResultModelQueryResultList>(
			`/api/PreAccounting/invoiceList`,
			config
		);
	}
	/**
	 * Fatura Kalemleri Bilgileri
	 * [GET /api/PreAccounting/invoiceItems]
	 *
	 * Fatura Kalemleri listesini döner
	 */
	public async invoiceItems(config?: MysoftRequestConfig): Promise<Types.InvoiceItemsResultModelQueryResultList> {
		return await this.httpClient.get<Types.InvoiceItemsResultModelQueryResultList>(
			`/api/PreAccounting/invoiceItems`,
			config
		);
	}
	/**
	 * İrsaliyeler
	 * [GET /api/PreAccounting/despatchList]
	 *
	 * İrsaliye Listesini döner
	 */
	public async despatchList(config?: MysoftRequestConfig): Promise<Types.DespatchListResultModelQueryResultList> {
		return await this.httpClient.get<Types.DespatchListResultModelQueryResultList>(
			`/api/PreAccounting/despatchList`,
			config
		);
	}
	/**
	 * İrsaliye Kalemleri Bilgileri
	 * [GET /api/PreAccounting/despatchItems]
	 *
	 * İrsaliye Kalemleri listesini döner
	 */
	public async despatchItems(config?: MysoftRequestConfig): Promise<Types.DespatchItemsResultModelQueryResultList> {
		return await this.httpClient.get<Types.DespatchItemsResultModelQueryResultList>(
			`/api/PreAccounting/despatchItems`,
			config
		);
	}
}
