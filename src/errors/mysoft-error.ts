/**
 * Mysoft SDK temel hata sınıfı.
 * Kütüphaneden fırlatılan tüm özel hatalar bu sınıftan türer.
 */
export class MysoftError extends Error {
	/**
	 * Hata kodu veya hata türü tanımlayıcısı
	 */
	public readonly code: string;

	/**
	 * Hata ile ilişkili ek detaylar veya orijinal hata
	 */
	public readonly details?: unknown;

	/**
	 * @param message - Kullanıcıya veya loglara gösterilecek hata mesajı
	 * @param code - Hata kodu (varsayılan: 'MYSOFT_ERROR')
	 * @param details - İsteğe bağlı ek detaylar
	 */
	constructor(message: string, code = "MYSOFT_ERROR", details?: unknown) {
		super(message);
		this.name = this.constructor.name;
		this.code = code;
		this.details = details;

		// TypeScript Error inheritance düzeltmesi
		Object.setPrototypeOf(this, new.target.prototype);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}

	/**
	 * Hatayı JSON nesnesi olarak serileştirir
	 */
	public toJSON(): Record<string, unknown> {
		return {
			name: this.name,
			code: this.code,
			message: this.message,
			details: this.details,
			stack: this.stack,
		};
	}
}
