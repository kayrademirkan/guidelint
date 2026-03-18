import { readFileSync } from "fs";
import { extname } from "path";
import { parsePlist } from "../parsers/plist.js";
import type { Platform, ScanContext, ScannedFile, SourceFile } from "../types.js";

const SOURCE_EXTENSIONS: Record<string, SourceFile["language"]> = {
  ".swift": "swift",
  ".m": "objc",
  ".h": "objc",
  ".kt": "kotlin",
  ".java": "java",
  ".dart": "dart",
  ".js": "js",
  ".jsx": "js",
  ".ts": "ts",
  ".tsx": "ts",
};

const MAX_FILE_SIZE = 1024 * 1024; // 1MB limit per file

export async function buildContext(
  projectPath: string,
  files: ScannedFile[],
  platforms: Platform[]
): Promise<ScanContext> {
  const ctx: ScanContext = {
    projectPath,
    platforms,
    files,
    sourceFiles: [],
  };

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) continue;

    try {
      const ext = extname(file.name);
      const lang = SOURCE_EXTENSIONS[ext];

      if (lang) {
        const content = readFileSync(file.path, "utf-8");
        ctx.sourceFiles.push({
          path: file.path,
          relativePath: file.relativePath,
          content,
          language: lang,
        });
      }

      // Info.plist
      if (file.name === "Info.plist" && !ctx.plist) {
        const raw = readFileSync(file.path, "utf-8");
        ctx.plistRaw = raw;
        ctx.plist = parsePlist(raw);
      }

      // PrivacyInfo.xcprivacy
      if (file.name === "PrivacyInfo.xcprivacy" && !ctx.privacyManifest) {
        const raw = readFileSync(file.path, "utf-8");
        ctx.privacyManifestRaw = raw;
        ctx.privacyManifest = parsePlist(raw);
      }

      // AndroidManifest.xml
      if (file.name === "AndroidManifest.xml" && !ctx.manifest) {
        ctx.manifest = readFileSync(file.path, "utf-8");
      }

      // build.gradle
      if (
        (file.name === "build.gradle" || file.name === "build.gradle.kts") &&
        file.relativePath.includes("app") &&
        !ctx.buildGradle
      ) {
        ctx.buildGradle = readFileSync(file.path, "utf-8");
      }

      // Podfile
      if (file.name === "Podfile" && !ctx.podfile) {
        ctx.podfile = readFileSync(file.path, "utf-8");
      }

      // package.json
      if (file.name === "package.json" && !ctx.packageJson) {
        const raw = readFileSync(file.path, "utf-8");
        try {
          ctx.packageJson = JSON.parse(raw);
        } catch {}
      }

      // pubspec.yaml
      if (file.name === "pubspec.yaml" && !ctx.pubspec) {
        ctx.pubspec = readFileSync(file.path, "utf-8");
      }

      // Entitlements
      if (file.name.endsWith(".entitlements") && !ctx.entitlements) {
        ctx.entitlements = readFileSync(file.path, "utf-8");
      }
    } catch {
      // Skip unreadable files
    }
  }

  return ctx;
}
