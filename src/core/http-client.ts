import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
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
export interface MysoftRequestConfig extends AxiosRequestConfig {
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
}

/**
 * Mysoft API HTTP İstemcisi
 */
export class HttpClient {
	private readonly instance: AxiosInstance;
	private readonly config: ResolvedMysoftConfig;
	private tokenProvider?: ITokenProvider;

	constructor(config: ResolvedMysoftConfig, tokenProvider?: ITokenProvider) {
		this.config = config;
		this.tokenProvider = tokenProvider;

		this.instance = axios.create({
			baseURL: this.config.baseUrl,
			timeout: this.config.timeout,
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"User-Agent": `mysoft-nodejs/0.1.0 (Node.js ${process.version})`,
			},
		});

		this.setupInterceptors();
	}

	/**
	 * Token sağlayıcıyı dinamik olarak ayarlar veya günceller
	 */
	public setTokenProvider(provider: ITokenProvider): void {
		this.tokenProvider = provider;
	}

	/**
	 * Axios Request ve Response Interceptor'larını kurar
	 */
	private setupInterceptors(): void {
		// 1. Request Interceptor: Token enjeksiyonu
		this.instance.interceptors.request.use(
			async (reqConfig: InternalAxiosRequestConfig) => {
				const customConfig = reqConfig as InternalAxiosRequestConfig & MysoftRequestConfig;

				// skipAuth belirtilmemişse ve tokenProvider tanımlıysa token ekle
				if (!customConfig.skipAuth && this.tokenProvider) {
					const token = await this.tokenProvider.getToken();
					if (token) {
						reqConfig.headers.Authorization = `Bearer ${token}`;
					}
				}

				return reqConfig;
			},
			(error: unknown) => Promise.reject(this.handleError(error))
		);

		// 2. Response Interceptor: 401 Retry ve Hata Dönüşümü
		this.instance.interceptors.response.use(
			(response: AxiosResponse) => {
				return response;
			},
			async (error: AxiosError) => {
				const originalRequest = error.config as (InternalAxiosRequestConfig & MysoftRequestConfig) | undefined;

				// 401 Unauthorized yakalama ve 1 defaya mahsus retry işlemi
				if (
					error.response?.status === 401 &&
					originalRequest &&
					!originalRequest._retry &&
					!originalRequest.skipRetry &&
					!originalRequest.skipAuth &&
					this.config.autoRetryAuth &&
					this.tokenProvider
				) {
					originalRequest._retry = true;

					try {
						// Eski token'ı temizle; instance.request çağrıldığında request interceptor yeni token'ı alacaktır
						await this.tokenProvider.clearToken();
						return await this.instance.request(originalRequest);
					} catch (retryError) {
						return Promise.reject(this.handleError(retryError, originalRequest));
					}
				}

				return Promise.reject(this.handleError(error, originalRequest));
			}
		);
	}

	/**
	 * Axios veya JS hatalarını Mysoft özel hata sınıflarına dönüştürür
	 */
	public handleError(error: unknown, reqConfig?: AxiosRequestConfig): Error {
		if (!axios.isAxiosError(error)) {
			if (error instanceof Error) {
				return error;
			}
			return new Error(String(error));
		}

		const endpoint = reqConfig?.url || error.config?.url;
		const method = (reqConfig?.method || error.config?.method || "GET").toUpperCase();

		// Ağ / Bağlantı / Timeout Hataları
		if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
			return new MysoftNetworkError(
				`İstek zaman aşımına uğradı (${this.config.timeout}ms): [${method}] ${endpoint}`,
				true,
				endpoint,
				error
			);
		}

		if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED" || !error.response) {
			return new MysoftNetworkError(
				`Ağ bağlantı hatası (${error.code || error.message}): [${method}] ${endpoint}`,
				false,
				endpoint,
				error
			);
		}

		const status = error.response.status;
		const data = error.response.data;

		// 401 / 403 Yetkilendirme Hataları
		if (status === 401 || status === 403) {
			let authMsg = "Yetkilendirme başarısız: Geçersiz veya süresi dolmuş token (401 Unauthorized).";
			if (data && typeof data === "object") {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const anyData = data as any;
				if (anyData.error_description) {
					authMsg = anyData.error_description;
				} else if (anyData.message) {
					authMsg = anyData.message;
				}
			}
			return new MysoftAuthError(authMsg, status, data);
		}

		// Diğer tüm HTTP hataları (400, 404, 422, 500 vb.)
		return MysoftApiError.fromResponse(data, status, endpoint, method);
	}

	/**
	 * Genel HTTP isteği gönderir
	 */
	public async request<T = unknown>(reqConfig: MysoftRequestConfig): Promise<T> {
		const response = await this.instance.request<T>(reqConfig);
		return response.data;
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

	/**
	 * Ham Axios instance erişimi
	 */
	public getAxiosInstance(): AxiosInstance {
		return this.instance;
	}
}
