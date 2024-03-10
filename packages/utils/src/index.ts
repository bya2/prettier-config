import path from "path";
import * as fs from "fs";
import { moduleMap, formatMap, extensionMap } from "./maps";
import type {
  Options,
  ErrorOptions,
  Extension,
  Format,
  Module,
  Platform,
} from "./types";

/**
 * Resolve from current working directory.
 * @param paths
 */
export const resolve = (...paths: string[]): string => {
  return path.resolve(process.cwd(), ...paths);
};

/**
 * Make a upcast.
 * @param implementation
 */
export const upcast = <T>(implementation: T): T => implementation;

/**
 * Returns non-nullable value.
 * @param value
 * @param options error options
 */
export const get = <T>(value: T, options?: ErrorOptions): NonNullable<T> => {
  if (value === undefined || value === null) {
    const err = new Error(options?.message || "", { cause: options?.cause });
    if (options?.code) (err as any).code = options.code;
    throw err;
  }

  return value as NonNullable<T>;
};

// #### Options ####

/**
 * Returns mapped format type.
 * @param input
 */
export const format = (input: string): Format => {
  return get(formatMap[input]);
};

/**
 * Returns javascript extension with source module type(["type"] field of package.json) and output platform.
 * @param options
 */
export const extension = (
  options: Pick<Options, "module" | "platform">
): Extension => {
  return get(
    extensionMap[get(moduleMap[options.module])][format(options.platform)]
  );
};

export const outFile = ({
  entry,
  module,
  platform,
}: Pick<Options, "entry" | "module" | "platform">) => {
  const { name } = path.parse(entry);
  const ext = extension({ module, platform });
  return resolve("dist", `${name}${ext}`);
};

export const splitting = () => {};

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
