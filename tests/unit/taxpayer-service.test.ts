import { describe, it, expect, vi, beforeEach } from "vitest";
import { MysoftClient } from "../../src/client";

describe("TaxpayerService", () => {
	let client: MysoftClient;

	beforeEach(() => {
		client = new MysoftClient({
			clientId: "mock_client",
			clientSecret: "mock_secret",
		});
	});

	it("should call getTaxpayerDetailInfo correctly", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValueOnce({
			succeed: true,
			data: {
				vknTckn: "1234567890",
				title: "Örnek Ticaret A.Ş.",
				isTaxpayer: true,
				eInvoiceStatus: true,
				aliases: [
					{ alias: "urn:mail:defaultpk@mysoft.com.tr", type: "PK", creationTime: "2020-01-01" },
					{ alias: "urn:mail:defaultgb@mysoft.com.tr", type: "GB", creationTime: "2020-01-01" },
				],
			},
		});

		const res = await client.taxpayers.getTaxpayerDetailInfo("1234567890");
		expect(getSpy).toHaveBeenCalledWith("/api/Taxpayer/getTaxPayerDetailInfo?identifierNumber=1234567890");
		expect(res.data?.title).toBe("Örnek Ticaret A.Ş.");
		getSpy.mockRestore();
	});

	it("should return true for isEInvoiceUser if taxpayer exists", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValueOnce({
			succeed: true,
			data: {
				vknTckn: "1234567890",
				title: "Firma",
				isTaxpayer: true,
				eInvoiceStatus: true,
				aliases: [],
			},
		});

		const isUser = await client.taxpayers.isEInvoiceUser("1234567890");
		expect(isUser).toBe(true);
		getSpy.mockRestore();
	});

	it("should parse aliases correctly via getAliases", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValueOnce({
			succeed: true,
			data: {
				vknTckn: "1234567890",
				title: "Firma",
				isTaxpayer: true,
				eInvoiceStatus: true,
				aliases: [
					{ alias: "urn:mail:defaultpk@mysoft.com.tr", type: "PK", creationTime: "2020-01-01" },
					{ alias: "urn:mail:defaultgb@mysoft.com.tr", type: "GB", creationTime: "2020-01-01" },
					{
						alias: "urn:mail:deletedpk@mysoft.com.tr",
						type: "PK",
						creationTime: "2020-01-01",
						deletionTime: "2022-01-01",
					},
				],
			},
		});

		const aliases = await client.taxpayers.getAliases("1234567890");
		expect(aliases.pkAliases).toEqual(["urn:mail:defaultpk@mysoft.com.tr"]);
		expect(aliases.gbAliases).toEqual(["urn:mail:defaultgb@mysoft.com.tr"]);
		getSpy.mockRestore();
	});
});
