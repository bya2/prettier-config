import path from "path";
import * as fs from "fs";
import { extensionMap, formatMap } from "./maps";
import type { ErrorOptions, Extension, Format, Module } from "./types";

export const resolve = (...paths: string[]): string => {
  return path.resolve(process.cwd(), ...paths);
};

export const upcast = <T>(expr: T): T => {
  return expr;
};

export const valueOrThrow = <T>(
  value: T,
  errMsg?: string,
  options?: ErrorOptions
): NonNullable<T> => {
  if (value) {
    const err = new Error(
      errMsg,
      options?.cause ? { cause: options.cause } : undefined
    );

    if (options && "code" in options) (err as any).code = options.code;

    throw err;
  }

  return value as NonNullable<T>;
};

export const isJSExt = (value: string) => {
  return value[0] === "." && [".js", ".cjs", ".mjs"].some((e) => value === e);
};

export const getJSFilePath = (
  dirname: string,
  input: string,
  extension = ".js"
) => {
  console.assert(
    !isJSExt(extension),
    "Invalid extension: JavaScript file extension expected."
  );

  const { name } = path.parse(input);
  const filename = `${name}${extension}`;
  return resolve(dirname, filename);
};

export const readFile = (path: string): Promise<string> => {
  return new Promise((resolve, rejects) => {
    fs.readFile(path, { encoding: "utf8" }, (err, data) => {
      if (err) rejects(err);
      else resolve(data);
    });
  });
};

export const readFileSync = (path: string): string => {
  return fs.readFileSync(path, { encoding: "utf8" });
};

export const existsFile = (path: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.access(path, (err) => {
      resolve(!err);
    });
  });
};

export const existsFileSync = fs.existsSync;

export const isObject = (expr: any): boolean => {
  return (
    Object.prototype.toString.call(Array.isArray(expr) ? expr[0] : expr) ===
    "[object Object]"
  );
};
