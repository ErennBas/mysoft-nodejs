import { EventEmitter } from "events";
import { UuidHelper } from "../utils/uuid";
import { InboxPollerOptions, PollerStats, IDistributedAdapter, SocketBroadcaster } from "./types";
import { GenericRedisClient } from "../cache/redis-cache";
import { RedisDistributedAdapter } from "./distributed-adapter";
import { WebhookForwarder } from "./webhook-forwarder";

/**
 * Gelen kutusu sorgulama (polling) ve event yayma temel sınıfı.
 * EventEmitter yetenekleriyle donatılmıştır.
 */
export abstract class BaseInboxPoller<TItem> extends EventEmitter {
	protected readonly options: Required<Pick<InboxPollerOptions<TItem>, "intervalMs" | "autoAck" | "limit">> &
		InboxPollerOptions<TItem>;

	protected readonly distributedAdapter?: IDistributedAdapter;
	protected readonly instanceId: string;
	protected readonly lockKey: string;
	protected readonly channel: string;
	protected readonly lockTtlMs: number;

	protected isRunning = false;
	protected isLeader = false;
	protected isPolling = false;
	protected pollTimer: NodeJS.Timeout | null = null;
	protected unsubscribePubSub?: () => Promise<void>;

	protected stats: PollerStats = {
		isRunning: false,
		isLeader: false,
		totalProcessed: 0,
		totalErrors: 0,
	};

	/**
	 * Yeni belgeleri Mysoft API'den çeken soyut metot (alt sınıflar uygular)
	 */
	protected abstract fetchNewItems(): Promise<TItem[]>;

	/**
	 * Belgenin portal üzerinde alındı/işlendi olarak onaylandığını bildiren metot (alt sınıflar uygular)
	 */
	public abstract acknowledgeItem(itemOrId: TItem | string): Promise<boolean>;

	/**
	 * Belgenin tekil kimliğini (ETTN / UUID) döner
	 */
	public abstract getItemId(item: TItem): string;

	/**
	 * Birincil event adını döner (örn. 'invoice', 'despatch')
	 */
	public abstract getItemEventName(): string;

	constructor(options: InboxPollerOptions<TItem> = {}) {
		super();

		this.options = {
			intervalMs: Math.max(1000, options.intervalMs ?? 30000),
			autoAck: options.autoAck ?? true,
			limit: Math.min(100, Math.max(1, options.limit ?? 100)),
			...options,
		};

		this.instanceId = options.redisOptions?.instanceId || UuidHelper.generate();
		this.lockKey = options.redisOptions?.lockKey || `mysoft:lock:${this.getItemEventName()}_poller`;
		this.channel = options.redisOptions?.channel || `mysoft:inbox:${this.getItemEventName()}`;
		this.lockTtlMs = options.redisOptions?.lockTtlMs || Math.max(5000, this.options.intervalMs * 1.5);

		// Dağıtık adaptör yapılandırması
		if (options.redis) {
			if ("acquireLock" in options.redis) {
				this.distributedAdapter = options.redis as IDistributedAdapter;
			} else {
				this.distributedAdapter = new RedisDistributedAdapter(options.redis as GenericRedisClient);
			}
		}
	}

	/**
	 * Poller döngüsünü başlatır.
	 */
	public async start(): Promise<void> {
		if (this.isRunning) return;

		this.isRunning = true;
		this.stats.isRunning = true;

		// Dağıtık Pub/Sub aboneliğini başlat
		if (this.distributedAdapter) {
			try {
				this.unsubscribePubSub = await this.distributedAdapter.subscribe(this.channel, (msg) => {
					this.handleDistributedMessage(msg);
				});
			} catch (err) {
				this.emitError(err as Error);
			}
		}

		this.emit("started");

		// İlk sorgulamayı hemen tetikle
		void this.pollCycle();
	}

	/**
	 * Poller döngüsünü durdurur.
	 */
	public async stop(): Promise<void> {
		if (!this.isRunning) return;

		this.isRunning = false;
		this.stats.isRunning = false;

		if (this.pollTimer) {
			clearTimeout(this.pollTimer);
			this.pollTimer = null;
		}

		// Dağıtık kilidi serbest bırak
		if (this.distributedAdapter && this.isLeader) {
			try {
				await this.distributedAdapter.releaseLock(this.lockKey, this.instanceId);
			} catch {
				// Hata yutulur
			}
			this.isLeader = false;
			this.stats.isLeader = false;
		}

		// Pub/Sub aboneliğini kapat
		if (this.unsubscribePubSub) {
			try {
				await this.unsubscribePubSub();
			} catch {
				// Hata yutulur
			}
			this.unsubscribePubSub = undefined;
		}

		this.emit("stopped");
	}

	/**
	 * Anlık olarak beklemeden sorgulama döngüsünü tetikler.
	 */
	public async pollNow(): Promise<TItem[]> {
		return await this.executePoll();
	}

	/**
	 * Belirli bir faturayı/irsaliyeyi manuel olarak onaylar (ack).
	 */
	public async ack(uuid: string): Promise<boolean> {
		return await this.acknowledgeItem(uuid);
	}

	/**
	 * Mevcut çalışma durumunu ve istatistikleri döner.
	 */
	public getStatus(): Readonly<PollerStats> {
		return { ...this.stats };
	}

	/**
	 * Ana periyodik döngü
	 */
	protected async pollCycle(): Promise<void> {
		if (!this.isRunning) return;

		try {
			await this.executePoll();
		} catch (err) {
			this.emitError(err as Error);
		} finally {
			if (this.isRunning) {
				this.pollTimer = setTimeout(() => {
					void this.pollCycle();
				}, this.options.intervalMs);
			}
		}
	}

	/**
	 * Tek bir sorgulama yürütür
	 */
	protected async executePoll(): Promise<TItem[]> {
		if (this.isPolling) return [];
		this.isPolling = true;

		const startTime = Date.now();

		try {
			// Dağıtık kilit kontrolü (Leader Election)
			if (this.distributedAdapter) {
				const acquired = await this.distributedAdapter.acquireLock(
					this.lockKey,
					this.lockTtlMs,
					this.instanceId
				);
				if (!acquired) {
					if (this.isLeader) {
						this.isLeader = false;
						this.stats.isLeader = false;
						this.emit("leader:lost");
					}
					return [];
				}

				if (!this.isLeader) {
					this.isLeader = true;
					this.stats.isLeader = true;
					this.emit("leader:acquired");
				}
			} else {
				this.isLeader = true;
				this.stats.isLeader = true;
			}

			this.emit("poll:start");

			// Belgeleri çek
			const rawItems = await this.fetchNewItems();

			// Filtreleme uygula
			const items: TItem[] = [];
			for (const item of rawItems) {
				if (this.options.filter) {
					const shouldInclude = await this.options.filter(item);
					if (shouldInclude) items.push(item);
				} else {
					items.push(item);
				}
			}

			const count = items.length;
			const durationMs = Date.now() - startTime;

			this.stats.lastPollAt = new Date();
			this.stats.lastPollDurationMs = durationMs;
			this.stats.lastPollCount = count;

			if (count > 0) {
				this.stats.totalProcessed += count;

				// Toplu liste event'i
				this.emit("batch", items);

				// Tekil belge event'leri ve entegrasyonlar
				for (const item of items) {
					const primaryEvent = this.getItemEventName();
					const itemId = this.getItemId(item);

					// Yerel event fırlat
					this.emit(primaryEvent, item);
					this.emit("item", item);

					// Redis Pub/Sub üzerinden diğer node'lara yay
					if (this.distributedAdapter) {
						const payload = JSON.stringify({
							instanceId: this.instanceId,
							event: primaryEvent,
							item,
						});
						void this.distributedAdapter.publish(this.channel, payload);
					}

					// Socket.IO yayını
					if (this.options.socketIo) {
						this.broadcastSocketIo(this.options.socketIo, primaryEvent, item);
					}

					// Webhook iletimi
					if (this.options.webhooks && this.options.webhooks.length > 0) {
						void WebhookForwarder.dispatchAll(
							this.options.webhooks,
							`mysoft.${primaryEvent}.received`,
							item
						);
					}

					// Otomatik onay (Auto Ack)
					if (this.options.autoAck) {
						try {
							const ackSuccess = await this.acknowledgeItem(item);
							if (ackSuccess) {
								this.emit("ack", itemId);
							}
						} catch (ackErr) {
							this.emitError(ackErr as Error);
						}
					}
				}
			}

			this.emit("poll:end", { count, durationMs });
			return items;
		} catch (err) {
			this.emitError(err as Error);
			return [];
		} finally {
			this.isPolling = false;
		}
	}

	/**
	 * Dağıtık Pub/Sub mesajı geldiğinde (diğer instance tarafından gönderilmişse)
	 */
	protected handleDistributedMessage(messageJson: string): void {
		try {
			const data = JSON.parse(messageJson);
			if (!data || data.instanceId === this.instanceId) {
				// Kendi gönderdiğimiz mesajı tekrar işlemeyiz
				return;
			}

			const primaryEvent = this.getItemEventName();
			const item = data.item as TItem;

			// Yerel dinleyicilere ilet
			this.emit(primaryEvent, item);
			this.emit("item", item);

			// Bu node'a bağlı Socket.IO istemcilerine de yayınla
			if (this.options.socketIo) {
				this.broadcastSocketIo(this.options.socketIo, primaryEvent, item);
			}
		} catch {
			// Parse hatası yutulur
		}
	}

	/**
	 * Socket.IO sunucusuna güvenli event yayımı
	 */
	protected broadcastSocketIo(socketIo: SocketBroadcaster, event: string, item: TItem): void {
		try {
			socketIo.emit(`${event}:received`, item);
			socketIo.emit("mysoft:inbox:item", { event, item });
		} catch {
			// Socket.io hatası yutulur
		}
	}

	/**
	 * Hata yakalama ve yayma
	 */
	protected emitError(error: Error): void {
		this.stats.totalErrors++;
		this.emit("error", error);
		if (this.options.onError) {
			try {
				this.options.onError(error);
			} catch {
				// onError hatası yutulur
			}
		}
	}
}
