# Contributing to Guidelint

Thanks for your interest in contributing! Guidelint is an open-source project and we welcome contributions of all kinds.

## Ways to Contribute

- **New rules** — Add checks for guidelines we don't cover yet
- **New languages** — Translate the tool into your language
- **Bug fixes** — Found a false positive? A crash? Fix it!
- **Documentation** — Improve README, add examples, fix typos
- **Platform support** — Better React Native, Flutter, or new framework support

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/kayrademirkan/guidelint.git
cd guidelint
npm install
npm run build
```

### Test locally

```bash
# Run against any mobile project
node dist/cli.js /path/to/your/project

# Test different languages
node dist/cli.js /path/to/project --lang tr
node dist/cli.js /path/to/project --lang de
node dist/cli.js /path/to/project --lang nl

# Test different formats
node dist/cli.js /path/to/project --format prompt
node dist/cli.js /path/to/project --format json
```

### Development workflow

```bash
# Watch mode — recompiles on file changes
npm run dev

# Type check without building
npm run lint

# Full build
npm run build
```

## Adding a New Rule

### 1. Choose the right file

| Platform | File |
|---|---|
| iOS only | `src/rules/ios.ts` |
| Android only | `src/rules/android.ts` |
| Both platforms | `src/rules/common.ts` |

### 2. Create the rule

Every rule implements the `Rule` interface from `src/types.ts`:

```typescript
const myRule: Rule = {
  id: 'IOS-CUSTOM-001',         // Format: PLATFORM-CATEGORY-NUMBER
  title: 'Short title',          // Shown in output
  severity: 'high',              // critical | high | medium | low | info
  category: 'privacy',           // privacy | security | performance | design | business | legal
  platform: 'ios',               // ios | android | both
  guideline: 'Guideline 5.1.1', // Optional: Apple/Google reference
  check(ctx) {
    // Your logic here
    // Return a Finding if issue found, null if everything is OK
    return null;
  },
};
```

### 3. Understand the ScanContext

The `ctx` parameter gives you access to everything:

```typescript
ctx.projectPath        // Absolute path to project root
ctx.platforms          // Detected platforms: ["ios", "android"]
ctx.files              // All scanned files: { path, name, relativePath, size }
ctx.sourceFiles        // Source code files: { path, relativePath, content, language }
ctx.plistRaw           // Raw Info.plist XML string (iOS)
ctx.plist              // Parsed Info.plist as key-value object (iOS)
ctx.privacyManifestRaw // Raw PrivacyInfo.xcprivacy XML string (iOS)
ctx.manifest           // Raw AndroidManifest.xml string (Android)
ctx.buildGradle        // Raw app/build.gradle string (Android)
ctx.podfile            // Raw Podfile string (iOS)
ctx.packageJson        // Parsed package.json object (RN)
ctx.pubspec            // Raw pubspec.yaml string (Flutter)
ctx.entitlements       // Raw .entitlements XML string (iOS)
```

### 4. Common patterns

**Check if source code contains a pattern:**
```typescript
function sourceContains(ctx: ScanContext, pattern: RegExp, langs?: string[]): string | null {
  for (const f of ctx.sourceFiles) {
    if (langs && !langs.includes(f.language)) continue;
    if (pattern.test(f.content)) return f.relativePath;
  }
  return null;
}
```

**Cross-reference usage with plist:**
```typescript
// Only flag if the API is actually used in code
const usesCamera = sourceContains(ctx, /AVCaptureSession/, ["swift"]);
if (usesCamera && !plistHasKey(ctx.plistRaw, "NSCameraUsageDescription")) {
  return { /* finding */ };
}
```

### 5. Register the rule

Add your rule to the exports array at the bottom of the file:

```typescript
export const iosRules: Rule[] = [
  // ... existing rules
  myRule,  // Add here
];
```

### 6. Add translations

Add translations for your rule in all 4 language files:

- `src/i18n/en.ts` — English (required)
- `src/i18n/tr.ts` — Turkish
- `src/i18n/de.ts` — German
- `src/i18n/nl.ts` — Dutch

```typescript
// In each language file, add to the rules object:
"IOS-CUSTOM-001": {
  title: "Short title in this language",
  message: "What went wrong in this language",
  fix: "How to fix it in this language",
},
```

If you don't speak all languages, just add English — others can help translate.

### 7. Rule ID conventions

```
IOS-PRIV-XXX   → iOS privacy rules
IOS-SEC-XXX    → iOS security rules
IOS-CRASH-XXX  → iOS crash/performance rules
IOS-META-XXX   → iOS metadata rules
IOS-IAP-XXX    → iOS in-app purchase rules
AND-MANIF-XXX  → Android manifest rules
AND-GRADLE-XXX → Android build config rules
AND-SEC-XXX    → Android security rules
AND-CRASH-XXX  → Android crash rules
AND-PRIV-XXX   → Android privacy rules
COM-SEC-XXX    → Common security rules
COM-META-XXX   → Common metadata rules
COM-CRASH-XXX  → Common crash rules
```

### 8. Severity guidelines

| Severity | When to use |
|---|---|
| `critical` | **Will** cause rejection. Missing required files, banned APIs, policy violations. |
| `high` | **Very likely** to cause rejection. Security issues, missing features (restore purchases). |
| `medium` | **May** cause rejection or delays. Code quality, optional improvements. |
| `low` | Best practice. Unlikely to cause rejection but worth noting. |
| `info` | Informational only. No score impact. |

## Adding a New Language

### 1. Create the translation file

Copy `src/i18n/en.ts` to `src/i18n/xx.ts` (where `xx` is the ISO 639-1 code):

```bash
cp src/i18n/en.ts src/i18n/xx.ts
```

### 2. Translate all strings

Translate both `ui` strings and `rules` strings. Keep `{placeholder}` tokens unchanged:

```typescript
// Keep placeholders like {count}, {version}, {value}, {bundleId}, {keys}
message: "{count} force unwrap (!) instances detected — crash risk",
```

### 3. Register the language

In `src/i18n/index.ts`:

```typescript
import { xx } from "./xx.js";

export type Locale = "en" | "tr" | "de" | "nl" | "xx";

const locales: Record<Locale, Translations> = { en, tr, de, nl, xx };
```

### 4. Update CLI help

In `src/cli.ts`, update the `--lang` option description.

## Pull Request Guidelines

1. **One PR per feature/fix** — keep it focused
2. **Build must pass** — run `npm run build` before submitting
3. **Test your changes** — run against a real project
4. **Update translations** — if you change rule messages, update all language files
5. **Conventional commits** — use format like `feat: add rule for X` or `fix: false positive in Y`

### Commit message examples

```
feat: add IOS-PRIV-011 rule for NSAppleMusicUsageDescription
fix: false positive in COM-SEC-001 for test fixtures
docs: add Japanese translation
refactor: extract common permission check logic
```

## Reporting Issues

- **False positive?** Include the project structure and the file that triggered it
- **False negative?** Include what should have been caught and why
- **Crash?** Include the error message and the project path (sanitized)

## Code of Conduct

Be kind. Be constructive. We're all here to make mobile development less painful.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
