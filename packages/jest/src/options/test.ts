import type { Config } from "jest";

export const react: Config = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: "https://jestjs.io/",
    userAgent: "Agent/007",
    customExportConditions: ["react-native"],
  },
};

export const browser: Config = {};

export const node: Config = {
  testEnvironment: "node",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};

export default function test(env: "node" | "browser" | "react"): Config {
  const configMap = {
    node,
    browser,
    react,
  };

  return {
    ...configMap[env],
    testFailureExitCode: 1,
    testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)",
    ],
    testPathIgnorePatterns: ["/node_modules/"],
    testResultsProcessor: undefined,
    testRunner: "jest-circus/runner",
    testTimeout: 5000, //input
  };
}

export const custom: Config = {
  /**
   * 커스텀 시퀀서를 사용
   */
  testSequencer: "path/to/custom-sequencer.js",
};

export function time(): Config {
  return {
    /**
     * 테스트가 느린 것으로 간주되는 시간(초)
     */
    slowTestThreshold: 5,
  };
}

export function limit(): Config {
  return {
    /**
     * test.concurrent를 사용할 때 동시에 실행할 수 있는 테스트의 수를 제한하는 숫자
     * 이 제한을 초과하는 모든 테스트는 슬롯이 해제되면 대기열에 대기하고 실행
     */
    maxConcurrency: 5,

    /**
     * 테스트 실행을 위해 워커 풀이 생성할 최대 워커 수를 지정
     * 단일 실행 모드에서는 기본값은 머신에서 사용 가능한 코어 수에서 메인 스레드용 코어 수를 뺀 수.
     * 감시 모드에서는 기본값이 머신에서 사용 가능한 코어의 절반으로 설정되어 Jest가 눈에 거슬리지 않고 머신을 멈추지 않도록 함.
     * CI와 같이 리소스가 제한된 환경에서는 이 값을 조정하는 것이 유용할 수 있지만 대부분의 사용 사례에서는 기본값이 적절할 것입니다.
     */
    maxWorkers: undefined,
  };
}
