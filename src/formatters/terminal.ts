import chalk from "chalk";
import { t } from "../i18n/index.js";
import type { ScanResult, Finding, Severity, Category } from "../types.js";

const SEVERITY_ICON: Record<Severity, string> = {
  critical: chalk.red("✗"),
  high: chalk.yellow("⚠"),
  medium: chalk.blue("~"),
  low: chalk.gray("·"),
  info: chalk.gray("ℹ"),
};

const SEVERITY_COLOR: Record<Severity, (s: string) => string> = {
  critical: chalk.red,
  high: chalk.yellow,
  medium: chalk.blue,
  low: chalk.gray,
  info: chalk.gray,
};

export function formatTerminal(result: ScanResult): string {
  const ui = t().ui;
  const lines: string[] = [];

  // Header
  lines.push("");
  lines.push(chalk.bold.cyan(`  ${ui.scanTitle}`) + chalk.gray(" v0.1.0"));
  lines.push(chalk.gray("  ─".repeat(30)));
  lines.push("");
  lines.push(
    `  ${chalk.gray(`${ui.platform}:`)}  ${result.platforms.join(", ").toUpperCase()}`
  );
  lines.push(
    `  ${chalk.gray("Files:")}    ${result.filesScanned} ${ui.filesScanned}`
  );
  lines.push(
    `  ${chalk.gray("Rules:")}    ${result.rulesChecked} ${ui.rulesChecked}`
  );
  lines.push("");

  if (result.findings.length === 0) {
    lines.push(chalk.green(`  ✓ ${ui.noIssues}`));
    lines.push("");
    return lines.join("\n");
  }

  // Group by severity
  const grouped = groupBySeverity(result.findings);

  for (const severity of ["critical", "high", "medium", "low", "info"] as Severity[]) {
    const findings = grouped[severity];
    if (!findings?.length) continue;

    const color = SEVERITY_COLOR[severity];
    lines.push(
      color(`  ${severity.toUpperCase()} (${findings.length})`)
    );
    lines.push("");

    for (const f of findings) {
      lines.push(
        `  ${SEVERITY_ICON[f.severity]} ${chalk.bold(`[${f.ruleId}]`)} ${f.title}`
      );
      lines.push(`    ${chalk.gray("→")} ${f.message}`);
      if (f.file) {
        lines.push(
          `    ${chalk.gray("→")} ${chalk.gray(`${ui.file}:`)} ${f.file}${f.line ? `:${f.line}` : ""}`
        );
      }
      lines.push(
        `    ${chalk.gray("→")} ${chalk.green(`${ui.fix}:`)} ${f.fix}`
      );
      if (f.guideline) {
        lines.push(
          `    ${chalk.gray("→")} ${chalk.gray(f.guideline)}`
        );
      }
      lines.push("");
    }
  }

  // Score
  lines.push(chalk.gray("  ─".repeat(30)));
  lines.push("");

  const { score } = result;
  const scoreColor =
    score.overall >= 80
      ? chalk.green
      : score.overall >= 50
        ? chalk.yellow
        : chalk.red;

  const verdictText =
    score.verdict === "ready"
      ? ui.verdictReady
      : score.verdict === "risky"
        ? ui.verdictRisky
        : ui.verdictNotReady;

  lines.push(
    `  ${chalk.bold(`${ui.score}:`)} ${scoreColor(`${score.overall}/100`)} — ${
      score.verdict === "ready"
        ? chalk.green(verdictText)
        : score.verdict === "risky"
          ? chalk.yellow(verdictText)
          : chalk.red(verdictText)
    }`
  );
  lines.push("");

  // Category breakdown
  for (const [cat, value] of Object.entries(score.categories) as [Category, number][]) {
    const bar = renderBar(value);
    const catColor = value >= 80 ? chalk.green : value >= 50 ? chalk.yellow : chalk.red;
    lines.push(
      `  ${padRight(cat, 12)} ${bar} ${catColor(`${value}/100`)}`
    );
  }

  lines.push("");
  return lines.join("\n");
}

function groupBySeverity(findings: Finding[]): Record<Severity, Finding[]> {
  const grouped: Record<Severity, Finding[]> = {
    critical: [],
    high: [],
    medium: [],
    low: [],
    info: [],
  };
  for (const f of findings) {
    grouped[f.severity].push(f);
  }
  return grouped;
}

function renderBar(value: number): string {
  const filled = Math.round(value / 5);
  const empty = 20 - filled;
  const color = value >= 80 ? chalk.green : value >= 50 ? chalk.yellow : chalk.red;
  return color("█".repeat(filled)) + chalk.gray("░".repeat(empty));
}

function padRight(str: string, len: number): string {
  return str + " ".repeat(Math.max(0, len - str.length));
}
