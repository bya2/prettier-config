import type { Config } from "jest";

/**
 * 감시 모드 활성화
 *
 * 대체 CLI:
 * - --watch
 * - --watchAll
 * - --watchman
 *
 * 관련 CLI:
 * - --onlyChanged
 *    - 현재 리포지토리(디렉터리 혹은 저장소)에서 변경된 파일을 기반으로 실행할 테스트를 식별
 *    - git/hg 리포지토리에서 테스트를 실행 중인 경우에만 작동
 *    - 정적 종속성 그래프가 필요
 * - --maxWorkers=num | string
 * @param onlyChanged
 */
export default function watch(onlyChanged: boolean): Config {
  const mode = onlyChanged ? { watch: true } : { watchAll: true };
  return {
    ...mode, // CLI
    watchman: true, // CLI
    watchPathIgnorePatterns: [],
    watchPlugins: [],
  };
}
