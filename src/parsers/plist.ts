import { XMLParser } from "fast-xml-parser";

export function parsePlist(xml: string): Record<string, unknown> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    parseTagValue: true,
    trimValues: true,
  });

  try {
    const parsed = parser.parse(xml);
    const dict = parsed?.plist?.dict;
    if (!dict) return {};
    return flattenPlistDict(dict);
  } catch {
    return {};
  }
}

function flattenPlistDict(dict: any): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  if (!dict || !dict.key) return result;

  const keys = Array.isArray(dict.key) ? dict.key : [dict.key];

  // Collect all value nodes in order
  const values: unknown[] = [];
  const valueTypes = [
    "string",
    "integer",
    "real",
    "true",
    "false",
    "array",
    "dict",
    "data",
    "date",
  ];

  for (const type of valueTypes) {
    if (dict[type] !== undefined) {
      const items = Array.isArray(dict[type]) ? dict[type] : [dict[type]];
      for (const item of items) {
        if (type === "true") {
          values.push(true);
        } else if (type === "false") {
          values.push(false);
        } else if (type === "dict") {
          values.push(flattenPlistDict(item));
        } else if (type === "array") {
          values.push(item);
        } else {
          values.push(item);
        }
      }
    }
  }

  // Map keys to values (simplified — plist ordering can be complex)
  keys.forEach((key: string, i: number) => {
    result[key] = values[i] ?? null;
  });

  return result;
}

export function plistHasKey(raw: string, key: string): boolean {
  return raw.includes(`<key>${key}</key>`);
}

export function plistGetString(raw: string, key: string): string | null {
  const regex = new RegExp(
    `<key>${escapeRegex(key)}</key>\\s*<string>(.*?)</string>`,
    "s"
  );
  const match = raw.match(regex);
  return match ? match[1] : null;
}

export function plistGetBool(raw: string, key: string): boolean | null {
  const regex = new RegExp(
    `<key>${escapeRegex(key)}</key>\\s*<(true|false)\\s*/?>`,
    "s"
  );
  const match = raw.match(regex);
  if (!match) return null;
  return match[1] === "true";
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
