import type { Rule } from "../types.js";
import { iosRules } from "./ios.js";
import { androidRules } from "./android.js";
import { commonRules } from "./common.js";

export function getAllRules(): Rule[] {
  return [...iosRules, ...androidRules, ...commonRules];
}
