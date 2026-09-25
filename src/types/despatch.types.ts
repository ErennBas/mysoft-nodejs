import { DespatchType, DespatchProfile, DespatchResponseStatus, UnitCode } from "./enums";
import { PartyInfo, DateRangeFilter } from "./common";

/**
 * UBL XML Formatında İrsaliye Gönderim İstek Modeli
 */
export interface SendDespatchWithUblXmlRequest {
	/**
	 * ZIP sıkıştırması uygulanmış ve Base64 formatına çevrilmiş UBL-TR İrsaliye XML metni
	 */
	despatchTypeUblString: string;

	/**
	 * İrsaliye Seri / Ön Ek kodu (3 haneli, örn: "IRS")
	 */
	prefix?: string;

	/**
	 * Alıcının Posta Kutusu (PK) Aliası
	 */
	pkAlias?: string;

	/**
	 * Gönderici Birim (GB) Aliası
	 */
	gbAlias?: string;

	/**
	 * Özel XSLT şablon adı
	 */
	xsltName?: string | null;

	/**
	 * Şube / Kiracı ID
	 */
	tenantIdentifierNumber?: string | null;
}

/**
 * İrsaliye Kalem (Satır) Modeli
 */
export interface DespatchLineItem {
	/** Sıra No */
	lineId?: string | number;
	/** Mal / Ürün Adı */
	name: string;
	/** Ürün Açıklaması */
	description?: string;
	/** Sevk Miktarı */
	deliveredQuantity: number;
	/** Birim Kodu (örn: C62, KGM) */
	unitCode: UnitCode | string;
	/** İrsaliye satırındaki sipariş satır referansı */
	orderLineReference?: {
		lineId: string;
	};
}

/**
 * Taşıyıcı ve Sürücü Bilgileri
 */
export interface ShipmentCarrierInfo {
	/** Taşıyıcı Firma Unvanı veya Ad Soyad */
	carrierTitle?: string;
	/** Taşıyıcı VKN veya TCKN */
	carrierVknTckn?: string;
	/** Çekici / Araç Plaka Numarası */
	plateNumber?: string;
	/** Dorse / Römork Plaka Numarası (Varsa) */
	trailerPlateNumber?: string;
	/** Şoför Adı Soyadı */
	driverFullName?: string;
	/** Şoför TCKN */
	driverTckn?: string;
}

/**
 * JSON Formatında İrsaliye Oluşturma İstek Modeli
 */
export interface SendDespatchJsonRequest {
	/** İrsaliye ETTN (UUID) */
	uuid?: string;

	/** İrsaliye Numarası (16 haneli) */
	despatchNumber?: string;

	/** İrsaliye Ön Eki (örn: "IRS") */
	prefix?: string;

	/** İrsaliye Senaryosu (Varsayılan: TEMELIRSALIYE) */
	profileId: DespatchProfile | keyof typeof DespatchProfile;

	/** İrsaliye Türü (Varsayılan: SEVK) */
	despatchTypeCode: DespatchType | keyof typeof DespatchType;

	/** İrsaliye Düzenleme Tarihi (YYYY-MM-DD veya Date nesnesi) */
	issueDate: string | Date;

	/** İrsaliye Düzenleme Saati (HH:mm:ss veya Date nesnesi) */
	issueTime?: string | Date;

	/** Fiili Sevk Tarihi (YYYY-MM-DD veya Date nesnesi) */
	actualDespatchDate?: string | Date;

	/** Fiili Sevk Saati (HH:mm:ss veya Date nesnesi) */
	actualDespatchTime?: string | Date;

	/** Alıcı Bilgileri */
	buyer: PartyInfo;

	/** Satıcı / Gönderici Bilgileri */
	seller?: PartyInfo;

	/** Taşıyıcı ve Sevkiyat Bilgileri */
	carrierInfo?: ShipmentCarrierInfo;

	/** Teslimat Adresi (Farklı bir sevk adresi varsa) */
	deliveryAddress?: PartyInfo;

	/** İrsaliye Kalemleri */
	lines: DespatchLineItem[];

	/** İrsaliye Notları */
	notes?: string[];
}

/**
 * Gelen İrsaliyeye Yanıt Verme (İrsaliye Yanıtı - ReceiptAdvice) İstek Modeli
 */
export interface DespatchResponseRequest {
	/** Yanıt verilecek İrsaliyenin ETTN (UUID) bilgisi */
	despatchUuid: string;

	/** İrsaliye Numarası */
	despatchNumber?: string;

	/** Yanıt Durumu (KABUL, RED, KISMIKABUL) */
	responseStatus: DespatchResponseStatus | keyof typeof DespatchResponseStatus;

	/** Yanıt Düzenleme Tarihi (YYYY-MM-DD veya Date nesnesi) */
	issueDate: string | Date;

	/** Yanıt Açıklaması / Notlar */
	notes?: string[];

	/**
	 * KISMI KABUL veya RED durumunda kalem bazlı teslimat detayları
	 */
	lineResponses?: Array<{
		/** İrsaliye Satır No */
		lineId: string | number;
		/** Kabul Edilen / Teslim Alınan Miktar */
		receivedQuantity: number;
		/** Kabul Edilmeyen / Reddedilen Miktar */
		rejectedQuantity?: number;
		/** Eksik Miktar */
		shortQuantity?: number;
		/** Fazla Miktar */
		oversupplyQuantity?: number;
		/** Birim Kodu (C62 vb.) */
		unitCode: UnitCode | string;
		/** Red veya Fark Nedeni Açıklaması */
		rejectionReason?: string;
	}>;
}

/**
 * İrsaliye Durum Modeli
 */
export interface DespatchStatusItem {
	uuid: string;
	despatchNumber: string;
	gibStatusCode?: number;
	gibStatusDescription?: string;
	responseStatus?: string;
	envelopeUuid?: string;
	sendDate?: string;
}

/**
 * İrsaliye Listeleme Filtresi
 */
export interface DespatchListFilter extends DateRangeFilter {
	vknTckn?: string;
	despatchNumber?: string;
	uuid?: string;
	pageSize?: number;
	pageIndex?: number;
}

export type SendDespatchResponse = {
	uuid?: string;
	invoiceNumber?: string;
	succeed?: boolean;
	message?: string;
};

export type ReceiptAdviceRequest = DespatchResponseRequest;
export type ReceiptAdviceResponse = Record<string, unknown>;
