<p align="center">
  <h1 align="center">🔍 Guidelint</h1>
  <p align="center">
    <strong>Catch App Store & Google Play rejection reasons before you submit.</strong>
  </p>
  <p align="center">
    Static analysis for mobile apps — checks your project against 71 Apple & Google guidelines so you don't get rejected.
  </p>
  <p align="center">
    <a href="https://www.npmjs.com/package/guidelint"><img src="https://img.shields.io/npm/v/guidelint.svg?style=flat-square" alt="npm version"></a>
    <a href="https://www.npmjs.com/package/guidelint"><img src="https://img.shields.io/npm/dm/guidelint.svg?style=flat-square" alt="npm downloads"></a>
    <a href="https://github.com/kayrademirkan/guidelint/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="license"></a>
    <a href="https://github.com/kayrademirkan/guidelint"><img src="https://img.shields.io/github/stars/kayrademirkan/guidelint?style=flat-square" alt="stars"></a>
  </p>
  <p align="center">
    <a href="#installation">Installation</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#ai-ready-output">AI-Ready Output</a> •
    <a href="#rules">71 Rules</a> •
    <a href="#supported-platforms">Platforms</a> •
    <a href="#language-support">4 Languages</a>
  </p>
</p>

---

> **25% of all iOS apps get rejected.** Google Play blocked 1.75M apps in 2024 alone.
> Most rejections are preventable. Guidelint finds them before Apple and Google do.

```bash
npx guidelint ./MyApp
```

```
  guidelint v0.1.0
  ──────────────────────────────────────────────────────────────

  Platform:  IOS
  Files:     47 files scanned
  Rules:     30 rules checked

  CRITICAL (3)

  ✗ [IOS-PRIV-100] PrivacyInfo.xcprivacy not found
    → PrivacyInfo.xcprivacy file is missing. Required since May 2024.
    → Fix: Create via Xcode > New File > iOS > Resource > App Privacy

  ✗ [IOS-PRIV-001] NSCameraUsageDescription missing
    → Camera usage detected but NSCameraUsageDescription is not in Info.plist
    → File: Info.plist
    → Fix: Add NSCameraUsageDescription to Info.plist
    → Guideline 5.1.1

  ✗ [COM-SEC-001] Hardcoded API key/secret detected
    → Hardcoded API key or secret found in source code
    → File: NetworkService.swift
    → Fix: Use environment variables or Keychain

  HIGH (5)

  ⚠ [IOS-SEC-001] App Transport Security fully disabled
    → NSAllowsArbitraryLoads=true — all HTTP traffic is allowed
    → File: Info.plist
    → Fix: Remove NSAllowsArbitraryLoads, use NSExceptionDomains for specific domains

  ⚠ [IOS-IAP-001] StoreKit imported, Restore Purchases missing
    → StoreKit is imported but no Restore Purchases implementation found
    → Fix: Add a Restore Purchases button
    → Guideline 3.1.1

  ⚠ [IOS-PRIV-300] Account deletion not found
    → User authentication detected but no account deletion feature found
    → Fix: Add in-app account deletion flow

  ⚠ [COM-SEC-002] HTTP URL usage
    → HTTP URL detected — use HTTPS instead
    → Fix: Change all URLs to HTTPS

  ⚠ [COM-META-001] Lorem ipsum placeholder content
    → Lorem ipsum detected — will be rejected in store review
    → Fix: Replace with real content

  SCORE: 57/100 — RISKY — Review issues before submitting

  privacy      ██████████░░░░░░░░░░ 50/100
  performance  ███████████████░░░░░ 73/100
  security     ██████░░░░░░░░░░░░░░ 30/100
  design       ██████████████░░░░░░ 70/100
  business     █████████████████░░░ 85/100
  legal        █████████████████░░░ 85/100
```

---

## Table of Contents

- [Why Guidelint?](#why-guidelint)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [AI-Ready Output](#ai-ready-output) — the killer feature
- [Auto-Fix](#auto-fix) — `--fix` flag
- [Ignore Files](#ignore-files) — `.guidelintignore`
- [Language Support](#language-support) — EN, TR, DE, NL
- [Supported Platforms](#supported-platforms)
- [All 71 Rules](#rules) — complete reference
- [Scoring System](#scoring)
- [Output Formats](#output-formats)
- [CI/CD Integration](#cicd-integration)
- [Programmatic API](#programmatic-api)
- [What Guidelint Catches](#what-guidelint-catches) — real rejection data
- [Roadmap](#roadmap)
- [Contributing](#contributing)

---

## Why Guidelint?

You've spent weeks building your app. You submit it. Then you wait. Days later — **rejected**.

Missing `PrivacyInfo.xcprivacy`. A `NSCameraUsageDescription` that says "We need camera access." An `http://` URL hiding in line 847. A `targetSdkVersion` stuck at 33.

These are not bugs. They're **checklist items** that cost developers days of back-and-forth with review teams. The review cycle typically takes 24-48 hours per attempt. One missing key in Info.plist? That's 2 days wasted.

**Guidelint scans your project in seconds and tells you exactly what to fix — in your language.**

### What makes it different

| Feature | Guidelint | Manual review | Other linters |
|---|---|---|---|
| App Store guidelines | ✅ 71 rules | ❌ Human error | ❌ Code-only |
| Google Play guidelines | ✅ 23 rules | ❌ Human error | ❌ Code-only |
| Privacy manifest (2024) | ✅ Auto-detect | ⚠️ Easy to forget | ❌ Not supported |
| AI-ready output | ✅ `--format prompt` | ❌ | ❌ |
| Multi-language | ✅ EN/TR/DE/NL | ❌ | ❌ |
| Cross-platform | ✅ iOS+Android+RN+Flutter | ❌ Platform-specific | ⚠️ Usually one |
| Auto-fix | ✅ `--fix` flag | ❌ | ⚠️ Limited |
| Ignore files | ✅ `.guidelintignore` | ❌ | ✅ |
| Zero config | ✅ `npx guidelint .` | ❌ | ⚠️ Config files |
| Readiness score | ✅ 0-100 with verdict | ❌ | ❌ |

---

## Installation

```bash
# Run directly — no install needed
npx guidelint ./MyApp

# Or install globally
npm install -g guidelint
guidelint ./MyApp
```

**Requirements:** Node.js 18 or higher.

**That's it.** No config files, no setup, no accounts. Point it at your project and go.

---

## Quick Start

### Basic scan

```bash
guidelint ./MyiOSApp
```

### All CLI options

```bash
guidelint [path] [options]

Options:
  -f, --format <format>      Output format: terminal, prompt, json  (default: "terminal")
  -l, --lang <language>      Output language: en, tr, de, nl        (default: "en")
  --ios-only                 Only run iOS rules
  --android-only             Only run Android rules
  --min-severity <severity>  Minimum severity to report             (default: "low")
  --ignore <patterns...>     Glob patterns to ignore
  --fix                      Auto-fix simple issues where possible
  -V, --version              Output version number
  -h, --help                 Display help
```

### Examples

```bash
# Scan and get AI-ready fix instructions
guidelint ./MyApp --format prompt

# Scan in Turkish
guidelint ./MyApp --lang tr

# JSON output for CI/CD pipelines
guidelint ./MyApp --format json

# Only iOS rules
guidelint ./MyApp --ios-only

# Only Android rules
guidelint ./MyApp --android-only

# Show only critical and high severity issues
guidelint ./MyApp --min-severity high

# Auto-fix common issues
guidelint ./MyApp --fix

# Ignore specific directories
guidelint ./MyApp --ignore "test/**" "vendor/**"

# Combine: German, prompt format, critical only
guidelint ./MyApp --lang de --format prompt --min-severity critical

# Copy AI-ready report to clipboard (macOS)
guidelint ./MyApp --format prompt | pbcopy

# Pipe JSON to jq for custom filtering
guidelint ./MyApp --format json | jq '.findings[] | select(.severity == "critical")'
```

---

## AI-Ready Output

**This is what makes Guidelint different from every other linter.**

Run with `--format prompt` and get a structured markdown report designed to be pasted directly into ChatGPT, Claude, Copilot, or any AI assistant:

```bash
guidelint ./MyApp --format prompt | pbcopy
```

The AI receives:

1. **Full context** — project info, platform, scores
2. **Every finding** — rule ID, severity, category, file path, guideline reference
3. **A prioritized action plan** — step-by-step instructions the AI can follow

```markdown
## AI Fix Instructions

If you are an AI assistant helping fix these issues, here is a prioritized action plan:

### Step 1: Fix Critical Issues (must fix before submission)

1. **[IOS-PRIV-100]** Create PrivacyInfo.xcprivacy via Xcode > New File > App Privacy
2. **[IOS-PRIV-001]** Add NSCameraUsageDescription to Info.plist → in `Info.plist`
3. **[COM-SEC-001]** Move API key to environment variable → in `NetworkService.swift`

### Step 2: Fix High Severity Issues (strongly recommended)

1. **[IOS-SEC-001]** Remove NSAllowsArbitraryLoads, use NSExceptionDomains → in `Info.plist`
2. **[IOS-IAP-001]** Add Restore Purchases handler and button
3. **[IOS-PRIV-300]** Add in-app account deletion flow
4. **[COM-SEC-002]** Change all URLs to HTTPS → in `NetworkService.swift`
5. **[COM-META-001]** Replace lorem ipsum with real content → in `ViewController.swift`

### Step 3: Review Medium/Low Issues (nice to have)

- **[COM-CRASH-001]** Log errors instead of silently swallowing them
- **[COM-META-003]** Review all TODO/FIXME comments before submission
```

**Paste this into Claude or ChatGPT → it fixes your entire project, file by file, in priority order.**

### The workflow

```
1. npx guidelint ./MyApp --format prompt | pbcopy
2. Open ChatGPT/Claude
3. Paste
4. AI fixes everything
5. Run guidelint again to verify
6. Submit to App Store / Google Play
```

---

## Language Support

Guidelint speaks your language. All findings, fix instructions, and UI labels are fully translated.

| Flag | Language | Example |
|---|---|---|
| `--lang en` | 🇬🇧 English (default) | `guidelint . --lang en` |
| `--lang tr` | 🇹🇷 Türkçe | `guidelint . --lang tr` |
| `--lang de` | 🇩🇪 Deutsch | `guidelint . --lang de` |
| `--lang nl` | 🇳🇱 Nederlands | `guidelint . --lang nl` |

Example in Turkish:

```
  ✗ [IOS-PRIV-100] PrivacyInfo.xcprivacy bulunamadı
    → PrivacyInfo.xcprivacy dosyası eksik. Mayıs 2024'ten itibaren zorunlu.
    → Çözüm: Xcode > New File > iOS > Resource > App Privacy ile oluştur

  SKOR: 57/100 — RİSKLİ — Sorunları gözden geçir
```

Example in German:

```
  ✗ [IOS-PRIV-100] PrivacyInfo.xcprivacy nicht gefunden
    → PrivacyInfo.xcprivacy-Datei fehlt. Seit Mai 2024 erforderlich.
    → Lösung: Erstelle über Xcode > New File > iOS > Resource > App Privacy

  BEWERTUNG: 57/100 — RISKANT — Probleme vor dem Einreichen prüfen
```

Want to add a language? See [Contributing](#contributing).

---

## Auto-Fix

Run with `--fix` to automatically correct common issues:

```bash
guidelint ./MyApp --fix
```

```
  ✓ Auto-fixed 5 issue(s): AND-GRADLE-001, AND-GRADLE-002, AND-GRADLE-003, AND-GRADLE-004, COM-SEC-002
```

What it fixes:

| Issue | Before | After |
|---|---|---|
| targetSdkVersion | 33 | 35 |
| compileSdk | 33 | 35 |
| debuggable (release) | true | false |
| minifyEnabled (release) | false | true |
| NSAllowsArbitraryLoads | true | false |
| HTTP URLs | `http://` | `https://` |

The tool only fixes safe, deterministic changes. Complex issues still require manual review.

---

## Ignore Files

### .guidelintignore

Create a `.guidelintignore` file in your project root. Same syntax as `.gitignore`:

```
# Skip test files
test/**
tests/**
__tests__/**
*.spec.ts
*.test.ts

# Skip vendor code
vendor/**
Pods/**

# Skip generated files
generated/**
*.g.dart
```

### --ignore flag

```bash
guidelint ./MyApp --ignore "test/**" "vendor/**" "*.spec.ts"
```

---

## Supported Platforms

Guidelint auto-detects your project type and runs the right rules.

| Platform | How it's detected | Files scanned |
|---|---|---|
| **iOS — Swift** | `.xcodeproj`, `Info.plist`, `*.swift` | `Info.plist`, `PrivacyInfo.xcprivacy`, `*.entitlements`, `Podfile`, `Package.swift`, all `.swift` files |
| **iOS — Objective-C** | `*.m`, `*.h` files | Same as above + `.m`, `.h` files |
| **Android — Kotlin** | `AndroidManifest.xml`, `*.kt` | `AndroidManifest.xml`, `build.gradle`, `network_security_config.xml`, `gradle.properties`, all `.kt` files |
| **Android — Java** | `AndroidManifest.xml`, `*.java` | Same as above + `.java` files |
| **React Native** | `package.json` + `metro.config.*` | **Both** iOS and Android files + `.js`, `.jsx`, `.ts`, `.tsx` |
| **Flutter** | `pubspec.yaml` + `*.dart` | **Both** iOS and Android files + `.dart`, `pubspec.yaml` |

### Cross-platform detection

If you have a React Native or Flutter project, Guidelint scans **both** the `ios/` and `android/` directories automatically. You get iOS + Android findings in a single run.

### Ignored directories

These are automatically excluded from scanning:

```
node_modules/    build/         dist/          .gradle/
DerivedData/     Pods/          .dart_tool/    .pub-cache/
vendor/          __tests__/     test/          tests/
```

---

## Rules

### Overview

Guidelint ships with **71 rules** across 6 categories:

| Category | # Rules | Weight | What it covers |
|---|---|---|---|
| 🔒 **Privacy** | 23 | 30% | Usage descriptions, privacy manifest, ATT, tracking, dangerous permissions, background modes |
| 🛡️ **Security** | 14 | 25% | Hardcoded secrets, HTTP URLs, ATS, cleartext traffic, banned device IDs, signing passwords |
| ⚡ **Performance** | 18 | 20% | Crash risks, SDK versions, PendingIntent, force unwrap, Hermes, AsyncTask, inlineRequires |
| 🎨 **Design** | 5 | 10% | Placeholder content, bundle ID, metadata, KeyboardAvoidingView |
| 💰 **Business** | 2 | 10% | In-App Purchase compliance, restore purchases |
| ⚖️ **Legal** | 3 | 5% | Account deletion requirement, privacy policy |

### Platform breakdown

| Platform | Rules | Highlights |
|---|---|---|
| **iOS** | 27 | Privacy manifest, 11 usage descriptions, ATT, StoreKit, background modes, force unwrap |
| **Android** | 23 | targetSdk, 7 dangerous permissions, exported, PendingIntent, signing passwords, arm64 |
| **React Native** | 7 | Hermes, Flipper, \_\_DEV\_\_ leak, console.log, bridge deprecation, inlineRequires |
| **Flutter** | 6 | debugPrint, kDebugMode, permission plugins, obfuscation, android:exported |
| **Cross-platform** | 8 | Hardcoded secrets, HTTP URLs, placeholder content, empty catch, sensitive logging |

### How rules work

Every rule:
1. **Checks a condition** — e.g., "Does Info.plist have NSCameraUsageDescription?"
2. **Cross-references with source code** — e.g., "Is AVCaptureSession actually used in any .swift file?"
3. **Only fires when both conditions are true** — no false positives for unused permissions

This means Guidelint won't flag you for missing `NSCameraUsageDescription` if your app doesn't use the camera. It understands your actual code.

### All Rules — Complete Reference

<details>
<summary><strong>🍎 iOS Rules (23)</strong> — click to expand</summary>

#### Privacy & Permissions

| Rule | Severity | What it checks |
|---|---|---|
| `IOS-PLIST-001` | 🔴 Critical | Info.plist file exists in the project |
| `IOS-PRIV-100` | 🔴 Critical | PrivacyInfo.xcprivacy exists (required since May 2024) |
| `IOS-PRIV-101` | 🔴 Critical | PrivacyInfo.xcprivacy contains all 4 required keys: `NSPrivacyTracking`, `NSPrivacyTrackingDomains`, `NSPrivacyCollectedDataTypes`, `NSPrivacyAccessedAPITypes` |
| `IOS-PRIV-001` | 🔴 Critical | `NSCameraUsageDescription` in Info.plist when `AVCaptureSession` / `UIImagePickerController` is used |
| `IOS-PRIV-002` | 🔴 Critical | `NSMicrophoneUsageDescription` when `AVAudioSession` / `AVAudioRecorder` is used |
| `IOS-PRIV-003` | 🔴 Critical | `NSLocationWhenInUseUsageDescription` when `CLLocationManager` is used |
| `IOS-PRIV-004` | 🔴 Critical | `NSPhotoLibraryUsageDescription` when `PHPhotoLibrary` / `PHAsset` is used |
| `IOS-PRIV-005` | 🔴 Critical | `NSContactsUsageDescription` when `CNContactStore` is used |
| `IOS-PRIV-006` | 🔴 Critical | `NSBluetoothAlwaysUsageDescription` when `CBCentralManager` is used |
| `IOS-PRIV-007` | 🔴 Critical | `NSFaceIDUsageDescription` when `LAContext` / biometrics is used |
| `IOS-PRIV-008` | 🔴 Critical | `NSCalendarsUsageDescription` when `EKEventStore` is used |
| `IOS-PRIV-009` | 🔴 Critical | `NSMotionUsageDescription` when `CMMotionManager` is used |
| `IOS-PRIV-010` | 🔴 Critical | `NSSpeechRecognitionUsageDescription` when `SFSpeechRecognizer` is used |
| `IOS-PRIV-200` | 🔴 Critical | `AppTrackingTransparency` framework imported when IDFA / `advertisingIdentifier` is accessed |
| `IOS-PRIV-201` | 🔴 Critical | `NSUserTrackingUsageDescription` in Info.plist when ATT framework is used |
| `IOS-PRIV-400` | 🟡 Medium | Usage description quality — rejects generic text like "We need access" or "Required" |

#### Security

| Rule | Severity | What it checks |
|---|---|---|
| `IOS-SEC-001` | 🟠 High | `NSAllowsArbitraryLoads` is not set to `true` (App Transport Security) |

#### Business & Legal

| Rule | Severity | What it checks |
|---|---|---|
| `IOS-IAP-001` | 🟠 High | Restore Purchases is implemented when StoreKit is imported (Guideline 3.1.1) |
| `IOS-PRIV-300` | 🟠 High | Account deletion available when user authentication exists (required since 2022) |

#### Crash Prevention

| Rule | Severity | What it checks |
|---|---|---|
| `IOS-CRASH-001` | 🟡 Medium | Force unwrap (`!`) usage count — escalates to High at 10+ |
| `IOS-CRASH-002` | 🟠 High | No `fatalError()` in production code |

#### Metadata

| Rule | Severity | What it checks |
|---|---|---|
| `IOS-META-001` | 🟠 High | Bundle ID doesn't contain `com.example`, `com.test`, `com.demo`, `org.reactjs.native.example` |

</details>

<details>
<summary><strong>🤖 Android Rules (20)</strong> — click to expand</summary>

#### Manifest & Permissions

| Rule | Severity | What it checks |
|---|---|---|
| `AND-MANIF-001` | 🔴 Critical | AndroidManifest.xml exists in the project |
| `AND-MANIF-100` | 🔴 Critical | `READ_SMS` permission — requires Play Console declaration |
| `AND-MANIF-101` | 🔴 Critical | `READ_CALL_LOG` permission — requires Play Console declaration |
| `AND-MANIF-102` | 🔴 Critical | `PROCESS_OUTGOING_CALLS` — deprecated and banned |
| `AND-MANIF-103` | 🔴 Critical | `BIND_ACCESSIBILITY_SERVICE` — very strict review |
| `AND-MANIF-104` | 🟠 High | `ACCESS_BACKGROUND_LOCATION` — requires additional approval |
| `AND-MANIF-105` | 🟠 High | `MANAGE_EXTERNAL_STORAGE` — strict review |
| `AND-MANIF-106` | 🟠 High | `REQUEST_INSTALL_PACKAGES` — security review required |
| `AND-MANIF-200` | 🟠 High | `android:exported` attribute set on all components with intent-filters (required Android 12+) |

#### Build Configuration

| Rule | Severity | What it checks |
|---|---|---|
| `AND-GRADLE-001` | 🔴 Critical | `targetSdkVersion` >= 35 (Google Play requirement for new apps, 2025) |
| `AND-GRADLE-002` | 🟠 High | `compileSdk` >= 34 |
| `AND-GRADLE-003` | 🔴 Critical | Release build type is not `debuggable=true` |
| `AND-GRADLE-004` | 🟡 Medium | Release build has `minifyEnabled=true` (code protection) |

#### Security

| Rule | Severity | What it checks |
|---|---|---|
| `AND-SEC-001` | 🟠 High | `usesCleartextTraffic` not set to `true` in manifest |
| `AND-SEC-100` | 🔴 Critical | No banned device identifiers (`IMEI`, `getDeviceId()`, `getMacAddress()`) |

#### Crash Prevention

| Rule | Severity | What it checks |
|---|---|---|
| `AND-CRASH-001` | 🟠 High | PendingIntent uses `FLAG_IMMUTABLE` or `FLAG_MUTABLE` (crashes on Android 12+) |

#### Privacy & Legal

| Rule | Severity | What it checks |
|---|---|---|
| `AND-PRIV-001` | 🟡 Medium | Privacy policy URL or reference exists in the project |
| `AND-PRIV-002` | 🟠 High | Account deletion available when user authentication exists |

</details>

<details>
<summary><strong>🌐 Common Rules (8) — Both Platforms</strong></summary>

| Rule | Severity | What it checks |
|---|---|---|
| `COM-SEC-001` | 🔴 Critical | No hardcoded API keys, secrets, tokens, or passwords in source code (16+ char strings assigned to sensitive variable names) |
| `COM-SEC-002` | 🟠 High | No `http://` URLs (except `localhost`, `127.0.0.1`, `10.*`, `192.168.*`) |
| `COM-SEC-003` | 🟠 High | No sensitive data (`password`, `token`, `secret`, `apiKey`, `credit_card`, `ssn`, `cvv`) in `print`/`Log`/`console.log` statements |
| `COM-META-001` | 🟠 High | No "lorem ipsum" placeholder text anywhere in source code |
| `COM-META-002` | 🟡 Medium | No placeholder image filenames (`placeholder.jpg`, `test_image.png`, `sample.png`) |
| `COM-CRASH-001` | 🟡 Medium | No empty catch blocks — escalates to High at 5+ |
| `COM-META-003` | 🔵 Low | TODO/FIXME/HACK/XXX comment count — escalates to Medium at 10+ |
| `COM-META-004` | 🔵 Low | Debug `print`/`Log.d`/`console.log`/`debugPrint` statement count |

</details>

---

## Scoring

Every project gets a **readiness score from 0 to 100**, broken down by category.

### Severity deductions

Each finding deducts points from its category:

| Severity | Points Deducted | Meaning |
|---|---|---|
| 🔴 Critical | **-25** | Will definitely cause rejection |
| 🟠 High | **-15** | Very likely to cause rejection |
| 🟡 Medium | **-8** | May cause rejection or delays |
| 🔵 Low | **-2** | Best practice, unlikely to cause rejection |
| ℹ️ Info | **0** | Informational only |

### Category weights

Categories are weighted by their real-world impact on App Store / Google Play review outcomes:

| Category | Weight | Why this weight |
|---|---|---|
| 🔒 Privacy | **30%** | #1 rejection reason on both stores. Privacy manifest, usage descriptions, ATT — Apple and Google are cracking down hard. |
| 🛡️ Security | **25%** | Hardcoded secrets and cleartext traffic are instant rejections. Apple's ATS enforcement is strict. |
| ⚡ Performance | **20%** | Crashes during review = immediate rejection. SDK version requirements are enforced automatically. |
| 🎨 Design | **10%** | Placeholder content and metadata issues. Less common but still cause rejections. |
| 💰 Business | **10%** | IAP compliance (Guideline 3.1.1). Missing Restore Purchases is a classic rejection. |
| ⚖️ Legal | **5%** | Account deletion, privacy policy. Lower weight because these are usually caught early. |

### Score formula

```
Overall Score = (Privacy × 0.30) + (Security × 0.25) + (Performance × 0.20)
              + (Design × 0.10) + (Business × 0.10) + (Legal × 0.05)
```

### Verdicts

| Score | Verdict | What it means |
|---|---|---|
| **80–100** | ✅ **Ready** | Safe to submit. No critical issues found. |
| **50–79** | ⚠️ **Risky** | You might get through, but review the findings first. |
| **0–49** | ❌ **Not Ready** | Critical issues detected. Fix them before submitting. |

### Exit codes

| Code | Meaning | Use in CI/CD |
|---|---|---|
| `0` | No critical findings | Pipeline passes |
| `1` | Critical findings exist | Pipeline fails / PR blocked |

---

## Output Formats

### Terminal (default)

Colored output with severity icons (✗ ⚠ ~ ·), fix instructions, visual score bars, and verdict. Best for local development.

```bash
guidelint ./MyApp
```

### Prompt — AI-ready Markdown

Structured markdown with a **prioritized, step-by-step fix plan** designed for AI assistants. Includes file paths, guideline references, and actionable instructions.

```bash
# Save to file
guidelint ./MyApp --format prompt > report.md

# Copy to clipboard (macOS)
guidelint ./MyApp --format prompt | pbcopy

# Copy to clipboard (Linux)
guidelint ./MyApp --format prompt | xclip -selection clipboard
```

### JSON

Machine-readable output with full `ScanResult` object. Perfect for CI/CD pipelines, custom dashboards, or integration with other tools.

```bash
# Pretty print
guidelint ./MyApp --format json

# Filter critical findings with jq
guidelint ./MyApp --format json | jq '.findings[] | select(.severity == "critical")'

# Get just the score
guidelint ./MyApp --format json | jq '.score'
```

JSON schema:

```json
{
  "projectPath": "/path/to/project",
  "platforms": ["ios", "android"],
  "findings": [
    {
      "ruleId": "IOS-PRIV-100",
      "title": "PrivacyInfo.xcprivacy not found",
      "severity": "critical",
      "category": "privacy",
      "platform": "ios",
      "message": "PrivacyInfo.xcprivacy file is missing. Required since May 2024.",
      "fix": "Create via Xcode > New File > iOS > Resource > App Privacy",
      "file": null,
      "line": null,
      "guideline": "May 2024 requirement",
      "docsUrl": "https://developer.apple.com/documentation/bundleresources/privacy-manifest-files"
    }
  ],
  "score": {
    "overall": 57,
    "categories": {
      "privacy": 50,
      "performance": 73,
      "security": 30,
      "design": 70,
      "business": 85,
      "legal": 85
    },
    "verdict": "risky"
  },
  "filesScanned": 47,
  "rulesChecked": 30,
  "timestamp": "2026-03-18T03:15:51.587Z"
}
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Guidelint
on: [push, pull_request]

jobs:
  guidelint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      # Fail on critical issues
      - name: Run Guidelint
        run: npx guidelint . --min-severity high

      # Optional: upload report as artifact
      - name: Generate Report
        if: always()
        run: npx guidelint . --format json > guidelint-report.json

      - name: Upload Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: guidelint-report
          path: guidelint-report.json
```

### GitLab CI

```yaml
guidelint:
  image: node:20
  script:
    - npx guidelint . --min-severity high
  artifacts:
    when: always
    paths:
      - guidelint-report.json
```

### Pre-commit Hook (Husky)

```bash
# .husky/pre-commit
npx guidelint . --min-severity critical
```

### Bitbucket Pipelines

```yaml
pipelines:
  default:
    - step:
        name: Guidelint
        image: node:20
        script:
          - npx guidelint . --min-severity high
```

---

## Programmatic API

Use Guidelint as a library in your own tools:

```typescript
import { scan, setLocale, translateFindings, formatPrompt } from 'guidelint';

// Set language
setLocale('en');

// Scan
const result = await scan('./MyApp', {
  iosOnly: false,
  androidOnly: false,
  minSeverity: 'low',
});

// Access results
console.log(result.score.overall);      // 72
console.log(result.score.verdict);      // "risky"
console.log(result.findings.length);    // 8
console.log(result.platforms);          // ["ios", "android"]

// Translate findings
result.findings = translateFindings(result.findings);

// Format as AI-ready prompt
const report = formatPrompt(result);
```

---

## What Guidelint Catches

Based on [Apple's 2024 App Store Transparency Report](https://developer.apple.com/app-store/review/) (1.93M rejections analyzed) and Google Play's 2024 enforcement data (1.75M apps blocked):

| Rejection Reason | Real-world Frequency | Guidelint Detects |
|---|---|---|
| Missing/broken privacy policy | 🔴 Very High | ✅ Yes |
| App crashes during review | 🔴 Very High | ✅ Partial (crash risks) |
| PrivacyInfo.xcprivacy missing (iOS) | 🔴 Very High (since 2024) | ✅ Yes |
| Missing permission usage descriptions | 🟠 High | ✅ Yes (11 permissions) |
| Account deletion not available | 🟠 High | ✅ Yes |
| Target API level outdated (Android) | 🟠 High | ✅ Yes |
| Data Safety section mismatch (Android) | 🟠 High | ⚠️ Partial |
| Placeholder content (lorem ipsum) | 🟡 Medium | ✅ Yes |
| IAP rule violations (no restore) | 🟡 Medium | ✅ Yes |
| Metadata mismatch | 🟡 Medium | ⚠️ Partial |
| Hardcoded secrets in source | 🟡 Medium | ✅ Yes |
| HTTP URLs (cleartext traffic) | 🟡 Medium | ✅ Yes |

---

## Roadmap

| Version | Feature | Status |
|---|---|---|
| **v0.1** | Core engine, 51 rules, 3 output formats, 4 languages | ✅ Released |
| **v0.2** | React Native (7) + Flutter (6) rules, `--fix`, `--ignore`, `.guidelintignore`, 20 new rules | ✅ Released |
| **v0.3** | `.ipa` / `.apk` binary analysis | 🔜 Planned |
| **v0.4** | Custom rules via `.guidelintrc` config | 🔜 Planned |
| **v0.5** | More `--fix` handlers, watch mode | 🔜 Planned |
| **v1.0** | Xcode & Android Studio plugins | 📋 Backlog |
| **v1.1** | AI-powered analysis (usage description quality, permission relevance) | 📋 Backlog |
| **v2.0** | Web dashboard + GitHub App | 📋 Backlog |

---

## Contributing

Contributions are welcome! Whether it's new rules, new languages, platform support, bug fixes, or documentation.

### Setup

```bash
git clone https://github.com/kayrademirkan/guidelint.git
cd guidelint
npm install
npm run build
```

### Test locally

```bash
node dist/cli.js ./path-to-your-project
node dist/cli.js ./path-to-your-project --lang tr
node dist/cli.js ./path-to-your-project --format prompt
```

### Adding a new rule

Rules live in `src/rules/`. Each rule implements the `Rule` interface:

```typescript
import type { Rule } from '../types.js';

const myRule: Rule = {
  id: 'IOS-CUSTOM-001',         // Unique ID: PLATFORM-CATEGORY-NUMBER
  title: 'My custom check',      // Short title (shown in output)
  severity: 'high',              // critical | high | medium | low | info
  category: 'privacy',           // privacy | security | performance | design | business | legal
  platform: 'ios',               // ios | android | both
  guideline: 'Guideline 5.1.1', // Optional: Apple/Google guideline reference
  check(ctx) {
    // ctx.plistRaw       — raw Info.plist XML string
    // ctx.privacyManifestRaw — raw PrivacyInfo.xcprivacy XML string
    // ctx.manifest        — raw AndroidManifest.xml string
    // ctx.buildGradle     — raw build.gradle string
    // ctx.sourceFiles     — array of { path, content, language }
    // ctx.files           — array of { path, name, relativePath, size }

    // Return Finding if issue found, null if OK
    return null;
  },
};
```

Don't forget to add translations in `src/i18n/en.ts`, `tr.ts`, `de.ts`, `nl.ts`.

### Adding a new language

1. Create `src/i18n/xx.ts` (copy `en.ts` as template)
2. Translate all strings
3. Add import in `src/i18n/index.ts`
4. Add to `Locale` type and `locales` map

---

## License

MIT — use it however you want.

---

<p align="center">
  <strong>Stop getting rejected. Run <code>npx guidelint .</code> before you submit.</strong>
  <br><br>
  Made by <a href="https://github.com/kayrademirkan">Kayra Demirkan</a>
</p>
