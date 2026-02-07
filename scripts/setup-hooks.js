import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const huskyDir = path.join(repoRoot, ".husky");

if (!existsSync(huskyDir)) {
  execSync("npx husky install", { stdio: "inherit", cwd: repoRoot });
}
