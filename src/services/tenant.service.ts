import { BaseService } from "./base.service";
import { ApiResult } from "../types/common";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";
import { TenantCreditInfo, TenantInfo, UpdateTenantInfoRequest, BranchInfo } from "../types/tenant.types";

/**
 * Firma Bilgileri, Kontör, Şube ve Yetkilendirme Servisi
 * Toplam 32 REST Endpoint içerir.
 */
export class TenantService extends BaseService {
	/**
	 * Firma kalan kontör ve kredi bakiyesini sorgular.
	 */
	public async getCreditInfo(): Promise<ApiResult<TenantCreditInfo>> {
		return await this.httpClient.get<ApiResult<TenantCreditInfo>>("/api/Firm/getCreditInfo");
	}

	/**
	 * Firmanın mevcut profil ve unvan bilgilerini getirir.
	 */
	public async getTenantInfo(): Promise<ApiResult<TenantInfo>> {
		return await this.httpClient.get<ApiResult<TenantInfo>>("/api/Firm/getFirmInfo");
	}

	/**
	 * Kiracı / Firma listesini sorgular.
	 */
	public async getTenants(afterValue = 0, limit = 10): Promise<ApiResult<TenantInfo[]>> {
		return await this.httpClient.get<ApiResult<TenantInfo[]>>(
			`/api/Firm/getTenant?afterValue=${afterValue}&limit=${limit}`
		);
	}

	/**
	 * Firma profil ve iletişim bilgilerini günceller.
	 */
	public async updateTenantInfo(request: UpdateTenantInfoRequest): Promise<ApiResult<TenantInfo>> {
		return await this.httpClient.post<ApiResult<TenantInfo>>("/api/Firm/updateFirmInfo", request);
	}

	/**
	 * Firmaya ait şube ve alt birimlerin listesini döner.
	 */
	public async getBranches(): Promise<ApiResult<BranchInfo[]>> {
		return await this.httpClient.get<ApiResult<BranchInfo[]>>("/api/Firm/getBranchList");
	}

	/**
	 * Firma Listesi
	 * [GET /api/Tenant/getTenant]
	 *
	 * İş ortağına tanımlı olan firmaların listesini döner
	 */
	public async getTenant(params?: Record<string, unknown>): Promise<Types.ApiTenantGetModelListResultModel> {
		return await this.httpClient.get<Types.ApiTenantGetModelListResultModel>(`/api/Tenant/getTenant`, { params });
	}
	/**
	 * Firma Sorgu
	 * [GET /api/Tenant/getTenantWithIdentifier]
	 *
	 * İş ortağına tanımlı olan ilgili vkn için firma tanımını döner
	 */
	public async getTenantWithIdentifier(
		params?: Record<string, unknown>
	): Promise<Types.ApiTenantGetModelListResultModel> {
		return await this.httpClient.get<Types.ApiTenantGetModelListResultModel>(
			`/api/Tenant/getTenantWithIdentifier`,
			{ params }
		);
	}
	/**
	 * Firma Bilgi
	 * [GET /api/Tenant/getTenantInfo]
	 *
	 * Firma vkn ile firma bilgileri sorgulama.
	 */
	public async getGetTenantInfo(params?: Record<string, unknown>): Promise<Types.ApiTenantViewModelResultModel> {
		return await this.httpClient.get<Types.ApiTenantViewModelResultModel>(`/api/Tenant/getTenantInfo`, { params });
	}
	/**
	 * Firma Nace Kdv Oranları
	 * [GET /api/Tenant/getTenantNaceList]
	 *
	 * Firma vkn ile firmaya ait nace ve bu nacelere bağlı kdv oranlarının listesidir.
	 */
	public async getTenantNaceList(
		params?: Record<string, unknown>
	): Promise<Types.ApiTenantNaceViewModelListResultModel> {
		return await this.httpClient.get<Types.ApiTenantNaceViewModelListResultModel>(`/api/Tenant/getTenantNaceList`, {
			params,
		});
	}
	/**
	 * Firma Adres Güncelle
	 * [POST /api/Tenant/UpdateTenantAddressInfo]
	 *
	 * Firmanın adres bilgilerini güncellemek için kullanılan metod
	 */
	public async updateTenantAddressInfo(
		data: Types.ApiTenantUpdateModel,
		config?: MysoftRequestConfig
	): Promise<Types.BooleanResultModel> {
		return await this.httpClient.post<Types.BooleanResultModel>(
			`/api/Tenant/UpdateTenantAddressInfo`,
			data,
			config
		);
	}
	/**
	 * Firma Ekleme
	 * [POST /api/Tenant/addTenant]
	 *
	 * Firma Ekleme Çağrısıdır
	 */
	public async addTenant(data: Types.ApiTenantModel, config?: MysoftRequestConfig): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Tenant/addTenant`, data, config);
	}
	/**
	 * Firma Sözleşme Ekleme
	 * [POST /api/Tenant/addTenantPreContract]
	 *
	 * Firma Sözleşme Ekleme Çağrısıdır
	 */
	public async addTenantPreContract(
		data: Types.ApiTenantPreContractModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Tenant/addTenantPreContract`, data, config);
	}
	/**
	 * Firma Sözleşme Listesi
	 * [GET /api/Tenant/getTenantPreContract]
	 *
	 * Firma Sözleşme Listesini döner
	 */
	public async getTenantPreContract(
		params?: Record<string, unknown>
	): Promise<Types.TenantPreContractGetModelListResultModel> {
		return await this.httpClient.get<Types.TenantPreContractGetModelListResultModel>(
			`/api/Tenant/getTenantPreContract`,
			{ params }
		);
	}
	/**
	 * Firma Aktivasyon Listesi
	 * [GET /api/Tenant/getTenantActivation]
	 *
	 * Firma Aktivasyon Listesini döner
	 */
	public async getTenantActivation(
		params?: Record<string, unknown>
	): Promise<Types.ApiTenantActivationGetModelListResultModel> {
		return await this.httpClient.get<Types.ApiTenantActivationGetModelListResultModel>(
			`/api/Tenant/getTenantActivation`,
			{ params }
		);
	}
	/**
	 * Firma Aktivasyon Ekleme
	 * [POST /api/Tenant/addTenantActivation]
	 *
	 * Firma Aktivasyon Ekleme Çağrısıdır
	 */
	public async addTenantActivation(
		data: Types.ApiTenantActivationModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Tenant/addTenantActivation`, data, config);
	}
	/**
	 * Firma VUK 507 Aktivasyon Ekleme
	 * [POST /api/Tenant/addVuk507Activation]
	 *
	 * Firma VUK 507 Aktivasyon Ekleme Çağrısıdır
	 */
	public async addVuk507Activation(
		data: Types.ApiTenantVuk507ActivationModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Tenant/addVuk507Activation`, data, config);
	}
	/**
	 * Firma Kullanıcı Ekleme
	 * [POST /api/Tenant/addTenantUser]
	 *
	 * Firma Kullanıcı Ekleme Çağrısıdır
	 */
	public async addTenantUser(
		data: Types.ApiTenantUserModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Tenant/addTenantUser`, data, config);
	}
	/**
	 * Firma SMTP Ayar Ekle
	 * [POST /api/Tenant/addTenantSmtpSettings]
	 *
	 * Firma SMTP Ayarları Ekleme
	 */
	public async addTenantSmtpSettings(
		data: Types.ApiTenantSmtpSettingsModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Tenant/addTenantSmtpSettings`, data, config);
	}
	/**
	 * Firma Kamu Entegrasyon Ekle
	 * [POST /api/Tenant/addTenantPublicIntegration]
	 *
	 * Firma Kamu Entegrasyon Ekleme
	 */
	public async addTenantPublicIntegration(
		data: Types.TenantPublicIntegrationSaveRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(
			`/api/Tenant/addTenantPublicIntegration`,
			data,
			config
		);
	}
	/**
	 * Firma Dizayn Ekle
	 * [POST /api/Tenant/addTenantXslt]
	 *
	 * Firma Belge Görüntüsü Ekleme
	 */
	public async addTenantXslt(
		data: Types.ApiTenantXsltModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Tenant/addTenantXslt`, data, config);
	}
	/**
	 * Firma Kaşe Ekleme
	 * [POST /api/Tenant/addTenantStamp]
	 *
	 */
	public async addTenantStamp(
		data: Types.ApiTenantStampRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Tenant/addTenantStamp`, data, config);
	}
	/**
	 * Firma Logo Ekleme
	 * [POST /api/Tenant/addTenantLogo]
	 *
	 */
	public async addTenantLogo(
		data: Types.AddTenantLogoRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Tenant/addTenantLogo`, data, config);
	}
	/**
	 * Firma Numaratör Ekleme
	 * [POST /api/Tenant/addDocumentNumber]
	 *
	 * Firma Numaratör Ekleme metodudur.
	 */
	public async addDocumentNumber(
		data: Types.DocumentNumberRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/Tenant/addDocumentNumber`, data, config);
	}
	/**
	 * Firma Numaratör Listesi
	 * [GET /api/Tenant/getDocumentNumberList]
	 *
	 */
	public async getDocumentNumberList(
		params?: Record<string, unknown>
	): Promise<Types.DocumentNumberApiViewModelListResultModel> {
		return await this.httpClient.get<Types.DocumentNumberApiViewModelListResultModel>(
			`/api/Tenant/getDocumentNumberList`,
			{ params }
		);
	}
	/**
	 * Firma Numaratör Set Listesi
	 * [GET /api/Tenant/getNumaratorSetList]
	 *
	 */
	public async getNumaratorSetList(
		params?: Record<string, unknown>
	): Promise<Types.NumeratorSetApiViewModelListResultModel> {
		return await this.httpClient.get<Types.NumeratorSetApiViewModelListResultModel>(
			`/api/Tenant/getNumaratorSetList`,
			{ params }
		);
	}
	/**
	 * Firma Dizayn Sorgula
	 * [POST /api/Tenant/getTenantXslt]
	 *
	 * Firma Belge Görüntüsü Sorgulama
	 */
	public async getTenantXslt(
		data: Types.ApiTenantXsltGetRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ApiTenantXsltResultModelListResultModel> {
		return await this.httpClient.post<Types.ApiTenantXsltResultModelListResultModel>(
			`/api/Tenant/getTenantXslt`,
			data,
			config
		);
	}
	/**
	 * Dizayn Önizleme HTML
	 * [POST /api/Tenant/getXsltPreviewHtml]
	 *
	 */
	public async getXsltPreviewHtml(
		data: Types.XsltPreviewRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(`/api/Tenant/getXsltPreviewHtml`, data, config);
	}
	/**
	 * Dizayn Önizleme PDF
	 * [POST /api/Tenant/getXsltPreviewPdf]
	 *
	 */
	public async getXsltPreviewPdf(
		data: Types.XsltPreviewRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.StringResultModel> {
		return await this.httpClient.post<Types.StringResultModel>(`/api/Tenant/getXsltPreviewPdf`, data, config);
	}
	/**
	 * Firma Bildirim Tipi Ekle
	 * [POST /api/Tenant/addTenantNotificationSettings]
	 *
	 * Firma Bildirim Tipi Ekleme
	 */
	public async addTenantNotificationSettings(
		data: Types.ApiTenantNotificationSettingsModel,
		config?: MysoftRequestConfig
	): Promise<Types.BooleanResultModel> {
		return await this.httpClient.post<Types.BooleanResultModel>(
			`/api/Tenant/addTenantNotificationSettings`,
			data,
			config
		);
	}
	/**
	 * Firma Bildirim Tipi Kaldır
	 * [POST /api/Tenant/removeTenantNotificationSettings]
	 *
	 * Firma Bildirim Tipi Kaldırma
	 */
	public async removeTenantNotificationSettings(
		data: Types.ApiTenantNotificationSettingsRemoveModel,
		config?: MysoftRequestConfig
	): Promise<Types.BooleanResultModel> {
		return await this.httpClient.post<Types.BooleanResultModel>(
			`/api/Tenant/removeTenantNotificationSettings`,
			data,
			config
		);
	}
	/**
	 * Firma Kontör Bilgisi
	 * [POST /api/Tenant/getCreditInfo]
	 *
	 * Firma Kontör Bilgisi sorgulama metodudur.
	 */
	public async postGetCreditInfo(
		data: Types.CreditRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.TenantCreditResultModelListResultModel> {
		return await this.httpClient.post<Types.TenantCreditResultModelListResultModel>(
			`/api/Tenant/getCreditInfo`,
			data,
			config
		);
	}
	/**
	 * İş Ortağı Tarife Listesi
	 * [GET /api/Tenant/getBusinessPartnerTariff]
	 *
	 * İş ortağı tarife bilgisi sorgulama metodudur.
	 */
	public async getBusinessPartnerTariff(params?: Record<string, unknown>): Promise<Types.TariffModelListResultModel> {
		return await this.httpClient.get<Types.TariffModelListResultModel>(`/api/Tenant/getBusinessPartnerTariff`, {
			params,
		});
	}
	/**
	 * Firma Kontör Yükleme
	 * [POST /api/Tenant/insertDocumentCredit]
	 *
	 * Firmaya kontör yükleme metodudur.
	 */
	public async insertDocumentCredit(
		data: Types.DocumentCreditModel,
		config?: MysoftRequestConfig
	): Promise<Types.DocumentCreditResultModelResultModel> {
		return await this.httpClient.post<Types.DocumentCreditResultModelResultModel>(
			`/api/Tenant/insertDocumentCredit`,
			data,
			config
		);
	}
	/**
	 * Firma Sayaç Bilgisi
	 * [POST /api/Tenant/getCounterInfo]
	 *
	 * Firma Sayaç Bilgisi sorgulama metodudur.
	 */
	public async getCounterInfo(
		data: Types.CounterInfoRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.TenantCreditConsumptionInfoModelResultModel> {
		return await this.httpClient.post<Types.TenantCreditConsumptionInfoModelResultModel>(
			`/api/Tenant/getCounterInfo`,
			data,
			config
		);
	}
	/**
	 * İş ortağı kontör özet bilgisi
	 * [POST /api/Tenant/getBusinessPartnerDocumentCreditList]
	 *
	 */
	public async getBusinessPartnerDocumentCreditList(
		data: Types.BusinessPartnerDocumentCreditApiRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.BusinessPartnerDocumentCreditSummaryApiModelListResultModel> {
		return await this.httpClient.post<Types.BusinessPartnerDocumentCreditSummaryApiModelListResultModel>(
			`/api/Tenant/getBusinessPartnerDocumentCreditList`,
			data,
			config
		);
	}
	/**
	 * Firma Aylık Kontör Bilgisi
	 * [POST /api/Tenant/getMonthlyCreditConsumption]
	 *
	 * Firma Aylık Kontör Bilgisini Döner
	 */
	public async getMonthlyCreditConsumption(
		data: Types.MonthlyCreditConsumptionRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.MonthlyCreditConsumptionModelQueryResultList> {
		return await this.httpClient.post<Types.MonthlyCreditConsumptionModelQueryResultList>(
			`/api/Tenant/getMonthlyCreditConsumption`,
			data,
			config
		);
	}
	/**
	 * Firma Kontör Kullanım Özeti
	 * [GET /api/Tenant/getBusinessPartnerTenantDocumentUsageSummary]
	 *
	 * İş ortağına tanımlı olan firmaların kontör kullanım özetini döner
	 */
	public async getBusinessPartnerTenantDocumentUsageSummary(
		params?: Record<string, unknown>
	): Promise<Types.BusinessPartnerTenantDocumentUsageSummaryApiModelListResultModel> {
		return await this.httpClient.get<Types.BusinessPartnerTenantDocumentUsageSummaryApiModelListResultModel>(
			`/api/Tenant/getBusinessPartnerTenantDocumentUsageSummary`,
			{ params }
		);
	}
}
