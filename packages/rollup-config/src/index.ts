import type { ExternalOption, ModuleFormat, RollupOptions } from "rollup";
import { resolveDist, getOutputExt, isES } from "./utils";
import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

// *Plan*
// Code splitting -> built-in
// Sourcemap -> built-in

// Clean

// Resolve -> node-resolve
// JSON -> json
// Convert ES6 -> commonjs
// Transpile -> typescript, babel, swc
// declaration -> dts
// minify -> terser

// shims

// Format (esm, cjs)

type ModuleType = "commonjs" | "module";

const outputFormats: ModuleFormat[] = ["es", "cjs"];

const external: ExternalOption = [];
const extensions = [
  ".mts",
  ".cts",
  ".ts",
  ".mjs",
  ".cjs",
  ".js",
  ".json",
  ".node",
];

const overridableDefaults = {
  buildjs: {
    preserve: false,
    sourcemap: false,
    resolve: false,
    commonjs: true,
    ts: false,
    minify: false,
  },
  builddts: {
    sourcemap: false,
    seperate: false,
  },
};

export type BuildJSOptions = Partial<typeof overridableDefaults.buildjs>;
export type BuildDTSOptions = Partial<typeof overridableDefaults.builddts>;

export const generateJSBundle = (
  input: string,
  module: ModuleType,
  format: ModuleFormat,
  options?: BuildJSOptions
): RollupOptions => {
  const outputExt = (format: ModuleFormat) => getOutputExt(module, format);

  const active = {
    ...overridableDefaults.buildjs,
    ...options,
  };

  const { name } = path.parse(input);
  const ext = outputExt(format);

  return {
    input,
    external,
    output: {
      format,
      sourcemap: active.sourcemap,
      ...(active.preserve && isES(format)
        ? {
            dir: "dist",
            entryFileNames: `[name]${ext}`,
            preserveModules: true,
            preserveModulesRoot: "src",
          }
        : {
            file: resolveDist(`${name}${ext}`),
          }),
    },
    plugins: [
      active.resolve &&
        nodeResolve({
          extensions,
        }),
      json(),
      active.commonjs && commonjs(),
      active.ts && typescript(),
      active.minify && terser(),
    ].filter(Boolean),
  };
};

export const generateDTSBundle = (
  input: string,
  module: ModuleType,
  format: ModuleFormat,
  options?: BuildDTSOptions
): RollupOptions => {
  const outputExt = (format: ModuleFormat) => getOutputExt(module, format);

  const active = {
    ...overridableDefaults.builddts,
    ...options,
  };

  let { dir, name } = path.parse(input);
  dir = active.seperate ? resolveDist(dir) : "dist";
  const ext = outputExt(format);

  return {
    input,
    output: {
      file: `${dir}${name}${ext}`,
      format,
    },
    plugins: [dts()],
  };
};

export const generateJSByFormat = (
  entry: string,
  module: ModuleType,
  options?: BuildJSOptions
): RollupOptions[] => {
  return outputFormats.map((format) => {
    return generateJSBundle(entry, module, format, options);
  });
};

export const generateDTSByFormat = (
  entry: string,
  module: ModuleType,
  options?: BuildDTSOptions
): RollupOptions[] => {
  return outputFormats.map((format) => {
    return generateDTSBundle(entry, module, format, options);
  });
};
