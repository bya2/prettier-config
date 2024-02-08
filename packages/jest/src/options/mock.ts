import type { Config } from "jest";

interface Options {
  /**
   * 모든 테스트 전에 모의 호출, 인스턴스, 컨텍스트 및 결과를 자동으로 삭제
   * 각 테스트 전에 jest.clearAllMocks()를 호출하는 것과 동일
   * 모의 구현은 제거되지 않음
   */
  clear?: boolean;

  /**
   * 모든 테스트 전에 Mock 상태를 자동으로 리셋
   * 각 테스트 전에 jest.resetAllMocks()를 호출하는 것과 동일
   */
  reset?: boolean;

  /**
   * 모든 테스트 전에 Mock 상태와 구현을 자동으로 복원
   * 각 테스트 전에 jest.restoreAllMocks()를 호출하는 것과 동일
   */
  restore?: boolean;
}

export default function mock(options: Options): Config {
  return {
    automock: true, // 테스트에서 가져온 모든 모듈을 자동으로 Mocking
    clearMocks: options.clear,
    resetMocks: options.reset,
    restoreMocks: options.restore,
  };
}
