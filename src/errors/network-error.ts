import { MysoftError } from "./mysoft-error";

/**
 * Ağ (Network) ve bağlantı hataları sınıfı.
 * Zaman aşımı (Timeout), DNS çözülememesi, internet bağlantısı kopması gibi durumlarda fırlatılır.
 */
export class MysoftNetworkError extends MysoftError {
	/**
	 * İstek zaman aşımına uğradı mı?
	 */
	public readonly isTimeout: boolean;

	/**
	 * İstek atılan API endpoint'i
	 */
	public readonly endpoint?: string;

	/**
	 * @param message - Hata mesajı
	 * @param isTimeout - Zaman aşımı olup olmadığı
	 * @param endpoint - İstek atılan URL/endpoint
	 * @param details - Orijinal hata veya detaylar
	 */
	constructor(message: string, isTimeout = false, endpoint?: string, details?: unknown) {
		super(message, isTimeout ? "MYSOFT_TIMEOUT_ERROR" : "MYSOFT_NETWORK_ERROR", details);
		this.isTimeout = isTimeout;
		this.endpoint = endpoint;
	}
}
