// Lets plain Node run project TypeScript: maps "@/..." to the repo root and
// adds ".ts/.tsx" to extensionless relative imports. Usage:
//   node --experimental-strip-types --import ./scripts/loader.mjs scripts/check-events.ts
import { register } from "node:module";
register("./resolve-hooks.mjs", import.meta.url);
