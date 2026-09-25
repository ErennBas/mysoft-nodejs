import * as crypto from "crypto";
import axios from "axios";
import { WebhookEndpointConfig } from "./types";

export interface WebhookPayload<T = unknown> {
	event: string;
	timestamp: string;
	data: T;
}

/**
 * Gelen fatura ve belgeleri dış sistemlere güvenli HTTP Webhook olarak ileten yardımcı sınıf.
 */
export class WebhookForwarder {
	/**
	 * Webhook yükünü ve imzasını doğrulamak için yardımcı metot (Webhook alıcıları için).
	 *
	 * @param rawBody - Ham istek gövdesi (String veya Buffer)
	 * @param secret - Tanımlanan gizli anahtar
	 * @param signatureHeader - X-Mysoft-Signature başlığı ("sha256=abc..." veya "abc...")
	 * @returns İmza geçerliyse true
	 */
	public static verifySignature(rawBody: string | Buffer, secret: string, signatureHeader: string): boolean {
		if (!rawBody || !secret || !signatureHeader) return false;

		const expectedSig = crypto
			.createHmac("sha256", secret)
			.update(typeof rawBody === "string" ? rawBody : rawBody.toString("utf8"))
			.digest("hex");

		const cleanSig = signatureHeader.startsWith("sha256=") ? signatureHeader.slice(7) : signatureHeader;

		try {
			const bufA = Buffer.from(cleanSig, "hex");
			const bufB = Buffer.from(expectedSig, "hex");
			if (bufA.length !== bufB.length) return false;
			return crypto.timingSafeEqual(bufA, bufB);
		} catch {
			return false;
		}
	}

	/**
	 * Verilen olayı ve veriyi tüm yapılandırılmış webhook uç noktalarına iletir.
	 *
	 * @param endpoints - Uç nokta yapılandırmaları
	 * @param event - Olay adı (örn. 'invoice.received')
	 * @param data - İletilecek veri
	 */
	public static async dispatchAll<T>(
		endpoints: WebhookEndpointConfig[],
		event: string,
		data: T
	): Promise<Array<{ url: string; success: boolean; error?: Error }>> {
		if (!endpoints || endpoints.length === 0) return [];

		const payload: WebhookPayload<T> = {
			event,
			timestamp: new Date().toISOString(),
			data,
		};

		const bodyString = JSON.stringify(payload);

		const results = await Promise.allSettled(
			endpoints.map((ep) => WebhookForwarder.dispatchSingle(ep, bodyString, payload.timestamp))
		);

		return results.map((res, index) => {
			if (res.status === "fulfilled") {
				return { url: endpoints[index].url, success: true };
			} else {
				return { url: endpoints[index].url, success: false, error: res.reason as Error };
			}
		});
	}

	/**
	 * Tek bir uç noktaya yeniden deneme (retry) mekanizması ile webhook gönderir.
	 */
	public static async dispatchSingle(
		endpoint: WebhookEndpointConfig,
		bodyString: string,
		timestamp: string
	): Promise<void> {
		const retries = endpoint.retries ?? 3;
		const timeout = endpoint.timeoutMs ?? 10000;

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			"User-Agent": "Mysoft-Webhook-Forwarder/1.0",
			"X-Mysoft-Timestamp": timestamp,
			...(endpoint.headers || {}),
		};

		if (endpoint.secret) {
			const signature = crypto.createHmac("sha256", endpoint.secret).update(bodyString).digest("hex");
			headers["X-Mysoft-Signature"] = `sha256=${signature}`;
		}

		let lastError: Error | undefined;

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				await axios.post(endpoint.url, bodyString, {
					headers,
					timeout,
					transformResponse: [(d) => d], // Ham yanıt
				});
				return;
			} catch (err) {
				lastError = err as Error;
				if (attempt < retries) {
					// Exponential backoff
					const delay = Math.min(1000 * Math.pow(2, attempt), 8000);
					await new Promise((resolve) => setTimeout(resolve, delay));
				}
			}
		}

		throw lastError || new Error(`Webhook iletimi başarısız oldu: ${endpoint.url}`);
	}
}
