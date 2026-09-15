import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const exts = [".ts", ".tsx", ".mts", ".js", ".mjs"];

export async function resolve(specifier, context, nextResolve) {
  let s = specifier;
  if (s.startsWith("@/")) s = new URL(s.slice(2), root).href;
  const relative = s.startsWith("./") || s.startsWith("../");
  if ((relative || s.startsWith("file:")) && !/\.[a-z]+$/i.test(s)) {
    const base = relative ? new URL(s, context.parentURL).href : s;
    for (const ext of exts) {
      if (existsSync(fileURLToPath(base + ext))) {
        s = base + ext;
        break;
      }
    }
  }
  return nextResolve(s, context);
}
