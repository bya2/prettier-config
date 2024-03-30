import * as fs from "fs";
import path from "path";
import { ROOT, CURR, PARENT } from "../constants";

type Sep = "/" | "\\";

class Location {
  private inner: string;
  private sep: "/" | "\\";

  constructor(loc: string = process.cwd(), sep: Sep = path.sep) {
    this.inner = path.resolve(loc);
    this.sep = sep;
  }

  get [ROOT]() {
    return path.parse(this.inner).root;
  }

  get [CURR]() {
    return this.inner;
  }

  get [PARENT]() {
    return path.dirname(this.inner);
  }

  get basename() {
    return path.basename(this.inner);
  }

  get filename() {
    return path.parse(this.inner).name;
  }

  get extname() {
    return path.extname(this.inner);
  }

  unwrap() {
    return this.inner;
  }

  /**
   * 내부 값과 같은 지 비교
   * @param path filename | dirname
   */
  is(path: string) {
    return this.inner === path;
  }

  /**
   * 상위 디렉터리로 이동
   */
  up() {
    this.inner = path.dirname(this.inner);
    return this;
  }

  /**
   * 디렉터리 변경(Change directory)
   * @param loc 설정할 경로
   * @param sep 경로 분리자
   */
  cd(loc: string, sep = this.sep) {
    const [a, ...b] = loc.split(sep);

    if (!a) {
      this.inner = path.resolve(path.parse(loc).root, ...b);
    } else {
      switch (a) {
        case CURR:
        case PARENT:
          this.inner = path.resolve(this[a], ...b);
          break;
        default:
          this.inner = path.resolve(this.inner, ...b);
      }
    }

    return this;
  }

  exists(): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(this.inner, (err) => {
        resolve(!err);
      });
    });
  }

  existsSync(): boolean {
    return fs.existsSync(this.inner);
  }

  includes(target: string, sep = this.sep): boolean {
    return this.inner.split(sep).includes(target);
  }
}

/**
 * 내부 값으로 경로를 가진 Location 인스턴스를 반환
 * @param path 경로
 * @param sep 분리자
 */
export const Loc = (path: string, sep?: Sep) => new Location(path, sep);

export default Location;
