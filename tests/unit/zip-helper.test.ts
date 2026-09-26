import { describe, it, expect } from "vitest";
import { ZipHelper, calculateCrc32 } from "../../src/utils/zip-helper";

describe("ZipHelper (Native Zero-Dependency)", () => {
	it("should calculate correct CRC32 checksum", () => {
		const data = Buffer.from("123456789", "utf8");
		const crc = calculateCrc32(data);
		// CRC32 of "123456789" is 0xcbf43926 (3421780262)
		expect(crc).toBe(0xcbf43926);
	});

	it("should create a valid ZIP and extract single file content", () => {
		const content = "<Invoice><cbc:ID>TEST1234</cbc:ID></Invoice>";
		const zipBuffer = ZipHelper.createZip({
			"invoice.xml": content,
		});

		expect(zipBuffer.length).toBeGreaterThan(0);
		// PK signature check
		expect(zipBuffer.readUInt32LE(0)).toBe(0x04034b50);

		const extracted = ZipHelper.extractZip(zipBuffer);
		expect(extracted["invoice.xml"]).toBeDefined();
		expect(extracted["invoice.xml"].toString("utf8")).toBe(content);
	});

	it("should support multiple files and Turkish UTF-8 characters", () => {
		const files = {
			"belgeler/fatura_şçğüöı.xml": "<Invoice>Türkçe Karakterler: ğüşıöç ĞÜŞİÖÇ</Invoice>",
			"ekler/not.txt": "Fatura ek açıklaması",
		};

		const zipBuffer = ZipHelper.createZip(files);
		const extracted = ZipHelper.extractZip(zipBuffer);

		expect(Object.keys(extracted)).toHaveLength(2);
		expect(extracted["belgeler/fatura_şçğüöı.xml"].toString("utf8")).toBe(files["belgeler/fatura_şçğüöı.xml"]);
		expect(extracted["ekler/not.txt"].toString("utf8")).toBe(files["ekler/not.txt"]);
	});

	it("should handle empty files", () => {
		const zipBuffer = ZipHelper.createZip({
			"empty.txt": "",
		});

		const extracted = ZipHelper.extractZip(zipBuffer);
		expect(extracted["empty.txt"]).toBeDefined();
		expect(extracted["empty.txt"].length).toBe(0);
	});

	it("should throw error when extracting invalid or empty buffer", () => {
		expect(() => ZipHelper.extractZip(Buffer.from("short"))).toThrow(/çok küçük/);
		expect(() => ZipHelper.extractZip(Buffer.alloc(30))).toThrow(/geçerli bir dosya içermiyor/);
	});
});
