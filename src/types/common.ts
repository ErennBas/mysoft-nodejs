/**
 * Mysoft SDK Ortak Veri Tipleri ve Modelleri
 */

/**
 * Mysoft API Standart Yanıt Sarmalayıcısı (ResultModel)
 */
export interface ApiResult<T = unknown> {
	/** API yanıt verisi */
	data?: T;
	/** İşlem başarı durumu */
	succeed: boolean;
	/** Bilgilendirme veya hata mesajı */
	message?: string;
	/** Varsa hata kodu (örn: GIB_001) */
	errorCode?: string;
	/** Sayfalama veya referans sonrası değer */
	afterValue?: number;
}

/**
 * Sayfalanmış / Listelenmiş Sorgu Yanıtı Modeli
 */
export interface PaginatedResult<T = unknown> {
	/** Dönen kayıtlar listesi */
	data?: T[];
	/** İşlem başarı durumu */
	succeed: boolean;
	/** Yanıt mesajı */
	message?: string;
	/** Varsa hata kodu */
	errorCode?: string;
	/** Toplam kayıt sayısı (varsa) */
	totalCount?: number;
	/** Mevcut sayfa numarası */
	pageIndex?: number;
	/** Sayfa başına kayıt sayısı */
	pageSize?: number;
	/** Sonraki sayfa için sonraki kayıt referansı */
	afterValue?: number;
}

/**
 * Adres ve İletişim Bilgileri
 */
export interface AddressInfo {
	/** Sokak / Cadde */
	sokak?: string;
	/** Bina Adı */
	binaAdi?: string;
	/** Kapı / Bina Numarası */
	kapiNo?: string;
	/** Daire / İç Kapı Numarası */
	daireNo?: string;
	/** İlçe veya Semt Adı */
	ilceSemt?: string;
	/** Şehir / İl Adı */
	il?: string;
	/** Posta Kodu */
	postaKodu?: string;
	/** Ülke Adı (Varsayılan: "Türkiye") */
	ulke?: string;
	/** Ülke Kodu (Varsayılan: "TR") */
	ulkeKodu?: string;
	/** Telefon Numarası */
	tel?: string;
	/** Faks Numarası */
	faks?: string;
	/** E-posta Adresi */
	eposta?: string;
	/** Web Sitesi */
	webSitesi?: string;
}

/**
 * Taraf (Gönderici / Alıcı / Taşıyıcı) Bilgileri
 */
export interface PartyInfo {
	/** Vergi Kimlik Numarası (VKN) veya T.C. Kimlik Numarası (TCKN) */
	vknTckn: string;
	/** Şirket / Kurum Ticari Unvanı */
	unvan?: string;
	/** Şirket Unvanı (unvan alternatifi) */
	title?: string;
	/** Şahıs ise Adı / Unvan */
	name?: string;
	/** Şahıs ise Adı */
	ad?: string;
	/** Şahıs ise Soyadı */
	soyad?: string;
	/** Bağlı bulunulan Vergi Dairesi Adı */
	vergiDairesi?: string;
	/** Vergi Dairesi Adı (vergiDairesi alternatifi) */
	taxOffice?: string;
	/** Ülke Adı (Varsayılan: "TÜRKİYE") */
	country?: string;
	/** Şehir / İl Adı */
	city?: string;
	/** İlçe / Semt Adı */
	district?: string;
	/** Açık Adres / Cadde / Sokak */
	address?: string;
	/** E-posta Adresi */
	email?: string;
	/** Telefon Numarası */
	phone?: string;
	/** Web Sitesi */
	webSite?: string;
	/** Detaylı Adres ve İletişim Bilgileri */
	adres?: AddressInfo;
	/** E-Fatura Posta Kutusu (PK) Aliası (örn: urn:mail:defaultpk@mysoft.com.tr) */
	pkAlias?: string;
	/** E-Fatura Gönderici Birim (GB) Aliası (örn: urn:mail:defaultgb@mysoft.com.tr) */
	gbAlias?: string;
}

/**
 * Tarih Aralığı Filtresi
 */
export interface DateRangeFilter {
	/** Başlangıç Tarihi (ISO 8601 string veya Date: YYYY-MM-DD veya YYYY-MM-DDTHH:mm:ss) */
	startDate?: string | Date;
	/** Bitiş Tarihi (ISO 8601 string veya Date: YYYY-MM-DD veya YYYY-MM-DDTHH:mm:ss) */
	endDate?: string | Date;
}

/**
 * Belge İndirme Yanıt Modeli (PDF, XML, HTML, ZIP)
 */
export interface DownloadDocumentResult {
	/** Dosya adı (örn: FAT2026000000001.pdf) */
	fileName: string;
	/** İçerik MIME türü (örn: application/pdf) */
	contentType: string;
	/** İkili dosya verisi (Buffer veya Uint8Array) */
	data: Uint8Array;
}
