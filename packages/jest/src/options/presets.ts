import type { Config } from "jest";

type TSJestPresetName =
  | "ts-jest/presets/default" // .ts,.tsx -> commonjs
  | "ts-jest"
  | "ts-jest/presets/default-legacy"
  | "ts-jest/legacy"
  | "ts-jest/presets/default-esm" // .ts,.tsx -> esm
  | "ts-jest/presets/default-esm-legacy"
  | "ts-jest/presets/js-with-ts" // .ts,.tsx,.js.jsx -> commonjs
  | "ts-jest/presets/js-with-ts-legacy"
  | "ts-jest/presets/js-with-ts-esm" // .ts,.tsx,.js.jsx -> esm
  | "ts-jest/presets/js-with-ts-esm-legacy"
  | "ts-jest/presets/js-with-babel" // .ts,.tsx -> commonjs[ts-jest] & .js.jsx -> ?[babel-jest]
  | "ts-jest/presets/js-with-babel-legacy"
  | "ts-jest/presets/js-with-babel-esm" // .ts,.tsx -> esm[ts-jest] & .js.jsx -> ?[babel-jest]
  | "ts-jest/presets/js-with-babel-esm-legacy";

type Preset<T> = Record<"preset", T>;

export function tsJest(
  module: "commonjs" | "module",
  js?: boolean,
  babel?: boolean
): Preset<TSJestPresetName> {
  return {
    preset:
      module === "commonjs"
        ? js
          ? babel
            ? "ts-jest/presets/js-with-babel"
            : "ts-jest/presets/js-with-ts"
          : "ts-jest"
        : js
          ? babel
            ? "ts-jest/presets/js-with-babel-esm"
            : "ts-jest/presets/js-with-ts-esm"
          : "ts-jest/presets/default-esm",
  };
}
