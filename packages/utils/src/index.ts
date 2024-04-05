import * as fs from "fs";
import path from "path";
import { formatMap, extensionMap, moduleMap } from "./maps";
import type { Options, ErrorOptions, Extension, Format } from "./types";

const encoding = "utf8";

export function parseJSONC(data: any) {
  try {
    // return new Function("return" + strip(data).trim());
    return new Function("return" + "".trim());
  } catch {
    return {};
  }
}

/**
 * 캐싱 없이 모듈 데이터를 불러와 반환합니다.
 * @param moduleId module id or file path
 */
export function requireUncached(moduleId: string) {
  const filename = require.resolve(moduleId);
  require.cache[filename] && delete require.cache[filename];
  return require(moduleId);
}

/**
 * 하나의 디렉터리에서 ["package.json"] 파일의 데이터를 반환합니다.
 * @param cwd
 */
export async function loadPkg(cwd: string = process.cwd()) {
  if (cwd === "node_modules") {
    throw new Error("[loadPkg] `node_modules` is an invalid directory.");
  }

  const fp = path.resolve(cwd, "package.json");
  if (await exists(fp)) {
    return requireUncached(fp);
  } else {
    throw new Error("[loadPkg] No `package.json` file in the directory.");
  }
}

/**
 * 비동기적 메모이제이션 및 반환.
 * @param fn
 */
export function memoize<T>(fn: (key: any, ...args: any[]) => Promise<T>) {
  const map = new Map<any, T>();
  return async (key: any, ...args: any[]): Promise<T> => {
    if (!map.has(key)) {
      map.set(key, await fn(key, ...args));
    }
    return map.get(key)!;
  };
}

/**
 * 동기적 메모이제이션 및 반환.
 * @param fn
 */
export function memoizeSync<T>(fn: (key: any, ...args: any[]) => T) {
  const map = new Map<any, T>();
  return (key: any, ...args: any[]): T => {
    if (!map.has(key)) {
      map.set(key, fn(key, ...args));
    }
    return map.get(key)!;
  };
}

/**
 * 비동기적으로 파일을 읽고 내용을 Promise로 반환.
 * 인코딩 값은 utf8.
 * @param fp file path
 */
export const readFile = (fp: string): Promise<string> => {
  return fs.promises.readFile(fp, { encoding });
};

/**
 * 동기적으로 파일을 읽고 내용을 반환.
 * 인코딩 값은 utf8.
 * @param fp file path
 */
export const readFileSync = (fp: string): string => {
  return fs.readFileSync(fp, { encoding });
};

/**
 * 파일이 존재하는지 확인하고 Promise로 반환.
 * @param fp file path
 */
export const exists = (fp: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.access(fp, (err) => {
      resolve(!err);
    });
  });
};

/**
 * 동기식으로 파일이 존재하는지 확인.
 */
export const existsSync = fs.existsSync;

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
 * 업캐스팅을 해서 그대로 반환합니다.
 * @param expr
 */
export const upcast = <T>(expr: T): T => expr;

/**
 * 입력된 값의 non-nullable 값을 반환합니다.
 * 입력된 값이 `undefined` 혹은 `null`이면 에러를 생성해서 발생시킵니다.
 * @param expr
 * @param errOpts error options
 */
export const ensure = <T>(expr: T, errOpts?: ErrorOptions): NonNullable<T> => {
  if (expr === undefined || expr === null) {
    const err = new Error(
      `Invalid value: ${errOpts?.message || "Value must be defined and not null."}`,
      {
        cause: errOpts?.cause,
      }
    );
    if (errOpts?.code) (err as any).code = errOpts.code;
    throw err;
  }

  return expr!;
};

/**
 * 조건을 만족하면 입력한 값을 반환하고, 아니면 ["undefined"]를 반환.
 * @param condition T | T[]
 * @param value
 */
export function place<T>(
  value: T,
  condition: number | boolean | ((value: T) => unknown)
): T | undefined {
  return (typeof condition === "function" ? condition(value) : condition)
    ? value
    : undefined;
}

/**
 * 매개변수인 객체에서 ["undefined"]나 ["null"] 값인 속성을 필터링해서 반환.
 * @param obj
 */
export function filter<T extends object>(obj: T): T {
  return Object.entries(obj)
    .filter(([_, value]) => {
      return value !== undefined || value !== null;
    })
    .reduce((map, [key, value]) => {
      map[key] = value;
      return map;
    }, {} as any) as T;
}

/**
 * 매핑된 포맷 값을 반환.
 * @param value
 */
export function mapFormat(value: string): Format {
  return ensure(formatMap[value]);
}

/**
 * 소스 모듈 타입(package.json의 type 필드)과 출력 플랫폼을 통해 매핑하여 적절한 JS 확장자를 반환.
 */
export function mapExtension({ module, platform }: Options): Extension {
  if (module && platform) {
    module = ensure(moduleMap[module]);
    const format = mapFormat(platform);
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
  const ext = mapExtension({ module, platform });

  console.assert(
    !isJSExt(ext),
    "Invalid extension: JavaScript file extension expected."
  );

  return resolve("dist", `${name}${ext}`);
}
