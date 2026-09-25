import { BaseService } from "./base.service";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";

/**
 * Kampanya ve SMS Doğrulama İzin Yönetimi Servisi
 * Toplam 5 REST Endpoint içerir.
 */
export class CampaignService extends BaseService {
	/**
	 * İzin Gönder
	 * [POST /api/Campaign/sendConsent]
	 *
	 * İlgili telefon ve mail için izin gönderim metodudur.
	 */
	public async sendConsent(
		data: Types.ConsentsRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ConsentsResultModelResultModel> {
		return await this.httpClient.post<Types.ConsentsResultModelResultModel>(
			`/api/Campaign/sendConsent`,
			data,
			config
		);
	}
	/**
	 * Anlık SMS İzin Gönder
	 * [POST /api/Campaign/sendSMSConsentImmediate]
	 *
	 * İlgili telefon için anlık izin gönderim metodudur.
	 */
	public async sendSMSConsentImmediate(
		data: Types.ConsentSMSRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ConsentsResultModelResultModel> {
		return await this.httpClient.post<Types.ConsentsResultModelResultModel>(
			`/api/Campaign/sendSMSConsentImmediate`,
			data,
			config
		);
	}
	/**
	 * İzin Kontrol Et
	 * [GET /api/Campaign/checkConsentPermission]
	 *
	 * İlgili Mail/SMS bilgisinin izin durumlarını kontrol eder.
	 */
	public async checkConsentPermission(
		params?: Record<string, unknown>
	): Promise<Types.ConsentStatusResultModelListResultModel> {
		return await this.httpClient.get<Types.ConsentStatusResultModelListResultModel>(
			`/api/Campaign/checkConsentPermission`,
			{ params }
		);
	}
	/**
	 * KVKK İzin Kontrol
	 * [GET /api/Campaign/checkKVKKPermissionStatus]
	 *
	 * İlgili mail yada SMS için KVKK izninin alınıp alınmadığını kontrol eder.
	 */
	public async checkKVKKPermissionStatus(
		params?: Record<string, unknown>
	): Promise<Types.KVKKStatusResultModelListResultModel> {
		return await this.httpClient.get<Types.KVKKStatusResultModelListResultModel>(
			`/api/Campaign/checkKVKKPermissionStatus`,
			{ params }
		);
	}
	/**
	 * Doğrulama Kodu Onayla
	 * [GET /api/Campaign/confirmConsent]
	 *
	 * Gönderilen doğrulama koduyla eşleşen izin kaydını onaylamak için kullanılır.
	 */
	public async confirmConsent(params?: Record<string, unknown>): Promise<Types.BooleanResultModel> {
		return await this.httpClient.get<Types.BooleanResultModel>(`/api/Campaign/confirmConsent`, { params });
	}
}
