import type { Config } from "jest";

interface Options {
  /**
   * 사용되지 않는 API를 호출하면 에러 메세지 출력
   */
  errorOnDeprecated?: boolean;
}

export default function message(options: Options): Config {
  return {
    errorOnDeprecated: options.errorOnDeprecated,
  };
}

// openHandlesTimeout: 1000,

// errorOnDeprecated: true,

// bail: 1,
