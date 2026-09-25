import { describe, it, expect } from "vitest";
import { UblHelper } from "../../src/utils/ubl-helper";

describe("UblHelper", () => {
	const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
    <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
    <cbc:CustomizationID>TR1.2</cbc:CustomizationID>
    <cbc:ProfileID>TICARIFATURA</cbc:ProfileID>
    <cbc:ID>MYF2026000000001</cbc:ID>
    <cbc:UUID>4ad402f0-b951-4aa2-acd6-6b6d74a79a10</cbc:UUID>
    <cbc:IssueDate>2026-09-25</cbc:IssueDate>
</Invoice>`;

	it("should zip XML and encode to base64, then decode and unzip back to original XML", () => {
		const base64Zip = UblHelper.xmlToBase64Zip(sampleXml);
		expect(typeof base64Zip).toBe("string");
		expect(base64Zip.length).toBeGreaterThan(0);

		// Geri aç
		const restoredXml = UblHelper.base64ZipToXml(base64Zip);
		expect(restoredXml).toBe(sampleXml);
	});

	it("should correctly extract UUID (ETTN) from XML content", () => {
		const uuid = UblHelper.extractUuidFromXml(sampleXml);
		expect(uuid).toBe("4ad402f0-b951-4aa2-acd6-6b6d74a79a10");
	});

	it("should return null when UUID is not present", () => {
		const noUuidXml = "<Invoice><cbc:ID>MYF1</cbc:ID></Invoice>";
		expect(UblHelper.extractUuidFromXml(noUuidXml)).toBeNull();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(UblHelper.extractUuidFromXml(null as any)).toBeNull();
	});

	it("should correctly extract Invoice Number (ID) from XML content", () => {
		const invoiceNumber = UblHelper.extractInvoiceNumberFromXml(sampleXml);
		expect(invoiceNumber).toBe("MYF2026000000001");
	});

	it("should convert between base64 and Uint8Array", () => {
		const text = "Hello Mysoft SDK";
		const base64 = Buffer.from(text).toString("base64");

		const bytes = UblHelper.base64ToUint8Array(base64);
		expect(bytes instanceof Uint8Array).toBe(true);

		const convertedBase64 = UblHelper.uint8ArrayToBase64(bytes);
		expect(convertedBase64).toBe(base64);
	});
});
