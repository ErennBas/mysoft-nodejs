import * as fs from "fs";
import * as path from "path";

/**
 * Mysoft SDK Versiyon Güncelleyici (Bump Version Script)
 *
 * Kullanım:
 *   npm run new-version 0.0.3-alpha.0
 *   npm run new-version patch
 *   npm run new-version minor
 *   npm run new-version major
 *   npm run new-version prerelease
 */

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, "package.json");
const packageLockJsonPath = path.join(rootDir, "package-lock.json");
const srcIndexPath = path.join(rootDir, "src", "index.ts");
const smokeTestPath = path.join(rootDir, "tests", "unit", "smoke.test.ts");

function readJsonFile(filePath: string): any {
	const content = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(content);
}

function calculateNextVersion(currentVersion: string, type: string): string {
	const semverRegex = /^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.-]+))?$/;
	const match = currentVersion.match(semverRegex);

	if (!match) {
		throw new Error(`Mevcut versiyon geçersiz semver formatında: ${currentVersion}`);
	}

	let major = parseInt(match[1], 10);
	let minor = parseInt(match[2], 10);
	let patch = parseInt(match[3], 10);
	const prerelease = match[4];

	switch (type.toLowerCase()) {
		case "major":
			return `${major + 1}.0.0`;
		case "minor":
			return `${major}.${minor + 1}.0`;
		case "patch":
			if (prerelease) {
				return `${major}.${minor}.${patch}`;
			}
			return `${major}.${minor}.${patch + 1}`;
		case "prerelease":
		case "alpha":
		case "beta":
		case "rc": {
			const tag = type.toLowerCase() === "prerelease" ? "alpha" : type.toLowerCase();
			if (prerelease) {
				const tagMatch = prerelease.match(/^([a-zA-Z]+)\.(\d+)$/);
				if (tagMatch) {
					const currentTag = tagMatch[1];
					const num = parseInt(tagMatch[2], 10);
					return `${major}.${minor}.${patch}-${currentTag}.${num + 1}`;
				}
				return `${major}.${minor}.${patch}-${prerelease}.1`;
			}
			return `${major}.${minor}.${patch + 1}-${tag}.0`;
		}
		default:
			return type;
	}
}

function main() {
	const args = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
	const targetArg = args[0];

	if (!fs.existsSync(packageJsonPath)) {
		console.error("❌ Hata: package.json dosyası bulunamadı!");
		process.exit(1);
	}

	const pkg = readJsonFile(packageJsonPath);
	const currentVersion: string = pkg.version || "0.0.1";

	if (!targetArg) {
		console.log("==================================================================");
		console.log("📦 MYSOFT SDK - VERSİYON GÜNCELLEYİCİ");
		console.log("==================================================================");
		console.log(`📌 Mevcut Versiyon: ${currentVersion}\n`);
		console.log("Kullanım Örnekleri:");
		console.log("  npm run new-version 0.0.3-alpha.0      (Belirli bir versiyon atar)");
		console.log("  npm run new-version patch              (0.0.2 -> 0.0.3)");
		console.log("  npm run new-version minor              (0.0.2 -> 0.1.0)");
		console.log("  npm run new-version major              (0.0.2 -> 1.0.0)");
		console.log("  npm run new-version prerelease         (0.0.2-alpha.0 -> 0.0.2-alpha.1)");
		console.log("==================================================================");
		process.exit(0);
	}

	let nextVersion: string;
	const semverKeywords = ["major", "minor", "patch", "prerelease", "alpha", "beta", "rc"];

	if (semverKeywords.includes(targetArg.toLowerCase())) {
		nextVersion = calculateNextVersion(currentVersion, targetArg);
	} else {
		nextVersion = targetArg.trim().replace(/^v/, "");
		const validSemver = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/;
		if (!validSemver.test(nextVersion)) {
			console.error(`❌ Hata: '${nextVersion}' geçerli bir SemVer formatı değil! (örn: 0.0.3 veya 0.0.3-alpha.0)`);
			process.exit(1);
		}
	}

	if (currentVersion === nextVersion) {
		console.log(`⚠️ Belirtilen versiyon zaten mevcut versiyonla aynı: ${currentVersion}`);
		process.exit(0);
	}

	console.log("==================================================================");
	console.log(`🚀 Versiyon Güncelleniyor: ${currentVersion} ➔ ${nextVersion}`);
	console.log("==================================================================\n");

	const updatedFiles: string[] = [];

	// 1. package.json güncelle
	pkg.version = nextVersion;
	fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, "\t") + "\n", "utf-8");
	updatedFiles.push("package.json");

	// 2. package-lock.json güncelle (varsa)
	if (fs.existsSync(packageLockJsonPath)) {
		const lock = readJsonFile(packageLockJsonPath);
		lock.version = nextVersion;
		if (lock.packages && lock.packages[""]) {
			lock.packages[""].version = nextVersion;
		}
		fs.writeFileSync(packageLockJsonPath, JSON.stringify(lock, null, "\t") + "\n", "utf-8");
		updatedFiles.push("package-lock.json");
	}

	// 3. src/index.ts güncelle
	if (fs.existsSync(srcIndexPath)) {
		let indexContent = fs.readFileSync(srcIndexPath, "utf-8");
		const regex = /export const SDK_VERSION = ["'][^"']+["'];/;
		if (regex.test(indexContent)) {
			indexContent = indexContent.replace(regex, `export const SDK_VERSION = "${nextVersion}";`);
			fs.writeFileSync(srcIndexPath, indexContent, "utf-8");
			updatedFiles.push("src/index.ts");
		}
	}

	// 4. tests/unit/smoke.test.ts güncelle
	if (fs.existsSync(smokeTestPath)) {
		let smokeContent = fs.readFileSync(smokeTestPath, "utf-8");
		const regex = /expect\(SDK_VERSION\)\.toBe\(["'][^"']+["']\);/;
		if (regex.test(smokeContent)) {
			smokeContent = smokeContent.replace(regex, `expect(SDK_VERSION).toBe("${nextVersion}");`);
			fs.writeFileSync(smokeTestPath, smokeContent, "utf-8");
			updatedFiles.push("tests/unit/smoke.test.ts");
		}
	}

	console.log("✅ Başarıyla güncellenen dosyalar:");
	for (const file of updatedFiles) {
		console.log(`   📄 ${file}`);
	}

	console.log(`\n🎉 Versiyon başarıyla ${nextVersion} yapıldı!`);
	console.log("💡 Tavsiye edilen sonraki adımlar:");
	console.log("   1. npm test");
	console.log("   2. npm run build");
	console.log(`   3. git commit -am "chore: bump version to ${nextVersion}"`);
}

main();
