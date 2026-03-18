import { t } from "../i18n/index.js";
import type { ScanResult, Finding, Severity, Category } from "../types.js";

export function formatPrompt(result: ScanResult): string {
  const ui = t().ui;
  const lines: string[] = [];

  lines.push(`# ${ui.reportTitle}`);
  lines.push("");
  lines.push(`## ${ui.projectInfo}`);
  lines.push(`- **${ui.path}:** \`${result.projectPath}\``);
  lines.push(`- **${ui.platform}:** ${result.platforms.join(", ").toUpperCase()}`);
  lines.push(`- **${ui.file}s:** ${result.filesScanned} ${ui.filesScanned}`);
  lines.push(`- **Rules:** ${result.rulesChecked} ${ui.rulesChecked}`);
  lines.push(`- **${ui.scanDate}:** ${result.timestamp}`);
  lines.push("");

  // Score summary
  lines.push(`## ${ui.score}`);
  lines.push(`- **Overall:** ${result.score.overall}/100 — ${verdictText(result.score.verdict, ui)}`);
  lines.push("");
  lines.push(`| ${ui.category} | ${ui.score} |`);
  lines.push("|---|---|");
  for (const [cat, value] of Object.entries(result.score.categories) as [Category, number][]) {
    lines.push(`| ${cat} | ${value}/100 ${value < 50 ? "🔴" : value < 80 ? "🟡" : "🟢"} |`);
  }
  lines.push("");

  if (result.findings.length === 0) {
    lines.push(`## ${ui.findings}`);
    lines.push(ui.noIssuesFound);
    return lines.join("\n");
  }

  // Findings
  lines.push(`## ${ui.findings}`);
  lines.push("");
  lines.push(ui.findingsDescription);
  lines.push("");

  const grouped = groupBySeverity(result.findings);

  for (const severity of ["critical", "high", "medium", "low", "info"] as Severity[]) {
    const findings = grouped[severity];
    if (!findings?.length) continue;

    lines.push(`### ${severityEmoji(severity)} ${severity.toUpperCase()} (${findings.length})`);
    lines.push("");

    for (const f of findings) {
      lines.push(`#### [${f.ruleId}] ${f.title}`);
      lines.push(`- **${ui.severity}:** ${severity}`);
      lines.push(`- **${ui.category}:** ${f.category}`);
      if (f.file) lines.push(`- **${ui.file}:** \`${f.file}\`${f.line ? ` (line ${f.line})` : ""}`);
      if (f.guideline) lines.push(`- **${ui.guideline}:** ${f.guideline}`);
      lines.push(`- **${ui.problem}:** ${f.message}`);
      lines.push(`- **${ui.fix}:** ${f.fix}`);
      if (f.docsUrl) lines.push(`- **${ui.docs}:** ${f.docsUrl}`);
      lines.push("");
    }
  }

  // AI instruction section
  lines.push("---");
  lines.push("");
  lines.push(`## ${ui.aiFix}`);
  lines.push("");
  lines.push(
    "If you are an AI assistant helping fix these issues, here is a prioritized action plan:"
  );
  lines.push("");

  const criticals = grouped.critical || [];
  const highs = grouped.high || [];

  if (criticals.length > 0) {
    lines.push(`### ${ui.aiFixStep1}`);
    lines.push("");
    for (let i = 0; i < criticals.length; i++) {
      const f = criticals[i];
      lines.push(`${i + 1}. **[${f.ruleId}]** ${f.fix}${f.file ? ` → in \`${f.file}\`` : ""}`);
    }
    lines.push("");
  }

  if (highs.length > 0) {
    lines.push(`### ${ui.aiFixStep2}`);
    lines.push("");
    for (let i = 0; i < highs.length; i++) {
      const f = highs[i];
      lines.push(`${i + 1}. **[${f.ruleId}]** ${f.fix}${f.file ? ` → in \`${f.file}\`` : ""}`);
    }
    lines.push("");
  }

  const mediums = grouped.medium || [];
  const lows = grouped.low || [];
  if (mediums.length > 0 || lows.length > 0) {
    lines.push(`### ${ui.aiFixStep3}`);
    lines.push("");
    for (const f of [...mediums, ...lows]) {
      lines.push(`- **[${f.ruleId}]** ${f.fix}`);
    }
    lines.push("");
  }

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

function verdictText(verdict: string, ui: ReturnType<typeof t>["ui"]): string {
  switch (verdict) {
    case "ready":
      return ui.readyForSubmission;
    case "risky":
      return ui.riskyReview;
    case "not-ready":
      return ui.notReadyCritical;
    default:
      return verdict;
  }
}

function severityEmoji(severity: Severity): string {
  switch (severity) {
    case "critical":
      return "🔴";
    case "high":
      return "🟠";
    case "medium":
      return "🟡";
    case "low":
      return "🔵";
    case "info":
      return "ℹ️";
  }
}
