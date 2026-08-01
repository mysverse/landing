import { fixupConfigRules } from "@eslint/compat";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

// eslint-config-next's plugins (react, jsx-a11y, import) still use context
// APIs removed in ESLint 10; fixupConfigRules shims them until they update.
const config = [
  ...fixupConfigRules(nextCoreWebVitals),
  ...fixupConfigRules(nextTypescript),
  prettier,
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "public/external-assets/**"
    ]
  }
];

export default config;
