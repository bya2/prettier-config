export type Platform = "browser" | "node" | "neutral";
export type Module = "commonjs" | "module";
export type Mode = "production" | "developement" | "test";
export type Format = "cjs" | "esm" | "iife";
export type Extension = ".js" | ".cjs" | ".mjs" | ".global.js";

export interface Options {
  entry?: string;
  format?: Format;
  mode?: Mode;
  module?: Module;
  platform?: Platform;
}

export interface ErrorOptions {
  cause?: unknown;
  code?: number;
  message?: string;
}
