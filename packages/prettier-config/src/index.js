/**
 * @typedef {import("prettier").Config} Config
 * @typedef {Record<"packagejson" | "organizeImports", boolean>} PluginOptions
 */

/** @type {Config} */
export const defaults = {
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  proseWrap: "preserve",
  endOfLine: "auto",
  singleAttributePerLine: true,
};

/** @type {PluginOptions} */
const basePlugins = {
  organizeImports: false,
  packagejson: false,
};

/**
 * @param {Config} options
 * @param {PluginOptions} plugins
 * @returns {Config}
 */
export const generate = (options, plugins) => {
  const config = {
    ...defaults,
    ...options,
  };

  const active = {
    ...basePlugins,
    ...plugins,
  };

  return {
    ...config,
    plugins: [
      active.organizeImports && "prettier-plugin-organize-imports",
      active.packagejson && "prettier-plugin-packagejson",
    ].filter(Boolean),
  };
};
