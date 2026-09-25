import { describe, it, expect } from "vitest";
import {
	EDocumentType,
	InvoiceProfile,
	InvoiceType,
	DespatchType,
	DespatchResponseStatus,
	UnitCode,
	CurrencyCode,
	GibStatusCode,
	SendInvoiceJsonRequest,
} from "../../src/types";

describe("Types & Enums", () => {
	it("should have correct EDocumentType enum values", () => {
		expect(EDocumentType.EFATURA).toBe("EFATURA");
		expect(EDocumentType.EARSIV).toBe("EARSIV");
		expect(EDocumentType.EIRSALIYE).toBe("EIRSALIYE");
		expect(EDocumentType.ESMM).toBe("ESMM");
	});

	it("should have correct InvoiceProfile enum values", () => {
		expect(InvoiceProfile.TEMEL).toBe("TEMELFATURA");
		expect(InvoiceProfile.TICARI).toBe("TICARIFATURA");
		expect(InvoiceProfile.EARSIV).toBe("EARSIVFATURA");
		expect(InvoiceProfile.IHRACAT).toBe("IHRACAT");
	});

	it("should have correct InvoiceType and DespatchType values", () => {
		expect(InvoiceType.SATIS).toBe("SATIS");
		expect(InvoiceType.IADE).toBe("IADE");
		expect(InvoiceType.TEVKIFAT).toBe("TEVKIFAT");
		expect(InvoiceType.ISTISNA).toBe("ISTISNA");
		expect(DespatchType.SEVK).toBe("SEVK");
		expect(DespatchResponseStatus.KABUL).toBe("KABUL");
		expect(DespatchResponseStatus.RED).toBe("RED");
	});

	it("should have correct standard Unit codes and Currency codes", () => {
		expect(UnitCode.ADET).toBe("C62");
		expect(UnitCode.KILOGRAM).toBe("KGM");
		expect(UnitCode.METRE).toBe("MTR");
		expect(UnitCode.LITRE).toBe("LTR");
		expect(CurrencyCode.TRY).toBe("TRY");
		expect(CurrencyCode.USD).toBe("USD");
		expect(CurrencyCode.EUR).toBe("EUR");
	});

	it("should have correct GİB Status codes", () => {
		expect(GibStatusCode.ZARF_ALINDI).toBe(1000);
		expect(GibStatusCode.BASARIYLA_ISLENDI).toBe(1200);
		expect(GibStatusCode.DOKUMAN_BULUNAMADI).toBe(1210);
	});

	it("should compile and construct valid SendInvoiceJsonRequest object", () => {
		const request: SendInvoiceJsonRequest = {
			profileId: InvoiceProfile.TICARI,
			invoiceTypeCode: InvoiceType.SATIS,
			issueDate: "2026-09-25",
			currencyCode: CurrencyCode.TRY,
			buyer: {
				vknTckn: "1234567890",
				unvan: "Alıcı Şirket A.Ş.",
				pkAlias: "urn:mail:defaultpk@mysoft.com.tr",
			},
			lines: [
				{
					name: "Yazılım Danışmanlık Hizmeti",
					quantity: 1,
					unitCode: UnitCode.ADET,
					unitPrice: 10000,
					vatRate: 20,
					vatAmount: 2000,
					totalAmount: 12000,
				},
			],
		};

		expect(request.buyer.vknTckn).toBe("1234567890");
		expect(request.lines[0].vatRate).toBe(20);
	});
});
