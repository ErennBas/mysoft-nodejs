import { BaseService } from "./base.service";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";

/**
 * Sipariş Listesi ve Entegrasyonu Servisi
 * Toplam 1 REST Endpoint içerir.
 */
export class OrderService extends BaseService {
	/**
	 * Sipariş Listesi
	 * [POST /api/Order/getOrderList]
	 *
	 * Siparişleri liste olarak dönen metod
	 */
	public async getOrderList(
		data: Types.OrderResultListRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.OrderResultModelListResultModel> {
		return await this.httpClient.post<Types.OrderResultModelListResultModel>(
			`/api/Order/getOrderList`,
			data,
			config
		);
	}
}
