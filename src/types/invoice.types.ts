import { EDocumentType, InvoiceProfile, InvoiceType, UnitCode, CurrencyCode, PaymentMeansCode } from "./enums";
import { PartyInfo, DateRangeFilter } from "./common";

/**
 * UBL XML Formatında Fatura Gönderim İstek Modeli
 * (Mysoft /api/InvoiceOutbox/invoiceOutboxWithUblXml)
 */
export interface SendInvoiceWithUblXmlRequest {
	/**
	 * ZIP sıkıştırması uygulanmış ve Base64 formatına çevrilmiş UBL-TR XML metni.
	 * (UblHelper.xmlToBase64Zip yardımcısı ile oluşturulabilir)
	 */
	invoiceTypeUblString: string;

	/**
	 * E-Belge Türü (Varsayılan: EFATURA veya EARSIV)
	 */
	eDocumentType?: EDocumentType | keyof typeof EDocumentType;

	/**
	 * Fatura Seri / Ön Ek kodu (3 haneli, örn: "MYF", "ABC")
	 */
	prefix?: string;

	/**
	 * Alıcının Posta Kutusu (PK) Aliası (E-Fatura ise)
	 */
	pkAlias?: string;

	/**
	 * Gönderici Birim (GB) Aliası
	 */
	gbAlias?: string;

	/**
	 * Özel XSLT şablon adı (Mysoft Portal'da tanımlı ise)
	 */
	xsltName?: string | null;

	/**
	 * Şube veya alt kiracı tanımlayıcı numarası (Multi-tenant durumunda)
	 */
	tenantIdentifierNumber?: string | null;
}

/**
 * Fatura Kalemi Vergi Detayı
 */
export interface InvoiceTaxDetail {
	/** Vergi Kodu (örn: 0015: KDV, 4071: Konaklama Vergisi, vb.) */
	taxCode: string;
	/** Vergi Adı */
	taxName?: string;
	/** Vergi Oranı (%) */
	taxRate: number;
	/** Vergi Tutarı */
	taxAmount: number;
	/** Matrah Tutarı */
	taxableAmount?: number;
	/** Muafiyet / İstisna Kodu (KDV 0 ise zorunlu, örn: 351, 301) */
	exemptionReasonCode?: string;
	/** Muafiyet / İstisna Açıklaması */
	exemptionReasonText?: string;
}

/**
 * Fatura Kalemi (Satır) Modeli
 */
export interface InvoiceLineItem {
	/** Sıra No */
	lineId?: string | number;
	/** Mal / Hizmet Adı */
	name: string;
	/** Mal / Hizmet Açıklaması */
	description?: string;
	/** Miktar */
	quantity: number;
	/** Birim Kodu (UN/ECE standart, örn: C62 - Adet) */
	unitCode: UnitCode | string;
	/** Birim Fiyat (KDV Hariç) */
	unitPrice: number;
	/** KDV Oranı (0, 1, 10, 20 vb.) */
	vatRate: number;
	/** KDV Tutarı */
	vatAmount?: number;
	/** İskonto Oranı (%) */
	discountRate?: number;
	/** İskonto Tutarı */
	discountAmount?: number;
	/** İskonto / Artırım Nedeni */
	discountReason?: string;
	/** Tevkifat Kodu (örn: 601) */
	withholdingCode?: string;
	/** Tevkifat Oranı (örn: 2/10, 5/10, 9/10 veya ondalık 0.5) */
	withholdingRate?: number;
	/** Tevkifat Tutarı */
	withholdingAmount?: number;
	/** Kaleme ait ek vergiler (ÖTV, Konaklama vb.) */
	additionalTaxes?: InvoiceTaxDetail[];
	/** Kalem Toplam Tutarı (KDV Dahil) */
	totalAmount?: number;
}

/**
 * JSON Formatında Fatura Oluşturma / Gönderme İstek Modeli
 */
export interface SendInvoiceJsonRequest {
	/**
	 * Evrensel Tekil Tanımlayıcı (ETTN / UUID).
	 * Belirtilmezse SDK otomatik yeni bir v4 UUID üretir.
	 */
	uuid?: string;

	/**
	 * Fatura Numarası (16 haneli, örn: ABC2026000000001).
	 * Belirtilmezse ve Mysoft'ta seri tanımlıysa otomatik üretilebilir.
	 */
	invoiceNumber?: string;

	/**
	 * Fatura Seri / Ön Ek kodu (3 haneli, örn: "ABC")
	 */
	prefix?: string;

	/**
	 * Fatura Senaryosu (Varsayılan: TICARI veya EARSIV)
	 */
	profileId?: InvoiceProfile | keyof typeof InvoiceProfile;

	/**
	 * Fatura Senaryosu (profileId alternatifi, örn: InvoiceProfile.TICARI)
	 */
	profile?: InvoiceProfile | keyof typeof InvoiceProfile;

	/**
	 * Fatura Tipi (Varsayılan: SATIS)
	 */
	invoiceTypeCode?: InvoiceType | keyof typeof InvoiceType;

	/**
	 * Fatura Tipi (invoiceTypeCode alternatifi, örn: InvoiceType.SATIS)
	 */
	type?: InvoiceType | keyof typeof InvoiceType;

	/**
	 * E-Belge Türü (Varsayılan: EFATURA veya EARSIV)
	 */
	eDocumentType?: EDocumentType | keyof typeof EDocumentType;

	/**
	 * Alıcının Posta Kutusu (PK) Aliası (E-Fatura ise)
	 */
	pkAlias?: string;

	/**
	 * Gönderici Birim (GB) Aliası
	 */
	gbAlias?: string;

	/**
	 * Fatura Düzenleme Tarihi (YYYY-MM-DD veya Date nesnesi)
	 */
	issueDate: string | Date;

	/**
	 * Fatura Düzenleme Saati (HH:mm:ss veya Date nesnesi, opsiyonel)
	 */
	issueTime?: string | Date;

	/**
	 * Para Birimi (Varsayılan: TRY)
	 */
	currencyCode?: CurrencyCode | string;

	/**
	 * Döviz Kuru (Para birimi TRY dışında ise)
	 */
	exchangeRate?: number;

	/**
	 * Alıcı Bilgileri
	 */
	buyer: PartyInfo;

	/**
	 * Satıcı / Gönderici Bilgileri (Belirtilmezse Portal firma profili kullanılır)
	 */
	seller?: PartyInfo;

	/**
	 * Fatura Kalemleri (En az 1 satır zorunludur)
	 */
	lines: InvoiceLineItem[];

	/**
	 * Fatura Notları (Alt kısımdaki açıklamalar)
	 */
	notes?: string[];

	/**
	 * Sipariş Numarası ve Tarihi Referansı
	 */
	orderReference?: {
		orderId: string;
		issueDate?: string | Date;
	};

	/**
	 * İrsaliye Numarası ve Tarihi Referansları
	 */
	despatchReferences?: Array<{
		despatchId: string;
		issueDate?: string | Date;
	}>;

	/**
	 * Ödeme Şekli ve Hesap Detayları
	 */
	paymentInfo?: {
		paymentMeansCode?: PaymentMeansCode | string;
		payeeIban?: string;
		payeeBankName?: string;
		dueDate?: string | Date;
	};

	/**
	 * E-Arşiv Fatura İnternet Satışı Bilgileri (Varsa)
	 */
	internetSalesInfo?: {
		webAddress: string;
		paymentType: string;
		paymentDate: string | Date;
		cargoFirmTitle: string;
		cargoFirmVknTckn: string;
		deliveryDate?: string | Date;
	};
}

/**
 * Fatura Gönderim Sonuç Yanıt Modeli
 */
export interface SendInvoiceResponse {
	/** Fatura ETTN (UUID) */
	uuid: string;
	/** Üretilen Fatura No (örn: MYF2026000000001) */
	invoiceNumber?: string;
	/** İşlem başarı durumu */
	succeed: boolean;
	/** Bilgi veya sonuç mesajı */
	message?: string;
	/** GİB Durum Kodu */
	gibStatusCode?: number;
}

/**
 * Fatura Durum Sorgulama Filtresi
 */
export interface InvoiceStatusFilter {
	/** Sorgulanacak Fatura UUID listesi */
	uuids?: string[];
	/** Sorgulanacak Fatura Numaraları listesi */
	invoiceNumbers?: string[];
}

/**
 * Fatura Durum Bilgisi Modeli
 */
export interface InvoiceStatusItem {
	/** Fatura ETTN (UUID) */
	uuid: string;
	/** Fatura Numarası */
	invoiceNumber: string;
	/** GİB Durum Kodu (örn: 1200 - Başarıyla İşlendi) */
	gibStatusCode?: number;
	/** GİB Durum Açıklaması */
	gibStatusDescription?: string;
	/** Alıcı Kabul/Red Yanıt Durumu (TICARI faturalar için: KABUL, RED, BEKLIYOR) */
	responseStatus?: "KABUL" | "RED" | "BEKLIYOR" | string;
	/** Alıcı Yanıt Tarihi */
	responseDate?: string;
	/** Alıcı Yanıt Açıklaması */
	responseDescription?: string;
	/** Zarf UUID (ETTN) */
	envelopeUuid?: string;
	/** Belgenin GİB'e iletilme tarihi */
	sendDate?: string;
}

/**
 * Giden / Gelen Fatura Listeleme Filtresi
 */
export interface InvoiceListFilter extends DateRangeFilter {
	/** Karşı taraf VKN / TCKN */
	vknTckn?: string;
	/** Fatura Numarası veya seri araması */
	invoiceNumber?: string;
	/** Fatura UUID */
	uuid?: string;
	/** Fatura Senaryosu */
	profileId?: InvoiceProfile | string;
	/** Fatura Tipi */
	invoiceTypeCode?: InvoiceType | string;
	/** Dışa aktarılma durumu */
	isExported?: boolean;
	/** Sayfa başına kayıt sayısı (Varsayılan: 20) */
	pageSize?: number;
	/** Sayfa numarası / index (0-indexed veya 1-indexed) */
	pageIndex?: number;
}

/**
 * Fatura Listeleme Satırı (Özet Veri)
 */
export interface InvoiceListItem {
	/** Fatura ETTN (UUID) */
	uuid: string;
	/** Fatura Numarası */
	invoiceNumber: string;
	/** Belge Türü (EFATURA / EARSIV) */
	eDocumentType: EDocumentType | string;
	/** Fatura Düzenleme Tarihi */
	issueDate: string;
	/** Alıcı Unvanı / Adı Soyadı */
	buyerTitle: string;
	/** Alıcı VKN / TCKN */
	buyerVknTckn: string;
	/** Ödenecek Toplam Tutar */
	payableAmount: number;
	/** Para Birimi */
	currencyCode: string;
	/** GİB Durum Kodu */
	gibStatusCode?: number;
	/** GİB Durum Açıklaması */
	gibStatusDescription?: string;
	/** Alıcı Yanıt Durumu */
	responseStatus?: string;
}

/**
 * Fatura İptal / İtiraz İstek Modeli
 */
export interface InvoiceCancelRequest {
	/** İptal edilecek fatura UUID */
	uuid: string;
	/** İptal Nedeni / Açıklaması */
	cancelReason: string;
	/** İptal Tarihi (YYYY-MM-DD veya Date nesnesi, opsiyonel) */
	cancelDate?: string | Date;
	/** E-Belge Türü (EARSIV veya EFATURA) */
	eDocumentType?: EDocumentType | string;
}

/**
 * Fatura İptal / İtiraz Yanıt Modeli
 */
export interface InvoiceCancelResponse {
	/** Fatura UUID */
	uuid: string;
	/** İptal başarı durumu */
	succeed: boolean;
	/** Sonuç mesajı */
	message?: string;
}
