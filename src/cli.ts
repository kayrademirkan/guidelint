#!/usr/bin/env node

import { Command } from "commander";
import { resolve } from "path";
import { existsSync } from "fs";
import { scan } from "./scanner/index.js";
import { formatTerminal } from "./formatters/terminal.js";
import { formatPrompt } from "./formatters/prompt.js";
import { formatJson } from "./formatters/json.js";
import { setLocale, getAvailableLocales } from "./i18n/index.js";
import { translateFindings } from "./i18n/translate.js";
import type { OutputFormat } from "./types.js";
import type { Locale } from "./i18n/index.js";

const program = new Command();

program
  .name("guidelint")
  .description(
    "App Store & Google Play pre-submission linter. Catch rejection reasons before review."
  )
  .version("0.1.0")
  .argument("[path]", "Path to the project directory", ".")
  .option(
    "-f, --format <format>",
    "Output format: terminal, prompt, json",
    "terminal"
  )
  .option(
    "-l, --lang <language>",
    "Output language: en, tr, de, nl",
    "en"
  )
  .option("--ios-only", "Only run iOS rules")
  .option("--android-only", "Only run Android rules")
  .option("--min-severity <severity>", "Minimum severity to report", "low")
  .action(async (inputPath: string, options) => {
    const projectPath = resolve(inputPath);

    if (!existsSync(projectPath)) {
      console.error(`Error: Path not found: ${projectPath}`);
      process.exit(1);
    }

    // Set locale
    const locale = options.lang as Locale;
    if (getAvailableLocales().includes(locale)) {
      setLocale(locale);
    } else {
      console.error(
        `Error: Unsupported language "${options.lang}". Available: ${getAvailableLocales().join(", ")}`
      );
      process.exit(1);
    }

    const format = options.format as OutputFormat;
    const result = await scan(projectPath, {
      iosOnly: options.iosOnly,
      androidOnly: options.androidOnly,
      minSeverity: options.minSeverity,
    });

    // Translate findings to selected locale
    result.findings = translateFindings(result.findings);

    switch (format) {
      case "prompt":
        console.log(formatPrompt(result));
        break;
      case "json":
        console.log(formatJson(result));
        break;
      default:
        console.log(formatTerminal(result));
    }

    // Exit code: 1 if critical findings exist
    const hasCritical = result.findings.some((f) => f.severity === "critical");
    if (hasCritical) process.exit(1);
  });

program.parse();
