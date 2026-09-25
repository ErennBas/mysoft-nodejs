/**
 * Mysoft GİB E-Belge ve API Numaralandırmaları (Enums)
 */

/**
 * Çalışma Ortamı
 */
export enum Environment {
	TEST = "TEST",
	PROD = "PROD",
	PRODUCTION = "PRODUCTION",
}

/**
 * E-Belge Türleri (GİB Standartları)
 */
export enum EDocumentType {
	/** E-Fatura (Ticari / Temel) */
	EFATURA = "EFATURA",
	/** E-Arşiv Fatura */
	EARSIV = "EARSIV",
	/** E-İrsaliye */
	EIRSALIYE = "EIRSALIYE",
	/** E-Serbest Meslek Makbuzu */
	ESMM = "ESMM",
	/** E-Müstahsil Makbuzu */
	EMUSTAHSIL = "EMUSTAHSIL",
	/** E-Gider Pusulası */
	EGIDERPUSULASI = "EGIDERPUSULASI",
	/** E-Adisyon */
	EADISYON = "EADISYON",
	/** E-Döviz Alım Satım Belgesi */
	EDOVIZ = "EDOVIZ",
}

/**
 * Fatura Senaryosu / Profili (UBL-TR ProfileID)
 */
export enum InvoiceProfile {
	/** Temel Fatura Senaryosu (Sistem yanıtı / Ret imkanı yok) */
	TEMEL = "TEMELFATURA",
	/** Ticari Fatura Senaryosu (7 gün içinde Kabul / Red yanıtı verilebilir) */
	TICARI = "TICARIFATURA",
	/** E-Arşiv Fatura Senaryosu (Vergi mükellefi olmayan veya e-fatura kullanmayanlara) */
	EARSIV = "EARSIVFATURA",
	/** Kamu Kurumlarına Kesilen Fatura */
	KAMU = "KAMU",
	/** Mal İhracatı Faturası */
	IHRACAT = "IHRACAT",
	/** Yolcu Beraberi Eşya İhracı (Tax Free) */
	YOLCUBERABER = "YOLCUBERABERFATURA",
	/** Hal Tipi Fatura */
	HAL = "HALTIPIFATURA",
	/** Enerji / Elektrik Piyasası */
	ENERJI = "ENERJI",
	/** Özel Matrah */
	OZELMATRAH = "OZELMATRAH",
}

/**
 * Fatura Türleri (UBL-TR InvoiceTypeCode)
 */
export enum InvoiceType {
	/** Standart Satış Faturası */
	SATIS = "SATIS",
	/** İade Faturası */
	IADE = "IADE",
	/** İstisna Faturası (0 KDV'li işlemler) */
	ISTISNA = "ISTISNA",
	/** Tevkifatlı Fatura */
	TEVKIFAT = "TEVKIFAT",
	/** İhraç Kayıtlı Fatura */
	IHRACKAYITLI = "IHRACKAYITLI",
	/** Konaklama Vergisi Faturası */
	KONAKLAMA = "KONAKLAMA",
	/** Özel Matrah Faturası */
	OZELMATRAH = "OZELMATRAH",
	/** SGK Faturası */
	SGK = "SGK",
	/** Komisyoncu Faturası */
	KOMISYONCU = "KOMISYONCU",
	/** Dövize Endeksli Fatura */
	DOVIZ = "DOVIZ",
}

/**
 * İrsaliye Türleri (UBL-TR DespatchAdviceTypeCode)
 */
export enum DespatchType {
	/** Standart Sevk İrsaliyesi */
	SEVK = "SEVK",
	/** Matbu İrsaliye Yerine Geçen */
	MATBU = "MATBU",
}

/**
 * İrsaliye Senaryoları / Profili
 */
export enum DespatchProfile {
	/** Temel İrsaliye Senaryosu */
	TEMEL = "TEMELIRSALIYE",
}

/**
 * İrsaliye Yanıt Durumu (ReceiptAdviceType)
 */
export enum DespatchResponseStatus {
	/** İrsaliye ve mallar eksiksiz kabul edildi */
	KABUL = "KABUL",
	/** İrsaliye tamamen reddedildi */
	RED = "RED",
	/** Mallar kısmen kabul edildi (teslim alınan / kabul edilmeyen miktarlar belirtilerek) */
	KISMIKABUL = "KISMIKABUL",
}

/**
 * GİB Standart Birim Kodları (UN/ECE Recommendation 20)
 */
export enum UnitCode {
	/** Adet (C62) */
	ADET = "C62",
	/** Kilogram (KGM) */
	KILOGRAM = "KGM",
	/** Gram (GRM) */
	GRAM = "GRM",
	/** Metre (MTR) */
	METRE = "MTR",
	/** Santimetre (CMT) */
	SANTIMETRE = "CMT",
	/** Milimetre (MMT) */
	MILIMETRE = "MMT",
	/** Metrekare (MTK) */
	METREKARE = "MTK",
	/** Metreküp (MTQ) */
	METREKUP = "MTQ",
	/** Litre (LTR) */
	LITRE = "LTR",
	/** Ton (TNE) */
	TON = "TNE",
	/** Paket (PA) */
	PAKET = "PA",
	/** Koli (BX) */
	KOLI = "BX",
	/** Gün (DAY) */
	GUN = "DAY",
	/** Saat (HUR) */
	SAAT = "HUR",
	/** Ay (MON) */
	AY = "MON",
	/** Yıl (ANN) */
	YIL = "ANN",
	/** Takım (SET) */
	TAKIM = "SET",
	/** Çift (PR) */
	CIFT = "PR",
}

/**
 * Para Birimleri (ISO 4217)
 */
export enum CurrencyCode {
	TRY = "TRY",
	USD = "USD",
	EUR = "EUR",
	GBP = "GBP",
	CHF = "CHF",
	RUB = "RUB",
	JPY = "JPY",
	SAR = "SAR",
	AED = "AED",
}

/**
 * Ödeme Şekli / Aracı Kodları (PaymentMeansCode)
 */
export enum PaymentMeansCode {
	/** Belirtilmemiş */
	BELIRTILMEMIS = "1",
	/** Nakit Ödeme */
	NAKIT = "10",
	/** Banka Havalesi / EFT */
	HAVALE_EFT = "42",
	/** Kredi Kartı / Banka Kartı */
	KREDI_KARTI = "48",
	/** Çek */
	CEK = "20",
	/** Senet */
	SENET = "21",
}

/**
 * İndirme Belge Formatı
 */
export enum DocumentFormat {
	PDF = "PDF",
	XML = "XML",
	HTML = "HTML",
	ZIP = "ZIP",
}

/**
 * GİB Zarf ve İşlem Durum Kodları
 */
export enum GibStatusCode {
	/** 1000 - Zarf Alındı */
	ZARF_ALINDI = 1000,
	/** 1100 - Zarf Kuyrukta */
	ZARF_KUYRUKTA = 1100,
	/** 1110 - Zarf İşleniyor */
	ZARF_ISLENIYOR = 1110,
	/** 1200 - Başarıyla İşlendi */
	BASARIYLA_ISLENDI = 1200,
	/** 1210 - Doküman Bulunamadı */
	DOKUMAN_BULUNAMADI = 1210,
	/** 1220 - Hedef Sistemden Hata Döndü */
	HEDEF_SISTEM_HATASI = 1220,
	/** 1230 - Zarf Şema Kontrolünden Geçemedi */
	SEMA_KONTROL_HATASI = 1230,
	/** 1300 - İmza Geçersiz */
	IMZA_GECERSIZ = 1300,
}
