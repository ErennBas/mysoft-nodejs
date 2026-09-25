import { describe, it, expect } from "vitest";
import { SDK_VERSION, MYSOFT_URLS, DEFAULT_CONFIG } from "../../src";

describe("Mysoft SDK Smoke Test", () => {
	it("should export correct SDK version", () => {
		expect(SDK_VERSION).toBe("0.0.4-alpha.0");
	});

	it("should export correct URLs", () => {
		expect(MYSOFT_URLS.TEST).toBe("https://edocumentapi.mytest.tr");
		expect(MYSOFT_URLS.PRODUCTION).toBe("https://edocumentapi.mysoft.com.tr");
		expect(MYSOFT_URLS.OAUTH_TOKEN_PATH).toBe("/oauth/token");
	});

	it("should export correct default config", () => {
		expect(DEFAULT_CONFIG.TIMEOUT_MS).toBe(30000);
		expect(DEFAULT_CONFIG.DEFAULT_TOKEN_TTL_SEC).toBe(300);
	});
});
