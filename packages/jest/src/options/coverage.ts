import type { Config } from "jest";

type CoverageProvider = "babel" | "v8";

interface Options {
  /**
   * 테스트 파일은 일반적으로 코드 커버리지 수집에서 무시.
   * 이 동작을 덮어쓰고 그렇지 않으면 무시되는 파일을 코드 커버리지에 포함 가능.
   */
  forceMatch?: string[];

  /**
   * 커버리지 정보를 수집할 파일 집합을 나타내는 배열(글로브 패턴).
   */
  from?: string[];

  /**
   * 커버리지 수집 스킵 배열(정규식 패턴).
   */
  ignore?: string[];

  output?: {
    /**
     *  커버리지 파일을 출력할 디렉터리
     */
    dir?: string;
  };

  /**
   * 코드를 측정해서 커버리지를 수집할 공급자.
   * 'babel' 또는 'v8'
   */
  provider?: CoverageProvider;
}

const defaults: Options = {
  forceMatch: [],
  from: ["**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
  ignore: ["/node_modules/"],
  output: {
    dir: undefined,
  },
  provider: "v8",
};

/**
 * 커버리지 수집 활성화
 * @param options
 */
const coverage = (options: Options = defaults): Config => {
  return {
    collectCoverage: true,
    collectCoverageFrom: options.from,
    coverageDirectory: options.output?.dir,
    coveragePathIgnorePatterns: options.ignore,
    coverageProvider: options.provider,
    coverageReporters: ["clover", "json", "lcov", "text"],
    forceCoverageMatch: options.forceMatch,
  };
};

export default coverage;

// coverageThreshold: threshold
// ? {
//     global: {
//       branches: 50,
//       functions: 50,
//       lines: 50,
//       statements: 50,
//     },
//     "./src/components/": {
//       branches: 40,
//       statements: 40,
//     },
//     "./src/reducers/**/*.js": {
//       statements: 90,
//     },
//     "./src/api/very-important-module.js": {
//       branches: 100,
//       functions: 100,
//       lines: 100,
//       statements: 100,
//     },
//   }
// : undefined,
