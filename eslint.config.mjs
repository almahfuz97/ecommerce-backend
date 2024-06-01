import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
    },
    ignores: ["**/node_modules/", ".dist/"],
  },
];
