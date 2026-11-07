/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const prettierConfig = {
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 90,
  importOrder: ["^(react/(.*)$)|^(react$)", "<THIRD_PARTY_MODULES>", "", "^[./]"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderCaseSensitive: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  tailwindFunctions: ["tv"],
};

export default prettierConfig;
