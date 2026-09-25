import { BaseService } from "./base.service";
import { ApiResult } from "../types/common";
import * as Types from "../types";
import { TaxpayerDetailInfo, TaxpayerAliasesResult } from "../types/taxpayer.types";

/**
 * Mükellef Sorgulama ve Alias Yönetimi Servisi
 * Toplam 1 REST Endpoint içerir.
 */
export class TaxpayerService extends BaseService {
	/**
	 * VKN veya TCKN numarasına göre mükellefin e-Fatura ve e-İrsaliye durumunu sorgular.
	 */
	public async getTaxpayerDetailInfo(identifier: string): Promise<ApiResult<TaxpayerDetailInfo>> {
		return await this.httpClient.get<ApiResult<TaxpayerDetailInfo>>(
			`/api/Taxpayer/getTaxPayerDetailInfo?identifierNumber=${encodeURIComponent(identifier)}`
		);
	}

	/**
	 * Verilen VKN/TCKN numarasının e-Fatura mükellefi olup olmadığını kontrol eder.
	 */
	public async isEInvoiceUser(vknTckn: string): Promise<boolean> {
		const res = await this.getTaxpayerDetailInfo(vknTckn);
		return Boolean(res.data?.eInvoiceStatus || res.data?.isTaxpayer);
	}

	/**
	 * Verilen VKN/TCKN numarasının e-İrsaliye mükellefi olup olmadığını kontrol eder.
	 */
	public async isEDespatchUser(vknTckn: string): Promise<boolean> {
		const res = await this.getTaxpayerDetailInfo(vknTckn);
		return Boolean(res.data?.eDespatchStatus);
	}

	/**
	 * Mükellefe ait tüm Posta Kutusu (PK) ve Gönderici Birim (GB) aliaslarını döner.
	 */
	public async getAliases(vknTckn: string): Promise<TaxpayerAliasesResult> {
		const res = await this.getTaxpayerDetailInfo(vknTckn);
		const aliases = (res.data?.aliases || []) as Array<{
			type: string;
			alias: string;
			deletionTime?: string | null;
		}>;

		return {
			vknTckn,
			pkAliases: aliases.filter((a) => a.type === "PK" && !a.deletionTime).map((a) => a.alias),
			gbAliases: aliases.filter((a) => a.type === "GB" && !a.deletionTime).map((a) => a.alias),
		};
	}

	/**
	 * Mükellef Detay Sorgula
	 * [GET /api/Taxpayer/getTaxPayerDetailInfo]
	 *
	 */
	public async getTaxPayerDetailInfo(params?: Record<string, unknown>): Promise<Types.TaxpayerApiModelResultModel> {
		return await this.httpClient.get<Types.TaxpayerApiModelResultModel>(`/api/Taxpayer/getTaxPayerDetailInfo`, {
			params,
		});
	}
}
