import { zipSync, unzipSync, strToU8, strFromU8 } from "fflate";
import { UuidHelper } from "./uuid";

/**
 * UBL-TR XML, ZIP Sıkıştırma ve Base64 Dönüşüm Yardımcı Araçları.
 */
export class UblHelper {
	private static readonly UUID_TAG_REGEX = /<(?:\w+:)?UUID[^>]*>([^<]+)<\/(?:\w+:)?UUID>/i;
	private static readonly ID_TAG_REGEX = /<(?:\w+:)?ID[^>]*>([^<]+)<\/(?:\w+:)?ID>/i;

	/**
	 * Ham UBL XML metnini ZIP arşivine sıkıştırır ve Mysoft API'sinin beklediği Base64 formatına kodlar.
	 *
	 * @param xmlContent - Ham XML metni
	 * @param fileName - ZIP içindeki dosya adı (Belirtilmezse XML içindeki UUID veya rastgele bir UUID ile oluşturulur, örn: "uuid.xml")
	 * @returns Base64 formatında kodlanmış ZIP arşivi metni
	 *
	 * @example
	 * ```typescript
	 * import { UblHelper } from "mysoft-nodejs";
	 *
	 * const rawXml = "<Invoice>...</Invoice>";
	 * const base64Zip = UblHelper.xmlToBase64Zip(rawXml);
	 * ```
	 */
	public static xmlToBase64Zip(xmlContent: string, fileName?: string): string {
		if (!xmlContent || typeof xmlContent !== "string") {
			throw new Error("Geçerli bir XML metni sağlanmalıdır.");
		}

		let targetFileName = fileName;
		if (!targetFileName) {
			const uuid = UblHelper.extractUuidFromXml(xmlContent) || UuidHelper.generateEttn();
			targetFileName = `${uuid}.xml`;
		} else if (!targetFileName.toLowerCase().endsWith(".xml")) {
			targetFileName = `${targetFileName}.xml`;
		}

		const xmlBytes = strToU8(xmlContent);
		const zippedBytes = zipSync({
			[targetFileName]: xmlBytes,
		});

		return Buffer.from(zippedBytes).toString("base64");
	}

	/**
	 * Base64 formatında kodlanmış ZIP arşivini açar ve içerisindeki UBL XML metnini döner.
	 *
	 * @param base64ZipString - Base64 kodlu ZIP metni
	 * @returns Açılan UBL XML metni
	 *
	 * @example
	 * ```typescript
	 * import { UblHelper } from "mysoft-nodejs";
	 *
	 * const rawXml = UblHelper.base64ZipToXml(apiResponseBase64Zip);
	 * ```
	 */
	public static base64ZipToXml(base64ZipString: string): string {
		if (!base64ZipString || typeof base64ZipString !== "string") {
			throw new Error("Geçerli bir Base64 ZIP metni sağlanmalıdır.");
		}

		const zipBytes = new Uint8Array(Buffer.from(base64ZipString.trim(), "base64"));
		const unzipped = unzipSync(zipBytes);

		const fileNames = Object.keys(unzipped);
		if (fileNames.length === 0) {
			throw new Error("ZIP arşivi boş.");
		}

		// Öncelikli olarak .xml uzantılı dosyayı bul
		const xmlFileName = fileNames.find((name) => name.toLowerCase().endsWith(".xml")) || fileNames[0];
		const fileBytes = unzipped[xmlFileName];

		return strFromU8(fileBytes);
	}

	/**
	 * UBL XML metni içerisindeki `<cbc:UUID>` etiketini ayıklar.
	 *
	 * @param xmlContent - Ham XML metni
	 * @returns Faturanın ETTN / UUID bilgisi veya bulunamazsa `null`
	 *
	 * @example
	 * ```typescript
	 * const uuid = UblHelper.extractUuidFromXml("<Invoice><cbc:UUID>4ad402f0-...</cbc:UUID></Invoice>");
	 * ```
	 */
	public static extractUuidFromXml(xmlContent: string): string | null {
		if (!xmlContent || typeof xmlContent !== "string") {
			return null;
		}
		const match = xmlContent.match(UblHelper.UUID_TAG_REGEX);
		return match ? match[1].trim() : null;
	}

	/**
	 * UBL XML metni içerisindeki `<cbc:ID>` (Fatura Numarası) etiketini ayıklar.
	 *
	 * @param xmlContent - Ham XML metni
	 * @returns Fatura Numarası (örn: "MYF2026000000001") veya bulunamazsa `null`
	 *
	 * @example
	 * ```typescript
	 * const invoiceNo = UblHelper.extractInvoiceNumberFromXml("<Invoice><cbc:ID>MYF2026000000001</cbc:ID></Invoice>");
	 * ```
	 */
	public static extractInvoiceNumberFromXml(xmlContent: string): string | null {
		if (!xmlContent || typeof xmlContent !== "string") {
			return null;
		}
		const match = xmlContent.match(UblHelper.ID_TAG_REGEX);
		return match ? match[1].trim() : null;
	}

	/**
	 * Base64 metnini ikili veri dizisine (`Uint8Array`) dönüştürür.
	 *
	 * @param base64String - Base64 kodlu metin
	 */
	public static base64ToUint8Array(base64String: string): Uint8Array {
		return new Uint8Array(Buffer.from(base64String.trim(), "base64"));
	}

	/**
	 * İkili veri dizisini (`Uint8Array` / `Buffer`) Base64 metnine dönüştürür.
	 *
	 * @param bytes - Byte dizisi
	 */
	public static uint8ArrayToBase64(bytes: Uint8Array): string {
		return Buffer.from(bytes).toString("base64");
	}
}
