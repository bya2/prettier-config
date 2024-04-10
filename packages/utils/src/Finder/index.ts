import * as fs from "fs";
import path from "path";
import { type Options, normalize, normalizedFlag } from "./Option";
import {
  memoize,
  // memoizeSync,
  readFileSync,
  requireUncached,
  exists,
  ensure,
} from "..";
import { Loc } from "../Location";

type Func<T = any, R = unknown> = (arg: T) => R;

export function memoizeSync<T>(fn: (arg: any, cb?: Func) => T) {
  const cache = new Map<any, T>();
  return (arg: any, cb?: Func): T => {
    if (!cache.has(arg)) cache.set(arg, fn(arg, cb));
    return cache.get(arg)!;
  };
}

class ConSys {
  memoizeFileExists = memoize(exists);

  memoizeRequireData = memoizeSync((fp, callbackFn) => {
    const data = requireUncached(fp);
    callbackFn?.(data);
    return ensure(data);
  });

  memoizeLoadedData = memoize((fp: string, loader: any) => {
    return loader.load ? loader.load(fp) : loader.loadSync(fp);
  });

  /**
   * 하위 디렉터리부터 지정된 상위 디렉터리까지 탐색하며 일치하는 첫번째 파일의 경로를 반환
   * - 탐색한 파일의 존재 여부를 캐싱
   * - 입력된 키가 없으면, 파일 경로를 반환
   * - 입력된 키가 있으면, 파일 내 데이터에서 키의 존재 여부를 캐싱하고 파일 경로를 반환
   * @param options
   */
  async resolve(options: Options): Promise<string | null> {
    const normalized = normalize(options);

    const currLoc = Loc(normalized.baseDir);

    if (currLoc.includes("node_modules")) {
      throw new Error(
        "[conSys.resolve] Invalid path: `node_modules` is an invalid directory."
      );
    }

    for (; !currLoc.is(normalized.stopDir); currLoc.up()) {
      for (const basename of normalized.files) {
        const fp = path.resolve(currLoc.unwrap(), basename);

        if (await this.memoizeFileExists(fp)) {
          if (!normalized.key) return fp;

          if (
            this.memoizeRequireData(fp, (data) => {
              if (!Object.prototype.hasOwnProperty.call(data, normalized.key)) {
                throw new Error(
                  "[conSys.resolve] Invalid key: No corresponding property for key in config."
                );
              }
            })
          ) {
            return fp;
          }
        }
      }
    }

    return null;
  }

  /**
   * 옵션으로부터 파일의 경로를 받고, 이를 이용해 데이터를 불러와서 경로와 데이터 정보를 가지고 있는 객체를 반환
   * - 파일 경로 탐색
   * - 로더 설정
   * - 데이터 불러오기
   * @param options
   */
  async load(options: Options): Promise<
    | {
        path: string;
        data?: unknown;
      }
    | {
        path?: undefined;
        data?: undefined;
      }
  > {
    const fp = await this.resolve(options);
    if (!fp) {
      throw new Error();
    }

    const loader = {
      test: /\.+/,
      loadSync: (fp: string) => {
        const extname = path.extname(fp);
        if (extname === ".js" || extname === ".cjs") {
          return requireUncached(fp);
        }

        const packageJson = this.memoizeRequireData(fp);
        if (packageJson) {
          return packageJson[options.key!];
        }

        return JSON.parse(readFileSync(fp));
      },
    };

    const data = await this.memoizeLoadedData(fp, loader);

    return {
      path: fp,
      data,
    };
  }
}

export async function loadPkg(cwd: string) {
  const fe = new ConSys();
  const { data } = await fe.load({
    files: ["package.json"],
    stopDir: Loc(cwd)[".."],
  });
  return data || {};
}

export default ConSys;
