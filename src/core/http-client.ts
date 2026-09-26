import { ResolvedMysoftConfig } from "./config";
import { MysoftApiError } from "../errors/api-error";
import { MysoftAuthError } from "../errors/auth-error";
import { MysoftNetworkError } from "../errors/network-error";

/**
 * Token sağlayıcı arayüzü (TokenManager bu arayüzü uygular)
 */
export interface ITokenProvider {
	/**
	 * Geçerli bir Bearer Access Token döner (gerekiyorsa otomatik yeniler)
	 */
	getToken(): Promise<string>;

	/**
	 * Saklanan token'ı geçersiz kılar / temizler (401 durumunda çağrılır)
	 */
	clearToken(): Promise<void> | void;
}

/**
 * Ek istek yapılandırma seçenekleri
 */
export interface MysoftRequestConfig {
	/**
	 * İstek URL'i (göreli veya tam URL)
	 */
	url?: string;

	/**
	 * HTTP İstek Metodu (GET, POST, PUT, DELETE vb.)
	 * @default 'GET'
	 */
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | string;

	/**
	 * İstek gövdesi verisi (JSON formatında nesne veya ham string)
	 */
	data?: unknown;

	/**
	 * Doğrudan gövde verisi (Buffer, Uint8Array, string vb.)
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body?: any;

	/**
	 * İstek başlıkları (Headers)
	 */
	headers?: Record<string, string | undefined>;

	/**
	 * URL Sorgu Parametreleri (Query Parameters)
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params?: Record<string, any>;

	/**
	 * İstek bazlı özel zaman aşımı süresi (milisaniye)
	 */
	timeout?: number;

	/**
	 * Bu istek için Authorization Bearer başlığı eklenmesin mi? (Örn: OAuth endpoint'i için)
	 * @default false
	 */
	skipAuth?: boolean;

	/**
	 * 401 durumunda otomatik retry mekanizmasını devre dışı bırak
	 * @default false
	 */
	skipRetry?: boolean;

	/**
	 * Dahili kullanım: İsteğin yeniden denenip denenmediğini belirtir
	 */
	_retry?: boolean;

	/**
	 * İsteği iptal etmek için AbortSignal nesnesi
	 */
	signal?: AbortSignal;
}

/**
 * Mysoft API HTTP İstemcisi (Native Fetch tabanlı)
 */
export class HttpClient {
	private readonly config: ResolvedMysoftConfig;
	private tokenProvider?: ITokenProvider;
	private customFetch?: typeof fetch;

	constructor(config: ResolvedMysoftConfig, tokenProvider?: ITokenProvider, customFetch?: typeof fetch) {
		this.config = config;
		this.tokenProvider = tokenProvider;
		this.customFetch = customFetch;
	}

	/**
	 * Token sağlayıcıyı dinamik olarak ayarlar veya günceller
	 */
	public setTokenProvider(provider: ITokenProvider): void {
		this.tokenProvider = provider;
	}

	/**
	 * Özel fetch fonksiyonu ayarlar (özellikle test mock'ları için)
	 */
	public setCustomFetch(fetchFn?: typeof fetch): void {
		this.customFetch = fetchFn;
	}

	/**
	 * Yapılandırılmış API Base URL'ini döner
	 */
	public getBaseUrl(): string {
		return this.config.baseUrl;
	}

	/**
	 * Yapılandırılmış Timeout süresini döner
	 */
	public getTimeout(): number {
		return this.config.timeout;
	}

	/**
	 * HTTP hata durum kodlarını uygun Mysoft hata sınıflarına dönüştürür
	 */
	private handleHttpError(status: number, responseData: unknown, reqConfig?: MysoftRequestConfig): Error {
		const endpoint = reqConfig?.url;
		const method = (reqConfig?.method || "GET").toUpperCase();

		// 401 / 403 Yetkilendirme Hataları
		if (status === 401 || status === 403) {
			let authMsg = "Yetkilendirme başarısız: Geçersiz veya süresi dolmuş token (401 Unauthorized).";
			if (responseData && typeof responseData === "object") {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const anyData = responseData as any;
				if (anyData.error_description) {
					authMsg = anyData.error_description;
				} else if (anyData.message) {
					authMsg = anyData.message;
				}
			}
			return new MysoftAuthError(authMsg, status, responseData);
		}

		// Diğer tüm HTTP hataları (400, 404, 422, 500 vb.)
		return MysoftApiError.fromResponse(responseData, status, endpoint, method);
	}

	/**
	 * Ağ veya JS çalışma zamanı hatalarını Mysoft özel hata sınıflarına dönüştürür
	 */
	public handleError(error: unknown, reqConfig?: MysoftRequestConfig): Error {
		if (
			error instanceof MysoftApiError ||
			error instanceof MysoftAuthError ||
			error instanceof MysoftNetworkError
		) {
			return error;
		}

		const endpoint = reqConfig?.url;
		const method = (reqConfig?.method || "GET").toUpperCase();

		if (error instanceof Error) {
			const msg = error.message.toLowerCase();
			if (error.name === "AbortError" || msg.includes("timeout") || msg.includes("abort")) {
				return new MysoftNetworkError(
					`İstek zaman aşımına uğradı (${reqConfig?.timeout ?? this.config.timeout}ms): [${method}] ${endpoint}`,
					true,
					endpoint,
					error
				);
			}

			if (
				msg.includes("fetch failed") ||
				msg.includes("econnrefused") ||
				msg.includes("enotfound") ||
				msg.includes("network")
			) {
				return new MysoftNetworkError(
					`Ağ bağlantı hatası (${error.message}): [${method}] ${endpoint}`,
					false,
					endpoint,
					error
				);
			}

			return error;
		}

		return new Error(String(error));
	}

	/**
	 * Genel HTTP isteği gönderir
	 */
	public async request<T = unknown>(reqConfig: MysoftRequestConfig): Promise<T> {
		let fullUrl = reqConfig.url || "";
		if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
			const base = this.config.baseUrl.endsWith("/") ? this.config.baseUrl.slice(0, -1) : this.config.baseUrl;
			const path = fullUrl.startsWith("/") ? fullUrl : `/${fullUrl}`;
			fullUrl = `${base}${path}`;
		}

		if (reqConfig.params) {
			const urlObj = new URL(fullUrl);
			for (const [key, val] of Object.entries(reqConfig.params)) {
				if (val !== undefined && val !== null) {
					urlObj.searchParams.set(key, String(val));
				}
			}
			fullUrl = urlObj.toString();
		}

		const headers: Record<string, string> = {
			Accept: "application/json, text/plain, */*",
			"User-Agent": `mysoft-nodejs/0.1.0 (Node.js ${process.version})`,
		};

		if (reqConfig.headers) {
			for (const [key, val] of Object.entries(reqConfig.headers)) {
				if (val !== undefined) {
					headers[key] = val;
				}
			}
		}

		if (!reqConfig.skipAuth && this.tokenProvider && !headers["Authorization"] && !headers["authorization"]) {
			const token = await this.tokenProvider.getToken();
			if (token) {
				headers["Authorization"] = `Bearer ${token}`;
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let body: any = undefined;
		if (reqConfig.data !== undefined) {
			if (
				typeof reqConfig.data === "string" ||
				reqConfig.data instanceof Uint8Array ||
				reqConfig.data instanceof ArrayBuffer
			) {
				body = reqConfig.data;
			} else {
				body = JSON.stringify(reqConfig.data);
				if (!headers["Content-Type"] && !headers["content-type"]) {
					headers["Content-Type"] = "application/json";
				}
			}
		} else if (reqConfig.body !== undefined && reqConfig.body !== null) {
			body = reqConfig.body;
		}

		const timeoutMs = reqConfig.timeout ?? this.config.timeout;
		const controller = new AbortController();
		let timeoutId: NodeJS.Timeout | undefined;

		if (timeoutMs > 0) {
			timeoutId = setTimeout(() => {
				controller.abort(new Error(`Timeout of ${timeoutMs}ms exceeded`));
			}, timeoutMs);
		}

		if (reqConfig.signal) {
			if (reqConfig.signal.aborted) {
				controller.abort(reqConfig.signal.reason);
			} else {
				reqConfig.signal.addEventListener("abort", () => {
					controller.abort(reqConfig.signal?.reason);
				});
			}
		}

		try {
			const fetchFn = this.customFetch || globalThis.fetch;
			const method = (reqConfig.method || "GET").toUpperCase();

			const response = await fetchFn(fullUrl, {
				method,
				headers,
				body,
				signal: controller.signal,
			});

			if (timeoutId) clearTimeout(timeoutId);

			// 401 Unauthorized yakalama ve 1 defaya mahsus retry işlemi
			if (
				response.status === 401 &&
				!reqConfig._retry &&
				!reqConfig.skipRetry &&
				!reqConfig.skipAuth &&
				this.config.autoRetryAuth &&
				this.tokenProvider
			) {
				reqConfig._retry = true;
				await this.tokenProvider.clearToken();
				return await this.request<T>(reqConfig);
			}

			// Yanıt gövdesini parse et
			const contentType = response.headers.get("content-type") || "";
			let responseData: unknown;

			if (contentType.includes("application/json")) {
				try {
					responseData = await response.json();
				} catch {
					responseData = null;
				}
			} else {
				const text = await response.text();
				try {
					responseData = JSON.parse(text);
				} catch {
					responseData = text;
				}
			}

			if (!response.ok) {
				throw this.handleHttpError(response.status, responseData, reqConfig);
			}

			return responseData as T;
		} catch (err: unknown) {
			if (timeoutId) clearTimeout(timeoutId);
			throw this.handleError(err, reqConfig);
		}
	}

	/**
	 * HTTP GET isteği gönderir
	 */
	public async get<T = unknown>(url: string, reqConfig?: MysoftRequestConfig): Promise<T> {
		return this.request<T>({
			...reqConfig,
			method: "GET",
			url,
		});
	}

	/**
	 * HTTP POST isteği gönderir
	 */
	public async post<T = unknown>(url: string, data?: unknown, reqConfig?: MysoftRequestConfig): Promise<T> {
		return this.request<T>({
			...reqConfig,
			method: "POST",
			url,
			data,
		});
	}

	/**
	 * HTTP PUT isteği gönderir
	 */
	public async put<T = unknown>(url: string, data?: unknown, reqConfig?: MysoftRequestConfig): Promise<T> {
		return this.request<T>({
			...reqConfig,
			method: "PUT",
			url,
			data,
		});
	}

	/**
	 * HTTP DELETE isteği gönderir
	 */
	public async delete<T = unknown>(url: string, reqConfig?: MysoftRequestConfig): Promise<T> {
		return this.request<T>({
			...reqConfig,
			method: "DELETE",
			url,
		});
	}
}
