import { BaseService } from "./base.service";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";

/**
 * Mysoft Portal Iframe Entegrasyon Servisi
 * Toplam 1 REST Endpoint içerir.
 */
export class IframeService extends BaseService {
	/**
	 * Iframe URL
	 * [POST /api/Iframe/getIframeUrl]
	 *
	 * Portala otomatik giriş için iframe url isteme çağrısıdır.
	 */
	public async getPortalUrl(
		data: Types.IframeLoginModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(`/api/Iframe/getIframeUrl`, data, config);
	}
}
