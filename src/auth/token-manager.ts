import { ITokenProvider } from "../core/http-client";
import { ICacheAdapter } from "../cache/cache-adapter.interface";
import { MemoryCacheAdapter } from "../cache/memory-cache";
import { MysoftAuthTokenResponse, TokenManagerOptions } from "./types";
import { MYSOFT_URLS, DEFAULT_CONFIG } from "../core/constants";
import { MysoftAuthError } from "../errors/auth-error";
import { HttpClient } from "../core/http-client";

/**
 * Mysoft OAuth 2.0 Token Yöneticisi.
 * Otomatik token yenileme, TTL güvenliği ve eşzamanlı isteklerde Thundering Herd (Mutex) koruması sağlar.
 */
export class TokenManager implements ITokenProvider {
	private readonly clientId: string;
	private readonly clientSecret: string;
	private readonly tokenBufferSeconds: number;
	private readonly cacheKey: string;
	private readonly cache: ICacheAdapter;
	private httpClient?: HttpClient;

	/**
	 * Eşzamanlı token taleplerini birleştiren (single-flight) aktif Promise
	 */
	private pendingTokenPromise: Promise<string> | null = null;

	/**
	 * @param options - Token yöneticisi yapılandırması
	 * @param httpClient - HTTP istekleri için kullanılacak HttpClient örneği
	 */
	constructor(options: TokenManagerOptions, httpClient?: HttpClient) {
		if (!options.clientId || options.clientId.trim() === "") {
			throw new MysoftAuthError("TokenManager için geçerli bir 'clientId' zorunludur.");
		}
		if (!options.clientSecret || options.clientSecret.trim() === "") {
			throw new MysoftAuthError("TokenManager için geçerli bir 'clientSecret' zorunludur.");
		}

		this.clientId = options.clientId.trim();
		this.clientSecret = options.clientSecret.trim();
		this.tokenBufferSeconds = options.tokenBufferSeconds ?? DEFAULT_CONFIG.TOKEN_BUFFER_SEC;
		this.cache = options.cache ?? new MemoryCacheAdapter();

		const prefix = options.cacheKeyPrefix ?? "mysoft:token:";
		this.cacheKey = `${prefix}${this.clientId}`;

		if (httpClient) {
			this.httpClient = httpClient;
		}
	}

	/**
	 * HTTP Client referansını ayarlar
	 */
	public setHttpClient(httpClient: HttpClient): void {
		this.httpClient = httpClient;
	}

	/**
	 * Önbellekteki veya yeni alınacak geçerli Bearer token'ı döner.
	 * Eşzamanlı çoklu çağrılarda API'ye tek bir istek atılmasını garanti eder (Thundering Herd koruması).
	 */
	public async getToken(): Promise<string> {
		// 1. Önbellekte geçerli token var mı kontrol et
		const cachedToken = await this.cache.get(this.cacheKey);
		if (cachedToken && cachedToken.trim().length > 0) {
			return cachedToken;
		}

		// 2. Halihazırda devam eden bir token alma isteği varsa o Promise'i bekle (Single-flight / Mutex)
		if (this.pendingTokenPromise) {
			return await this.pendingTokenPromise;
		}

		// 3. Yeni bir token alma süreci başlat
		this.pendingTokenPromise = this.fetchTokenFromApi();

		try {
			const token = await this.pendingTokenPromise;
			return token;
		} finally {
			this.pendingTokenPromise = null;
		}
	}

	/**
	 * Önbellekte saklanan token'ı geçersiz kılar ve siler.
	 */
	public async clearToken(): Promise<void> {
		await this.cache.delete(this.cacheKey);
	}

	/**
	 * Mysoft /oauth/token endpoint'inden yeni bir token talep eder.
	 */
	private async fetchTokenFromApi(): Promise<string> {
		if (!this.httpClient) {
			throw new MysoftAuthError("TokenManager için HttpClient tanımlanmamış.");
		}

		const params = new URLSearchParams();
		params.append("client_id", this.clientId);
		params.append("client_secret", this.clientSecret);
		params.append("grant_type", "client_credentials");

		try {
			const response = await this.httpClient.post<MysoftAuthTokenResponse>(
				MYSOFT_URLS.OAUTH_TOKEN_PATH,
				params.toString(),
				{
					skipAuth: true,
					skipRetry: true,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);

			if (!response || !response.access_token) {
				throw new MysoftAuthError("OAuth yanıtında geçerli bir access_token bulunamadı.", 400, response);
			}

			// TTL hesaplama: (expires_in - buffer) örn: 300 - 30 = 270 saniye
			const expiresIn =
				typeof response.expires_in === "number" ? response.expires_in : DEFAULT_CONFIG.DEFAULT_TOKEN_TTL_SEC;
			const effectiveTtl = Math.max(10, expiresIn - this.tokenBufferSeconds);

			// Önbelleğe kaydet
			await this.cache.set(this.cacheKey, response.access_token, effectiveTtl);

			return response.access_token;
		} catch (error: unknown) {
			if (error instanceof MysoftAuthError) {
				throw error;
			}
			throw new MysoftAuthError(
				`Kimlik doğrulama (token alma) başarısız oldu: ${error instanceof Error ? error.message : String(error)}`,
				401,
				error
			);
		}
	}
}
