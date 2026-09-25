/**
 * Vergi Kimlik Numarası (VKN), TCKN ve GİB Belge Numarası Doğrulama Araçları.
 */
export class Validators {
	private static readonly INVOICE_NUMBER_REGEX = /^[A-Z0-9]{3}[0-9]{4}[0-9]{9}$/;

	/**
	 * 10 haneli tüzel kişi Vergi Kimlik Numarasını (VKN) resmi GİB matematiksel algoritması ile doğrular.
	 *
	 * @param vkn - Doğrulanacak 10 haneli VKN metni
	 *
	 * @example
	 * ```typescript
	 * import { Validators } from "mysoft-nodejs";
	 *
	 * const isValid = Validators.isValidVkn("6260271383"); // true
	 * const isFake = Validators.isValidVkn("1111111111"); // false
	 * ```
	 */
	public static isValidVkn(vkn: string): boolean {
		if (!vkn || typeof vkn !== "string") {
			return false;
		}

		const cleaned = vkn.trim();
		if (!/^\d{10}$/.test(cleaned)) {
			return false;
		}

		const digits = cleaned.split("").map(Number);
		let sum = 0;

		for (let i = 0; i < 9; i++) {
			const v1 = (digits[i] + (9 - i)) % 10;
			if (v1 === 0) {
				sum += 0;
			} else {
				const v2 = (v1 * Math.pow(2, 9 - i)) % 9;
				sum += v2 === 0 ? 9 : v2;
			}
		}

		const checkDigit = (10 - (sum % 10)) % 10;
		return checkDigit === digits[9];
	}

	/**
	 * 11 haneli gerçek kişi T.C. Kimlik Numarasını (TCKN) resmi Nüfus Müdürlüğü algoritması ile doğrular.
	 *
	 * @param tckn - Doğrulanacak 11 haneli TCKN metni
	 *
	 * @example
	 * ```typescript
	 * const isValid = Validators.isValidTckn("10000000146"); // true
	 * ```
	 */
	public static isValidTckn(tckn: string): boolean {
		if (!tckn || typeof tckn !== "string") {
			return false;
		}

		const cleaned = tckn.trim();
		if (!/^[1-9]\d{10}$/.test(cleaned)) {
			return false;
		}

		const digits = cleaned.split("").map(Number);

		const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
		const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

		const digit10 = (oddSum * 7 - evenSum) % 10;
		if (digit10 < 0 || digit10 !== digits[9]) {
			return false;
		}

		const totalSum = digits.slice(0, 10).reduce((acc, curr) => acc + curr, 0);
		const digit11 = totalSum % 10;

		return digit11 === digits[10];
	}

	/**
	 * Verilen kimlik numarasının uzunluğuna göre geçerli bir VKN (10 hane) veya TCKN (11 hane) olup olmadığını doğrular.
	 *
	 * @param identifier - VKN veya TCKN metni
	 *
	 * @example
	 * ```typescript
	 * const isValid = Validators.isValidVknOrTckn("6260271383"); // true
	 * ```
	 */
	public static isValidVknOrTckn(identifier: string): boolean {
		if (!identifier || typeof identifier !== "string") {
			return false;
		}

		const cleaned = identifier.trim();
		if (cleaned.length === 10) {
			return Validators.isValidVkn(cleaned);
		}
		if (cleaned.length === 11) {
			return Validators.isValidTckn(cleaned);
		}
		return false;
	}

	/**
	 * GİB standartlarına uygun 16 haneli fatura numarasını doğrular (3 haneli seri ön eki + 4 haneli yıl + 9 haneli sıra no).
	 *
	 * @param invoiceNumber - Doğrulanacak fatura numarası (örn: "MYF2026000000001")
	 *
	 * @example
	 * ```typescript
	 * const isValid = Validators.isValidInvoiceNumber("MYF2026000000001"); // true
	 * const isWrong = Validators.isValidInvoiceNumber("123"); // false
	 * ```
	 */
	public static isValidInvoiceNumber(invoiceNumber: string): boolean {
		if (!invoiceNumber || typeof invoiceNumber !== "string") {
			return false;
		}

		const cleaned = invoiceNumber.trim().toUpperCase();
		return Validators.INVOICE_NUMBER_REGEX.test(cleaned);
	}
}
