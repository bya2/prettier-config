// T
export type Platform = "browser" | "node" | "neutral";
export type Module = "commonjs" | "module";
export type Mode = "production" | "developement" | "test";
export type Format = "cjs" | "esm" | "iife";
export type Extension = ".js" | ".cjs" | ".mjs";

interface Options {
  entry: string;
  platform: Platform;
  module: Module;
  mode: Mode;
  format: Format;
}

interface ErrorOptions {
  message?: string;
  cause?: unknown;
  code?: number;
}
