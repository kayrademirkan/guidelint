import { plistHasKey, plistGetBool, plistGetString } from "../parsers/plist.js";
import type { Rule, ScanContext, Finding } from "../types.js";

// Helper: check if source code uses a pattern
function sourceContains(ctx: ScanContext, pattern: RegExp, langs?: string[]): string | null {
  for (const f of ctx.sourceFiles) {
    if (langs && !langs.includes(f.language)) continue;
    if (pattern.test(f.content)) return f.relativePath;
  }
  return null;
}

// --- Privacy Usage Description Rules ---
interface PrivacyKeyRule {
  id: string;
  key: string;
  triggers: RegExp;
  description: string;
  guideline: string;
}

const PRIVACY_KEYS: PrivacyKeyRule[] = [
  {
    id: "IOS-PRIV-001",
    key: "NSCameraUsageDescription",
    triggers: /AVCaptureSession|UIImagePickerController|AVFoundation|\.camera\b/,
    description: "Camera usage detected but NSCameraUsageDescription is missing",
    guideline: "Guideline 5.1.1",
  },
  {
    id: "IOS-PRIV-002",
    key: "NSMicrophoneUsageDescription",
    triggers: /AVAudioSession|AVAudioRecorder|SFSpeechRecognizer|\.microphone\b/,
    description: "Microphone usage detected but NSMicrophoneUsageDescription is missing",
    guideline: "Guideline 5.1.1",
  },
  {
    id: "IOS-PRIV-003",
    key: "NSLocationWhenInUseUsageDescription",
    triggers: /CLLocationManager|requestWhenInUseAuthorization|CoreLocation|locationManager/,
    description: "Location services used but NSLocationWhenInUseUsageDescription is missing",
    guideline: "Guideline 5.1.1",
  },
  {
    id: "IOS-PRIV-004",
    key: "NSPhotoLibraryUsageDescription",
    triggers: /PHPhotoLibrary|UIImagePickerController\.sourceType|PHAsset|Photos/,
    description: "Photo library access detected but NSPhotoLibraryUsageDescription is missing",
    guideline: "Guideline 5.1.1",
  },
  {
    id: "IOS-PRIV-005",
    key: "NSContactsUsageDescription",
    triggers: /CNContactStore|CNContact\b|Contacts/,
    description: "Contacts access detected but NSContactsUsageDescription is missing",
    guideline: "Guideline 5.1.1",
  },
  {
    id: "IOS-PRIV-006",
    key: "NSBluetoothAlwaysUsageDescription",
    triggers: /CBCentralManager|CBPeripheralManager|CoreBluetooth/,
    description: "Bluetooth usage detected but NSBluetoothAlwaysUsageDescription is missing",
    guideline: "Guideline 5.1.1",
  },
  {
    id: "IOS-PRIV-007",
    key: "NSFaceIDUsageDescription",
    triggers: /LAContext|biometricType|evaluatePolicy|LocalAuthentication/,
    description: "Biometric authentication detected but NSFaceIDUsageDescription is missing",
    guideline: "Guideline 5.1.1",
  },
  {
    id: "IOS-PRIV-008",
    key: "NSCalendarsUsageDescription",
    triggers: /EKEventStore|EventKit/,
    description: "Calendar access detected but NSCalendarsUsageDescription is missing",
    guideline: "Guideline 5.1.1",
  },
  {
    id: "IOS-PRIV-009",
    key: "NSMotionUsageDescription",
    triggers: /CMMotionManager|CoreMotion/,
    description: "Motion sensor access detected but NSMotionUsageDescription is missing",
    guideline: "Guideline 5.1.1",
  },
  {
    id: "IOS-PRIV-010",
    key: "NSSpeechRecognitionUsageDescription",
    triggers: /SFSpeechRecognizer|Speech/,
    description: "Speech recognition usage detected but NSSpeechRecognitionUsageDescription is missing",
    guideline: "Guideline 5.1.1",
  },
];

function createPrivacyKeyRules(): Rule[] {
  return PRIVACY_KEYS.map((pk) => ({
    id: pk.id,
    title: `Missing ${pk.key}`,
    severity: "critical" as const,
    category: "privacy" as const,
    platform: "ios" as const,
    guideline: pk.guideline,
    check(ctx: ScanContext): Finding | null {
      if (!ctx.plistRaw) return null;
      const file = sourceContains(ctx, pk.triggers, ["swift", "objc"]);
      if (!file) return null;
      if (plistHasKey(ctx.plistRaw, pk.key)) return null;
      return {
        ruleId: pk.id,
        title: `Missing ${pk.key}`,
        severity: "critical",
        category: "privacy",
        platform: "ios",
        message: pk.description,
        fix: `Add <key>${pk.key}</key><string>Descriptive text</string> to Info.plist`,
        file: "Info.plist",
        guideline: pk.guideline,
      };
    },
  }));
}

// --- Standalone iOS Rules ---

const plistMissing: Rule = {
  id: "IOS-PLIST-001",
  title: "Info.plist not found",
  severity: "critical",
  category: "performance",
  platform: "ios",
  check(ctx) {
    if (!ctx.platforms.includes("ios")) return null;
    if (ctx.plistRaw) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "critical",
      category: "performance",
      platform: "ios",
      message: "Info.plist file not found",
      fix: "Create it from Xcode target > Info tab",
    };
  },
};

const privacyManifestMissing: Rule = {
  id: "IOS-PRIV-100",
  title: "PrivacyInfo.xcprivacy not found",
  severity: "critical",
  category: "privacy",
  platform: "ios",
  guideline: "Required since May 2024",
  check(ctx) {
    if (!ctx.platforms.includes("ios")) return null;
    const hasFile = ctx.files.some((f) => f.name === "PrivacyInfo.xcprivacy");
    if (hasFile) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "critical",
      category: "privacy",
      platform: "ios",
      message: "PrivacyInfo.xcprivacy file not found. Required since May 2024.",
      fix: "Create via Xcode > New File > iOS > Resource > App Privacy",
      docsUrl: "https://developer.apple.com/documentation/bundleresources/privacy-manifest-files",
    };
  },
};

const privacyManifestKeys: Rule = {
  id: "IOS-PRIV-101",
  title: "PrivacyInfo.xcprivacy missing required keys",
  severity: "critical",
  category: "privacy",
  platform: "ios",
  check(ctx) {
    if (!ctx.privacyManifestRaw) return null;
    const required = [
      "NSPrivacyTracking",
      "NSPrivacyTrackingDomains",
      "NSPrivacyCollectedDataTypes",
      "NSPrivacyAccessedAPITypes",
    ];
    const missing = required.filter((k) => !ctx.privacyManifestRaw!.includes(k));
    if (missing.length === 0) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "critical",
      category: "privacy",
      platform: "ios",
      message: `Missing keys in PrivacyInfo.xcprivacy: ${missing.join(", ")}`,
      fix: "Add all required keys to PrivacyInfo.xcprivacy",
      file: "PrivacyInfo.xcprivacy",
    };
  },
};

const attMissing: Rule = {
  id: "IOS-PRIV-200",
  title: "ATT framework missing",
  severity: "critical",
  category: "privacy",
  platform: "ios",
  guideline: "Guideline 5.1.2",
  check(ctx) {
    // Check if tracking is done
    const hasTracking = sourceContains(ctx, /IDFA|advertisingIdentifier|trackingEnabled/, ["swift", "objc"]);
    if (!hasTracking) return null;
    const hasATT = sourceContains(ctx, /AppTrackingTransparency|requestTrackingAuthorization/, ["swift", "objc"]);
    if (hasATT) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "critical",
      category: "privacy",
      platform: "ios",
      message: "IDFA/tracking usage detected but AppTrackingTransparency framework is missing",
      fix: "Import AppTrackingTransparency and call ATTrackingManager.requestTrackingAuthorization",
      guideline: "Guideline 5.1.2",
    };
  },
};

const attUsageDescription: Rule = {
  id: "IOS-PRIV-201",
  title: "Missing NSUserTrackingUsageDescription",
  severity: "critical",
  category: "privacy",
  platform: "ios",
  check(ctx) {
    if (!ctx.plistRaw) return null;
    const hasATT = sourceContains(ctx, /AppTrackingTransparency|requestTrackingAuthorization/, ["swift", "objc"]);
    if (!hasATT) return null;
    if (plistHasKey(ctx.plistRaw, "NSUserTrackingUsageDescription")) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "critical",
      category: "privacy",
      platform: "ios",
      message: "ATT framework is used but NSUserTrackingUsageDescription is missing",
      fix: "Add NSUserTrackingUsageDescription to Info.plist",
      file: "Info.plist",
    };
  },
};

const atsOpen: Rule = {
  id: "IOS-SEC-001",
  title: "App Transport Security fully disabled",
  severity: "high",
  category: "security",
  platform: "ios",
  check(ctx) {
    if (!ctx.plistRaw) return null;
    if (!plistGetBool(ctx.plistRaw, "NSAllowsArbitraryLoads")) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "security",
      platform: "ios",
      message: "NSAllowsArbitraryLoads=true — all HTTP traffic is allowed",
      fix: "Remove NSAllowsArbitraryLoads, use NSExceptionDomains for specific domains",
      file: "Info.plist",
    };
  },
};

const bundleIdTest: Rule = {
  id: "IOS-META-001",
  title: "Bundle ID contains test/example domain",
  severity: "high",
  category: "design",
  platform: "ios",
  check(ctx) {
    if (!ctx.plistRaw) return null;
    const bundleId = plistGetString(ctx.plistRaw, "CFBundleIdentifier");
    if (!bundleId) return null;
    const bad = /^com\.(example|test|demo|yourcompany)|\.debug$|\.test$|org\.reactjs\.native\.example/i;
    if (!bad.test(bundleId)) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "design",
      platform: "ios",
      message: `Bundle ID "${bundleId}" contains a test/example domain`,
      fix: "Replace with your real domain (com.yourcompany.appname)",
      file: "Info.plist",
    };
  },
};

const iapRestoreMissing: Rule = {
  id: "IOS-IAP-001",
  title: "StoreKit found but no Restore Purchases",
  severity: "high",
  category: "business",
  platform: "ios",
  guideline: "Guideline 3.1.1",
  check(ctx) {
    const hasStoreKit = sourceContains(ctx, /import StoreKit/, ["swift"]);
    if (!hasStoreKit) return null;
    const hasRestore = sourceContains(ctx, /restoreCompletedTransactions|Transaction\.all|\.unfinished|AppStore\.sync/, ["swift"]);
    if (hasRestore) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "business",
      platform: "ios",
      message: "StoreKit is imported but no Restore Purchases implementation found",
      fix: "Add a Restore Purchases button and SKPaymentQueue.restoreCompletedTransactions() or StoreKit 2 Transaction.all",
      guideline: "Guideline 3.1.1",
    };
  },
};

const accountDeleteMissing: Rule = {
  id: "IOS-PRIV-300",
  title: "Account deletion not found",
  severity: "high",
  category: "legal",
  platform: "ios",
  guideline: "Required since June 2022",
  check(ctx) {
    // Check if app has user accounts
    const hasAuth = sourceContains(ctx, /signIn|signUp|login|register|createUser|Auth\(\)|FirebaseAuth|ASAuthorizationController/, ["swift", "objc"]);
    if (!hasAuth) return null;
    const hasDelete = sourceContains(ctx, /deleteAccount|deleteUser|removeUser|delete.*account|account.*delet/i, ["swift", "objc"]);
    if (hasDelete) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "legal",
      platform: "ios",
      message: "User authentication detected but no account deletion feature found",
      fix: "Add in-app account deletion flow (email-only is not sufficient)",
      guideline: "Required since June 2022",
    };
  },
};

const forceUnwrap: Rule = {
  id: "IOS-CRASH-001",
  title: "Force unwrap (!) usage",
  severity: "medium",
  category: "performance",
  platform: "ios",
  check(ctx) {
    let count = 0;
    let firstFile = "";
    for (const f of ctx.sourceFiles) {
      if (f.language !== "swift") continue;
      // Match force unwrap but exclude common false positives
      const matches = f.content.match(/\w\!\./g);
      if (matches) {
        count += matches.length;
        if (!firstFile) firstFile = f.relativePath;
      }
    }
    if (count === 0) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: count > 10 ? "high" : "medium",
      category: "performance",
      platform: "ios",
      message: `${count} force unwrap (!) detected — crash risk`,
      fix: "Use guard let / if let or nil coalescing (??)",
      file: firstFile,
    };
  },
};

const fatalError: Rule = {
  id: "IOS-CRASH-002",
  title: "fatalError() in production code",
  severity: "high",
  category: "performance",
  platform: "ios",
  check(ctx) {
    const file = sourceContains(ctx, /fatalError\s*\(/, ["swift"]);
    if (!file) return null;
    return {
      ruleId: this.id,
      title: this.title,
      severity: "high",
      category: "performance",
      platform: "ios",
      message: "fatalError() call will crash in production",
      fix: "Replace fatalError() with proper error handling (throw, assertionFailure, etc.)",
      file,
    };
  },
};

const usageDescriptionQuality: Rule = {
  id: "IOS-PRIV-400",
  title: "Low quality usage description",
  severity: "medium",
  category: "privacy",
  platform: "ios",
  check(ctx) {
    if (!ctx.plistRaw) return null;
    const badPatterns = [
      /^we need/i, /^app needs/i, /^required/i, /^needed/i,
      /^permission/i, /^access/i, /^null$/i, /^undefined$/i,
      /^todo/i, /^test/i, /^placeholder/i,
    ];
    const usageKeys = ctx.plistRaw.match(/<key>(NS\w+UsageDescription)<\/key>\s*<string>(.*?)<\/string>/gs);
    if (!usageKeys) return null;

    for (const match of usageKeys) {
      const valueMatch = match.match(/<string>(.*?)<\/string>/);
      if (!valueMatch) continue;
      const value = valueMatch[1];
      if (badPatterns.some((p) => p.test(value)) || value.length < 10) {
        return {
          ruleId: this.id,
          title: this.title,
          severity: "medium",
          category: "privacy",
          platform: "ios",
          message: `Usage description too short or generic: "${value}"`,
          fix: "Write a specific, meaningful description. E.g. 'We access your camera to let you take a profile photo'",
          file: "Info.plist",
        };
      }
    }
    return null;
  },
};

export const iosRules: Rule[] = [
  plistMissing,
  privacyManifestMissing,
  privacyManifestKeys,
  attMissing,
  attUsageDescription,
  atsOpen,
  bundleIdTest,
  iapRestoreMissing,
  accountDeleteMissing,
  forceUnwrap,
  fatalError,
  usageDescriptionQuality,
  ...createPrivacyKeyRules(),
];
