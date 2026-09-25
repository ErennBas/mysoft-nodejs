import { describe, it, expect, vi, beforeEach } from "vitest";
import { MysoftClient } from "../../src/client";

describe("GeneralService", () => {
	let client: MysoftClient;

	beforeEach(() => {
		client = new MysoftClient({
			clientId: "mock_client",
			clientSecret: "mock_secret",
		});
	});

	it("should call getCountries, getCities, getTowns", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValue({
			succeed: true,
			data: [],
		});

		await client.general.getCountries();
		expect(getSpy).toHaveBeenCalledWith("/api/GeneralCards/getCountryList");

		await client.general.getCities(1);
		expect(getSpy).toHaveBeenCalledWith("/api/GeneralCards/getCityList?countryCode=1");

		await client.general.getTowns(34);
		expect(getSpy).toHaveBeenCalledWith("/api/GeneralCards/getTownList?cityId=34");

		getSpy.mockRestore();
	});

	it("should call getUnits and getTaxOffices", async () => {
		const getSpy = vi.spyOn(client.httpClient, "get").mockResolvedValue({
			succeed: true,
			data: [],
		});

		await client.general.getUnits();
		expect(getSpy).toHaveBeenCalledWith("/api/GeneralCards/getUnitList");

		await client.general.getTaxOffices("34");
		expect(getSpy).toHaveBeenCalledWith("/api/GeneralCards/getTaxOfficeList?cityCode=34");

		getSpy.mockRestore();
	});
});
