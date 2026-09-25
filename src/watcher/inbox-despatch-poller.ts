import { BaseInboxPoller } from "./base-inbox-poller";
import { InboxDespatchPollerOptions, DespatchPollerEventMap } from "./types";
import { DespatchHeaderInfoModel } from "../types/generated.types";
import { DespatchService } from "../services/despatch.service";
import { DateHelper } from "../utils/date-helper";

/**
 * Gelen e-İrsaliyeleri periyodik olarak sorgulayan,
 * event ve webhook olarak yayan, Redis ile dağıtık çalışan Poller sınıfı.
 */
export class InboxDespatchPoller extends BaseInboxPoller<DespatchHeaderInfoModel> {
	private readonly despatchService: DespatchService;

	constructor(despatchService: DespatchService, options: InboxDespatchPollerOptions = {}) {
		super(options);
		this.despatchService = despatchService;
	}

	public getItemEventName(): string {
		return "despatch";
	}

	public getItemId(item: DespatchHeaderInfoModel): string {
		return item.ettn || String(item.id || "");
	}

	/**
	 * Mysoft API üzerinden yeni gelen irsaliyeleri başlık bilgileriyle çeker.
	 */
	protected async fetchNewItems(): Promise<DespatchHeaderInfoModel[]> {
		const sDate = this.options.startDate ? DateHelper.toDateString(this.options.startDate) : undefined;
		const eDate = this.options.endDate ? DateHelper.toDateString(this.options.endDate) : undefined;

		const response = await this.despatchService.getNewDespatchInboxWithHeaderInfoList({
			limit: this.options.limit,
			tenantIdentifierNumber: this.options.tenantIdentifierNumber,
			startDate: sDate,
			endDate: eDate,
			pkAlias: this.options.pkAlias,
		});

		if (response.data && Array.isArray(response.data)) {
			return response.data;
		}

		return [];
	}

	/**
	 * Gelen irsaliyeyi Mysoft portalında "Alındı/Kaydedildi" olarak onaylar.
	 */
	public async acknowledgeItem(itemOrId: DespatchHeaderInfoModel | string): Promise<boolean> {
		const uuid = typeof itemOrId === "string" ? itemOrId : this.getItemId(itemOrId);
		if (!uuid) return false;

		const res = await this.despatchService.despatchInboxSavedByCustomer({
			despatchETTN: uuid,
			tenantIdentifierNumber: this.options.tenantIdentifierNumber,
		});

		return res.data === true || res.succeed === true;
	}

	// Güçlü tiplenmiş Event dinleyicileri
	public override on<K extends keyof DespatchPollerEventMap>(event: K, listener: DespatchPollerEventMap[K]): this;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public override on(event: string | symbol, listener: (...args: any[]) => void): this {
		return super.on(event, listener);
	}

	public override once<K extends keyof DespatchPollerEventMap>(event: K, listener: DespatchPollerEventMap[K]): this;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public override once(event: string | symbol, listener: (...args: any[]) => void): this {
		return super.once(event, listener);
	}

	public override addListener<K extends keyof DespatchPollerEventMap>(
		event: K,
		listener: DespatchPollerEventMap[K]
	): this;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public override addListener(event: string | symbol, listener: (...args: any[]) => void): this {
		return super.addListener(event, listener);
	}
}
