import { ICacheAdapter } from "./cache-adapter.interface";

interface CacheItem {
	value: string;
	expiresAt: number;
}

/**
 * Dahili Bellek İçi (In-Memory) Önbellek Yöneticisi.
 * Ekstra bir bağımlılık gerektirmeden Map tabanlı ve TTL kontrollü önbellekleme sağlar.
 */
export class MemoryCacheAdapter implements ICacheAdapter {
	private readonly store: Map<string, CacheItem> = new Map();

	/**
	 * Önbellekten anahtara karşılık gelen değeri getirir.
	 * Süresi dolmuşsa otomatik siler ve null döner.
	 */
	public get(key: string): string | null {
		const item = this.store.get(key);
		if (!item) {
			return null;
		}

		if (Date.now() > item.expiresAt) {
			this.store.delete(key);
			return null;
		}

		return item.value;
	}

	/**
	 * Değeri belirtilen yaşam süresiyle (TTL) önbelleğe kaydeder.
	 * @param key - Saklanacak anahtar
	 * @param value - Saklanacak string değer
	 * @param ttlSeconds - Yaşam süresi (saniye)
	 */
	public set(key: string, value: string, ttlSeconds: number): void {
		const expiresAt = Date.now() + Math.max(0, ttlSeconds) * 1000;
		this.store.set(key, { value, expiresAt });
	}

	/**
	 * Anahtarı önbellekten siler.
	 */
	public delete(key: string): void {
		this.store.delete(key);
	}

	/**
	 * Önbellekteki tüm kayıtları temizler.
	 */
	public clear(): void {
		this.store.clear();
	}

	/**
	 * Mevcut kayıt sayısını döner (süresi dolmamış veya henüz silinmemişler dahil).
	 */
	public size(): number {
		return this.store.size;
	}
}
