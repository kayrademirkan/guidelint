import { collectFiles } from "./fileCollector.js";
import { detectPlatforms } from "./platformDetector.js";
import { buildContext } from "./contextBuilder.js";
import { getAllRules } from "../rules/index.js";
import { calculateScore } from "./scoring.js";
import { applyFixes } from "./fixer.js";
import type { ScanResult, Severity } from "../types.js";

interface ScanOptions {
  iosOnly?: boolean;
  androidOnly?: boolean;
  minSeverity?: string;
  ignore?: string[];
  fix?: boolean;
}

const SEVERITY_ORDER: Severity[] = [
  "critical",
  "high",
  "medium",
  "low",
  "info",
];

export async function scan(
  projectPath: string,
  options: ScanOptions = {}
): Promise<ScanResult> {
  const files = await collectFiles(projectPath, options.ignore || []);
  const platforms = detectPlatforms(files);
  const ctx = await buildContext(projectPath, files, platforms);

  const allRules = getAllRules();
  const rules = allRules.filter((rule) => {
    if (options.iosOnly && rule.platform === "android") return false;
    if (options.androidOnly && rule.platform === "ios") return false;
    if (
      rule.platform !== "both" &&
      !platforms.includes(rule.platform as any)
    ) {
      return false;
    }
    return true;
  });

  const findings = rules
    .map((rule) => rule.check(ctx))
    .filter((f): f is NonNullable<typeof f> => f !== null);

  // Auto-fix if requested
  if (options.fix) {
    const fixResult = await applyFixes(projectPath, findings);
    // Remove findings that were fixed
    const fixedIds = new Set(fixResult.fixed.map((f) => f.ruleId));
    const remaining = findings.filter((f) => !fixedIds.has(f.ruleId));

    // Filter by min severity
    const minIdx = SEVERITY_ORDER.indexOf(
      (options.minSeverity as Severity) || "low"
    );
    const filtered =
      minIdx >= 0
        ? remaining.filter((f) => SEVERITY_ORDER.indexOf(f.severity) <= minIdx)
        : remaining;

    filtered.sort(
      (a, b) =>
        SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
    );

    const score = calculateScore(filtered);

    return {
      projectPath,
      platforms,
      findings: filtered,
      score,
      filesScanned: files.length,
      rulesChecked: rules.length,
      timestamp: new Date().toISOString(),
      fixed: fixResult.fixed.map((f) => f.ruleId),
    };
  }

  // Filter by min severity
  const minIdx = SEVERITY_ORDER.indexOf(
    (options.minSeverity as Severity) || "low"
  );
  const filtered =
    minIdx >= 0
      ? findings.filter((f) => SEVERITY_ORDER.indexOf(f.severity) <= minIdx)
      : findings;

  // Sort by severity
  filtered.sort(
    (a, b) =>
      SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
  );

  const score = calculateScore(filtered);

  return {
    projectPath,
    platforms,
    findings: filtered,
    score,
    filesScanned: files.length,
    rulesChecked: rules.length,
    timestamp: new Date().toISOString(),
  };
}
