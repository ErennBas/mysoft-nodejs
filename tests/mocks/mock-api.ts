import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface MockRouteHandler {
	(config: InternalAxiosRequestConfig): Promise<[number, unknown]> | [number, unknown];
}

/**
 * Mysoft API HTTP İsteklerini Taklit Eden Test Mock Motoru
 */
export class MockMysoftApi {
	private readonly routes: Map<string, MockRouteHandler> = new Map();
	public requestLog: Array<{ method: string; url: string; data?: unknown; headers: unknown }> = [];

	/**
	 * Bir endpoint için mock yanıt tanımlar
	 * @param method - HTTP Metodu (GET, POST vb.)
	 * @param path - URL yolu (örn: /oauth/token, /api/Taxpayer/getTaxPayerDetailInfo)
	 * @param handler - İstek yakalandığında dönecek durum kodu ve gövde
	 */
	public on(method: string, path: string, handler: MockRouteHandler): void {
		const key = `${method.toUpperCase()} ${path}`;
		this.routes.set(key, handler);
	}

	/**
	 * Axios instance'a mock adaptörünü bağlar
	 */
	public attachTo(axiosInstance: AxiosInstance): void {
		axiosInstance.defaults.adapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
			const method = (config.method || "GET").toUpperCase();
			const url = config.url || "";
			const pathname = url.split("?")[0];

			this.requestLog.push({
				method,
				url,
				data: config.data,
				headers: config.headers,
			});

			// Eşleşen handler'ı bul
			const exactKey = `${method} ${pathname}`;
			let handler = this.routes.get(exactKey);

			if (!handler) {
				// Parametreli veya genel eşleşme ara
				for (const [routeKey, routeHandler] of this.routes.entries()) {
					const [routeMethod, routePath] = routeKey.split(" ");
					if (routeMethod === method && pathname.startsWith(routePath)) {
						handler = routeHandler;
						break;
					}
				}
			}

			if (!handler) {
				return {
					data: { succeed: false, message: `Mock route not found for [${method}] ${url}` },
					status: 404,
					statusText: "Not Found",
					headers: {},
					config,
				};
			}

			const [status, data] = await handler(config);

			if (status >= 400) {
				const error = new Error(`Request failed with status code ${status}`);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(error as any).response = {
					status,
					statusText: status === 401 ? "Unauthorized" : "Bad Request",
					data,
					headers: {},
					config,
				};
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(error as any).config = config;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(error as any).isAxiosError = true;
				throw error;
			}

			return {
				data,
				status,
				statusText: "OK",
				headers: {},
				config,
			};
		};
	}

	/**
	 * İstek loglarını ve rotaları sıfırlar
	 */
	public reset(): void {
		this.routes.clear();
		this.requestLog = [];
	}
}
