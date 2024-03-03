import type { Format, Extension, Module } from "./types";

const commonjs = "commonjs";
const module = "module";
const cjs = "cjs";
const esm = "esm";
const iife = "iife";

export const moduleMap: Record<string, Module> = {
  cjs: commonjs,
  commonjs: commonjs,
  node: commonjs,
  es: module,
  esm: module,
  module: module,
  netural: module,
  iife: module,
  browser: module,
};

export const formatMap: Record<string, Format> = {
  cjs: cjs,
  commonjs: cjs,
  node: cjs,
  es: esm,
  esm: esm,
  module: esm,
  netural: esm,
  iife: iife,
  browser: iife,
};

export const extensionMap: Record<Module, Record<Format, Extension>> = {
  commonjs: {
    cjs: ".js",
    esm: ".mjs",
    iife: ".mjs",
  },
  module: {
    cjs: ".cjs",
    esm: ".js",
    iife: ".js",
  },
};
