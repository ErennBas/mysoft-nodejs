import { describe, it, expect } from "vitest";
import { DateHelper } from "../../src/utils/date-helper";

describe("DateHelper", () => {
	describe("toDateString", () => {
		it("should format Date object to YYYY-MM-DD", () => {
			const date = new Date(2026, 8, 25); // September 25, 2026
			expect(DateHelper.toDateString(date)).toBe("2026-09-25");
		});

		it("should format single-digit months and days with leading zeros", () => {
			const date = new Date(2026, 0, 5); // January 5, 2026
			expect(DateHelper.toDateString(date)).toBe("2026-01-05");
		});

		it("should format ISO string to YYYY-MM-DD", () => {
			expect(DateHelper.toDateString("2026-09-25T14:30:00.000Z")).toBe("2026-09-25");
		});

		it("should format standard YYYY-MM-DD string as-is", () => {
			expect(DateHelper.toDateString("2026-09-25")).toBe("2026-09-25");
		});

		it("should format Turkish dot format DD.MM.YYYY to YYYY-MM-DD", () => {
			expect(DateHelper.toDateString("25.09.2026")).toBe("2026-09-25");
			expect(DateHelper.toDateString("05.01.2026")).toBe("2026-01-05");
			expect(DateHelper.toDateString("5.1.2026")).toBe("2026-01-05");
		});

		it("should format Turkish slash format DD/MM/YYYY to YYYY-MM-DD", () => {
			expect(DateHelper.toDateString("25/09/2026")).toBe("2026-09-25");
			expect(DateHelper.toDateString("05/01/2026")).toBe("2026-01-05");
		});

		it("should format Turkish dash format DD-MM-YYYY to YYYY-MM-DD", () => {
			expect(DateHelper.toDateString("25-09-2026")).toBe("2026-09-25");
		});

		it("should format YYYY/MM/DD and YYYY.MM.DD format to YYYY-MM-DD", () => {
			expect(DateHelper.toDateString("2026/09/25")).toBe("2026-09-25");
			expect(DateHelper.toDateString("2026.09.25")).toBe("2026-09-25");
		});

		it("should format unix timestamp to YYYY-MM-DD", () => {
			const date = new Date(2026, 8, 25);
			expect(DateHelper.toDateString(date.getTime())).toBe("2026-09-25");
		});

		it("should return undefined for null, undefined, or empty values", () => {
			expect(DateHelper.toDateString(null)).toBeUndefined();
			expect(DateHelper.toDateString(undefined)).toBeUndefined();
			expect(DateHelper.toDateString("")).toBeUndefined();
			expect(DateHelper.toDateString("   ")).toBeUndefined();
		});

		it("should return undefined for invalid Date objects", () => {
			expect(DateHelper.toDateString(new Date("invalid"))).toBeUndefined();
		});
	});

	describe("toTimeString", () => {
		it("should format Date object to HH:mm:ss", () => {
			const date = new Date(2026, 8, 25, 14, 30, 45);
			expect(DateHelper.toTimeString(date)).toBe("14:30:45");
		});

		it("should format single-digit hours, minutes, seconds with leading zeros", () => {
			const date = new Date(2026, 8, 25, 9, 5, 2);
			expect(DateHelper.toTimeString(date)).toBe("09:05:02");
		});

		it("should extract time from ISO string", () => {
			expect(DateHelper.toTimeString("2026-09-25T14:30:45.000Z")).toBe("14:30:45");
		});

		it("should extract time from space-separated datetime string", () => {
			expect(DateHelper.toTimeString("2026-09-25 14:30:45")).toBe("14:30:45");
		});

		it("should format HH:mm to HH:mm:00", () => {
			expect(DateHelper.toTimeString("14:30")).toBe("14:30:00");
			expect(DateHelper.toTimeString("9:05")).toBe("09:05:00");
		});

		it("should format HH:mm:ss as-is", () => {
			expect(DateHelper.toTimeString("14:30:45")).toBe("14:30:45");
		});

		it("should return undefined for null, undefined, or empty values", () => {
			expect(DateHelper.toTimeString(null)).toBeUndefined();
			expect(DateHelper.toTimeString(undefined)).toBeUndefined();
			expect(DateHelper.toTimeString("")).toBeUndefined();
		});

		it("should return undefined for invalid Date objects", () => {
			expect(DateHelper.toTimeString(new Date("invalid"))).toBeUndefined();
		});
	});

	describe("toDateTimeString", () => {
		it("should format Date object to YYYY-MM-DDTHH:mm:ss", () => {
			const date = new Date(2026, 8, 25, 14, 30, 45);
			expect(DateHelper.toDateTimeString(date)).toBe("2026-09-25T14:30:45");
		});

		it("should support custom separator", () => {
			const date = new Date(2026, 8, 25, 14, 30, 45);
			expect(DateHelper.toDateTimeString(date, " ")).toBe("2026-09-25 14:30:45");
		});

		it("should default time to 00:00:00 if only date string is provided", () => {
			expect(DateHelper.toDateTimeString("2026-09-25")).toBe("2026-09-25T00:00:00");
		});

		it("should return undefined for empty/null values", () => {
			expect(DateHelper.toDateTimeString(null)).toBeUndefined();
			expect(DateHelper.toDateTimeString(undefined)).toBeUndefined();
		});
	});

	describe("isValidDate", () => {
		it("should return true for valid Date objects and strings", () => {
			expect(DateHelper.isValidDate(new Date())).toBe(true);
			expect(DateHelper.isValidDate("2026-09-25")).toBe(true);
			expect(DateHelper.isValidDate("25.09.2026")).toBe(true);
			expect(DateHelper.isValidDate("25/09/2026")).toBe(true);
			expect(DateHelper.isValidDate(Date.now())).toBe(true);
		});

		it("should return false for invalid inputs", () => {
			expect(DateHelper.isValidDate(null)).toBe(false);
			expect(DateHelper.isValidDate(undefined)).toBe(false);
			expect(DateHelper.isValidDate(new Date("invalid"))).toBe(false);
		});
	});

	describe("today & nowTime", () => {
		it("should return today's date formatted as YYYY-MM-DD", () => {
			expect(DateHelper.today()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		});

		it("should return current time formatted as HH:mm:ss", () => {
			expect(DateHelper.nowTime()).toMatch(/^\d{2}:\d{2}:\d{2}$/);
		});
	});

	describe("toDate", () => {
		it("should parse Date object", () => {
			const d = new Date(2026, 8, 25);
			const result = DateHelper.toDate(d);
			expect(result?.getFullYear()).toBe(2026);
			expect(result?.getMonth()).toBe(8);
			expect(result?.getDate()).toBe(25);
		});

		it("should parse Turkish date string DD.MM.YYYY", () => {
			const result = DateHelper.toDate("25.09.2026");
			expect(result?.getFullYear()).toBe(2026);
			expect(result?.getMonth()).toBe(8);
			expect(result?.getDate()).toBe(25);
		});

		it("should return undefined for invalid strings", () => {
			expect(DateHelper.toDate("invalid-date-string")).toBeUndefined();
			expect(DateHelper.toDate(null)).toBeUndefined();
		});
	});
});
