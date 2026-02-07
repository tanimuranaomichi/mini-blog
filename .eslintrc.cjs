import { existsSync } from "node:fs";
import path from "node:path";

const tsconfigPath = path.resolve("tsconfig.json");

export default {
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: existsSync(tsconfigPath) ? tsconfigPath : undefined
  },
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "import/no-default-export": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      extends: ["plugin:astro/recommended"],
      rules: {
        "no-undef": "off"
      }
    },
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: existsSync(tsconfigPath) ? tsconfigPath : undefined
      }
    }
  ]
};
