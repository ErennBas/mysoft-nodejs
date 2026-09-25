import { BaseService } from "./base.service";
import { ApiResult } from "../types/common";
import { MysoftRequestConfig } from "../core/http-client";
import * as Types from "../types";
import { CountryItem, CityItem, DistrictItem, UnitCodeItem, TaxOfficeItem } from "../types/general.types";

/**
 * Genel Kart ve Tanım Bilgileri (Ülke, İl, Birim, Vergi Daireleri vb.) Servisi
 * Toplam 33 REST Endpoint içerir.
 */
export class GeneralService extends BaseService {
	/**
	 * Sistemde kayıtlı tüm ülke kodlarını ve isimlerini listeler.
	 */
	public async getCountries(): Promise<ApiResult<CountryItem[]>> {
		return await this.httpClient.get<ApiResult<CountryItem[]>>("/api/GeneralCards/getCountryList");
	}

	/**
	 * Türkiye'deki veya belirtilen ülkedeki illeri listeler.
	 */
	public async getCities(countryCode: string | number = "TR"): Promise<ApiResult<CityItem[]>> {
		return await this.httpClient.get<ApiResult<CityItem[]>>(
			`/api/GeneralCards/getCityList?countryCode=${encodeURIComponent(String(countryCode))}`
		);
	}

	/**
	 * Belirtilen il ID'sine bağlı ilçeleri listeler.
	 */
	public async getTowns(cityId: number): Promise<ApiResult<DistrictItem[]>> {
		return this.getDistricts(cityId);
	}

	/**
	 * Belirtilen il ID'sine bağlı ilçeleri listeler.
	 */
	public async getDistricts(cityId: number): Promise<ApiResult<DistrictItem[]>> {
		return await this.httpClient.get<ApiResult<DistrictItem[]>>(
			`/api/GeneralCards/getTownList?cityId=${encodeURIComponent(String(cityId))}`
		);
	}

	/**
	 * GİB ve UBL-TR standart birim kodlarını listeler.
	 */
	public async getUnits(): Promise<ApiResult<UnitCodeItem[]>> {
		return this.getUnitCodes();
	}

	/**
	 * GİB ve UBL-TR standart birim kodlarını (C62, HUR, KGM vb.) listeler.
	 */
	public async getUnitCodes(): Promise<ApiResult<UnitCodeItem[]>> {
		return await this.httpClient.get<ApiResult<UnitCodeItem[]>>("/api/GeneralCards/getUnitList");
	}

	/**
	 * Vergi dairelerini listeler.
	 */
	public async getTaxOffices(cityCode?: string): Promise<ApiResult<TaxOfficeItem[]>> {
		const url = cityCode
			? `/api/GeneralCards/getTaxOfficeList?cityCode=${encodeURIComponent(cityCode)}`
			: "/api/GeneralCards/getTaxOfficeList";
		return await this.httpClient.get<ApiResult<TaxOfficeItem[]>>(url);
	}

	/**
	 * Ülke Bilgileri
	 * [GET /api/GeneralCard/country]
	 *
	 * Ülke listesini döner
	 */
	public async country(config?: MysoftRequestConfig): Promise<Types.CountryModelListResultModel> {
		return await this.httpClient.get<Types.CountryModelListResultModel>(`/api/GeneralCard/country`, config);
	}
	/**
	 * Şehir Bilgileri
	 * [GET /api/GeneralCard/city]
	 *
	 * Şehir listesini döner, countryId => Ülke Id alanıdır, doldurulduğunda o ülkeye ait şehirler listelenir.
	 */
	public async city(params?: Record<string, unknown>): Promise<Types.CityModelListResultModel> {
		return await this.httpClient.get<Types.CityModelListResultModel>(`/api/GeneralCard/city`, { params });
	}
	/**
	 * Birim Bilgileri
	 * [GET /api/GeneralCard/unit]
	 *
	 * Birim listesini döner
	 */
	public async unit(config?: MysoftRequestConfig): Promise<Types.UnitModelListResultModel> {
		return await this.httpClient.get<Types.UnitModelListResultModel>(`/api/GeneralCard/unit`, config);
	}
	/**
	 * Para Birimi Bilgileri
	 * [GET /api/GeneralCard/currency]
	 *
	 * Para Birimi listesini döner
	 */
	public async currency(config?: MysoftRequestConfig): Promise<Types.CurrencyModelListResultModel> {
		return await this.httpClient.get<Types.CurrencyModelListResultModel>(`/api/GeneralCard/currency`, config);
	}
	/**
	 * Vergi Dairesi Bilgileri
	 * [GET /api/GeneralCard/taxOffice]
	 *
	 * Vergi Dairesi listesini döner
	 */
	public async taxOffice(config?: MysoftRequestConfig): Promise<Types.TaxOfficeModelListResultModel> {
		return await this.httpClient.get<Types.TaxOfficeModelListResultModel>(`/api/GeneralCard/taxOffice`, config);
	}
	/**
	 * Müşteri / Tedarikçi Ekleme
	 * [POST /api/GeneralCard/account]
	 *
	 * Müşteri / Tedarikçi Ekleme Çağrısıdır
	 */
	public async account(data: Types.AccountModel, config?: MysoftRequestConfig): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/account`, data, config);
	}
	/**
	 * Müşteri / Tedarikçi Bilgileri
	 * [POST /api/GeneralCard/accountList]
	 *
	 * Müşteri / Tedarikçi listesini döner
	 */
	public async accountList(
		data: Types.BaseRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.AccountModelListResultModel> {
		return await this.httpClient.post<Types.AccountModelListResultModel>(
			`/api/GeneralCard/accountList`,
			data,
			config
		);
	}
	/**
	 * Depo Ekleme
	 * [POST /api/GeneralCard/warehouse]
	 *
	 * Depo Ekleme Çağrısıdır
	 */
	public async warehouse(
		data: Types.WarehouseSaveModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/warehouse`, data, config);
	}
	/**
	 * Depo Bilgileri
	 * [POST /api/GeneralCard/warehouseList]
	 *
	 * Depo listesini döner
	 */
	public async warehouseList(
		data: Types.WarehouseRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.WarehouseModelListResultModel> {
		return await this.httpClient.post<Types.WarehouseModelListResultModel>(
			`/api/GeneralCard/warehouseList`,
			data,
			config
		);
	}
	/**
	 * Stok Ekleme
	 * [POST /api/GeneralCard/product]
	 *
	 * Stok Ekleme Çağrısıdır
	 */
	public async product(data: Types.ProductModel, config?: MysoftRequestConfig): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/product`, data, config);
	}
	/**
	 * Stok Hareketleri Listesi
	 * [POST /api/GeneralCard/productTransactionList]
	 *
	 * Stok hareketlerini ve detaylarını döner. Tarih aralığı zorunludur.
	 */
	public async productTransactionList(
		data: Types.ProductTransactionRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ProductTransactionResponseModel> {
		return await this.httpClient.post<Types.ProductTransactionResponseModel>(
			`/api/GeneralCard/productTransactionList`,
			data,
			config
		);
	}
	/**
	 * Stok Bilgileri
	 * [POST /api/GeneralCard/productList]
	 *
	 * Stok listesini döner
	 */
	public async productList(
		data: Types.ProductRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ProductModelListResultModel> {
		return await this.httpClient.post<Types.ProductModelListResultModel>(
			`/api/GeneralCard/productList`,
			data,
			config
		);
	}
	/**
	 * Stok Birim Çevrimi Ekleme
	 * [POST /api/GeneralCard/productUnit]
	 *
	 * Stok Birim Çevrimi Ekleme Çağrısıdır
	 */
	public async productUnit(
		data: Types.ProductUnitModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/productUnit`, data, config);
	}
	/**
	 * Stok Barkod Ekleme
	 * [POST /api/GeneralCard/productBarcode]
	 *
	 * Stok Barkod Ekleme Çağrısıdır
	 */
	public async productBarcode(
		data: Types.ProductBarcodeModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/productBarcode`, data, config);
	}
	/**
	 * Depo Stok Bilgileri
	 * [POST /api/GeneralCard/warehouseProductList]
	 *
	 * Depo Stok listesini döner
	 */
	public async warehouseProductList(
		data: Types.WarehouseProductRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.ProductWarehouseModelListResultModel> {
		return await this.httpClient.post<Types.ProductWarehouseModelListResultModel>(
			`/api/GeneralCard/warehouseProductList`,
			data,
			config
		);
	}
	/**
	 * Belge Sınıfı / Grup Ekleme
	 * [POST /api/GeneralCard/categoryGroup]
	 *
	 * Belge Sınıfı / Grup Ekleme Çağrısıdır
	 */
	public async categoryGroup(
		data: Types.CategoryGroupModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/categoryGroup`, data, config);
	}
	/**
	 * Belge Sınıfı / Kategori Ekleme
	 * [POST /api/GeneralCard/category]
	 *
	 * Belge Sınıfı / Kategori Ekleme Çağrısıdır
	 */
	public async category(data: Types.CategoryApiModel, config?: MysoftRequestConfig): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/category`, data, config);
	}
	/**
	 * Belge Sınıfı / Marka Ekleme
	 * [POST /api/GeneralCard/productBrand]
	 *
	 * Belge Sınıfı / Marka Ekleme Çağrısıdır
	 */
	public async productBrand(
		data: Types.ProductBrandModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/productBrand`, data, config);
	}
	/**
	 * Fiyat Listesi Bilgisi
	 * [POST /api/GeneralCard/priceList]
	 *
	 * Fiyat Listesi Bilgisi Ekleme Çağrısıdır
	 */
	public async priceList(data: Types.PriceListModel, config?: MysoftRequestConfig): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/priceList`, data, config);
	}
	/**
	 * Fiyat Listesi Müşteri / Tedarikçi İlişkisi Ekleme
	 * [POST /api/GeneralCard/priceListAccountRel]
	 *
	 * Fiyat Listesi Müşteri / Tedarikçi İlişkisi Ekleme
	 */
	public async priceListAccountRel(
		data: Types.PriceListAccountRelModel,
		config?: MysoftRequestConfig
	): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/priceListAccountRel`, data, config);
	}
	/**
	 * Fiyat Listesi Model Liste
	 * [GET /api/GeneralCard/getPriceListResultModel]
	 *
	 * İlgili Fiyat Listesini, Fiyat Listesi modeli olarak dönen metod
	 */
	public async getPriceListResult(
		params?: Record<string, unknown>
	): Promise<Types.PriceListResultModelListResultModel> {
		return await this.httpClient.get<Types.PriceListResultModelListResultModel>(
			`/api/GeneralCard/getPriceListResultModel`,
			{ params }
		);
	}
	/**
	 * Vergi Muafiyet Sebepleri
	 * [GET /api/GeneralCard/taxExemptionReason]
	 *
	 * Vergi Muafiyet Sebepleri listesini döner
	 */
	public async taxExemptionReason(
		config?: MysoftRequestConfig
	): Promise<Types.TaxExemptionReasonModelListResultModel> {
		return await this.httpClient.get<Types.TaxExemptionReasonModelListResultModel>(
			`/api/GeneralCard/taxExemptionReason`,
			config
		);
	}
	/**
	 * Tevkifat Bilgileri
	 * [GET /api/GeneralCard/withholdingTaxType]
	 *
	 * Tevkifat listesini döner
	 */
	public async withholdingTaxType(
		config?: MysoftRequestConfig
	): Promise<Types.WithholdingTaxTypeModelListResultModel> {
		return await this.httpClient.get<Types.WithholdingTaxTypeModelListResultModel>(
			`/api/GeneralCard/withholdingTaxType`,
			config
		);
	}
	/**
	 * Teslim Şartı Bilgileri
	 * [GET /api/GeneralCard/deliveryTerm]
	 *
	 * Teslim Şartı listesini döner
	 */
	public async deliveryTerm(config?: MysoftRequestConfig): Promise<Types.DeliveryTermModelListResultModel> {
		return await this.httpClient.get<Types.DeliveryTermModelListResultModel>(
			`/api/GeneralCard/deliveryTerm`,
			config
		);
	}
	/**
	 * Gönderim Şekli Bilgileri
	 * [GET /api/GeneralCard/transportMode]
	 *
	 * Gönderim Şekli listesini döner
	 */
	public async transportMode(config?: MysoftRequestConfig): Promise<Types.TransportModeModelListResultModel> {
		return await this.httpClient.get<Types.TransportModeModelListResultModel>(
			`/api/GeneralCard/transportMode`,
			config
		);
	}
	/**
	 * GİB Hesaplarını al
	 * [GET /api/GeneralCard/getGIBAccountChangedList]
	 *
	 * Belirli bir tarihten itibaren değişen GİB hesaplarını verir. Sistem ilk kez kullanılacağı zaman https://gibuser.mysoft.com.tr/GibAccount.zip ve https://gibuser.mysoft.com.tr/GibAccountAlias.zip adreslerinden tüm kullanıcılar bir kez alınır. Sonrasında bu metod kullanılarak, değişen hesaplar alınmaya devam edilir. İlgili dosyalar sisteme transfer edildikten sonra, bu metodun saatte 1 çağrılması tavsiye edilir.
	 */
	public async getGIBAccountChangedList(
		params?: Record<string, unknown>
	): Promise<Types.GibAccountModelListResultModel> {
		return await this.httpClient.get<Types.GibAccountModelListResultModel>(
			`/api/GeneralCard/getGIBAccountChangedList`,
			{ params }
		);
	}
	/**
	 * Gib Hesap Sorgula
	 * [GET /api/GeneralCard/getGibAccountModel]
	 *
	 */
	public async getGibAccountModel(params?: Record<string, unknown>): Promise<Types.GibAccountModelResultModel> {
		return await this.httpClient.get<Types.GibAccountModelResultModel>(`/api/GeneralCard/getGibAccountModel`, {
			params,
		});
	}
	/**
	 * Nace Kdv Listesi
	 * [GET /api/GeneralCard/getNaceList]
	 *
	 * Nace kdv listesini dönen metod
	 */
	public async getNaceList(params?: Record<string, unknown>): Promise<Types.NaceListViewModelListResultModel> {
		return await this.httpClient.get<Types.NaceListViewModelListResultModel>(`/api/GeneralCard/getNaceList`, {
			params,
		});
	}
	/**
	 * Personel Bilgileri
	 * [GET /api/GeneralCard/staff]
	 *
	 * Personel listesini döner
	 */
	public async staffList(params?: Record<string, unknown>): Promise<Types.StaffIndexModelListResultModel> {
		return await this.httpClient.get<Types.StaffIndexModelListResultModel>(`/api/GeneralCard/staff`, { params });
	}
	/**
	 * Personel Ekleme
	 * [POST /api/GeneralCard/staff]
	 *
	 * Personel Ekleme Çağrısıdır
	 */
	public async staff(data: Types.StaffModel, config?: MysoftRequestConfig): Promise<Types.Int32ResultModel> {
		return await this.httpClient.post<Types.Int32ResultModel>(`/api/GeneralCard/staff`, data, config);
	}
	/**
	 * Kullanıcı Bilgisi
	 * [GET /api/GeneralCard/getUserInfo]
	 *
	 * İşlem yapan kullanıcının ad soyad email bilgilerini döner
	 */
	public async getUserInfo(config?: MysoftRequestConfig): Promise<Types.UserInfoModelResultModel> {
		return await this.httpClient.get<Types.UserInfoModelResultModel>(`/api/GeneralCard/getUserInfo`, config);
	}
	/**
	 * Kullanıcı Firma Bilgisi
	 * [GET /api/GeneralCard/getUserCompanyInfo]
	 *
	 * İlgili kullanıcının yetkili olduğu firmaların bilgilerini dönen metoddur.
	 */
	public async getUserCompanyInfo(config?: MysoftRequestConfig): Promise<Types.UserCompanyModelListResultModel> {
		return await this.httpClient.get<Types.UserCompanyModelListResultModel>(
			`/api/GeneralCard/getUserCompanyInfo`,
			config
		);
	}
	/**
	 * Hesap Planlarını Al
	 * [POST /api/GeneralCard/accList]
	 *
	 * Hesap Planı listesini döner
	 */
	public async accList(
		data: Types.BaseRequestModel,
		config?: MysoftRequestConfig
	): Promise<Types.AccApiModelListResultModel> {
		return await this.httpClient.post<Types.AccApiModelListResultModel>(`/api/GeneralCard/accList`, data, config);
	}
}
