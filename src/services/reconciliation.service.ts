import { BaseService } from "./base.service";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";

/**
 * Cari Mutabakat İşlemleri Servisi
 * Toplam 1 REST Endpoint içerir.
 */
export class ReconciliationService extends BaseService {
	/**
	 * Cari mutabakat oluşturma işlemi
	 * [POST /api/Agreement/createAccountAgreement]
	 *
	 */
	public async createAccountAgreement(
		data: Types.AccountAgreementApiModel,
		config?: MysoftRequestConfig
	): Promise<Types.CreateAccountAgreementResultModelResultModel> {
		return await this.httpClient.post<Types.CreateAccountAgreementResultModelResultModel>(
			`/api/Agreement/createAccountAgreement`,
			data,
			config
		);
	}
}
