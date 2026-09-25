import { IDistributedAdapter } from "./types";
import { GenericRedisClient } from "../cache/redis-cache";

/**
 * Tekil node ve test ortamları için hafıza içi (In-Memory) dağıtık adaptör
 */
export class MemoryDistributedAdapter implements IDistributedAdapter {
	private locks = new Map<string, { holderId: string; expiresAt: number }>();
	private subscribers = new Map<string, Set<(message: string) => void>>();

	public async acquireLock(key: string, ttlMs: number, holderId: string): Promise<boolean> {
		const now = Date.now();
		const current = this.locks.get(key);

		if (current && current.expiresAt > now && current.holderId !== holderId) {
			return false;
		}

		this.locks.set(key, { holderId, expiresAt: now + ttlMs });
		return true;
	}

	public async releaseLock(key: string, holderId: string): Promise<boolean> {
		const current = this.locks.get(key);
		if (current && current.holderId === holderId) {
			this.locks.delete(key);
			return true;
		}
		return false;
	}

	public async publish(channel: string, message: string): Promise<void> {
		const handlers = this.subscribers.get(channel);
		if (handlers) {
			handlers.forEach((handler) => {
				try {
					handler(message);
				} catch {
					// Hata yutulur
				}
			});
		}
	}

	public async subscribe(channel: string, handler: (message: string) => void): Promise<() => Promise<void>> {
		if (!this.subscribers.has(channel)) {
			this.subscribers.set(channel, new Set());
		}
		this.subscribers.get(channel)!.add(handler);

		return async () => {
			const set = this.subscribers.get(channel);
			if (set) {
				set.delete(handler);
				if (set.size === 0) {
					this.subscribers.delete(channel);
				}
			}
		};
	}
}

/**
 * ioredis ve node-redis (v4+) uyumlu Redis Dağıtık Kilit ve Pub/Sub Adaptörü
 */
export class RedisDistributedAdapter implements IDistributedAdapter {
	private readonly redis: GenericRedisClient;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private subscriberRedis: any = null;

	constructor(redisClient: GenericRedisClient) {
		if (!redisClient || typeof redisClient.get !== "function" || typeof redisClient.set !== "function") {
			throw new Error("Geçerli bir Redis istemcisi (ioredis veya node-redis) sağlanmalıdır.");
		}
		this.redis = redisClient;
	}

	/**
	 * Dağıtık kilit alır (SET key holderId PX ttlMs NX)
	 */
	public async acquireLock(key: string, ttlMs: number, holderId: string): Promise<boolean> {
		const ttl = Math.max(100, Math.floor(ttlMs));

		try {
			// ioredis / node-redis standart komut formatı
			let res: unknown;
			try {
				// ioredis format: redis.set(key, holderId, 'PX', ttl, 'NX')
				res = await this.redis.set(key, holderId, "PX", ttl, "NX");
			} catch {
				// node-redis format: redis.set(key, holderId, { PX: ttl, NX: true })
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				res = await (this.redis as any).set(key, holderId, { PX: ttl, NX: true });
			}

			return res === "OK" || res === true;
		} catch {
			return false;
		}
	}

	/**
	 * Kilidi güvenli şekilde Lua scripti veya GET & DEL ile serbest bırakır.
	 */
	public async releaseLock(key: string, holderId: string): Promise<boolean> {
		const luaScript =
			'if redis.call("get", KEYS[1]) == ARGV[1] then return redis.call("del", KEYS[1]) else return 0 end';

		try {
			if (typeof this.redis.eval === "function") {
				const result = await this.redis.eval(luaScript, 1, key, holderId);
				return result === 1;
			}
		} catch {
			// Lua script çalışmazsa fallback
		}

		try {
			const currentVal = await this.redis.get(key);
			if (currentVal === holderId) {
				await this.redis.del(key);
				return true;
			}
		} catch {
			// Hata durumu
		}

		return false;
	}

	/**
	 * Pub/Sub kanalına mesaj gönderir
	 */
	public async publish(channel: string, message: string): Promise<void> {
		if (typeof this.redis.publish === "function") {
			await this.redis.publish(channel, message);
		}
	}

	/**
	 * Pub/Sub kanalına abone olur
	 */
	public async subscribe(channel: string, handler: (message: string) => void): Promise<() => Promise<void>> {
		// Abonelik için ayrı bir redis bağlantısı gerekebilir
		const subClient = await this.getSubscriberClient();

		if (!subClient) {
			return async () => {};
		}

		// ioredis desteği
		if (typeof subClient.on === "function" && typeof subClient.subscribe === "function") {
			const messageListener = (ch: string, msg: string) => {
				if (ch === channel) {
					handler(msg);
				}
			};

			subClient.on("message", messageListener);
			await subClient.subscribe(channel);

			return async () => {
				try {
					subClient.removeListener("message", messageListener);
					if (typeof subClient.unsubscribe === "function") {
						await subClient.unsubscribe(channel);
					}
				} catch {
					// Kapatma hatası yutulur
				}
			};
		}

		// node-redis (v4+) desteği: subscribe(channel, (message) => ...)
		if (typeof subClient.subscribe === "function") {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			await subClient.subscribe(channel, (msg: any) => {
				handler(typeof msg === "string" ? msg : JSON.stringify(msg));
			});

			return async () => {
				try {
					if (typeof subClient.unsubscribe === "function") {
						await subClient.unsubscribe(channel);
					}
				} catch {
					// Kapatma hatası
				}
			};
		}

		return async () => {};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private async getSubscriberClient(): Promise<any> {
		if (this.subscriberRedis) {
			return this.subscriberRedis;
		}

		if (typeof this.redis.duplicate === "function") {
			try {
				const dup = this.redis.duplicate();
				if (typeof dup.connect === "function") {
					await dup.connect();
				}
				this.subscriberRedis = dup;
				return this.subscriberRedis;
			} catch {
				// duplicate başarısız olursa ana istemciyi dene
			}
		}

		this.subscriberRedis = this.redis;
		return this.subscriberRedis;
	}
}
