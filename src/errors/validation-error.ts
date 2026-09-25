import { MysoftError } from "./mysoft-error";

/**
 * İstemci tarafı (SDK) veri doğrulama hataları sınıfı.
 * Zorunlu alanların eksik verilmesi veya geçersiz biçimde (örn: geçersiz VKN/TCKN, geçersiz UUID) olması durumunda fırlatılır.
 */
export class MysoftValidationError extends MysoftError {
	/**
	 * Hatalı olan alan adı (varsa)
	 */
	public readonly field?: string;

	/**
	 * @param message - Doğrulama hata açıklaması
	 * @param field - İlgili alan adı
	 * @param details - İsteğe bağlı ek detaylar
	 */
	constructor(message: string, field?: string, details?: unknown) {
		super(message, "MYSOFT_VALIDATION_ERROR", details);
		this.field = field;
	}
}
