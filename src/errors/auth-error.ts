import { MysoftError } from "./mysoft-error";

/**
 * Mysoft OAuth / Kimlik doğrulama hataları sınıfı.
 * Geçersiz kimlik bilgileri (client_id, client_secret), süresi dolmuş veya geçersiz token durumlarında fırlatılır.
 */
export class MysoftAuthError extends MysoftError {
	/**
	 * HTTP durum kodu (varsa, örn: 401, 400)
	 */
	public readonly statusCode?: number;

	/**
	 * @param message - Kimlik doğrulama hata mesajı
	 * @param statusCode - HTTP yanıt durum kodu
	 * @param details - İsteğe bağlı ek detaylar
	 */
	constructor(message: string, statusCode?: number, details?: unknown) {
		super(message, "MYSOFT_AUTH_ERROR", details);
		this.statusCode = statusCode;
	}
}
