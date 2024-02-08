import type { Config } from "jest";

/**
 * 테스트가 실행되는 동안 라벨을 테스트와 함께 출력
 *
 * 관련 CLI 옵션:
 * - --selectProjects <project1> ... <projectN>
 *    - 지정된 프로젝트의 테스트를 실행
 *    - displayName 구성 옵션을 사용하여 각 프로젝트를 식별
 *    - 이 명령 옵션을 사용하는 경우 모든 프로젝트에 displayName 속성 제공 필요
 * - --ignoreProjects <project1> ... <projectN>
 *    - 지정된 프로젝트의 테스트를 무시
 *    - displayName 구성 옵션을 사용하여 각 프로젝트를 식별
 *    - 이 명령 옵션을 사용하는 경우 모든 프로젝트에 displayName 속성 제공 필요
 * @param name
 */
export default function label(name: string): Config {
  return {
    displayName: name,
  };
}
