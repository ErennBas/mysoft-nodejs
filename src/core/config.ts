import { DEFAULT_CONFIG, MYSOFT_URLS } from "./constants";
import { ICacheAdapter } from "../cache/cache-adapter.interface";

/**
 * Desteklenen Mysoft ortamları
 */
export type MysoftEnvironment = "TEST" | "PRODUCTION" | "PROD";

/**
 * Mysoft İstemci yapılandırma seçenekleri
 */
export interface MysoftConfig {
	/**
	 * Mysoft Portal üzerinden oluşturulan Uygulama Kimliği (Client ID)
	 */
	clientId: string;

	/**
	 * Mysoft Portal üzerinden oluşturulan Uygulama Parolası (Client Secret)
	 */
	clientSecret: string;

	/**
	 * Çalışma ortamı.
	 * - `TEST`: Test ortamı (https://edocumentapi.mytest.tr)
	 * - `PRODUCTION` veya `PROD`: Canlı ortam (https://edocumentapi.mysoft.com.tr)
	 * @default 'TEST'
	 */
	environment?: MysoftEnvironment;

	/**
	 * Özel API Base URL'i (Verilirse environment URL'inin üzerine yazar).
	 */
	baseUrl?: string;

	/**
	 * İstek zaman aşımı süresi (milisaniye cinsinden).
	 * @default 30000 (30 saniye)
	 */
	timeout?: number;

	/**
	 * Token süresi bitmeden ne kadar süre önce yenileneceği (saniye cinsinden güvenlik payı).
	 * @default 30
	 */
	tokenBufferSeconds?: number;

	/**
	 * 401 Unauthorized alındığında token'ı sıfırlayıp 1 kez otomatik tekrar deneme.
	 * @default true
	 */
	autoRetryAuth?: boolean;

	/**
	 * Özel önbellek adaptörü (Redis vb.). Belirtilmezse dahili In-Memory adaptörü kullanılır.
	 */
	cache?: ICacheAdapter;
}

/**
 * Varsayılan değerlerle birleştirilmiş tam yapılandırma
 */
export interface ResolvedMysoftConfig extends Required<Omit<MysoftConfig, "baseUrl" | "cache">> {
	baseUrl: string;
	cache?: ICacheAdapter;
}

/**
 * Yapılandırma nesnesini doğrular ve varsayılan değerleri atar
 * @param config - Kullanıcıdan alınan yapılandırma
 */
export function resolveConfig(config: MysoftConfig): ResolvedMysoftConfig {
	if (!config) {
		throw new Error("Mysoft yapılandırma ayarları (config) zorunludur.");
	}

	if (!config.clientId || typeof config.clientId !== "string" || config.clientId.trim() === "") {
		throw new Error("Geçerli bir 'clientId' belirtilmelidir.");
	}

	if (!config.clientSecret || typeof config.clientSecret !== "string" || config.clientSecret.trim() === "") {
		throw new Error("Geçerli bir 'clientSecret' belirtilmelidir.");
	}

	const environment = config.environment || "TEST";

	let baseUrl = config.baseUrl;
	if (!baseUrl) {
		baseUrl = environment === "PRODUCTION" || environment === "PROD" ? MYSOFT_URLS.PRODUCTION : MYSOFT_URLS.TEST;
	}

	// URL sonundaki trailing slash'ı temizle
	baseUrl = baseUrl.replace(/\/+$/, "");

	return {
		clientId: config.clientId.trim(),
		clientSecret: config.clientSecret.trim(),
		environment,
		baseUrl,
		timeout: config.timeout ?? DEFAULT_CONFIG.TIMEOUT_MS,
		tokenBufferSeconds: config.tokenBufferSeconds ?? DEFAULT_CONFIG.TOKEN_BUFFER_SEC,
		autoRetryAuth: config.autoRetryAuth ?? true,
		cache: config.cache,
	};
}
