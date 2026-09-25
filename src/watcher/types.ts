import { InvoiceHeaderInfoModel, DespatchHeaderInfoModel } from "../types/generated.types";
import { GenericRedisClient } from "../cache/redis-cache";

/**
 * Dağıtık sistemler için Lock ve Pub/Sub adaptör arayüzü
 */
export interface IDistributedAdapter {
	/**
	 * Dağıtık kilit (Mutex) almaya çalışır.
	 * @param key - Kilit anahtarı
	 * @param ttlMs - Kilit geçerlilik süresi (milisaniye)
	 * @param holderId - Kilidi alan instance kimliği
	 * @returns Kilit başarıyla alındıysa true, alınamadıysa false
	 */
	acquireLock(key: string, ttlMs: number, holderId: string): Promise<boolean>;

	/**
	 * Alınan kilidi güvenli şekilde serbest bırakır.
	 * @param key - Kilit anahtarı
	 * @param holderId - Kilidi alan instance kimliği
	 */
	releaseLock(key: string, holderId: string): Promise<boolean>;

	/**
	 * Pub/Sub kanalına mesaj yayınlar.
	 * @param channel - Kanal adı
	 * @param message - Gönderilecek metin
	 */
	publish(channel: string, message: string): Promise<void>;

	/**
	 * Pub/Sub kanalına abone olur.
	 * @param channel - Kanal adı
	 * @param handler - Mesaj yakalayıcı fonksiyon
	 * @returns Aboneliği sonlandıran unsubscribe fonksiyonu
	 */
	subscribe(channel: string, handler: (message: string) => void): Promise<() => Promise<void>>;
}

/**
 * HTTP Webhook iletim uç nokta yapılandırması
 */
export interface WebhookEndpointConfig {
	/**
	 * Webhook POST isteğinin gönderileceği hedef URL
	 */
	url: string;

	/**
	 * HMAC-SHA256 imzası için opsiyonel gizli anahtar (X-Mysoft-Signature başlığı ile iletilir)
	 */
	secret?: string;

	/**
	 * İsteğe eklenecek özel HTTP başlıkları (Authorization, API-Key vb.)
	 */
	headers?: Record<string, string>;

	/**
	 * Hata durumunda yeniden deneme sayısı (Varsayılan: 3)
	 */
	retries?: number;

	/**
	 * İstek zaman aşımı süresi (ms cinsinden, varsayılan: 10000ms)
	 */
	timeoutMs?: number;
}

/**
 * Socket.IO veya WebSocket sunucu entegrasyonu için arayüz
 */
export interface SocketBroadcaster {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	emit(event: string, ...args: any[]): any;
}

/**
 * Poller çalışma istatistikleri ve anlık durumu
 */
export interface PollerStats {
	/** Poller aktif olarak çalışıyor mu? */
	isRunning: boolean;
	/** Çoklu instance ortamında bu node aktif lider mi? */
	isLeader: boolean;
	/** Son sorgulama zamanı */
	lastPollAt?: Date;
	/** Son sorgulamanın tamamlanma süresi (ms) */
	lastPollDurationMs?: number;
	/** Son sorgulamada yakalanan yeni belge sayısı */
	lastPollCount?: number;
	/** Poller başlatıldığından beri işlenen toplam belge sayısı */
	totalProcessed: number;
	/** Meydana gelen toplam hata sayısı */
	totalErrors: number;
}

/**
 * Gelen kutusu poller temel yapılandırma seçenekleri
 */
export interface InboxPollerOptions<TItem> {
	/**
	 * Sorgulama periyodu (milisaniye cinsinden).
	 * Varsayılan: 30000 (30 saniye). Minimum: 1000 ms.
	 */
	intervalMs?: number;

	/**
	 * Yeni gelen belgelerin Mysoft portalında "Alındı/Kaydedildi" olarak otomatik işaretlenmesi (`SavedByCustomer`).
	 * `true` ise belge event'i yayıldıktan sonra otomatik onaylanır.
	 * `false` ise kullanıcının `poller.ack(uuid)` ile manuel onaylaması gerekir.
	 * Varsayılan: `true`.
	 */
	autoAck?: boolean;

	/**
	 * Birden fazla müşterisi/şubesi olan hesaplar için işlem yapılacak VKN/TCKN
	 */
	tenantIdentifierNumber?: string;

	/**
	 * Tek seferde çekilecek maksimum kayıt sayısı (1 - 100). Varsayılan: 100.
	 */
	limit?: number;

	/**
	 * Belirli bir tarihten itibaren olan belgeleri filtrelemek için başlangıç tarihi (YYYY-MM-DD veya Date)
	 */
	startDate?: string | Date;

	/**
	 * Belirli bir tarihe kadar olan belgeleri filtrelemek için bitiş tarihi (YYYY-MM-DD veya Date)
	 */
	endDate?: string | Date;

	/**
	 * Belirli bir posta kutusu etiketine (PK Alias) gelen belgeleri filtreler
	 */
	pkAlias?: string;

	/**
	 * İstemci tarafı özel filtreleme fonksiyonu (true dönerse event fırlatılır ve işlenir)
	 */
	filter?: (item: TItem) => boolean | Promise<boolean>;

	/**
	 * Dağıtık sistemler için Redis istemcisi veya özel IDistributedAdapter.
	 * Sağlandığında yalnızca tek bir instance Mysoft API'yi sorgular (Leader Election)
	 * ve yeni gelen faturaları Redis Pub/Sub üzerinden tüm instance'lara dağıtır.
	 */
	redis?: GenericRedisClient | IDistributedAdapter;

	/**
	 * Redis dağıtık kilit ve pub/sub ayarları
	 */
	redisOptions?: {
		/** Pub/sub kanalı (Varsayılan: "mysoft:inbox:events") */
		channel?: string;
		/** Kilit anahtarı (Varsayılan: "mysoft:lock:inbox_poller") */
		lockKey?: string;
		/** Kilit süresi ms (Varsayılan: intervalMs * 1.5) */
		lockTtlMs?: number;
		/** Bu instance'ın benzersiz kimliği (Varsayılan: otomatik UUID) */
		instanceId?: string;
	};

	/**
	 * Yeni belgeleri otomatik olarak iletecek HTTP Webhook uç noktaları
	 */
	webhooks?: WebhookEndpointConfig[];

	/**
	 * Yeni belgeleri otomatik olarak yayınlayacak Socket.io sunucusu veya broadcaster
	 */
	socketIo?: SocketBroadcaster;

	/**
	 * Hata meydana geldiğinde çağrılacak opsiyonel callback
	 */
	onError?: (error: Error) => void;
}

/**
 * Gelen Fatura (Invoice) Poller Seçenekleri
 */
export interface InboxInvoicePollerOptions extends InboxPollerOptions<InvoiceHeaderInfoModel> {
	/**
	 * Her fatura için UBL XML, HTML veya detaylı modeli otomatik indirip event'e eklesin mi?
	 * Varsayılan: false (Sadece başlık bilgisi döndürülür)
	 */
	fetchDetails?: boolean;
}

/**
 * Gelen İrsaliye (Despatch) Poller Seçenekleri
 */
export type InboxDespatchPollerOptions = InboxPollerOptions<DespatchHeaderInfoModel>;

/**
 * Gelen Fatura Poller Event Haritası
 */
export interface InvoicePollerEventMap {
	invoice: (invoice: InvoiceHeaderInfoModel) => unknown;
	item: (item: InvoiceHeaderInfoModel) => unknown;
	batch: (invoices: InvoiceHeaderInfoModel[]) => unknown;
	ack: (ettn: string) => unknown;
	error: (error: Error) => unknown;
	"poll:start": () => unknown;
	"poll:end": (summary: { count: number; durationMs: number }) => unknown;
	started: () => unknown;
	stopped: () => unknown;
	"leader:acquired": () => unknown;
	"leader:lost": () => unknown;
}

/**
 * Gelen İrsaliye Poller Event Haritası
 */
export interface DespatchPollerEventMap {
	despatch: (despatch: DespatchHeaderInfoModel) => unknown;
	item: (item: DespatchHeaderInfoModel) => unknown;
	batch: (despatches: DespatchHeaderInfoModel[]) => unknown;
	ack: (ettn: string) => unknown;
	error: (error: Error) => unknown;
	"poll:start": () => unknown;
	"poll:end": (summary: { count: number; durationMs: number }) => unknown;
	started: () => unknown;
	stopped: () => unknown;
	"leader:acquired": () => unknown;
	"leader:lost": () => unknown;
}
