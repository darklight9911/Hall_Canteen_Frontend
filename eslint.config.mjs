// Flat ESLint config (ESLint 9). Replaces `next lint`, which was removed in
// Next.js 16. eslint-config-next v16 ships flat-config arrays directly.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Allow underscore-prefixed names for intentionally-unused bindings
      // (e.g. destructure-to-omit: `const { [id]: _omit, ...rest } = obj`).
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },
];

export default config;
