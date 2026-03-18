import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Finding } from "../types.js";

interface FixResult {
  fixed: Finding[];
  failed: Finding[];
}

interface FixHandler {
  ruleId: string;
  apply(projectPath: string, finding: Finding): boolean;
}

const fixHandlers: FixHandler[] = [
  // Android: targetSdkVersion
  {
    ruleId: "AND-GRADLE-001",
    apply(projectPath, finding) {
      return replaceInFile(
        join(projectPath, finding.file || "app/build.gradle"),
        /targetSdk(?:Version)?\s*[=:]?\s*\d+/,
        "targetSdkVersion 35"
      );
    },
  },
  // Android: compileSdk
  {
    ruleId: "AND-GRADLE-002",
    apply(projectPath, finding) {
      return replaceInFile(
        join(projectPath, finding.file || "app/build.gradle"),
        /compileSdk(?:Version)?\s*[=:]?\s*\d+/,
        "compileSdk 35"
      );
    },
  },
  // Android: debuggable=true in release
  {
    ruleId: "AND-GRADLE-003",
    apply(projectPath, finding) {
      return replaceInFile(
        join(projectPath, finding.file || "app/build.gradle"),
        /(release\s*\{[\s\S]*?)debuggable\s*[=:]?\s*true/m,
        "$1debuggable false"
      );
    },
  },
  // Android: minifyEnabled=false in release
  {
    ruleId: "AND-GRADLE-004",
    apply(projectPath, finding) {
      return replaceInFile(
        join(projectPath, finding.file || "app/build.gradle"),
        /(release\s*\{[\s\S]*?)minifyEnabled\s*[=:]?\s*false/m,
        "$1minifyEnabled true"
      );
    },
  },
  // iOS: NSAllowsArbitraryLoads
  {
    ruleId: "IOS-SEC-001",
    apply(projectPath, finding) {
      return replaceInFile(
        join(projectPath, finding.file || "Info.plist"),
        /<key>NSAllowsArbitraryLoads<\/key>\s*<true\s*\/>/,
        "<key>NSAllowsArbitraryLoads</key>\n\t<false/>"
      );
    },
  },
  // Common: HTTP → HTTPS
  {
    ruleId: "COM-SEC-002",
    apply(projectPath, finding) {
      if (!finding.file) return false;
      return replaceInFile(
        join(projectPath, finding.file),
        /["']http:\/\/(?!localhost|127\.0\.0\.1|10\.\d|192\.168)/g,
        (match) => match.replace("http://", "https://")
      );
    },
  },
];

function replaceInFile(
  filePath: string,
  pattern: RegExp,
  replacement: string | ((match: string) => string)
): boolean {
  try {
    const content = readFileSync(filePath, "utf-8");
    if (!pattern.test(content)) return false;
    const newContent = content.replace(pattern, replacement as string);
    if (newContent === content) return false;
    writeFileSync(filePath, newContent, "utf-8");
    return true;
  } catch {
    return false;
  }
}

export async function applyFixes(
  projectPath: string,
  findings: Finding[]
): Promise<FixResult> {
  const fixed: Finding[] = [];
  const failed: Finding[] = [];

  for (const finding of findings) {
    const handler = fixHandlers.find((h) => h.ruleId === finding.ruleId);
    if (!handler) continue;

    const success = handler.apply(projectPath, finding);
    if (success) {
      fixed.push(finding);
    } else {
      failed.push(finding);
    }
  }

  return { fixed, failed };
}
