/**
 * Önbellek adaptörü arayüzü.
 * Dahili MemoryCache veya harici Redis gibi önbellek sistemlerinin uyguladığı standart sözleşme.
 */
export interface ICacheAdapter {
	/**
	 * Önbellekten verilen anahtara ait değeri getirir.
	 * @param key - Aranacak anahtar
	 * @returns Saklanan string değer veya bulunamazsa null
	 */
	get(key: string): Promise<string | null> | string | null;

	/**
	 * Değeri belirtilen yaşam süresiyle (TTL) önbelleğe kaydeder.
	 * @param key - Saklanacak anahtar
	 * @param value - Saklanacak string değer
	 * @param ttlSeconds - Yaşam süresi (saniye cinsinden)
	 */
	set(key: string, value: string, ttlSeconds: number): Promise<void> | void;

	/**
	 * Verilen anahtarı önbellekten siler.
	 * @param key - Silinecek anahtar
	 */
	delete(key: string): Promise<void> | void;
}
