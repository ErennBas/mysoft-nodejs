import { PartyInfo } from "./common";
import { CurrencyCode, UnitCode } from "./enums";

/**
 * E-Serbest Meslek Makbuzu (E-SMM) ve E-Müstahsil Kalem Modeli
 */
export interface VoucherLineItem {
	/** Hizmet / Ürün Adı */
	name: string;
	/** Miktar */
	quantity: number;
	/** Birim Kodu */
	unitCode: UnitCode | string;
	/** Birim Ücret / Fiyat (Brüt) */
	unitPrice: number;
	/** Stopaj (Gelir Vergisi Tevkifatı) Oranı (%) */
	stopageRate?: number;
	/** Stopaj Tutarı */
	stopageAmount?: number;
	/** KDV Oranı (%) */
	vatRate?: number;
	/** KDV Tutarı */
	vatAmount?: number;
	/** Net Ödenecek Tutar */
	netAmount?: number;
}

/**
 * E-SMM veya E-Müstahsil Oluşturma İstek Modeli
 */
export interface SendVoucherJsonRequest {
	/** UUID (ETTN) */
	uuid?: string;
	/** Belge Numarası */
	voucherNumber?: string;
	/** Seri / Ön Ek */
	prefix?: string;
	/** Belge Düzenleme Tarihi (YYYY-MM-DD veya Date nesnesi) */
	issueDate: string | Date;
	/** Para Birimi */
	currencyCode?: CurrencyCode | string;
	/** Müşteri / Hizmet Alan Bilgileri */
	customer: PartyInfo;
	/** Makbuz Kalemleri */
	lines: VoucherLineItem[];
	/** Notlar */
	notes?: string[];
}

export type SendFreelancerVoucherRequest = SendVoucherJsonRequest;
export type SendProducerReceiptRequest = SendVoucherJsonRequest;
export type SendExpenseNoteRequest = SendVoucherJsonRequest;
export type VoucherSendResponse = {
	uuid?: string;
	voucherNumber?: string;
	succeed?: boolean;
	message?: string;
};
