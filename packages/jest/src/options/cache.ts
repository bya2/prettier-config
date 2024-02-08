import type { Config } from "jest";

/**
 * 캐시 사용
 * - 비활성화: --no-cache
 * - 분석: --showConfig
 * - 비우기: --clearCache
 * @param path 캐시된 종속성 정보를 저장할 디렉터리
 */
export default function cache(path: string): Config {
  return {
    cache: true,
    cacheDirectory: path,
  };
}
