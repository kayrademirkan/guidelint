import { t } from "./index.js";
import type { Finding } from "../types.js";

/**
 * Translates a finding's title, message, and fix using the current locale.
 * Falls back to the original (English) strings if no translation is found.
 * Supports {placeholder} interpolation in translation strings.
 */
export function translateFinding(finding: Finding): Finding {
  const translations = t();
  const ruleTranslation = translations.rules[finding.ruleId];

  if (!ruleTranslation) return finding;

  // Extract placeholder values from original message
  const placeholders = extractPlaceholders(finding.message);

  return {
    ...finding,
    title: interpolate(ruleTranslation.title, placeholders),
    message: interpolate(ruleTranslation.message, placeholders),
    fix: interpolate(ruleTranslation.fix, placeholders),
  };
}

/**
 * Translates an array of findings.
 */
export function translateFindings(findings: Finding[]): Finding[] {
  return findings.map(translateFinding);
}

/**
 * Extracts numeric and keyword values from messages for interpolation.
 * E.g., "12 force unwrap (!) instances" -> { count: "12" }
 * E.g., 'Bundle ID "com.example.test"' -> { bundleId: "com.example.test" }
 */
function extractPlaceholders(message: string): Record<string, string> {
  const placeholders: Record<string, string> = {};

  // Extract count (first number in message)
  const countMatch = message.match(/^(\d+)\s/);
  if (countMatch) {
    placeholders["count"] = countMatch[1];
  }

  // Extract quoted values
  const quotedMatch = message.match(/"([^"]+)"/);
  if (quotedMatch) {
    placeholders["value"] = quotedMatch[1];
    placeholders["bundleId"] = quotedMatch[1];
  }

  // Extract version numbers like "targetSdkVersion 33"
  const versionMatch = message.match(/(?:targetSdkVersion|compileSdk)\s+(\d+)/);
  if (versionMatch) {
    placeholders["version"] = versionMatch[1];
  }

  // Extract key lists (comma-separated)
  const keysMatch = message.match(/keys?:\s*(.+)$/);
  if (keysMatch) {
    placeholders["keys"] = keysMatch[1];
  }

  return placeholders;
}

/**
 * Replaces {placeholder} tokens in a string.
 */
function interpolate(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return values[key] ?? match;
  });
}
