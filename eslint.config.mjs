import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsdoc from "eslint-plugin-jsdoc";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // TSDoc comments on exported functions and components (warnings only).
  // Style guide: Ideas/local_ai_usage/DOCSTRING_STYLE.md
  {
    ...jsdoc.configs["flat/recommended-typescript"],
    files: ["**/*.{ts,tsx}"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "jsdoc/require-jsdoc": ["warn", {
        publicOnly: true,
        require: { FunctionDeclaration: true, ArrowFunctionExpression: true },
      }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
