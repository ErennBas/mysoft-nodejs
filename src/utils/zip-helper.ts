import * as zlib from "node:zlib";

/**
 * CRC32 Look-up tablosu
 */
const CRC_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
	let c = i;
	for (let k = 0; k < 8; k++) {
		c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
	}
	CRC_TABLE[i] = c >>> 0;
}

/**
 * Verilen byte dizisinin CRC32 sağlama toplamını hesaplar.
 */
export function calculateCrc32(data: Uint8Array): number {
	let crc = 0xffffffff;
	for (let i = 0; i < data.length; i++) {
		crc = CRC_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
	}
	return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Yerleşik (Zero-Dependency) ZIP Sıkıştırma ve Açma Yardımcı Sınıfı
 */
export class ZipHelper {
	/**
	 * Bir veya birden fazla dosyayı standart PKWARE ZIP formatında sıkıştırır.
	 *
	 * @param files - Dosya adı ve içerik (string veya Uint8Array) eşlemesi
	 * @returns Sıkıştırılmış ZIP arşivi byte dizisi (Buffer)
	 */
	public static createZip(files: Record<string, Uint8Array | string>): Buffer {
		const entries = Object.entries(files);
		if (entries.length === 0) {
			throw new Error("Sıkıştırılacak dosya bulunamadı.");
		}

		const localHeaders: Buffer[] = [];
		const centralHeaders: Buffer[] = [];
		let currentOffset = 0;

		const now = new Date();
		const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2)) & 0xffff;
		const dosDate = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xffff;

		for (const [rawFileName, rawContent] of entries) {
			const fileName = rawFileName.replace(/\\/g, "/");
			const fileNameBuf = Buffer.from(fileName, "utf8");
			const contentBuf = Buffer.isBuffer(rawContent)
				? rawContent
				: typeof rawContent === "string"
					? Buffer.from(rawContent, "utf8")
					: Buffer.from(rawContent);

			const uncompressedSize = contentBuf.length;
			const crc = calculateCrc32(contentBuf);

			let compressedBuf: Buffer;
			let compressionMethod: number;

			if (uncompressedSize === 0) {
				compressedBuf = Buffer.alloc(0);
				compressionMethod = 0; // Stored
			} else {
				compressedBuf = zlib.deflateRawSync(contentBuf);
				compressionMethod = 8; // Deflate
			}

			const compressedSize = compressedBuf.length;

			// 1. Local File Header (30 byte + dosya adı)
			const localHeader = Buffer.alloc(30 + fileNameBuf.length);
			localHeader.writeUInt32LE(0x04034b50, 0); // Local header signature
			localHeader.writeUInt16LE(20, 4); // Version needed (2.0)
			localHeader.writeUInt16LE(0x0800, 6); // Bit flag: bit 11 = UTF-8 filename
			localHeader.writeUInt16LE(compressionMethod, 8);
			localHeader.writeUInt16LE(dosTime, 10);
			localHeader.writeUInt16LE(dosDate, 12);
			localHeader.writeUInt32LE(crc, 14);
			localHeader.writeUInt32LE(compressedSize, 18);
			localHeader.writeUInt32LE(uncompressedSize, 22);
			localHeader.writeUInt16LE(fileNameBuf.length, 26);
			localHeader.writeUInt16LE(0, 28); // Extra field length
			fileNameBuf.copy(localHeader, 30);

			localHeaders.push(localHeader, compressedBuf);

			// 2. Central Directory Header (46 byte + dosya adı)
			const centralHeader = Buffer.alloc(46 + fileNameBuf.length);
			centralHeader.writeUInt32LE(0x02014b50, 0); // Central directory signature
			centralHeader.writeUInt16LE(20, 4); // Version made by
			centralHeader.writeUInt16LE(20, 6); // Version needed
			centralHeader.writeUInt16LE(0x0800, 8); // UTF-8 filename
			centralHeader.writeUInt16LE(compressionMethod, 10);
			centralHeader.writeUInt16LE(dosTime, 12);
			centralHeader.writeUInt16LE(dosDate, 14);
			centralHeader.writeUInt32LE(crc, 16);
			centralHeader.writeUInt32LE(compressedSize, 20);
			centralHeader.writeUInt32LE(uncompressedSize, 24);
			centralHeader.writeUInt16LE(fileNameBuf.length, 28);
			centralHeader.writeUInt16LE(0, 30); // Extra field length
			centralHeader.writeUInt16LE(0, 32); // File comment length
			centralHeader.writeUInt16LE(0, 34); // Disk number start
			centralHeader.writeUInt16LE(0, 36); // Internal file attributes
			centralHeader.writeUInt32LE(0, 38); // External file attributes
			centralHeader.writeUInt32LE(currentOffset, 42); // Relative offset of local header
			fileNameBuf.copy(centralHeader, 46);

			centralHeaders.push(centralHeader);

			currentOffset += localHeader.length + compressedBuf.length;
		}

		const centralDirBuf = Buffer.concat(centralHeaders);
		const centralDirSize = centralDirBuf.length;
		const centralDirOffset = currentOffset;

		// 3. End of Central Directory Record (22 byte)
		const eocd = Buffer.alloc(22);
		eocd.writeUInt32LE(0x06054b50, 0); // EOCD signature
		eocd.writeUInt16LE(0, 4); // Disk number
		eocd.writeUInt16LE(0, 6); // Start disk
		eocd.writeUInt16LE(entries.length, 8); // Central directory records on this disk
		eocd.writeUInt16LE(entries.length, 10); // Total central directory records
		eocd.writeUInt32LE(centralDirSize, 12); // Size of central directory
		eocd.writeUInt32LE(centralDirOffset, 16); // Offset of start of central directory
		eocd.writeUInt16LE(0, 20); // Comment length

		return Buffer.concat([...localHeaders, centralDirBuf, eocd]);
	}

	/**
	 * Bir ZIP arşivini açar ve içindeki dosyaları döner.
	 *
	 * @param zipData - ZIP verisi (Buffer veya Uint8Array)
	 * @returns Dosya adı ve açılmış içerik (Buffer) eşlemesi
	 */
	public static extractZip(zipData: Uint8Array | Buffer): Record<string, Buffer> {
		const buf = Buffer.isBuffer(zipData) ? zipData : Buffer.from(zipData);
		if (buf.length < 22) {
			throw new Error("Geçersiz veya bozuk ZIP arşivi: Veri boyutu çok küçük.");
		}

		const result: Record<string, Buffer> = {};

		// 1. EOCD ara (Buffer sonundan geriye doğru 0x06054b50 ara)
		let eocdOffset = -1;
		const maxSearch = Math.min(buf.length, 65557);
		for (let i = buf.length - 22; i >= buf.length - maxSearch; i--) {
			if (buf.readUInt32LE(i) === 0x06054b50) {
				eocdOffset = i;
				break;
			}
		}

		if (eocdOffset !== -1) {
			const totalEntries = buf.readUInt16LE(eocdOffset + 10);
			const centralDirOffset = buf.readUInt32LE(eocdOffset + 16);

			let pos = centralDirOffset;
			for (let e = 0; e < totalEntries && pos < eocdOffset; e++) {
				if (pos + 46 > buf.length || buf.readUInt32LE(pos) !== 0x02014b50) {
					break;
				}

				const compressionMethod = buf.readUInt16LE(pos + 10);
				const compressedSize = buf.readUInt32LE(pos + 20);
				const fileNameLen = buf.readUInt16LE(pos + 28);
				const extraLen = buf.readUInt16LE(pos + 30);
				const commentLen = buf.readUInt16LE(pos + 32);
				const localHeaderOffset = buf.readUInt32LE(pos + 42);

				const fileName = buf.toString("utf8", pos + 46, pos + 46 + fileNameLen);
				pos += 46 + fileNameLen + extraLen + commentLen;

				// Local header'a git
				if (localHeaderOffset + 30 <= buf.length && buf.readUInt32LE(localHeaderOffset) === 0x04034b50) {
					const localFileNameLen = buf.readUInt16LE(localHeaderOffset + 26);
					const localExtraLen = buf.readUInt16LE(localHeaderOffset + 28);
					const dataStart = localHeaderOffset + 30 + localFileNameLen + localExtraLen;
					const dataEnd = dataStart + compressedSize;

					if (dataEnd <= buf.length) {
						const rawData = buf.subarray(dataStart, dataEnd);
						let fileBuf: Buffer;

						if (compressionMethod === 8) {
							fileBuf = zlib.inflateRawSync(rawData);
						} else if (compressionMethod === 0) {
							fileBuf = Buffer.from(rawData);
						} else {
							throw new Error(`Desteklenmeyen ZIP sıkıştırma metodu: ${compressionMethod}`);
						}

						result[fileName] = fileBuf;
					}
				}
			}

			if (Object.keys(result).length > 0) {
				return result;
			}
		}

		// 2. Fallback: Local header'ları baştan sona tara (EOCD bulunamazsa veya bozuksa)
		let offset = 0;
		while (offset + 30 <= buf.length) {
			const sig = buf.readUInt32LE(offset);
			if (sig !== 0x04034b50) break;

			const compressionMethod = buf.readUInt16LE(offset + 8);
			const compressedSize = buf.readUInt32LE(offset + 18);
			const fileNameLen = buf.readUInt16LE(offset + 26);
			const extraLen = buf.readUInt16LE(offset + 28);

			const fileName = buf.toString("utf8", offset + 30, offset + 30 + fileNameLen);
			const dataStart = offset + 30 + fileNameLen + extraLen;
			const dataEnd = dataStart + compressedSize;

			if (dataEnd > buf.length) break;

			const rawData = buf.subarray(dataStart, dataEnd);
			let fileBuf: Buffer;

			if (compressionMethod === 8) {
				fileBuf = zlib.inflateRawSync(rawData);
			} else if (compressionMethod === 0) {
				fileBuf = Buffer.from(rawData);
			} else {
				throw new Error(`Desteklenmeyen ZIP sıkıştırma metodu: ${compressionMethod}`);
			}

			result[fileName] = fileBuf;
			offset = dataEnd;
		}

		if (Object.keys(result).length === 0) {
			throw new Error("ZIP arşivi boş veya geçerli bir dosya içermiyor.");
		}

		return result;
	}
}
