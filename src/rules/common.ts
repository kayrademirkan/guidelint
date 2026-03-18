import type { Rule, ScanContext } from "../types.js";

function sourceContains(ctx: ScanContext, pattern: RegExp): string | null {
  for (const f of ctx.sourceFiles) {
    if (pattern.test(f.content)) return f.relativePath;
  }
  return null;
}

const hardcodedSecret: Rule = {
  id: "COM-SEC-001",
  title: "Hardcoded API key/secret detected",
  severity: "critical",
  category: "security",
  platform: "both",
  check(ctx) {
    const pattern = /(?:apiKey|api_key|API_KEY|secret|secretKey|secret_key|password|passwd|token|access_token)\s*[=:]\s*["'][A-Za-z0-9+/=_\-]{16,}["']/;
    const file = sourceContains(ctx, pattern);
    if (!file) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "critical",
      category: "security",
      platform: "both",
      message: "Hardcoded API key or secret found in source code",
      fix: "Use environment variables, .env files, or platform secret managers (Keychain/EncryptedSharedPreferences)",
      file,
    };
  },
};

const httpUrl: Rule = {
  id: "COM-SEC-002",
  title: "HTTP URL usage",
  severity: "high",
  category: "security",
  platform: "both",
  check(ctx) {
    const pattern = /["']http:\/\/(?!localhost|127\.0\.0\.1|10\.\d|192\.168)/;
    const file = sourceContains(ctx, pattern);
    if (!file) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "security",
      platform: "both",
      message: "HTTP URL detected — use HTTPS instead",
      fix: "Change all URLs to HTTPS",
      file,
    };
  },
};

const loremIpsum: Rule = {
  id: "COM-META-001",
  title: "Lorem ipsum placeholder content",
  severity: "high",
  category: "design",
  platform: "both",
  check(ctx) {
    const file = sourceContains(ctx, /lorem ipsum/i);
    if (!file) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "design",
      platform: "both",
      message: "Lorem ipsum placeholder content detected — will be rejected in store review",
      fix: "Replace with real content",
      file,
    };
  },
};

const placeholderImage: Rule = {
  id: "COM-META-002",
  title: "Placeholder image filename",
  severity: "medium",
  category: "design",
  platform: "both",
  check(ctx) {
    const hasPlaceholder = ctx.files.some((f) =>
      /placeholder\.(jpg|png|jpeg|gif|webp|svg)/i.test(f.name) ||
      /test_image\.(jpg|png|jpeg|gif|webp|svg)/i.test(f.name) ||
      /sample\.(jpg|png|jpeg|gif|webp|svg)/i.test(f.name)
    );
    if (!hasPlaceholder) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "medium",
      category: "design",
      platform: "both",
      message: "Placeholder/test image file detected",
      fix: "Replace with production assets",
    };
  },
};

const todoComments: Rule = {
  id: "COM-META-003",
  title: "TODO/FIXME comments",
  severity: "low",
  category: "performance",
  platform: "both",
  check(ctx) {
    let count = 0;
    let firstFile = "";
    for (const f of ctx.sourceFiles) {
      const matches = f.content.match(/\/\/\s*(?:TODO|FIXME|HACK|XXX):/gi);
      if (matches) {
        count += matches.length;
        if (!firstFile) firstFile = f.relativePath;
      }
    }
    if (count === 0) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: count > 10 ? "medium" : "low",
      category: "performance",
      platform: "both",
      message: `${count} TODO/FIXME comments detected — may indicate unresolved issues`,
      fix: "Review all TODO/FIXME comments before submission",
      file: firstFile,
    };
  },
};

const emptyCatch: Rule = {
  id: "COM-CRASH-001",
  title: "Empty catch block",
  severity: "medium",
  category: "performance",
  platform: "both",
  check(ctx) {
    let count = 0;
    let firstFile = "";
    for (const f of ctx.sourceFiles) {
      const matches = f.content.match(/catch\s*(?:\([^)]*\))?\s*\{[\s\n]*\}/g);
      if (matches) {
        count += matches.length;
        if (!firstFile) firstFile = f.relativePath;
      }
    }
    if (count === 0) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: count > 5 ? "high" : "medium",
      category: "performance",
      platform: "both",
      message: `${count} empty catch block(s) — errors may be silently swallowed`,
      fix: "Log errors or inform the user instead of silently swallowing them",
      file: firstFile,
    };
  },
};

const debugPrint: Rule = {
  id: "COM-META-004",
  title: "Debug print statements",
  severity: "low",
  category: "performance",
  platform: "both",
  check(ctx) {
    let count = 0;
    for (const f of ctx.sourceFiles) {
      let matches: RegExpMatchArray | null = null;
      if (f.language === "swift") {
        matches = f.content.match(/^\s*print\s*\(/gm);
      } else if (f.language === "kotlin" || f.language === "java") {
        matches = f.content.match(/Log\.[vdiwef]\s*\(/gm);
      } else if (f.language === "dart") {
        matches = f.content.match(/^\s*(?:print|debugPrint)\s*\(/gm);
      } else if (f.language === "js" || f.language === "ts") {
        matches = f.content.match(/console\.log\s*\(/gm);
      }
      if (matches) count += matches.length;
    }
    if (count === 0) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "low",
      category: "performance",
      platform: "both",
      message: `${count} debug print/log statements — should be removed in release builds`,
      fix: "Remove or conditionally compile print/log statements for release builds",
    };
  },
};

const sensitiveDataLog: Rule = {
  id: "COM-SEC-003",
  title: "Sensitive data logging risk",
  severity: "high",
  category: "security",
  platform: "both",
  check(ctx) {
    const pattern = /(?:print|Log\.[vdiwef]|console\.log|debugPrint)\s*\(.*(?:password|token|secret|apiKey|credit.?card|ssn|cvv)/i;
    const file = sourceContains(ctx, pattern);
    if (!file) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "security",
      platform: "both",
      message: "Sensitive data (password, token, etc.) detected in log/print statement",
      fix: "Never log sensitive data",
      file,
    };
  },
};

export const commonRules: Rule[] = [
  hardcodedSecret,
  httpUrl,
  loremIpsum,
  placeholderImage,
  todoComments,
  emptyCatch,
  debugPrint,
  sensitiveDataLog,
];
