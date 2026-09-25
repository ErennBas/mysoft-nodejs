import { AddressInfo } from "./common";

/**
 * Kontör / Kredi Bakiye Bilgisi
 */
export interface CreditBalanceResponse {
	/** Toplam Tanımlı Kontör */
	totalCredit: number;
	/** Kullanılan Kontör Miktarı */
	usedCredit: number;
	/** Kalan Kullanılabilir Kontör Miktarı */
	remainingCredit: number;
	/** Son kullanım / geçerlilik tarihi (varsa) */
	expiryDate?: string | null;
}

/**
 * Portal Firma / Kiracı Profil Bilgisi
 */
export interface TenantProfileResponse {
	/** Firma VKN veya TCKN */
	vknTckn: string;
	/** Firma Ticari Unvanı */
	title: string;
	/** Vergi Dairesi */
	taxOffice?: string;
	/** Adres Bilgileri */
	address?: AddressInfo;
	/** E-Fatura Kullanım Durumu */
	isEInvoiceUser: boolean;
	/** E-Arşiv Kullanım Durumu */
	isEArchiveUser: boolean;
	/** E-İrsaliye Kullanım Durumu */
	isEDespatchUser: boolean;
	/** E-SMM Kullanım Durumu */
	isESmmUser: boolean;
	/** E-Defter Kullanım Durumu */
	isEBookUser: boolean;
}

export type TenantCreditInfo = CreditBalanceResponse;
export type TenantInfo = TenantProfileResponse;
export type UpdateTenantInfoRequest = Partial<TenantProfileResponse>;
export interface BranchInfo {
	id?: number;
	branchCode?: string;
	branchName?: string;
}
