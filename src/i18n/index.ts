import { en } from "./en.js";
import { tr } from "./tr.js";
import { de } from "./de.js";
import { nl } from "./nl.js";

export type Locale = "en" | "tr" | "de" | "nl";

export interface Translations {
  // CLI & Formatter UI strings
  ui: {
    scanTitle: string;
    platform: string;
    filesScanned: string;
    rulesChecked: string;
    noIssues: string;
    score: string;
    verdictReady: string;
    verdictRisky: string;
    verdictNotReady: string;
    fix: string;
    file: string;
    severity: string;
    category: string;
    problem: string;
    guideline: string;
    docs: string;
    // Prompt format
    reportTitle: string;
    projectInfo: string;
    path: string;
    scanDate: string;
    findings: string;
    findingsDescription: string;
    aiFix: string;
    aiFixStep1: string;
    aiFixStep2: string;
    aiFixStep3: string;
    readyForSubmission: string;
    riskyReview: string;
    notReadyCritical: string;
    noIssuesFound: string;
  };
  // Rule translations: ruleId -> { title, message, fix }
  rules: Record<
    string,
    {
      title: string;
      message: string;
      fix: string;
    }
  >;
}

const locales: Record<Locale, Translations> = { en, tr, de, nl };

let currentLocale: Locale = "en";

export function setLocale(locale: Locale): void {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(): Translations {
  return locales[currentLocale];
}

export function getAvailableLocales(): Locale[] {
  return ["en", "tr", "de", "nl"];
}
