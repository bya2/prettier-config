// 플랫폼: 소스 코드의 포맷(모듈 타입) -> 확장자
// 포맷: 빌드 결과물의 포맷(모듈 타입) -> 확장자
import type { Options, BOptions } from "../types";

export const build = <T extends Options>(opts: BOptions<T>): Options => {
  return {
    bundle: true,
  };
};
