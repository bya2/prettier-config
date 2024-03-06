import { ESLint, Linter } from "eslint";

const ECMA_VERSION:
  | 3
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019
  | 2020
  | 2021
  | 2022
  | 2023
  | 2024
  | "latest" = 3;

const config: ESLint.ConfigData = {
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "prettier",
    //
  ],
  env: {
    [`es${ECMA_VERSION}`]: true,
  },
  ignorePatterns: ["!.*.js"],
  settings: {},
  parserOptions: {
    ecmaVersion: ECMA_VERSION,
    sourceType: "module",
  },
  overrides: [],
};

export default config;
