import { randomUUID } from "crypto";

/**
 * UUID ve ETTN (Evrensel Tekil Tanımlayıcı) Üretim ve Doğrulama Araçları.
 */
export class UuidHelper {
	private static readonly UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

	/**
	 * GİB ve UBL-TR standartlarına uygun rastgele bir v4 ETTN (UUID) üretir.
	 *
	 * @returns Küçük harfli UUID v4 string
	 *
	 * @example
	 * ```typescript
	 * import { UuidHelper } from "mysoft-nodejs";
	 *
	 * const ettn = UuidHelper.generateEttn();
	 * // "4ad402f0-b951-4aa2-acd6-6b6d74a79a10"
	 * ```
	 */
	public static generateEttn(): string {
		return randomUUID();
	}

	/**
	 * generateEttn ile aynı şekilde rastgele v4 UUID üretir.
	 */
	public static generate(): string {
		return randomUUID();
	}

	/**
	 * Verilen string değerin geçerli bir UUID / ETTN formatında olup olmadığını kontrol eder.
	 *
	 * @param uuid - Kontrol edilecek UUID metni
	 *
	 * @example
	 * ```typescript
	 * const isValid = UuidHelper.isValidUuid("4ad402f0-b951-4aa2-acd6-6b6d74a79a10"); // true
	 * ```
	 */
	public static isValidUuid(uuid: string): boolean {
		if (!uuid || typeof uuid !== "string") {
			return false;
		}
		return UuidHelper.UUID_REGEX.test(uuid.trim());
	}
}
