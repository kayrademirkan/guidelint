import type { Rule, ScanContext, Finding } from "../types.js";

function sourceContains(ctx: ScanContext, pattern: RegExp, langs?: string[]): string | null {
  for (const f of ctx.sourceFiles) {
    if (langs && !langs.includes(f.language)) continue;
    if (pattern.test(f.content)) return f.relativePath;
  }
  return null;
}

// --- AndroidManifest Rules ---

const manifestMissing: Rule = {
  id: "AND-MANIF-001",
  title: "AndroidManifest.xml not found",
  severity: "critical",
  category: "performance",
  platform: "android",
  check(ctx) {
    if (!ctx.platforms.includes("android")) return null;
    if (ctx.manifest) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "critical",
      category: "performance",
      platform: "android",
      message: "AndroidManifest.xml file could not be found",
      fix: "Create app/src/main/AndroidManifest.xml",
    };
  },
};

interface DangerousPermission {
  permission: string;
  severity: "critical" | "high";
  reason: string;
}

const DANGEROUS_PERMISSIONS: DangerousPermission[] = [
  { permission: "READ_SMS", severity: "critical", reason: "READ_SMS — requires special declaration in Play Console" },
  { permission: "READ_CALL_LOG", severity: "critical", reason: "READ_CALL_LOG — requires special declaration in Play Console" },
  { permission: "PROCESS_OUTGOING_CALLS", severity: "critical", reason: "Deprecated and banned" },
  { permission: "BIND_ACCESSIBILITY_SERVICE", severity: "critical", reason: "BIND_ACCESSIBILITY_SERVICE — very strict review" },
  { permission: "ACCESS_BACKGROUND_LOCATION", severity: "high", reason: "ACCESS_BACKGROUND_LOCATION — requires additional approval" },
  { permission: "MANAGE_EXTERNAL_STORAGE", severity: "high", reason: "MANAGE_EXTERNAL_STORAGE — strict review" },
  { permission: "REQUEST_INSTALL_PACKAGES", severity: "high", reason: "REQUEST_INSTALL_PACKAGES — security review required" },
];

function createPermissionRules(): Rule[] {
  return DANGEROUS_PERMISSIONS.map((dp, i) => ({
    id: `AND-MANIF-1${String(i).padStart(2, "0")}`,
    title: `Dangerous permission: ${dp.permission}`,
    severity: dp.severity,
    category: "privacy" as const,
    platform: "android" as const,
    check(ctx: ScanContext): Finding | null {
      if (!ctx.manifest) return null;
      if (!ctx.manifest.includes(`android.permission.${dp.permission}`)) return null;
      return {
        ruleId: this.id,
        title: this.title,
        severity: dp.severity,
        category: "privacy",
        platform: "android",
        message: dp.reason,
        fix: `Verify this permission is essential. If so, fill out the Play Console declaration form`,
        file: "AndroidManifest.xml",
      };
    },
  }));
}

const exportedMissing: Rule = {
  id: "AND-MANIF-200",
  title: "android:exported not specified",
  severity: "high",
  category: "performance",
  platform: "android",
  check(ctx) {
    if (!ctx.manifest) return null;
    // Check for activity/service/receiver without android:exported
    const components = ctx.manifest.match(/<(activity|service|receiver)[^>]*>/g) || [];
    const missing = components.filter(
      (c) => c.includes("intent-filter") || (!c.includes("android:exported"))
    );
    // More accurate: check components with intent-filter that lack exported
    const hasIntentFilterWithoutExported = /<(activity|service|receiver)(?![^>]*android:exported)[^>]*>[\s\S]*?<intent-filter/
      .test(ctx.manifest);
    if (!hasIntentFilterWithoutExported && missing.length === 0) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "performance",
      platform: "android",
      message: "Component missing android:exported — required for Android 12+",
      fix: 'Add android:exported="true" or "false" to all activities, services, and receivers',
      file: "AndroidManifest.xml",
    };
  },
};

const cleartextTraffic: Rule = {
  id: "AND-SEC-001",
  title: "Cleartext HTTP traffic enabled",
  severity: "high",
  category: "security",
  platform: "android",
  check(ctx) {
    if (!ctx.manifest) return null;
    if (!/usesCleartextTraffic\s*=\s*["']true["']/.test(ctx.manifest)) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "security",
      platform: "android",
      message: "usesCleartextTraffic=true — HTTP traffic is allowed",
      fix: "Remove usesCleartextTraffic or manage per-domain via network_security_config.xml",
      file: "AndroidManifest.xml",
    };
  },
};

// --- build.gradle Rules ---

const targetSdkLow: Rule = {
  id: "AND-GRADLE-001",
  title: "targetSdkVersion too low",
  severity: "critical",
  category: "performance",
  platform: "android",
  check(ctx) {
    if (!ctx.buildGradle) return null;
    const match = ctx.buildGradle.match(/targetSdk(?:Version)?\s*[=:]?\s*(\d+)/);
    if (!match) return null;
    const version = parseInt(match[1]);
    if (version >= 35) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: version < 34 ? "critical" : "high",
      category: "performance",
      platform: "android",
      message: `targetSdkVersion ${version} — Google Play requires 35 for new apps`,
      fix: "Upgrade targetSdkVersion to 35",
      file: "app/build.gradle",
    };
  },
};

const compileSdkLow: Rule = {
  id: "AND-GRADLE-002",
  title: "compileSdk too low",
  severity: "high",
  category: "performance",
  platform: "android",
  check(ctx) {
    if (!ctx.buildGradle) return null;
    const match = ctx.buildGradle.match(/compileSdk(?:Version)?\s*[=:]?\s*(\d+)/);
    if (!match) return null;
    const version = parseInt(match[1]);
    if (version >= 34) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "performance",
      platform: "android",
      message: `compileSdk ${version} — should be at least 34`,
      fix: "Upgrade compileSdk to 35",
      file: "app/build.gradle",
    };
  },
};

const releaseDebuggable: Rule = {
  id: "AND-GRADLE-003",
  title: "Release build debuggable",
  severity: "critical",
  category: "security",
  platform: "android",
  check(ctx) {
    if (!ctx.buildGradle) return null;
    if (!/release\s*\{[\s\S]*?debuggable\s*[=:]?\s*true/m.test(ctx.buildGradle)) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "critical",
      category: "security",
      platform: "android",
      message: "debuggable=true in release build — security risk",
      fix: "Set debuggable=false in the release build type",
      file: "app/build.gradle",
    };
  },
};

const minifyDisabled: Rule = {
  id: "AND-GRADLE-004",
  title: "Release minification disabled",
  severity: "medium",
  category: "security",
  platform: "android",
  check(ctx) {
    if (!ctx.buildGradle) return null;
    if (!/release\s*\{[\s\S]*?minifyEnabled\s*[=:]?\s*false/m.test(ctx.buildGradle)) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "medium",
      category: "security",
      platform: "android",
      message: "minifyEnabled=false in release build — code is unprotected",
      fix: "Set minifyEnabled=true and configure ProGuard rules",
      file: "app/build.gradle",
    };
  },
};

// --- Source Code Rules ---

const deviceIdUsage: Rule = {
  id: "AND-SEC-100",
  title: "Banned device identifier usage",
  severity: "critical",
  category: "security",
  platform: "android",
  check(ctx) {
    const file = sourceContains(
      ctx,
      /(?:telephonyManager|tm)\.(?:getDeviceId|getImei|getImsi)|TelephonyManager\.getDeviceId|\.getDeviceId\(\)|getMacAddress|WifiInfo\.getMacAddress/,
      ["kotlin", "java"]
    );
    if (!file) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "critical",
      category: "security",
      platform: "android",
      message: "IMEI/DeviceId/MAC access — banned on Google Play",
      fix: "Use AdvertisingIdClient or Firebase Instance ID instead",
      file,
    };
  },
};

const pendingIntentFlag: Rule = {
  id: "AND-CRASH-001",
  title: "PendingIntent flag missing",
  severity: "high",
  category: "performance",
  platform: "android",
  check(ctx) {
    const file = sourceContains(
      ctx,
      /PendingIntent\.(?:getActivity|getService|getBroadcast)\([^)]+,\s*0\s*\)/,
      ["kotlin", "java"]
    );
    if (!file) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "performance",
      platform: "android",
      message: "PendingIntent missing FLAG_IMMUTABLE/FLAG_MUTABLE — crashes on Android 12+",
      fix: "Add PendingIntent.FLAG_IMMUTABLE or FLAG_MUTABLE",
      file,
    };
  },
};

const privacyPolicyMissing: Rule = {
  id: "AND-PRIV-001",
  title: "Privacy policy reference not found",
  severity: "medium",
  category: "privacy",
  platform: "android",
  check(ctx) {
    if (!ctx.platforms.includes("android")) return null;
    const hasRef = sourceContains(ctx, /privacy.?policy|privacypolicy|datenschutz/i);
    if (hasRef) return null;
    // Also check manifest/strings
    if (ctx.manifest?.includes("privacy")) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "medium",
      category: "privacy",
      platform: "android",
      message: "No privacy policy URL or reference found — required on Google Play",
      fix: "Add privacy policy URL to the app and Play Console listing",
    };
  },
};

const accountDeleteAndroid: Rule = {
  id: "AND-PRIV-002",
  title: "Account deletion not found",
  severity: "high",
  category: "legal",
  platform: "android",
  check(ctx) {
    const hasAuth = sourceContains(
      ctx,
      /signIn|signUp|login|register|createUser|FirebaseAuth|GoogleSignIn/,
      ["kotlin", "java"]
    );
    if (!hasAuth) return null;
    const hasDelete = sourceContains(ctx, /deleteAccount|deleteUser|removeUser|delete.*account|account.*delet/i, ["kotlin", "java"]);
    if (hasDelete) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "legal",
      platform: "android",
      message: "User authentication detected but no account deletion feature found",
      fix: "Add in-app account deletion flow — required on Google Play",
    };
  },
};

const hardcodedSigningPassword: Rule = {
  id: "AND-SEC-200",
  title: "Hardcoded signing password in build.gradle",
  severity: "critical",
  category: "security",
  platform: "android",
  check(ctx) {
    if (!ctx.buildGradle) return null;
    if (!/signingConfigs[\s\S]*?(storePassword|keyPassword)\s*[=:]\s*["'][^"']+["']/.test(ctx.buildGradle)) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "critical",
      category: "security",
      platform: "android",
      message: "Signing password hardcoded in build.gradle — security risk",
      fix: "Move passwords to gradle.properties or environment variables",
      file: "app/build.gradle",
    };
  },
};

const missingArm64: Rule = {
  id: "AND-PERF-001",
  title: "Missing arm64-v8a ABI support",
  severity: "high",
  category: "performance",
  platform: "android",
  check(ctx) {
    if (!ctx.buildGradle) return null;
    const abiMatch = ctx.buildGradle.match(/abiFilters\s+(.+)/);
    if (!abiMatch) return null;
    if (abiMatch[1].includes("arm64-v8a")) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "performance",
      platform: "android",
      message: "arm64-v8a not in abiFilters — most modern devices require it",
      fix: 'Add "arm64-v8a" to ndk.abiFilters in build.gradle',
      file: "app/build.gradle",
    };
  },
};

const asyncTaskUsage: Rule = {
  id: "AND-PERF-002",
  title: "Deprecated AsyncTask usage",
  severity: "medium",
  category: "performance",
  platform: "android",
  check(ctx) {
    const file = sourceContains(ctx, /AsyncTask/, ["kotlin", "java"]);
    if (!file) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "medium",
      category: "performance",
      platform: "android",
      message: "AsyncTask is deprecated since API 30 — use Coroutines or WorkManager",
      fix: "Migrate AsyncTask to Kotlin Coroutines or WorkManager",
      file,
    };
  },
};

export const androidRules: Rule[] = [
  manifestMissing,
  exportedMissing,
  cleartextTraffic,
  targetSdkLow,
  compileSdkLow,
  releaseDebuggable,
  minifyDisabled,
  deviceIdUsage,
  pendingIntentFlag,
  privacyPolicyMissing,
  accountDeleteAndroid,
  hardcodedSigningPassword,
  missingArm64,
  asyncTaskUsage,
  ...createPermissionRules(),
];
