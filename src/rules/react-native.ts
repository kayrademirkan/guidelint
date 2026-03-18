import type { Rule, ScanContext } from "../types.js";

function sourceContains(ctx: ScanContext, pattern: RegExp, langs?: string[]): string | null {
  for (const f of ctx.sourceFiles) {
    if (langs && !langs.includes(f.language)) continue;
    if (pattern.test(f.content)) return f.relativePath;
  }
  return null;
}

const devFlagLeak: Rule = {
  id: "RN-SEC-001",
  title: "__DEV__ flag may leak to production",
  severity: "medium",
  category: "security",
  platform: "react-native",
  check(ctx) {
    if (!ctx.platforms.includes("react-native")) return null;
    // Check if __DEV__ is used for security-sensitive logic
    const file = sourceContains(
      ctx,
      /if\s*\(\s*__DEV__\s*\)\s*\{[\s\S]*?(?:apiKey|secret|password|token|baseUrl)/i,
      ["js", "ts"]
    );
    if (!file) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "medium",
      category: "security",
      platform: "react-native",
      message: "__DEV__ flag used with sensitive data — may leak if misconfigured",
      fix: "Use environment variables (.env) instead of __DEV__ for secrets",
      file,
    };
  },
};

const consoleLogProduction: Rule = {
  id: "RN-PERF-001",
  title: "console.log in production code",
  severity: "low",
  category: "performance",
  platform: "react-native",
  check(ctx) {
    if (!ctx.platforms.includes("react-native")) return null;
    let count = 0;
    let firstFile = "";
    for (const f of ctx.sourceFiles) {
      if (f.language !== "js" && f.language !== "ts") continue;
      const matches = f.content.match(/console\.(log|warn|error|debug|info)\s*\(/g);
      if (matches) {
        count += matches.length;
        if (!firstFile) firstFile = f.relativePath;
      }
    }
    if (count === 0) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: count > 20 ? "medium" : "low",
      category: "performance",
      platform: "react-native",
      message: `${count} console.log/warn/error statements — slows down production builds`,
      fix: "Use babel-plugin-transform-remove-console or wrap in __DEV__ checks",
      file: firstFile,
    };
  },
};

const rnBridgeDeprecation: Rule = {
  id: "RN-PERF-002",
  title: "Deprecated React Native bridge usage",
  severity: "medium",
  category: "performance",
  platform: "react-native",
  check(ctx) {
    if (!ctx.platforms.includes("react-native")) return null;
    const file = sourceContains(
      ctx,
      /NativeModules\.|requireNativeComponent/,
      ["js", "ts"]
    );
    if (!file) return null;
    // Only flag if RN version supports new arch
    const pkg = ctx.packageJson as Record<string, any> | undefined;
    const rnVersion = pkg?.dependencies?.["react-native"] || "";
    if (rnVersion && !rnVersion.match(/0\.(7[2-9]|[89]\d|\d{3})/)) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "medium",
      category: "performance",
      platform: "react-native",
      message: "Legacy NativeModules bridge detected — consider migrating to TurboModules",
      fix: "Migrate to TurboModules/Fabric for better performance on New Architecture",
      file,
    };
  },
};

const rnInlineRequire: Rule = {
  id: "RN-PERF-003",
  title: "Large import at top level",
  severity: "low",
  category: "performance",
  platform: "react-native",
  check(ctx) {
    if (!ctx.platforms.includes("react-native")) return null;
    // Check metro.config for inlineRequires
    const metroConfig = ctx.sourceFiles.find((f) =>
      f.relativePath.startsWith("metro.config")
    );
    if (!metroConfig) return null;
    if (metroConfig.content.includes("inlineRequires")) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "low",
      category: "performance",
      platform: "react-native",
      message: "metro.config missing inlineRequires — app startup may be slow",
      fix: "Add transformer: { getTransformOptions: () => ({ transform: { inlineRequires: true } }) } to metro.config.js",
      file: metroConfig.relativePath,
    };
  },
};

const rnHermes: Rule = {
  id: "RN-PERF-004",
  title: "Hermes engine not enabled",
  severity: "medium",
  category: "performance",
  platform: "react-native",
  check(ctx) {
    if (!ctx.platforms.includes("react-native")) return null;
    if (!ctx.buildGradle) return null;
    // Check if hermesEnabled is false or missing
    if (/hermesEnabled\s*[=:]\s*true/.test(ctx.buildGradle)) return null;
    if (/enableHermes\s*:\s*true/.test(ctx.buildGradle)) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "medium",
      category: "performance",
      platform: "react-native",
      message: "Hermes engine not enabled — significantly impacts performance and app size",
      fix: "Set hermesEnabled=true in android/app/build.gradle (default since RN 0.70)",
      file: "android/app/build.gradle",
    };
  },
};

const rnFlipperProduction: Rule = {
  id: "RN-SEC-002",
  title: "Flipper debug tool in production",
  severity: "medium",
  category: "security",
  platform: "react-native",
  check(ctx) {
    if (!ctx.platforms.includes("react-native")) return null;
    const pkg = ctx.packageJson as Record<string, any> | undefined;
    const deps = { ...pkg?.dependencies, ...pkg?.devDependencies };
    if (!deps?.["react-native-flipper"]) return null;
    // Check if it's in dependencies (not just devDependencies)
    if (pkg?.dependencies?.["react-native-flipper"]) {
      return {
        ruleId: this.id,
        title: this.title,
        severity: "medium",
        category: "security",
        platform: "react-native",
        message: "react-native-flipper is in dependencies (not devDependencies) — ships to production",
        fix: "Move react-native-flipper to devDependencies",
        file: "package.json",
      };
    }
    return null;
  },
};

const rnKeyboardAvoid: Rule = {
  id: "RN-UX-001",
  title: "KeyboardAvoidingView missing",
  severity: "low",
  category: "design",
  platform: "react-native",
  check(ctx) {
    if (!ctx.platforms.includes("react-native")) return null;
    const hasTextInput = sourceContains(ctx, /TextInput/i, ["js", "ts"]);
    if (!hasTextInput) return null;
    const hasKeyboardAvoiding = sourceContains(ctx, /KeyboardAvoidingView/, ["js", "ts"]);
    if (hasKeyboardAvoiding) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "low",
      category: "design",
      platform: "react-native",
      message: "TextInput used but no KeyboardAvoidingView found — keyboard may cover input fields",
      fix: "Wrap forms with KeyboardAvoidingView for better UX on iOS",
      file: hasTextInput,
    };
  },
};

export const reactNativeRules: Rule[] = [
  devFlagLeak,
  consoleLogProduction,
  rnBridgeDeprecation,
  rnInlineRequire,
  rnHermes,
  rnFlipperProduction,
  rnKeyboardAvoid,
];
