import {
  BuildContext,
  BuildOptions,
  BuildResult,
  SameShape,
  TransformOptions,
  TransformResult,
} from "esbuild";

export type TInput = string | Uint8Array;

export type Options = BuildOptions;
export type BOptions<T extends BuildOptions> = SameShape<BuildOptions, T>;
export type TOptions<T extends TransformOptions> = SameShape<
  TransformOptions,
  T
>;

export type Result<T> = Promise<BuildResult<T>>;
export type Context<T> = Promise<BuildContext<T>>;
export type TResult<T> = Promise<TransformResult<T>>;

export type Platform = "browser" | "node" | "neutral";
export type Module = "commonjs" | "module";
export type Mode = "production" | "developement" | "test";
export type Format = "cjs" | "esm" | "iife";
export type Extension = ".js" | ".cjs" | ".mjs";

export type Entry =
  | string
  | string[]
  | Record<string, string>
  | { in: string; out: string }[];
