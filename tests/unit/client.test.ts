import { describe, it, expect, vi } from "vitest";
import { MysoftClient } from "../../src/client";
import { MYSOFT_URLS } from "../../src/core/constants";

describe("MysoftClient", () => {
	it("should initialize with given credentials and default options", () => {
		const client = new MysoftClient({
			clientId: "my_id",
			clientSecret: "my_secret",
		});

		expect(client.config.clientId).toBe("my_id");
		expect(client.config.clientSecret).toBe("my_secret");
		expect(client.config.baseUrl).toBe(MYSOFT_URLS.TEST);
		expect(client.httpClient).toBeDefined();
		expect(client.tokenManager).toBeDefined();
	});

	it("should retrieve token via client.getToken()", async () => {
		const client = new MysoftClient({
			clientId: "my_id",
			clientSecret: "my_secret",
		});

		const spy = vi.spyOn(client.tokenManager, "getToken").mockResolvedValueOnce("test_token_abc");

		const token = await client.getToken();
		expect(token).toBe("test_token_abc");
		expect(spy).toHaveBeenCalledTimes(1);

		spy.mockRestore();
	});

	it("should clear token via client.clearToken()", async () => {
		const client = new MysoftClient({
			clientId: "my_id",
			clientSecret: "my_secret",
		});

		const spy = vi.spyOn(client.tokenManager, "clearToken").mockResolvedValueOnce(undefined);

		await client.clearToken();
		expect(spy).toHaveBeenCalledTimes(1);

		spy.mockRestore();
	});
});
