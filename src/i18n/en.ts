import type { Translations } from "./index.js";

export const en: Translations = {
  ui: {
    scanTitle: "guidelint",
    platform: "Platform",
    filesScanned: "files scanned",
    rulesChecked: "rules checked",
    noIssues: "No issues found — looking great!",
    score: "SCORE",
    verdictReady: "READY — Safe to submit",
    verdictRisky: "RISKY — Review issues before submitting",
    verdictNotReady: "NOT READY — Critical issues must be fixed",
    fix: "Fix",
    file: "File",
    severity: "Severity",
    category: "Category",
    problem: "Problem",
    guideline: "Guideline",
    docs: "Docs",
    reportTitle: "Guidelint — App Store / Google Play Pre-Submission Report",
    projectInfo: "Project Info",
    path: "Path",
    scanDate: "Scan date",
    findings: "Findings",
    findingsDescription:
      "Below are the issues found. Each includes the rule ID, severity, what's wrong, and how to fix it.",
    aiFix: "AI Fix Instructions",
    aiFixStep1: "Step 1: Fix Critical Issues (must fix before submission)",
    aiFixStep2: "Step 2: Fix High Severity Issues (strongly recommended)",
    aiFixStep3: "Step 3: Review Medium/Low Issues (nice to have)",
    readyForSubmission: "Ready for submission",
    riskyReview: "Risky — review issues before submitting",
    notReadyCritical: "Not ready — critical issues must be fixed",
    noIssuesFound:
      "No issues found. The project looks ready for submission.",
  },
  rules: {
    // ── iOS Rules ──
    "IOS-PLIST-001": {
      title: "Info.plist not found",
      message: "Info.plist file could not be found",
      fix: "Create Info.plist via Xcode > Target > Info tab",
    },
    "IOS-PRIV-100": {
      title: "PrivacyInfo.xcprivacy not found",
      message:
        "PrivacyInfo.xcprivacy file is missing. Required since May 2024.",
      fix: "Create via Xcode > New File > iOS > Resource > App Privacy",
    },
    "IOS-PRIV-101": {
      title: "PrivacyInfo.xcprivacy missing required keys",
      message: "PrivacyInfo.xcprivacy is missing required keys: {keys}",
      fix: "Add all required keys to PrivacyInfo.xcprivacy",
    },
    "IOS-PRIV-001": {
      title: "NSCameraUsageDescription missing",
      message:
        "Camera usage detected but NSCameraUsageDescription is not in Info.plist",
      fix: 'Add <key>NSCameraUsageDescription</key><string>Describe why you need camera</string> to Info.plist',
    },
    "IOS-PRIV-002": {
      title: "NSMicrophoneUsageDescription missing",
      message:
        "Microphone usage detected but NSMicrophoneUsageDescription is not in Info.plist",
      fix: 'Add <key>NSMicrophoneUsageDescription</key><string>Describe why you need microphone</string> to Info.plist',
    },
    "IOS-PRIV-003": {
      title: "NSLocationWhenInUseUsageDescription missing",
      message:
        "Location usage detected but NSLocationWhenInUseUsageDescription is not in Info.plist",
      fix: 'Add <key>NSLocationWhenInUseUsageDescription</key><string>Describe why you need location</string> to Info.plist',
    },
    "IOS-PRIV-004": {
      title: "NSPhotoLibraryUsageDescription missing",
      message:
        "Photo library access detected but NSPhotoLibraryUsageDescription is not in Info.plist",
      fix: 'Add <key>NSPhotoLibraryUsageDescription</key><string>Describe why you need photos</string> to Info.plist',
    },
    "IOS-PRIV-005": {
      title: "NSContactsUsageDescription missing",
      message:
        "Contacts access detected but NSContactsUsageDescription is not in Info.plist",
      fix: 'Add <key>NSContactsUsageDescription</key><string>Describe why you need contacts</string> to Info.plist',
    },
    "IOS-PRIV-006": {
      title: "NSBluetoothAlwaysUsageDescription missing",
      message:
        "Bluetooth usage detected but NSBluetoothAlwaysUsageDescription is not in Info.plist",
      fix: 'Add <key>NSBluetoothAlwaysUsageDescription</key><string>Describe why you need Bluetooth</string> to Info.plist',
    },
    "IOS-PRIV-007": {
      title: "NSFaceIDUsageDescription missing",
      message:
        "Biometric auth detected but NSFaceIDUsageDescription is not in Info.plist",
      fix: 'Add <key>NSFaceIDUsageDescription</key><string>Describe why you need Face ID</string> to Info.plist',
    },
    "IOS-PRIV-008": {
      title: "NSCalendarsUsageDescription missing",
      message:
        "Calendar access detected but NSCalendarsUsageDescription is not in Info.plist",
      fix: 'Add <key>NSCalendarsUsageDescription</key><string>Describe why you need calendar</string> to Info.plist',
    },
    "IOS-PRIV-009": {
      title: "NSMotionUsageDescription missing",
      message:
        "Motion sensor access detected but NSMotionUsageDescription is not in Info.plist",
      fix: 'Add <key>NSMotionUsageDescription</key><string>Describe why you need motion data</string> to Info.plist',
    },
    "IOS-PRIV-010": {
      title: "NSSpeechRecognitionUsageDescription missing",
      message:
        "Speech recognition detected but NSSpeechRecognitionUsageDescription is not in Info.plist",
      fix: 'Add <key>NSSpeechRecognitionUsageDescription</key><string>Describe why you need speech recognition</string> to Info.plist',
    },
    "IOS-PRIV-200": {
      title: "AppTrackingTransparency framework missing",
      message:
        "IDFA/tracking usage detected but AppTrackingTransparency framework is not imported",
      fix: "Import AppTrackingTransparency and call ATTrackingManager.requestTrackingAuthorization",
    },
    "IOS-PRIV-201": {
      title: "NSUserTrackingUsageDescription missing",
      message:
        "ATT framework is used but NSUserTrackingUsageDescription is not in Info.plist",
      fix: "Add NSUserTrackingUsageDescription to Info.plist",
    },
    "IOS-PRIV-300": {
      title: "Account deletion not found",
      message:
        "User authentication detected but no account deletion feature found",
      fix: "Add in-app account deletion flow (email-only is not sufficient)",
    },
    "IOS-PRIV-400": {
      title: "Low quality usage description",
      message: 'Usage description is too short or generic: "{value}"',
      fix: "Write a specific, meaningful description. E.g. 'We access your camera to let you take a profile photo'",
    },
    "IOS-SEC-001": {
      title: "App Transport Security fully disabled",
      message:
        "NSAllowsArbitraryLoads=true — all HTTP traffic is allowed",
      fix: "Remove NSAllowsArbitraryLoads, use NSExceptionDomains for specific domains",
    },
    "IOS-META-001": {
      title: "Bundle ID contains test/example domain",
      message: 'Bundle ID "{bundleId}" contains a test/example domain',
      fix: "Replace with your real domain (com.yourcompany.appname)",
    },
    "IOS-IAP-001": {
      title: "StoreKit imported, Restore Purchases missing",
      message:
        "StoreKit is imported but no Restore Purchases implementation found",
      fix: "Add a Restore Purchases button and call SKPaymentQueue.restoreCompletedTransactions() or StoreKit 2 Transaction.all",
    },
    "IOS-CRASH-001": {
      title: "Force unwrap (!) usage",
      message: "{count} force unwrap (!) instances detected — crash risk",
      fix: "Use guard let / if let or nil coalescing (??) instead",
    },
    "IOS-CRASH-002": {
      title: "fatalError() in production code",
      message: "fatalError() call will crash in production",
      fix: "Replace fatalError() with proper error handling (throw, assertionFailure, etc.)",
    },

    // ── Android Rules ──
    "AND-MANIF-001": {
      title: "AndroidManifest.xml not found",
      message: "AndroidManifest.xml file could not be found",
      fix: "Create app/src/main/AndroidManifest.xml",
    },
    "AND-MANIF-100": {
      title: "Dangerous permission: READ_SMS",
      message:
        "READ_SMS — requires special declaration in Play Console",
      fix: "Verify this permission is essential. If so, fill out the Play Console declaration form",
    },
    "AND-MANIF-101": {
      title: "Dangerous permission: READ_CALL_LOG",
      message:
        "READ_CALL_LOG — requires special declaration in Play Console",
      fix: "Verify this permission is essential. If so, fill out the Play Console declaration form",
    },
    "AND-MANIF-102": {
      title: "Dangerous permission: PROCESS_OUTGOING_CALLS",
      message: "PROCESS_OUTGOING_CALLS — deprecated and banned",
      fix: "Remove this permission entirely",
    },
    "AND-MANIF-103": {
      title: "Dangerous permission: BIND_ACCESSIBILITY_SERVICE",
      message:
        "BIND_ACCESSIBILITY_SERVICE — subject to very strict review",
      fix: "Verify this permission is essential. If so, fill out the Play Console declaration form",
    },
    "AND-MANIF-104": {
      title: "Dangerous permission: ACCESS_BACKGROUND_LOCATION",
      message:
        "ACCESS_BACKGROUND_LOCATION — requires additional approval",
      fix: "Verify this permission is essential. If so, fill out the Play Console declaration form",
    },
    "AND-MANIF-105": {
      title: "Dangerous permission: MANAGE_EXTERNAL_STORAGE",
      message:
        "MANAGE_EXTERNAL_STORAGE — subject to strict review",
      fix: "Verify this permission is essential. If so, fill out the Play Console declaration form",
    },
    "AND-MANIF-106": {
      title: "Dangerous permission: REQUEST_INSTALL_PACKAGES",
      message:
        "REQUEST_INSTALL_PACKAGES — requires security review",
      fix: "Verify this permission is essential. If so, fill out the Play Console declaration form",
    },
    "AND-MANIF-200": {
      title: "android:exported not specified",
      message:
        "Component missing android:exported attribute — required for Android 12+",
      fix: 'Add android:exported="true" or "false" to all activities, services, and receivers',
    },
    "AND-SEC-001": {
      title: "Cleartext HTTP traffic enabled",
      message: "usesCleartextTraffic=true — HTTP traffic is allowed",
      fix: "Remove usesCleartextTraffic or manage per-domain via network_security_config.xml",
    },
    "AND-SEC-100": {
      title: "Banned device identifier usage",
      message:
        "IMEI/DeviceId/MAC access — banned on Google Play",
      fix: "Use AdvertisingIdClient or Firebase Instance ID instead",
    },
    "AND-GRADLE-001": {
      title: "targetSdkVersion too low",
      message:
        "targetSdkVersion {version} — Google Play requires 35 for new apps",
      fix: "Upgrade targetSdkVersion to 35",
    },
    "AND-GRADLE-002": {
      title: "compileSdk too low",
      message: "compileSdk {version} — should be at least 34",
      fix: "Upgrade compileSdk to 35",
    },
    "AND-GRADLE-003": {
      title: "Release build is debuggable",
      message: "debuggable=true in release build — security risk",
      fix: "Set debuggable=false in release build type",
    },
    "AND-GRADLE-004": {
      title: "Release minification disabled",
      message:
        "minifyEnabled=false in release build — code is unprotected",
      fix: "Set minifyEnabled=true and configure ProGuard rules",
    },
    "AND-CRASH-001": {
      title: "PendingIntent missing flag",
      message:
        "PendingIntent missing FLAG_IMMUTABLE/FLAG_MUTABLE — crashes on Android 12+",
      fix: "Add PendingIntent.FLAG_IMMUTABLE or FLAG_MUTABLE",
    },
    "AND-PRIV-001": {
      title: "Privacy policy reference not found",
      message:
        "No privacy policy URL or reference found — required on Google Play",
      fix: "Add privacy policy URL to the app and Play Console listing",
    },
    "AND-PRIV-002": {
      title: "Account deletion not found",
      message:
        "User authentication detected but no account deletion feature found",
      fix: "Add in-app account deletion flow — required on Google Play",
    },

    // ── Common Rules ──
    "COM-SEC-001": {
      title: "Hardcoded API key/secret detected",
      message: "Hardcoded API key or secret found in source code",
      fix: "Use environment variables, .env files, or platform secret managers (Keychain/EncryptedSharedPreferences)",
    },
    "COM-SEC-002": {
      title: "HTTP URL usage",
      message: "HTTP URL detected — use HTTPS instead",
      fix: "Change all URLs to HTTPS",
    },
    "COM-SEC-003": {
      title: "Sensitive data logging risk",
      message:
        "Sensitive data (password, token, etc.) found in log/print statement",
      fix: "Never log sensitive data",
    },
    "COM-META-001": {
      title: "Lorem ipsum placeholder content",
      message:
        "Lorem ipsum placeholder content detected — will be rejected in store review",
      fix: "Replace with real content",
    },
    "COM-META-002": {
      title: "Placeholder image filename",
      message: "Placeholder/test image file detected",
      fix: "Replace with production assets",
    },
    "COM-META-003": {
      title: "TODO/FIXME comments",
      message:
        "{count} TODO/FIXME comments detected — may indicate unresolved issues",
      fix: "Review all TODO/FIXME comments before submission",
    },
    "COM-META-004": {
      title: "Debug print statements",
      message:
        "{count} debug print/log statements — should be removed in release builds",
      fix: "Remove or conditionally compile print/log statements for release builds",
    },
    "COM-CRASH-001": {
      title: "Empty catch block",
      message: "{count} empty catch block(s) — errors may be silently swallowed",
      fix: "Log errors or inform the user instead of silently swallowing them",
    },
  },
};
