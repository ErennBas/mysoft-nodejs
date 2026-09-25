import { describe, it, expect, vi, afterEach } from "vitest";
import axios from "axios";
import { WebhookForwarder } from "../../src/watcher/webhook-forwarder";
import * as crypto from "crypto";

describe("WebhookForwarder Tests", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should calculate and verify HMAC-SHA256 signatures correctly", () => {
		const payload = JSON.stringify({ event: "invoice.received", id: 123 });
		const secret = "my_super_secret_webhook_key";

		const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

		// Test with sha256= prefix
		expect(WebhookForwarder.verifySignature(payload, secret, `sha256=${signature}`)).toBe(true);

		// Test without sha256= prefix
		expect(WebhookForwarder.verifySignature(payload, secret, signature)).toBe(true);

		// Test with wrong secret
		expect(WebhookForwarder.verifySignature(payload, "wrong_secret", signature)).toBe(false);

		// Test with tampered payload
		expect(WebhookForwarder.verifySignature(payload + "tampered", secret, signature)).toBe(false);

		// Test with empty inputs
		expect(WebhookForwarder.verifySignature("", secret, signature)).toBe(false);
	});

	it("should dispatch webhook POST request with proper headers", async () => {
		const postSpy = vi.spyOn(axios, "post").mockResolvedValue({ status: 200, data: { ok: true } });

		const endpoints = [
			{
				url: "https://erp.example.com/webhook",
				secret: "secret-123",
				headers: { "X-Custom-Auth": "bearer-token" },
			},
		];

		const item = { docNo: "GIB202600000001", amount: 1000 };
		const results = await WebhookForwarder.dispatchAll(endpoints, "invoice.received", item);

		expect(results).toHaveLength(1);
		expect(results[0].success).toBe(true);
		expect(postSpy).toHaveBeenCalledTimes(1);

		const [url, body, config] = postSpy.mock.calls[0];
		expect(url).toBe("https://erp.example.com/webhook");

		const parsedBody = JSON.parse(body as string);
		expect(parsedBody.event).toBe("invoice.received");
		expect(parsedBody.data).toEqual(item);

		expect(config?.headers?.["X-Custom-Auth"]).toBe("bearer-token");
		expect(config?.headers?.["X-Mysoft-Signature"]).toMatch(/^sha256=[a-f0-9]{64}$/);
	});

	it("should handle failures and return error status", async () => {
		vi.spyOn(axios, "post").mockRejectedValue(new Error("Connection refused"));

		const endpoints = [{ url: "https://invalid-erp.example.com/webhook", retries: 0 }];

		const results = await WebhookForwarder.dispatchAll(endpoints, "invoice.received", {});

		expect(results).toHaveLength(1);
		expect(results[0].success).toBe(false);
		expect(results[0].error?.message).toBe("Connection refused");
	});
});
