import type { Rule, ScanContext } from "../types.js";

function sourceContains(ctx: ScanContext, pattern: RegExp, langs?: string[]): string | null {
  for (const f of ctx.sourceFiles) {
    if (langs && !langs.includes(f.language)) continue;
    if (pattern.test(f.content)) return f.relativePath;
  }
  return null;
}

const debugPrintFlutter: Rule = {
  id: "FLT-PERF-001",
  title: "debugPrint/print in production code",
  severity: "low",
  category: "performance",
  platform: "flutter",
  check(ctx) {
    if (!ctx.platforms.includes("flutter")) return null;
    let count = 0;
    let firstFile = "";
    for (const f of ctx.sourceFiles) {
      if (f.language !== "dart") continue;
      const matches = f.content.match(/^\s*(?:print|debugPrint)\s*\(/gm);
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
      platform: "flutter",
      message: `${count} print/debugPrint statements found — should use kDebugMode check`,
      fix: "Wrap prints with: if (kDebugMode) { print(...); } or use a logger package",
      file: firstFile,
    };
  },
};

const kDebugModeCheck: Rule = {
  id: "FLT-SEC-001",
  title: "kDebugMode used for sensitive logic",
  severity: "medium",
  category: "security",
  platform: "flutter",
  check(ctx) {
    if (!ctx.platforms.includes("flutter")) return null;
    const file = sourceContains(
      ctx,
      /if\s*\(\s*kDebugMode\s*\)[\s\S]*?(?:apiKey|secret|password|token|baseUrl)/i,
      ["dart"]
    );
    if (!file) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "medium",
      category: "security",
      platform: "flutter",
      message: "kDebugMode used with sensitive data — may leak if misconfigured",
      fix: "Use --dart-define or .env files for secrets instead of kDebugMode checks",
      file,
    };
  },
};

const flutterMinSdk: Rule = {
  id: "FLT-PERF-002",
  title: "Flutter minSdkVersion too low",
  severity: "medium",
  category: "performance",
  platform: "flutter",
  check(ctx) {
    if (!ctx.platforms.includes("flutter")) return null;
    if (!ctx.buildGradle) return null;
    const match = ctx.buildGradle.match(/minSdk(?:Version)?\s*[=:]?\s*(\d+)/);
    if (!match) {
      // Check for flutter.minSdkVersion
      if (ctx.buildGradle.includes("flutter.minSdkVersion")) return null;
      return null;
    }
    const version = parseInt(match[1]);
    if (version >= 21) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "medium",
      category: "performance",
      platform: "flutter",
      message: `minSdkVersion ${version} is very low — Flutter recommends 21+`,
      fix: "Set minSdkVersion to 21 or higher in android/app/build.gradle",
      file: "android/app/build.gradle",
    };
  },
};

const flutterPermissionHandler: Rule = {
  id: "FLT-PRIV-001",
  title: "Permission plugin without Info.plist entry",
  severity: "high",
  category: "privacy",
  platform: "flutter",
  check(ctx) {
    if (!ctx.platforms.includes("flutter")) return null;
    if (!ctx.pubspec) return null;

    const permissionPlugins = [
      { plugin: "permission_handler", key: "NSCameraUsageDescription", trigger: /camera/ },
      { plugin: "geolocator", key: "NSLocationWhenInUseUsageDescription", trigger: /location/ },
      { plugin: "image_picker", key: "NSCameraUsageDescription", trigger: /camera|photo/ },
      { plugin: "contacts_service", key: "NSContactsUsageDescription", trigger: /contact/ },
    ];

    for (const { plugin, key } of permissionPlugins) {
      if (!ctx.pubspec.includes(plugin)) continue;
      if (!ctx.plistRaw) {
        return {
          ruleId: this.id,
          title: this.title,
          severity: "high",
          category: "privacy",
          platform: "flutter",
          message: `Flutter plugin "${plugin}" is used but Info.plist is missing — iOS will crash`,
          fix: `Add ${key} to ios/Runner/Info.plist`,
          file: "pubspec.yaml",
        };
      }
      if (!ctx.plistRaw.includes(key)) {
        return {
          ruleId: this.id,
          title: this.title,
          severity: "high",
          category: "privacy",
          platform: "flutter",
          message: `Flutter plugin "${plugin}" requires ${key} in Info.plist`,
          fix: `Add <key>${key}</key><string>Describe why</string> to ios/Runner/Info.plist`,
          file: "ios/Runner/Info.plist",
        };
      }
    }
    return null;
  },
};

const flutterObfuscation: Rule = {
  id: "FLT-SEC-002",
  title: "Dart obfuscation not configured",
  severity: "low",
  category: "security",
  platform: "flutter",
  check(ctx) {
    if (!ctx.platforms.includes("flutter")) return null;
    // Check if there's a build script or CI that uses --obfuscate
    const hasObfuscate = sourceContains(ctx, /--obfuscate|obfuscate:\s*true/);
    if (hasObfuscate) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "low",
      category: "security",
      platform: "flutter",
      message: "Dart code obfuscation not detected — release builds may be reverse-engineered",
      fix: "Build with: flutter build apk --obfuscate --split-debug-info=debug-info/",
    };
  },
};

const flutterAndroidExported: Rule = {
  id: "FLT-PERF-003",
  title: "Flutter android:exported missing",
  severity: "high",
  category: "performance",
  platform: "flutter",
  check(ctx) {
    if (!ctx.platforms.includes("flutter")) return null;
    if (!ctx.manifest) return null;
    const hasIntentFilterWithoutExported = /<activity(?![^>]*android:exported)[^>]*>[\s\S]*?<intent-filter/
      .test(ctx.manifest);
    if (!hasIntentFilterWithoutExported) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "performance",
      platform: "flutter",
      message: "Flutter activity missing android:exported — crashes on Android 12+",
      fix: 'Add android:exported="true" to the main activity in AndroidManifest.xml',
      file: "android/app/src/main/AndroidManifest.xml",
    };
  },
};

export const flutterRules: Rule[] = [
  debugPrintFlutter,
  kDebugModeCheck,
  flutterMinSdk,
  flutterPermissionHandler,
  flutterObfuscation,
  flutterAndroidExported,
];
