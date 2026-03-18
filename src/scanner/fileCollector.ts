import fg from "fast-glob";
import { basename, relative } from "path";
import { statSync } from "fs";
import type { ScannedFile } from "../types.js";

const SCAN_PATTERNS = [
  // iOS
  "**/Info.plist",
  "**/PrivacyInfo.xcprivacy",
  "**/*.entitlements",
  "**/*.swift",
  "**/*.m",
  "**/*.h",
  "**/Podfile",
  "**/Podfile.lock",
  "**/Package.swift",
  "**/*.xcodeproj/**",
  "**/*.xcworkspace/**",

  // Android
  "**/AndroidManifest.xml",
  "**/build.gradle",
  "**/build.gradle.kts",
  "**/settings.gradle",
  "**/settings.gradle.kts",
  "**/gradle.properties",
  "**/*.kt",
  "**/*.java",
  "**/network_security_config.xml",
  "**/proguard-rules.pro",

  // Cross-platform
  "**/pubspec.yaml",
  "**/package.json",
  "**/metro.config.*",
  "**/*.dart",
  "**/*.js",
  "**/*.jsx",
  "**/*.ts",
  "**/*.tsx",
];

const IGNORE_PATTERNS = [
  "**/node_modules/**",
  "**/build/**",
  "**/dist/**",
  "**/.gradle/**",
  "**/DerivedData/**",
  "**/Pods/**",
  "**/.dart_tool/**",
  "**/.pub-cache/**",
  "**/vendor/**",
  "**/__tests__/**",
  "**/test/**",
  "**/tests/**",
  "**/*.spec.*",
  "**/*.test.*",
];

export async function collectFiles(
  projectPath: string
): Promise<ScannedFile[]> {
  const entries = await fg(SCAN_PATTERNS, {
    cwd: projectPath,
    absolute: true,
    ignore: IGNORE_PATTERNS,
    dot: false,
    onlyFiles: true,
  });

  return entries.map((absPath) => {
    const stat = statSync(absPath);
    return {
      path: absPath,
      name: basename(absPath),
      relativePath: relative(projectPath, absPath),
      size: stat.size,
    };
  });
}
