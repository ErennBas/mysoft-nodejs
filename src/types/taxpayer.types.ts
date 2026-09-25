/**
 * Mysoft Mükellef Sorgulama Tipleri ve Modelleri
 */

/**
 * Mükellef Posta Kutusu (PK) veya Gönderici Birim (GB) Alias Detayı
 */
export interface TaxpayerAliasItem {
	/** Etiket / Alias Adresi (örn: "urn:mail:defaultpk@mysoft.com.tr") */
	alias: string;
	/** Etiket Türü ("PK" - Posta Kutusu veya "GB" - Gönderici Birim) */
	type: "PK" | "GB" | string;
	/** Sisteme kayıt olma tarihi */
	creationTime: string;
	/** Etiketin iptal / silinme tarihi (varsa) */
	deletionTime?: string | null;
}

/**
 * GİB E-Dönüşüm Mükellef Bilgisi
 */
export interface TaxpayerUserItem {
	/** VKN veya TCKN */
	vknTckn: string;
	/** Şirket Unvanı veya Şahıs Ad Soyad */
	title: string;
	/** E-Fatura mükellefi mi? */
	isTaxpayer: boolean;
	/** E-Fatura kayıtlı kullanıcısı mı? */
	eInvoiceStatus: boolean;
	/** E-İrsaliye kayıtlı kullanıcısı mı? */
	eDespatchStatus?: boolean;
	/** Tanımlı tüm Posta Kutusu (PK) ve Gönderici Birim (GB) adresleri */
	aliases: TaxpayerAliasItem[];
	/** İlk sisteme giriş / mükellefiyet başlama tarihi */
	firstCreationTime?: string;
}

/**
 * Toplu veya Tekil Mükellef Arama Filtresi
 */
export interface TaxpayerSearchFilter {
	/** Sorgulanacak VKN / TCKN listesi */
	vknTcknList?: string[];
	/** Unvan içinde geçen metin */
	title?: string;
	/** Sayfa başına kayıt */
	pageSize?: number;
	/** Sayfa numarası */
	pageIndex?: number;
}

export type TaxpayerDetailInfo = TaxpayerUserItem;
export type TaxpayerCheckResult = { isTaxpayer: boolean; eInvoiceStatus: boolean; defaultPkAlias?: string };
export type TaxpayerAliasesResult = { vknTckn: string; pkAliases: string[]; gbAliases: string[] };
