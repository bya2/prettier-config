import path from "path";
import * as fs from "fs";
import { formatMap, extensionMap, moduleMap } from "./maps";
import type { Options, ErrorOptions, Extension, Format } from "./types";

/**
 * 비동기적으로 파일을 읽고 내용을 Promise로 반환.
 * 인코딩 값은 utf8.
 * @param fp file path
 */
export const readFile = (fp: string): Promise<string> => {
  return new Promise((resolve, rejects) => {
    fs.readFile(fp, { encoding: "utf8" }, (err, data) => {
      if (err) rejects(err);
      else resolve(data);
    });
  });
};

/**
 * 동기적으로 파일을 읽고 내용을 반환.
 * 인코딩 값은 utf8.
 * @param fp file path
 */
export const readFileSync = (fp: string): string => {
  return fs.readFileSync(fp, { encoding: "utf8" });
};

/**
 * 파일이 존재하는지 확인하고 Promise로 반환.
 * @param fp file path
 */
export const existsFile = (fp: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.access(fp, (err) => {
      resolve(!err);
    });
  });
};

/**
 * 동기식으로 파일이 존재하는지 확인.
 */
export const existsFileSync = fs.existsSync;

/**
 * 입력된 값이 객체인지 확인.
 * 입력된 값이 배열이면, 첫 요소가 객체인지 확인.
 * @param expr expression
 */
export const isObject = (expr: any): boolean => {
  return (
    Object.prototype.toString.call(Array.isArray(expr) ? expr[0] : expr) ===
    "[object Object]"
  );
};

/**
 * 현재 작업 디렉터리부터 경로를 절대 경로로 해석하고 반환.
 * @param paths
 */
export const resolve = (...paths: string[]): string => {
  return path.resolve(process.cwd(), ...paths);
};

/**
 * 입력된 값을 업캐스팅하고 반환.
 * @param expr
 */
export const upcast = <T>(expr: T): T => expr;

/**
 * non-nullable 값을 반환.
 * @param value
 * @param errOpts error options
 */
export const ensure = <T>(value: T, errOpts?: ErrorOptions): NonNullable<T> => {
  if (value === undefined || value === null) {
    const err = new Error(
      `Invalid value: ${errOpts?.message || "Value must be defined and not null."}`,
      {
        cause: errOpts?.cause,
      }
    );
    if (errOpts?.code) (err as any).code = errOpts.code;
    throw err;
  }

  return value as NonNullable<T>;
};

/**
 * 매핑된 포맷 값을 반환.
 * @param value
 */
export function getFormat(value: string): Format {
  return ensure(formatMap[value]);
}

/**
 * 소스 모듈 타입(package.json의 type 필드)과 출력 플랫폼을 통해 적절한 JS 확장자를 반환.
 */
export function getExtension({ module, platform }: Options): Extension {
  if (module && platform) {
    module = ensure(moduleMap[module]);
    const format = getFormat(platform);
    return ensure(extensionMap[module][format]);
  } else {
    return ".js";
  }
}

/**
 * 값이 JS 파일 확장자인지 확인.
 * @param value
 */
export function isJSExt(value: string) {
  return value[0] === "." && [".js", ".cjs", ".mjs"].some((e) => value === e);
}

/**
 * 엔트리 포인트, 소스 모듈 타입, 출력 플랫폼을 통해 출력될 번들 파일의 이름을 반환.
 */
export function getOutFile({ entry, module, platform }: Options) {
  if (typeof entry === "undefined") entry = "src/index.js";

  const { name } = path.parse(entry);
  const ext = getExtension({ module, platform });

  console.assert(
    !isJSExt(ext),
    "Invalid extension: JavaScript file extension expected."
  );

  return resolve("dist", `${name}${ext}`);
}
