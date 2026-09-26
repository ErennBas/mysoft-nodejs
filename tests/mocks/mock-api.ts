import { HttpClient } from "../../src/core/http-client";

export interface MockRequestContext {
	url: string;
	method: string;
	headers: Record<string, string>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
}

export interface MockRouteHandler {
	(context: MockRequestContext): Promise<[number, unknown]> | [number, unknown];
}

/**
 * Mysoft API HTTP İsteklerini Taklit Eden Test Mock Motoru (Fetch Tabanlı)
 */
export class MockMysoftApi {
	private readonly routes: Map<string, MockRouteHandler> = new Map();
	public requestLog: Array<{ method: string; url: string; data?: unknown; headers: Record<string, string> }> = [];

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
	 * HttpClient veya özel nesneye mock fetch adaptörünü bağlar
	 */
	public attachTo(client: HttpClient): void {
		const mockFetch = async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
			let url = "";
			let method = "GET";
			const headersRecord: Record<string, string> = {};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let bodyData: any = undefined;

			if (typeof input === "string") {
				url = input;
			} else if (input instanceof URL) {
				url = input.toString();
			} else if (input && typeof input === "object" && "url" in input) {
				url = input.url;
				method = input.method || "GET";
			}

			if (init?.method) {
				method = init.method.toUpperCase();
			}

			if (init?.headers) {
				if (init.headers instanceof Headers) {
					init.headers.forEach((v, k) => {
						headersRecord[k] = v;
					});
				} else if (Array.isArray(init.headers)) {
					init.headers.forEach(([k, v]) => {
						headersRecord[k] = v;
					});
				} else {
					Object.assign(headersRecord, init.headers);
				}
			}

			if (init?.body) {
				if (typeof init.body === "string") {
					bodyData = init.body;
				} else {
					bodyData = init.body;
				}
			}

			this.requestLog.push({
				method,
				url,
				data: bodyData,
				headers: headersRecord,
			});

			let pathname = url;
			try {
				const urlObj = new URL(url, "http://localhost");
				pathname = urlObj.pathname + urlObj.search;
			} catch {
				pathname = url;
			}

			const pathOnly = pathname.split("?")[0];

			// Eşleşen handler'ı bul
			const exactKey = `${method} ${pathOnly}`;
			let handler = this.routes.get(exactKey);

			if (!handler) {
				// Parametreli veya genel eşleşme ara
				for (const [routeKey, routeHandler] of this.routes.entries()) {
					const [routeMethod, routePath] = routeKey.split(" ");
					if (routeMethod === method && pathOnly.startsWith(routePath)) {
						handler = routeHandler;
						break;
					}
				}
			}

			if (!handler) {
				const notFoundBody = JSON.stringify({
					succeed: false,
					message: `Mock route not found for [${method}] ${url}`,
				});
				return new Response(notFoundBody, {
					status: 404,
					statusText: "Not Found",
					headers: { "Content-Type": "application/json" },
				});
			}

			const reqContext: MockRequestContext = {
				url,
				method,
				headers: headersRecord,
				data: bodyData,
			};

			const [status, data] = await handler(reqContext);

			const responseBody = typeof data === "string" ? data : JSON.stringify(data);
			return new Response(responseBody, {
				status,
				statusText: status >= 200 && status < 300 ? "OK" : "Error",
				headers: {
					"Content-Type": typeof data === "string" ? "text/plain" : "application/json",
				},
			});
		};

		client.setCustomFetch(mockFetch as unknown as typeof fetch);
	}

	/**
	 * İstek loglarını ve rotaları sıfırlar
	 */
	public reset(): void {
		this.routes.clear();
		this.requestLog = [];
	}
}
