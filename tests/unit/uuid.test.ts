import { describe, it, expect } from "vitest";
import { UuidHelper } from "../../src/utils/uuid";

describe("UuidHelper", () => {
	it("should generate valid v4 UUID / ETTN", () => {
		const ettn = UuidHelper.generateEttn();
		expect(typeof ettn).toBe("string");
		expect(ettn.length).toBe(36);
		expect(UuidHelper.isValidUuid(ettn)).toBe(true);
	});

	it("should validate correct UUID formats", () => {
		expect(UuidHelper.isValidUuid("4ad402f0-b951-4aa2-acd6-6b6d74a79a10")).toBe(true);
		expect(UuidHelper.isValidUuid("4AD402F0-B951-4AA2-ACD6-6B6D74A79A10")).toBe(true);
	});

	it("should return false for invalid UUIDs", () => {
		expect(UuidHelper.isValidUuid("")).toBe(false);
		expect(UuidHelper.isValidUuid("invalid-uuid-string")).toBe(false);
		expect(UuidHelper.isValidUuid("4ad402f0-b951-4aa2-acd6-6b6d74a79a1")).toBe(false);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(UuidHelper.isValidUuid(null as any)).toBe(false);
	});
});
