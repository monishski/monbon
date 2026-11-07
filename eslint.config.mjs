import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  {
    ignores: ["**/node_modules/", "**/dist/", "**/storybook-static/", "**/coverage/"],
  },
  {
    // The "js/recommended" configuration ensures all of the rules marked as recommended
    // on the rules page (https://eslint.org/docs/latest/rules) will be turned on
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    // https://eslint.org/docs/latest/use/configure/language-options#predefined-global-variables
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  // https://typescript-eslint.io/users/configs#recommended
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginReactHooks.configs.flat.recommended,
  // REF: https://prettier.io/docs/integrating-with-linters
  eslintConfigPrettier,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "react/prop-types": "off",
      "no-console": "error",
    },
  },
]);

export default eslintConfig;
