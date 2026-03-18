import type { Category, Finding, ScoreResult, Severity } from "../types.js";

const SEVERITY_WEIGHTS: Record<Severity, number> = {
  critical: 25,
  high: 15,
  medium: 8,
  low: 2,
  info: 0,
};

const CATEGORY_WEIGHTS: Record<Category, number> = {
  privacy: 0.3,
  performance: 0.2,
  security: 0.25,
  design: 0.1,
  business: 0.1,
  legal: 0.05,
};

export function calculateScore(findings: Finding[]): ScoreResult {
  const categories: Record<Category, number> = {
    privacy: 100,
    performance: 100,
    security: 100,
    design: 100,
    business: 100,
    legal: 100,
  };

  for (const finding of findings) {
    const deduction = SEVERITY_WEIGHTS[finding.severity];
    if (deduction > 0 && finding.category in categories) {
      categories[finding.category] = Math.max(
        0,
        categories[finding.category] - deduction
      );
    }
  }

  const overall = Math.round(
    Object.entries(CATEGORY_WEIGHTS).reduce((sum, [cat, weight]) => {
      return sum + categories[cat as Category] * weight;
    }, 0)
  );

  let verdict: ScoreResult["verdict"];
  if (overall >= 80) {
    verdict = "ready";
  } else if (overall >= 50) {
    verdict = "risky";
  } else {
    verdict = "not-ready";
  }

  return { overall, categories, verdict };
}
