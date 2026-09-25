import { ICacheAdapter } from "./cache-adapter.interface";

/**
 * Desteklenen genel Redis istemci arayüzü
 */
export interface GenericRedisClient {
	get(key: string): Promise<string | null>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	set(key: string, value: string, ...args: any[]): Promise<any>;
	del(key: string | string[]): Promise<number>;
}

/**
 * Redis Önbellek Adaptörü.
 * ioredis veya redis (node-redis) istemcileriyle uyumlu çalışarak dağıtık ortamlarda token paylaşımı sağlar.
 */
export class RedisCacheAdapter implements ICacheAdapter {
	private readonly redis: GenericRedisClient;

	/**
	 * @param redisClient - Aktif ioredis veya redis istemci örneği
	 */
	constructor(redisClient: GenericRedisClient) {
		if (!redisClient || typeof redisClient.get !== "function" || typeof redisClient.set !== "function") {
			throw new Error("Geçerli bir Redis istemcisi (ioredis veya node-redis) sağlanmalıdır.");
		}
		this.redis = redisClient;
	}

	/**
	 * Redis'ten değeri getirir.
	 */
	public async get(key: string): Promise<string | null> {
		return await this.redis.get(key);
	}

	/**
	 * Değeri belirtilen yaşam süresiyle (TTL) Redis'e kaydeder.
	 * Hem ioredis ("EX", ttl) hem node-redis ({ EX: ttl }) standartlarını destekler.
	 */
	public async set(key: string, value: string, ttlSeconds: number): Promise<void> {
		const ttl = Math.max(1, Math.floor(ttlSeconds));

		try {
			// ioredis formatı: redis.set(key, value, 'EX', ttl)
			await this.redis.set(key, value, "EX", ttl);
		} catch {
			// node-redis (v4+) formatı: redis.set(key, value, { EX: ttl })
			await this.redis.set(key, value, { EX: ttl });
		}
	}

	/**
	 * Anahtarı Redis'ten siler.
	 */
	public async delete(key: string): Promise<void> {
		await this.redis.del(key);
	}
}
