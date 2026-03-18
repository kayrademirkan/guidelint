import type { Platform, ScannedFile } from "../types.js";

export function detectPlatforms(files: ScannedFile[]): Platform[] {
  const names = new Set(files.map((f) => f.name));
  const paths = files.map((f) => f.relativePath);

  const platforms: Platform[] = [];

  // Flutter detection
  const isFlutter =
    names.has("pubspec.yaml") &&
    files.some((f) => f.relativePath.includes(".dart"));
  if (isFlutter) {
    platforms.push("flutter");
  }

  // React Native detection
  const isRN =
    names.has("package.json") &&
    (files.some((f) => f.name.startsWith("metro.config")) ||
      paths.some((p) => p.includes("react-native")));
  if (isRN && !isFlutter) {
    platforms.push("react-native");
  }

  // iOS detection (native or via cross-platform)
  const hasIOS =
    names.has("Info.plist") ||
    files.some(
      (f) =>
        f.name.endsWith(".swift") ||
        f.name.endsWith(".m") ||
        f.relativePath.includes(".xcodeproj") ||
        f.relativePath.includes("ios/")
    );
  if (hasIOS) {
    platforms.push("ios");
  }

  // Android detection (native or via cross-platform)
  const hasAndroid =
    names.has("AndroidManifest.xml") ||
    names.has("build.gradle") ||
    names.has("build.gradle.kts") ||
    files.some(
      (f) =>
        f.relativePath.includes("android/") ||
        f.name.endsWith(".kt") ||
        f.name.endsWith(".java")
    );
  if (hasAndroid) {
    platforms.push("android");
  }

  return platforms;
}
