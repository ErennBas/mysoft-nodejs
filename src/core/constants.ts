/**
 * Mysoft API Sabitleri ve Yapılandırma Değerleri
 */

/**
 * Mysoft API URL sabitleri
 */
export const MYSOFT_URLS = {
	/** Test ortamı URL'i */
	TEST: "https://edocumentapi.mytest.tr",
	/** Canlı (Production) ortamı URL'i */
	PRODUCTION: "https://edocumentapi.mysoft.com.tr",
	/** OAuth Token endpoint yolu */
	OAUTH_TOKEN_PATH: "/oauth/token",
} as const;

/**
 * Varsayılan yapılandırma ayarları
 */
export const DEFAULT_CONFIG = {
	/** Varsayılan HTTP zaman aşımı (milisaniye): 30 saniye */
	TIMEOUT_MS: 30000,
	/** Token varsayılan TTL (saniye): 300 saniye (5 dakika) */
	DEFAULT_TOKEN_TTL_SEC: 300,
	/** Token süresi dolmadan önce güvenli yenileme payı (saniye): 30 saniye */
	TOKEN_BUFFER_SEC: 30,
	/** Varsayılan yeniden deneme (retry) sayısı */
	MAX_RETRIES: 2,
} as const;
