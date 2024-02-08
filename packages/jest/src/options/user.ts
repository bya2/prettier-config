import type { Config } from "jest";

export interface Custom {
  /**
   * 지정된 모든 프로젝트에서 동시에 테스트를 실행.
   * 모노레포 기능에서 유용
   * Config -> displayName 포함
   */
  projects?: (string | Config)[];

  /**
   * 파일에서 테스트 순서를 무작위로 지정
   *
   * 대체 Flag:
   * - --randomize
   */
  randomize?: boolean;

  /**
   * 리포터 추가
   */
  reporters?: (string | [string, object])[];

  /**
   *
   */
  resolver?: string;

  /**
   * Default: The root of the directory containing your Jest config file or the package.json or the pwd if no package.json is found
   */
  rootDir: string;

  /**
   * Jest가 파일을 검색할 때 사용해야 하는 디렉터리 경로 목록
   */
  roots: string[];

  runner?: string;

  setupFiles: string[];

  setupFilesAfterEnv: string[];
}

const reporters = {
  default: {
    reporters: ["default"],
  },

  summary: {
    reporters: ["summary"],
  },

  githubAction: {
    reporters: [[["github-actions", { silent: false }]], "summary"],
  },
};
