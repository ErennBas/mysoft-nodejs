import { HttpClient } from "../core/http-client";

/**
 * Tüm API servislerinin miras aldığı taban servis sınıfı.
 */
export abstract class BaseService {
	/**
	 * HTTP isteklerini yürüten HttpClient örneği
	 */
	protected readonly httpClient: HttpClient;

	/**
	 * @param httpClient - Yapılandırılmış HttpClient örneği
	 */
	constructor(httpClient: HttpClient) {
		this.httpClient = httpClient;
	}
}
