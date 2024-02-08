import type { Config } from "jest";

const DEFAULT_EXTENSIONS = [
  "js",
  "mjs",
  "cjs",
  "jsx",
  "ts",
  "tsx",
  "json",
  "node",
];

interface Options {
  fileExtensions?: string[];
  nameMapper?: Record<string, string>;
  reset?: boolean;
}

export default function module(options: Options): Config {
  return {
    moduleDirectories: ["node_modules"],
    moduleFileExtensions: options.fileExtensions || DEFAULT_EXTENSIONS,
    moduleNameMapper: options.nameMapper || {},
    resetModules: options.reset,
  };
}
