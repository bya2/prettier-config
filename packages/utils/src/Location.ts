import path from "path";

const ROOT = "/";
const CURR = ".";
const PARENT = "..";

export default class Location {
  private inner: string;
  private sep: "/" | "\\";

  constructor(loc: string, sep?: "/" | "\\") {
    this.inner = path.resolve(loc);
    this.sep = sep ?? path.sep;
  }

  [Symbol.toPrimitive](hint: any) {
    if (hint === "string") return this.inner;
    return null;
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

  /**
   * 상위 디렉터리로 이동
   */
  up() {
    this.inner = this[PARENT];
    return this;
  }

  /**
   * 디렉터리 변경
   * @param input 설정할 경로
   * @param sep 경로 분리자
   */
  cd(input: string, sep = this.sep) {
    const [a, ...b] = input.split(sep);

    if (!a) {
      this.inner = path.resolve(path.parse(input).root, ...b);
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
}
