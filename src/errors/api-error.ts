import { MysoftError } from "./mysoft-error";

/**
 * Mysoft API Doğrulama / İş Kuralı Hata Modeli
 */
export interface MysoftApiValidationError {
	[field: string]: string[];
}

/**
 * Mysoft API yanıtında dönen hata detayları
 */
export interface MysoftApiErrorOptions {
	/** HTTP durum kodu (400, 404, 500 vb.) */
	statusCode?: number;
	/** Mysoft API'si tarafından dönen özel hata kodu (örn: "GIB_001") */
	errorCode?: string;
	/** İsteğin atıldığı API endpoint yolu */
	endpoint?: string;
	/** HTTP istek metodu (GET, POST vb.) */
	method?: string;
	/** API'den dönen ham yanıt gövdesi */
	responseBody?: unknown;
	/** Model/alan bazlı doğrulama hataları */
	validationErrors?: MysoftApiValidationError;
}

/**
 * Mysoft API yanıtlarından kaynaklanan hatalar sınıfı.
 * API'nin döndürdüğü hata kodlarını, HTTP durumunu ve doğrulama hatalarını barındırır.
 */
export class MysoftApiError extends MysoftError {
	/** HTTP durum kodu */
	public readonly statusCode?: number;

	/** Mysoft API'si tarafından dönen hata kodu */
	public readonly errorCode?: string;

	/** İstek atılan API endpoint'i */
	public readonly endpoint?: string;

	/** HTTP metodu */
	public readonly method?: string;

	/** API'den dönen ham yanıt gövdesi */
	public readonly responseBody?: unknown;

	/** Varsa model/alan doğrulama hataları */
	public readonly validationErrors?: MysoftApiValidationError;

	/**
	 * @param message - Hata mesajı
	 * @param options - API hata detayları
	 */
	constructor(message: string, options: MysoftApiErrorOptions = {}) {
		super(message, options.errorCode || "MYSOFT_API_ERROR", options.responseBody);
		this.statusCode = options.statusCode;
		this.errorCode = options.errorCode;
		this.endpoint = options.endpoint;
		this.method = options.method;
		this.responseBody = options.responseBody;
		this.validationErrors = options.validationErrors;
	}

	/**
	 * API yanıt gövdesinden ve durum kodundan MysoftApiError örneği üretir
	 */
	public static fromResponse(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		responseBody: any,
		statusCode?: number,
		endpoint?: string,
		method?: string
	): MysoftApiError {
		let message = "Mysoft API isteği başarısız oldu.";
		let errorCode: string | undefined;
		let validationErrors: MysoftApiValidationError | undefined;

		if (typeof responseBody === "string") {
			message = responseBody;
		} else if (responseBody && typeof responseBody === "object") {
			if (typeof responseBody.message === "string" && responseBody.message.trim().length > 0) {
				message = responseBody.message;
			} else if (typeof responseBody.Message === "string" && responseBody.Message.trim().length > 0) {
				message = responseBody.Message;
			} else if (typeof responseBody.title === "string") {
				message = responseBody.title;
			} else if (typeof responseBody.error_description === "string") {
				message = responseBody.error_description;
			} else if (typeof responseBody.error === "string") {
				message = responseBody.error;
			}

			if (typeof responseBody.errorCode === "string") {
				errorCode = responseBody.errorCode;
			} else if (typeof responseBody.ErrorCode === "string") {
				errorCode = responseBody.ErrorCode;
			}

			if (responseBody.errors && typeof responseBody.errors === "object") {
				validationErrors = responseBody.errors;
			} else if (responseBody.validationErrors && typeof responseBody.validationErrors === "object") {
				validationErrors = responseBody.validationErrors;
			}
		}

		return new MysoftApiError(message, {
			statusCode,
			errorCode,
			endpoint,
			method,
			responseBody,
			validationErrors,
		});
	}
}
