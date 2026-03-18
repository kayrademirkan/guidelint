export type Platform = "ios" | "android" | "react-native" | "flutter";
export type Severity = "critical" | "high" | "medium" | "low" | "info";
export type Category =
  | "privacy"
  | "performance"
  | "security"
  | "design"
  | "business"
  | "legal";

export interface Finding {
  ruleId: string;
  title: string;
  severity: Severity;
  category: Category;
  platform: Platform | "both";
  message: string;
  fix: string;
  file?: string;
  line?: number;
  guideline?: string;
  docsUrl?: string;
}

export interface ScanContext {
  projectPath: string;
  platforms: Platform[];
  files: ScannedFile[];
  plist?: Record<string, unknown>;
  plistRaw?: string;
  privacyManifest?: Record<string, unknown>;
  privacyManifestRaw?: string;
  manifest?: string;
  buildGradle?: string;
  sourceFiles: SourceFile[];
  podfile?: string;
  packageJson?: Record<string, unknown>;
  pubspec?: string;
  entitlements?: string;
}

export interface ScannedFile {
  path: string;
  name: string;
  relativePath: string;
  size: number;
}

export interface SourceFile {
  path: string;
  relativePath: string;
  content: string;
  language: "swift" | "objc" | "kotlin" | "java" | "dart" | "js" | "ts";
}

export interface Rule {
  id: string;
  title: string;
  severity: Severity;
  category: Category;
  platform: Platform | "both";
  guideline?: string;
  check(ctx: ScanContext): Finding | null;
}

export interface ScanResult {
  projectPath: string;
  platforms: Platform[];
  findings: Finding[];
  score: ScoreResult;
  filesScanned: number;
  rulesChecked: number;
  timestamp: string;
}

export interface ScoreResult {
  overall: number;
  categories: Record<Category, number>;
  verdict: "ready" | "risky" | "not-ready";
}

export type OutputFormat = "terminal" | "prompt" | "json";
