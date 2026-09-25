/**
 * Mysoft GİB E-Dönüşüm SDK - Tarih ve Saat Yardımcı Modülü
 *
 * Date nesneleri, ISO metinleri, Unix zaman damgaları ve farklı tarih formatlarını
 * Mysoft API'nin beklediği standart formatlara (YYYY-MM-DD, HH:mm:ss, YYYY-MM-DDTHH:mm:ss)
 * güvenli bir şekilde dönüştürür.
 */

export type DateInput = Date | string | number | null | undefined;

export class DateHelper {
	/**
	 * Verilen tarih girdisini 'YYYY-MM-DD' (örn: 2026-09-25) formatına dönüştürür.
	 *
	 * Desteklenen formatlar:
	 * - Date nesnesi: `new Date()`
	 * - ISO metni: `"2026-09-25T14:30:00.000Z"` -> `"2026-09-25"`
	 * - Standart metin: `"2026-09-25"` -> `"2026-09-25"`
	 * - Türkçe metin: `"25.09.2026"`, `"25/09/2026"`, `"25-09-2026"` -> `"2026-09-25"`
	 * - Unix zaman damgası (ms veya sn): `1790348451000` -> `"2026-09-25"`
	 *
	 * @param input Dönüştürülecek tarih girdisi
	 * @returns YYYY-MM-DD formatında tarih metni veya geçersiz/boş ise undefined
	 */
	public static toDateString(input?: DateInput): string | undefined {
		if (input === null || input === undefined || input === "") {
			return undefined;
		}

		if (input instanceof Date) {
			if (isNaN(input.getTime())) {
				return undefined;
			}
			const y = input.getFullYear();
			const m = String(input.getMonth() + 1).padStart(2, "0");
			const d = String(input.getDate()).padStart(2, "0");
			return `${y}-${m}-${d}`;
		}

		if (typeof input === "number") {
			const ms = input > 1e11 ? input : input * 1000;
			const d = new Date(ms);
			if (isNaN(d.getTime())) return undefined;
			return DateHelper.toDateString(d);
		}

		if (typeof input === "string") {
			const str = input.trim();
			if (!str) return undefined;

			// 1. YYYY-MM-DD veya YYYY/MM/DD veya YYYY.MM.DD (veya devamında saat olan ISO metinleri)
			const isoMatch = str.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
			if (isoMatch) {
				const y = isoMatch[1];
				const m = isoMatch[2].padStart(2, "0");
				const d = isoMatch[3].padStart(2, "0");
				return `${y}-${m}-${d}`;
			}

			// 2. DD.MM.YYYY veya DD/MM/YYYY veya DD-MM-YYYY
			const trMatch = str.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
			if (trMatch) {
				const d = trMatch[1].padStart(2, "0");
				const m = trMatch[2].padStart(2, "0");
				const y = trMatch[3];
				return `${y}-${m}-${d}`;
			}

			// 3. Genel Date parse denemesi
			const parsed = new Date(str);
			if (!isNaN(parsed.getTime())) {
				return DateHelper.toDateString(parsed);
			}

			return str;
		}

		return undefined;
	}

	/**
	 * Verilen saat girdisini 'HH:mm:ss' (örn: 14:30:00) formatına dönüştürür.
	 *
	 * Desteklenen formatlar:
	 * - Date nesnesi: `new Date()` -> `"14:30:00"`
	 * - ISO metni: `"2026-09-25T14:30:15.000Z"` -> `"14:30:15"`
	 * - Saat metni: `"14:30"` -> `"14:30:00"`, `"14:30:15"` -> `"14:30:15"`
	 *
	 * @param input Dönüştürülecek saat veya tarih girdisi
	 * @returns HH:mm:ss formatında saat metni veya geçersiz/boş ise undefined
	 */
	public static toTimeString(input?: DateInput): string | undefined {
		if (input === null || input === undefined || input === "") {
			return undefined;
		}

		if (input instanceof Date) {
			if (isNaN(input.getTime())) {
				return undefined;
			}
			const h = String(input.getHours()).padStart(2, "0");
			const m = String(input.getMinutes()).padStart(2, "0");
			const s = String(input.getSeconds()).padStart(2, "0");
			return `${h}:${m}:${s}`;
		}

		if (typeof input === "number") {
			const ms = input > 1e11 ? input : input * 1000;
			const d = new Date(ms);
			if (isNaN(d.getTime())) return undefined;
			return DateHelper.toTimeString(d);
		}

		if (typeof input === "string") {
			const str = input.trim();
			if (!str) return undefined;

			// Eğer ISO formatında tarih ve saat içeriyorsa (örn: 2026-09-25T14:30:00)
			if (str.includes("T")) {
				const timePart = str.split("T")[1].replace("Z", "").split(".")[0].trim();
				return DateHelper.toTimeString(timePart);
			}

			// Boşlukla ayrılmış tarih saat (örn: 2026-09-25 14:30:00)
			if (str.includes(" ") && (str.includes("-") || str.includes(".") || str.includes("/"))) {
				const parts = str.split(/\s+/);
				if (parts.length >= 2) {
					return DateHelper.toTimeString(parts[1]);
				}
			}

			// HH:mm veya HH:mm:ss formatı
			const timeMatch = str.match(/^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/);
			if (timeMatch) {
				const h = timeMatch[1].padStart(2, "0");
				const m = timeMatch[2].padStart(2, "0");
				const s = (timeMatch[3] || "00").padStart(2, "0");
				return `${h}:${m}:${s}`;
			}

			return undefined;
		}

		return undefined;
	}

	/**
	 * Verilen tarih ve saat girdisini 'YYYY-MM-DDTHH:mm:ss' (veya özel ayraçla) formatına dönüştürür.
	 *
	 * @param input Dönüştürülecek tarih/saat girdisi
	 * @param separator Tarih ve saat arasındaki ayraç (Varsayılan: "T")
	 * @returns YYYY-MM-DDTHH:mm:ss formatında metin veya undefined
	 */
	public static toDateTimeString(input?: DateInput, separator = "T"): string | undefined {
		if (input === null || input === undefined || input === "") {
			return undefined;
		}

		const dateStr = DateHelper.toDateString(input);
		if (!dateStr) return undefined;

		let timeStr = DateHelper.toTimeString(input);
		if (!timeStr) {
			timeStr = "00:00:00";
		}

		return `${dateStr}${separator}${timeStr}`;
	}

	/**
	 * Bugünün tarihini 'YYYY-MM-DD' formatında döner.
	 */
	public static today(): string {
		return DateHelper.toDateString(new Date())!;
	}

	/**
	 * Şu anki saati 'HH:mm:ss' formatında döner.
	 */
	public static nowTime(): string {
		return DateHelper.toTimeString(new Date())!;
	}

	/**
	 * Girdinin geçerli bir Date veya tarih metni olup olmadığını doğrular.
	 */
	public static isValidDate(input: unknown): boolean {
		if (!input) return false;
		if (input instanceof Date) return !isNaN(input.getTime());
		if (typeof input === "number") return !isNaN(new Date(input).getTime());
		if (typeof input === "string") {
			return DateHelper.toDateString(input) !== undefined;
		}
		return false;
	}

	/**
	 * Girdiyi JavaScript `Date` nesnesine ayrıştırır.
	 */
	public static toDate(input?: DateInput): Date | undefined {
		if (input === null || input === undefined || input === "") {
			return undefined;
		}
		if (input instanceof Date) {
			return isNaN(input.getTime()) ? undefined : input;
		}
		if (typeof input === "number") {
			const ms = input > 1e11 ? input : input * 1000;
			const d = new Date(ms);
			return isNaN(d.getTime()) ? undefined : d;
		}
		if (typeof input === "string") {
			const str = input.trim();
			// DD.MM.YYYY veya DD/MM/YYYY kontrolü
			const trMatch = str.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?/);
			if (trMatch) {
				const d = parseInt(trMatch[1], 10);
				const m = parseInt(trMatch[2], 10) - 1;
				const y = parseInt(trMatch[3], 10);
				const hr = trMatch[4] ? parseInt(trMatch[4], 10) : 0;
				const min = trMatch[5] ? parseInt(trMatch[5], 10) : 0;
				const sec = trMatch[6] ? parseInt(trMatch[6], 10) : 0;
				const parsed = new Date(y, m, d, hr, min, sec);
				return isNaN(parsed.getTime()) ? undefined : parsed;
			}
			const d = new Date(str);
			return isNaN(d.getTime()) ? undefined : d;
		}
		return undefined;
	}
}
