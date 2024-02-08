import type { Config } from "jest";

interface Options {
  /**
   * 테스트 보고서 요약에 시드를 출력
   */
  showSeed: boolean;
}
export default function print(options: Options): Config {
  return {
    showSeed: options.showSeed,
  };
}
