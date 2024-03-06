const config: import("eslint").ESLint.ConfigData = {
  extends: [
    // @typescript-eslint/eslint-plugin
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic",
    "plugin:@typescript-eslint/stylistic-type-checked",

    // eslint-plugin-import
    "plugin:import/recommended",
    "plugin:import/typescript",

    // eslint-config-prettier
    "prettier",
  ],

  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
};

export default config;
