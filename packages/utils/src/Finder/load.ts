import path from "path";
import * as fs from "fs";
import { ensure, memoize, memoizeSync, readFileSync } from "..";
import { Loc } from "../Location";
import { FAIL_MEMOIZATION } from "../constants";

export async function loadJSON(fp: string) {
  try {
    const contents = await fs.promises.readFile(fp, "utf8");
    return JSON.parse(contents);
  } catch (err) {
    throw err instanceof Error
      ? new Error(
          `Failed to parse ${path.relative(process.cwd(), fp)}: ${err.message}`
        )
      : err;
  }
}

const normalizedFlag = Symbol("normalizedFlag");

export class Options {
  filename: string;
  key: string;
  cwd: string;
  stopDir: string;

  [normalizedFlag]?: boolean;

  /**
   * 옵션
   * - 파일 이름
   * - 파일 데이터의 키
   * - 파일 탐색 범위
   * @param options
   */
  constructor(options: Partial<Options>) {
    this.filename = path.basename(ensure(options.filename));
    this.key = options.key || "";
    this.cwd = options.cwd ? Loc(options.cwd)["."] : process.cwd();
    this.stopDir = options.stopDir
      ? Loc(options.stopDir)["."]
      : Loc(this.cwd)[".."];
  }

  /**
   * 편의성을 고려한 인스턴스 생성
   * @param filename 파일 이름
   * @param key 파일 데이터의 키
   * @param options 나머지 옵션
   */
  static from(
    filename: string,
    key: string,
    options?: Omit<Options, "filename" | "key">
  ): Options {
    return new Options({ filename, key, ...Object.assign({}, options) });
  }
}

export default class Finder {
  memoizeExistsFlag = memoizeSync(fs.existsSync);

  memoizeConfigData = memoizeSync((fp: string, key?: string) => {
    if (!key) {
      throw new Error(FAIL_MEMOIZATION);
    }

    const data = require(fp);
    delete require.cache[data];
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      return data;
    }
    return undefined;
  });

  memoizeLoader = memoize((fp: string, loader: any) => {
    return loader.load ? loader.load(fp) : loader.loadSync(fp);
  });

  resolve(options: Options): string | null {
    if (!options[normalizedFlag]) {
      options = new Options(options);
    }

    for (
      let cwd = Loc(options.cwd);
      !cwd.is(options.stopDir) || !cwd.is("node_modules");
      cwd.up()
    ) {
      const fp = path.resolve(cwd["."], options.filename);

      const existsFlag = this.memoizeExistsFlag(fp);
      if (!existsFlag) {
        continue;
      }

      if (!options.key || path.basename(fp) !== "package.json") {
        return fp;
      }

      const metadata = this.memoizeConfigData(fp, options.key);
      if (typeof metadata !== "undefined") {
        return fp;
      }
    }

    return null;
  }

  async load(
    filename: string,
    key: string,
    etc: Omit<Options, "filename" | "key">
  ) {
    const options = Options.from(filename, key, etc);

    const fp = this.resolve(options);
    if (!fp) {
      return {};
    }

    const defaultLoader = {
      test: /\.+/,
      loadSync: (fp: string) => {
        // 확장자가 js,cjs면 require
        const extname = path.extname(fp);
        if (extname === ".js" || extname === ".cjs") {
          delete require.cache[fp];
          return require(fp);
        }

        const pkgJson = this.memoizeConfigData(fp);
        if (pkgJson) {
          return pkgJson[options.key];
        }

        const data = JSON.parse(readFileSync(fp));
        return data;
      },
    };

    let data = await this.memoizeLoader(fp, defaultLoader);

    return {
      path: fp,
      data,
    };
  }
}

export const getLoader = () => new Finder();
