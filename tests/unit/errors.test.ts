import { describe, it, expect } from "vitest";
import {
	MysoftError,
	MysoftAuthError,
	MysoftApiError,
	MysoftNetworkError,
	MysoftValidationError,
} from "../../src/errors";

describe("Custom Errors", () => {
	describe("MysoftError", () => {
		it("should correctly initialize with message and code", () => {
			const error = new MysoftError("Genel hata", "CUSTOM_CODE", { foo: "bar" });
			expect(error.message).toBe("Genel hata");
			expect(error.code).toBe("CUSTOM_CODE");
			expect(error.name).toBe("MysoftError");
			expect(error.details).toEqual({ foo: "bar" });
			expect(error instanceof Error).toBe(true);
			expect(error instanceof MysoftError).toBe(true);
		});

		it("should serialize to JSON properly", () => {
			const error = new MysoftError("Hata", "ERR_1");
			const json = error.toJSON();
			expect(json.name).toBe("MysoftError");
			expect(json.code).toBe("ERR_1");
			expect(json.message).toBe("Hata");
			expect(json.stack).toBeDefined();
		});
	});

	describe("MysoftAuthError", () => {
		it("should set statusCode and inherit from MysoftError", () => {
			const error = new MysoftAuthError("Geçersiz kimlik", 401, { reason: "expired" });
			expect(error.message).toBe("Geçersiz kimlik");
			expect(error.statusCode).toBe(401);
			expect(error.code).toBe("MYSOFT_AUTH_ERROR");
			expect(error instanceof MysoftError).toBe(true);
			expect(error instanceof MysoftAuthError).toBe(true);
		});
	});

	describe("MysoftApiError", () => {
		it("should parse string response body", () => {
			const error = MysoftApiError.fromResponse("Sunucu hatası oluştu", 500, "/api/test", "POST");
			expect(error.message).toBe("Sunucu hatası oluştu");
			expect(error.statusCode).toBe(500);
			expect(error.endpoint).toBe("/api/test");
			expect(error.method).toBe("POST");
			expect(error.code).toBe("MYSOFT_API_ERROR");
		});

		it("should parse standard Mysoft ResultModel error object", () => {
			const payload = {
				succeed: false,
				message: "VKN bulunamadı",
				errorCode: "GIB_404",
				errors: {
					vkn: ["VKN 10 haneli olmalıdır"],
				},
			};

			const error = MysoftApiError.fromResponse(payload, 400, "/api/taxpayer", "GET");
			expect(error.message).toBe("VKN bulunamadı");
			expect(error.errorCode).toBe("GIB_404");
			expect(error.code).toBe("GIB_404");
			expect(error.statusCode).toBe(400);
			expect(error.validationErrors).toEqual({
				vkn: ["VKN 10 haneli olmalıdır"],
			});
		});

		it("should parse OAuth error payload", () => {
			const payload = {
				error: "invalid_client",
				error_description: "Client secret hatalı.",
			};

			const error = MysoftApiError.fromResponse(payload, 400, "/oauth/token", "POST");
			expect(error.message).toBe("Client secret hatalı.");
		});
	});

	describe("MysoftNetworkError", () => {
		it("should set timeout flag properly", () => {
			const error = new MysoftNetworkError("Zaman aşımı", true, "/api/invoice");
			expect(error.isTimeout).toBe(true);
			expect(error.code).toBe("MYSOFT_TIMEOUT_ERROR");
			expect(error.endpoint).toBe("/api/invoice");
		});

		it("should set network connection error properly", () => {
			const error = new MysoftNetworkError("Bağlantı koptu", false);
			expect(error.isTimeout).toBe(false);
			expect(error.code).toBe("MYSOFT_NETWORK_ERROR");
		});
	});

	describe("MysoftValidationError", () => {
		it("should set field and code properly", () => {
			const error = new MysoftValidationError("VKN zorunludur", "vknTckn");
			expect(error.message).toBe("VKN zorunludur");
			expect(error.field).toBe("vknTckn");
			expect(error.code).toBe("MYSOFT_VALIDATION_ERROR");
		});
	});
});
