/**
 * Mysoft Genel Tanımlar ve Kart Bilgileri Tipleri
 */

/**
 * Ülke Tanım Modeli
 */
export interface CountryItem {
	/** İki haneli ISO Ülke Kodu (örn: "TR") */
	code: string;
	/** Ülke Adı (örn: "TÜRKİYE") */
	name: string;
}

/**
 * Şehir / İl Tanım Modeli
 */
export interface CityItem {
	/** İl Kodu veya Plaka Numarası (örn: "34") */
	code: string;
	/** İl Adı (örn: "İSTANBUL") */
	name: string;
	/** Bağlı olduğu Ülke Kodu */
	countryCode?: string;
}

/**
 * İlçe / Semt Tanım Modeli
 */
export interface TownItem {
	/** İlçe Kodu */
	code: string;
	/** İlçe Adı (örn: "KADIKÖY") */
	name: string;
	/** Bağlı olduğu İl Kodu (örn: "34") */
	cityCode: string;
}

/**
 * Birim Tanım Modeli
 */
export interface UnitItem {
	/** GİB UN/ECE Birim Kodu (örn: "C62") */
	code: string;
	/** Birim Adı (örn: "Adet") */
	name: string;
	/** Sembol */
	symbol?: string;
}

/**
 * Vergi Dairesi Tanım Modeli
 */
export interface TaxOfficeItem {
	/** Vergi Dairesi Kodu (örn: "034250") */
	code: string;
	/** Vergi Dairesi Adı (örn: "KADIKÖY VERGİ DAİRESİ") */
	name: string;
	/** Bulunduğu Şehir Kodu */
	cityCode?: string;
}

export type DistrictItem = TownItem;
export type UnitCodeItem = UnitItem;
