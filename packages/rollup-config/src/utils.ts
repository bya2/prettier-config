import path from "path";
import type { ModuleFormat } from "rollup";

export const resolveSrc = (...paths: string[]) => {
  return path.resolve(process.cwd(), "src", ...paths);
};

export const resolveDist = (...paths: string[]) => {
  return path.resolve(process.cwd(), "dist", ...paths);
};

export const isCJS = (format: ModuleFormat) => {
  return format === "cjs" || format === "commonjs";
};

export const isES = (format: ModuleFormat) => {
  return format === "es" || format === "esm" || format === "module";
};

export const isIIFE = (format: ModuleFormat) => {
  return format === "iife";
};

export const getOutputExt = (
  module: "commonjs" | "module",
  format: ModuleFormat
): string => {
  if (isES(format)) return module === "module" ? ".js" : ".mjs";
  if (isCJS(format)) return module === "commonjs" ? ".js" : ".cjs";
  throw new Error();
};
