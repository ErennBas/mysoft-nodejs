import { BaseService } from "./base.service";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";

/**
 * İleti Yönetim Sistemi (IYS) ve İzin Yönetimi Servisi
 * Toplam 15 REST Endpoint içerir.
 */
export class IysService extends BaseService {
	/**
	 * Tekil İzin Ekleme
	 * [POST /api/Etk/sendConsent]
	 *
	 * Bu metod, alıcıdan alınan tek bir iznin kaydedilmesini sağlar. Çoklu izin kayıt işlemleri için 'Çoklu İzin Ekleme' metodunun kullanılması önerilmektedir.
	 */
	public async sendConsent(
		data: Types.ETKSendConsentModel,
		config?: MysoftRequestConfig
	): Promise<Types.ETKSendConsentResultModelResultModel> {
		return await this.httpClient.post<Types.ETKSendConsentResultModelResultModel>(
			`/api/Etk/sendConsent`,
			data,
			config
		);
	}
	/**
	 * Tekil İzin Ekleme Durum Sorgulama
	 * [POST /api/Etk/checkConsentStatus]
	 *
	 * Bu metod, gönderilen tekil izin ekleme işlemlerinin durumunu sorgulamak amacıyla kullanılmaktadır. Metod, izin ile ilgili son durum bilgisini değil, yalnızca hareketlerine dair durum bilgilerini sağlar.
	 */
	public async checkConsentStatus(
		data: Types.ETKCheckConsentStatusRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ETKConsentTransactionQueryDataModelResultModel> {
		return await this.httpClient.post<Types.ETKConsentTransactionQueryDataModelResultModel>(
			`/api/Etk/checkConsentStatus`,
			data,
			config
		);
	}
	/**
	 * IYS Kod ile Marka Sorgulama
	 * [POST /api/Etk/checkTenantBrandsByTenantIdentifier]
	 *
	 * Bu metod, gönderilen tenantIdentifier ile IYS Kodu kullanarak markaları liste olarak döner.
	 */
	public async checkTenantBrandsByTenantIdentifier(
		data: Types.ETKCheckTenantBrandsByTenantIdentifierRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ETKCheckTenantBrandQueryDataModelListResultModel> {
		return await this.httpClient.post<Types.ETKCheckTenantBrandQueryDataModelListResultModel>(
			`/api/Etk/checkTenantBrandsByTenantIdentifier`,
			data,
			config
		);
	}
	/**
	 * Çoklu İzin Ekleme
	 * [POST /api/Etk/sendConsentBatch]
	 *
	 * Bu metod, birden çok iznin kaydedilmesini sağlar. Tekli izin kayıt işlemleri için 'Tekil İzin Ekleme' metodunun kullanılması önerilmektedir.
	 */
	public async sendConsentBatch(
		data: Types.ETKSendConsentBatchRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ETKSendConsentBatchResultModelResultModel> {
		return await this.httpClient.post<Types.ETKSendConsentBatchResultModelResultModel>(
			`/api/Etk/sendConsentBatch`,
			data,
			config
		);
	}
	/**
	 * Çoklu İzin Ekleme Durum Sorgulama
	 * [POST /api/Etk/checkBatchConsentStatus]
	 *
	 * Bu metod, gönderilen çoklu izin ekleme işlemlerinin durumunu sorgulamak amacıyla kullanılmaktadır. Metod, izin ile ilgili son durum bilgisini değil, yalnızca hareketlere dair durum bilgilerini sağlar.
	 */
	public async checkBatchConsentStatus(
		data: Types.ETKCheckBatchConsentStatusRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ETKCheckBatchConsentStatusResultModelResultModel> {
		return await this.httpClient.post<Types.ETKCheckBatchConsentStatusResultModelResultModel>(
			`/api/Etk/checkBatchConsentStatus`,
			data,
			config
		);
	}
	/**
	 * Alıcı İzin Durum Sorgulama
	 * [POST /api/Etk/checkRecipientStatus]
	 *
	 * Bu metod, belirtilen alıcı bilgileri doğrultusunda, marka, izin türü ve alıcı türü bazında son izin durumlarını listelemek için kullanılır.
	 */
	public async checkRecipientStatus(
		data: Types.ETKCheckRecipientStatusRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ETKConsentQueryDataModelListResultModel> {
		return await this.httpClient.post<Types.ETKConsentQueryDataModelListResultModel>(
			`/api/Etk/checkRecipientStatus`,
			data,
			config
		);
	}
	/**
	 * Durumu Değişen İzin Listesi
	 * [POST /api/Etk/checkStatusChangedConsentData]
	 *
	 * Verilen tarih aralığında durumu değişen izinlerin son durum bilgisini verir
	 */
	public async checkStatusChangedConsentData(
		data: Types.ETKCheckStatusChangedConsentDataRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ChangedETKConsentQueryDataModelListResultModel> {
		return await this.httpClient.post<Types.ChangedETKConsentQueryDataModelListResultModel>(
			`/api/Etk/checkStatusChangedConsentData`,
			data,
			config
		);
	}
	/**
	 * İzin Hareket Listesi
	 * [POST /api/Etk/consentTransactionList]
	 *
	 * Verilen tarih aralığında izin hareketi listelenir. Başlangıç ve bitiş tarihleri boş bırakılması durumunda varsayılan olarak son 7 gün olarak ayarlanır.
	 */
	public async takeConsentTransactionList(
		data: Types.ETKConsentTransactionDataRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ETKConsentTransactionDataModelListResultModel> {
		return await this.httpClient.post<Types.ETKConsentTransactionDataModelListResultModel>(
			`/api/Etk/consentTransactionList`,
			data,
			config
		);
	}
	/**
	 * Via İzin Gönder
	 * [POST /api/IysVia/iYSViaConsentSend]
	 *
	 * İlgili alıcı için ETK/KVKK onayı alma sürecini başlatır.
	 */
	public async iYSViaConsentSend(
		data: Types.ViaConsentModel,
		config?: MysoftRequestConfig
	): Promise<Types.ViaConsentSendResultResultModel> {
		return await this.httpClient.post<Types.ViaConsentSendResultResultModel>(
			`/api/IysVia/iYSViaConsentSend`,
			data,
			config
		);
	}
	/**
	 * Via İzin Kaydı Onayla
	 * [GET /api/IysVia/iYSViaConsentConfirmCodeSend]
	 *
	 * Gönderilen doğrulama koduyla eşleşen izin kaydını onaylamak için kullanılır.
	 */
	public async iYSViaConsentConfirmCodeSend(
		params?: Record<string, unknown>
	): Promise<Types.ViaConsentConfirmationCodeResultResultModel> {
		return await this.httpClient.get<Types.ViaConsentConfirmationCodeResultResultModel>(
			`/api/IysVia/iYSViaConsentConfirmCodeSend`,
			{ params }
		);
	}
	/**
	 * Via İzin Kaydı Onayla (Yeni)
	 * [POST /api/IysVia/iYSViaConsentConfirmCodeSendNew]
	 *
	 * Gönderilen doğrulama koduyla eşleşen izin kaydını onaylamak için kullanılır.
	 */
	public async iYSViaConsentConfirmCodeSendNew(
		data: Types.ViaConsentConfirmationCodeRequest,
		config?: MysoftRequestConfig
	): Promise<Types.ViaConsentConfirmationCodeResultResultModel> {
		return await this.httpClient.post<Types.ViaConsentConfirmationCodeResultResultModel>(
			`/api/IysVia/iYSViaConsentConfirmCodeSendNew`,
			data,
			config
		);
	}
	/**
	 * İzin Durum Sorgula
	 * [GET /api/IysVia/iYSViaConsentResult]
	 *
	 * Gönderilen izin talep kaydının Mysoft tarafındaki durumunu sorgulamak için kullanılır
	 */
	public async iYSViaConsentResult(params?: Record<string, unknown>): Promise<Types.ViaStatusResultModelResultModel> {
		return await this.httpClient.get<Types.ViaStatusResultModelResultModel>(`/api/IysVia/iYSViaConsentResult`, {
			params,
		});
	}
	/**
	 * KVK Alıcı İzin Durum Sorgulama
	 * [POST /api/IysVia/kvkCheckRecipientStatus]
	 *
	 * Bu metod, belirtilen alıcı bilgisi doğrultusunda, son kvk izin durumlarını listelemek için kullanılır.
	 */
	public async postCheckRecipientStatus(
		data: Types.ViaConsentKVKRequest,
		config?: MysoftRequestConfig
	): Promise<Types.ViaConsentKVKResultListResultModel> {
		return await this.httpClient.post<Types.ViaConsentKVKResultListResultModel>(
			`/api/IysVia/kvkCheckRecipientStatus`,
			data,
			config
		);
	}
	/**
	 * KVKK İzin Listesi
	 * [POST /api/IysVia/viaConsentKvkkList]
	 *
	 * Bu metod, belirtilen alıcı bilgisi doğrultusunda, KVKK izinlerini listelemek için kullanılır.
	 */
	public async checkViaConsentKvkkRecipientList(
		data: Types.ViaConsentKVKKListRequest,
		config?: MysoftRequestConfig
	): Promise<Types.ViaConsentKVKKListResultListResultModel> {
		return await this.httpClient.post<Types.ViaConsentKVKKListResultListResultModel>(
			`/api/IysVia/viaConsentKvkkList`,
			data,
			config
		);
	}
	/**
	 * Via İzin Kaydı Oluştur (IFrame)
	 * [POST /api/IysVia/IYSViaConsentCreate]
	 *
	 * İlgili alıcı için IYS Iframe üzerinden alınan izinlerin Mysoft sistemlerinde takip edilmesi için kullanılır.
	 */
	public async iYSViaConsentCreate(
		data: Types.ViaConsentFrameModel,
		config?: MysoftRequestConfig
	): Promise<Types.ViaConsentSendResultResultModel> {
		return await this.httpClient.post<Types.ViaConsentSendResultResultModel>(
			`/api/IysVia/IYSViaConsentCreate`,
			data,
			config
		);
	}
}
