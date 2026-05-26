import { mkdir, rm, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const webDir = path.join(rootDir, "www");

await rm(webDir, { recursive: true, force: true });
await mkdir(webDir, { recursive: true });
await cp(srcDir, webDir, {
  recursive: true,
  filter: (source) => !source.endsWith(".js"),
});

await esbuild.build({
  entryPoints: [path.join(srcDir, "app.js")],
  outfile: path.join(webDir, "app.js"),
  bundle: true,
  format: "iife",
  platform: "browser",
  sourcemap: true,
  target: ["safari16", "ios16"],
});

console.log("Built MoveLedger web assets into www/");
