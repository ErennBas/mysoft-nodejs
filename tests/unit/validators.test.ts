import { describe, it, expect } from "vitest";
import { Validators } from "../../src/utils/validators";

describe("Validators", () => {
	describe("isValidVkn", () => {
		it("should return true for valid 10-digit VKN", () => {
			// Örnek geçerli VKN (GİB Algoritmasına uygun)
			// 6260271383
			expect(Validators.isValidVkn("6260271383")).toBe(true);
		});

		it("should return false for invalid VKN or wrong checksum", () => {
			expect(Validators.isValidVkn("6260271380")).toBe(false);
			expect(Validators.isValidVkn("1111111111")).toBe(false);
			expect(Validators.isValidVkn("12345")).toBe(false);
			expect(Validators.isValidVkn("62602713830")).toBe(false);
			expect(Validators.isValidVkn("ABCDEFGHIJ")).toBe(false);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(Validators.isValidVkn(null as any)).toBe(false);
		});
	});

	describe("isValidTckn", () => {
		it("should return true for valid 11-digit TCKN", () => {
			// Örnek geçerli TCKN (Algoritmaya uygun)
			// 10000000146: oddSum = 1+0+0+0+1=2, evenSum = 0+0+0+0=0, d10 = (2*7 - 0)%10 = 4. sum(0..9)=6 -> d11 = 6.
			expect(Validators.isValidTckn("10000000146")).toBe(true);
		});

		it("should return false for invalid TCKN", () => {
			expect(Validators.isValidTckn("01234567890")).toBe(false); // 0 ile başlayamaz
			expect(Validators.isValidTckn("10000000140")).toBe(false); // Checksum hatalı
			expect(Validators.isValidTckn("100000001")).toBe(false);
			expect(Validators.isValidTckn("100000001460")).toBe(false);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(Validators.isValidTckn(null as any)).toBe(false);
		});
	});

	describe("isValidVknOrTckn", () => {
		it("should correctly identify and validate both VKN and TCKN", () => {
			expect(Validators.isValidVknOrTckn("6260271383")).toBe(true);
			expect(Validators.isValidVknOrTckn("10000000146")).toBe(true);
			expect(Validators.isValidVknOrTckn("12345")).toBe(false);
			expect(Validators.isValidVknOrTckn("1234567890123")).toBe(false);
		});
	});

	describe("isValidInvoiceNumber", () => {
		it("should return true for 16-character standard GİB invoice numbers", () => {
			expect(Validators.isValidInvoiceNumber("MYF2026000000001")).toBe(true);
			expect(Validators.isValidInvoiceNumber("ABC2025000001234")).toBe(true);
			expect(Validators.isValidInvoiceNumber("eaf2026000000001")).toBe(true);
		});

		it("should return false for invalid invoice numbers", () => {
			expect(Validators.isValidInvoiceNumber("MYF2026001")).toBe(false); // Eksik hane
			expect(Validators.isValidInvoiceNumber("1232026000000001")).toBe(true); // 3 alfanümerik + yıl + 9 hane
			expect(Validators.isValidInvoiceNumber("")).toBe(false);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(Validators.isValidInvoiceNumber(null as any)).toBe(false);
		});
	});
});
