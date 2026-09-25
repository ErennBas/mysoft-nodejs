import { ICacheAdapter } from "../cache/cache-adapter.interface";

/**
 * Mysoft OAuth 2.0 /oauth/token endpoint yanıt modeli
 */
export interface MysoftAuthTokenResponse {
	/**
	 * İsteklerde kullanılacak Bearer Access Token
	 */
	access_token: string;

	/**
	 * Token türü (Genellikle "bearer")
	 */
	token_type: string;

	/**
	 * Token yaşam süresi (saniye cinsinden, Mysoft için varsayılan 300 saniyedir)
	 */
	expires_in: number;

	/**
	 * Yenileme token'ı (Mysoft client_credentials akışında null döner)
	 */
	refresh_token: string | null;
}

/**
 * TokenManager yapılandırma seçenekleri
 */
export interface TokenManagerOptions {
	/**
	 * Uygulama Kimliği (Client ID)
	 */
	clientId: string;

	/**
	 * Uygulama Parolası (Client Secret)
	 */
	clientSecret: string;

	/**
	 * Token süresi dolmadan önce güvenli yenileme payı (saniye cinsinden)
	 * @default 30
	 */
	tokenBufferSeconds?: number;

	/**
	 * Önbellek anahtar öneki
	 * @default 'mysoft:token:'
	 */
	cacheKeyPrefix?: string;

	/**
	 * Önbellek adaptörü (varsayılan: MemoryCacheAdapter)
	 */
	cache?: ICacheAdapter;
}
