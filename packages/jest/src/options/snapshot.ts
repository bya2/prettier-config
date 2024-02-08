import type { Config } from "jest";

interface Options {
  format?: object;

  /**
   * 테스트<->스냅샷 경로를 확인할 수 있는 모듈의 경로
   * 이 구성 옵션을 사용하면 Jest가 디스크에 스냅샷 파일을 저장하는 위치를 사용자 지정 가능
   */
  resolver?: string;

  /**
   * 스냅샷 테스트에 사용해야 하는 스냅샷 직렬화 모듈의 경로 목록
   * Jest에는 내장 JavaScript 유형, HTML 요소(Jest 20.0.0+), ImmutableJS(Jest 20.0.0+) 및 React 요소에 대한 기본 직렬화기가 존재
   */
  serializers?: string[];
}

export default function snapshot(options: Options): Config {
  return {
    snapshotFormat: options.format || {
      escapeString: false,
      printBasicPrototype: false,
    },
    snapshotResolver: options.resolver,
    snapshotSerializers: options.serializers || [],
  };
}
