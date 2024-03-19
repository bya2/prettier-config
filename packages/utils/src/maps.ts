import {
  COMMONJS,
  MODULE,
  CJS,
  ESM,
  IIFE,
  DOT_JS,
  DOT_CJS,
  DOT_MJS,
  DOT_GLOBAL_DOT_JS,
} from "./constants";
import type { Format, Extension, Module } from "./types";

export const moduleMap: Record<string, Module> = {
  cjs: COMMONJS,
  commonjs: COMMONJS,
  node: COMMONJS,
  es: MODULE,
  esm: MODULE,
  module: MODULE,
  netural: MODULE,
  iife: MODULE,
  browser: MODULE,
};

export const formatMap: Record<string, Format> = {
  cjs: CJS,
  commonjs: CJS,
  node: CJS,
  es: ESM,
  esm: ESM,
  module: ESM,
  netural: ESM,
  iife: IIFE,
  browser: IIFE,
};

export const extensionMap: Record<Module, Record<Format, Extension>> = {
  commonjs: {
    cjs: DOT_JS,
    esm: DOT_MJS,
    iife: DOT_GLOBAL_DOT_JS,
  },
  module: {
    cjs: DOT_CJS,
    esm: DOT_JS,
    iife: DOT_GLOBAL_DOT_JS,
  },
};
