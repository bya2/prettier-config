import type { BuildOptions } from "esbuild";

export const transformation: BuildOptions = {
  /**
   * 빌드 결과물의 환경(노드, 브라우저) 호환성을 설정
   * - 이 환경에서는 너무 새로운 자바스크립트 구문을 해당 환경에서 작동할 수 있는 이전 자바스크립트 구문으로 변환하도록 esbuild에 지시.
   * - 예를 들어, ?? 연산자는 Chrome 80에 도입되었으므로 esbuild는 Chrome 79 이하를 대상으로 할 때 동등한(그러나 더 자세한) 조건 표현식으로 변환합니다.
   */
  target: [],
};

export const optimization: BuildOptions | Record<string, BuildOptions> = {
  /**
   * Supported by: Build and Transform
   * 전역 식별자를 상수 표현식으로 대체하는 방법을 제공(코드 자체를 변경하지 않고도 빌드 간에 일부 코드의 동작을 변경하는 방법)
   *
   * - 각 정의 항목은 식별자를 표현식이 포함된 코드 문자열에 매핑
   * - 문자열의 표현식은 JSON 객체(null, 부울, 숫자, 문자열, 배열 또는 객체) or 단일 식별자
   * - 배열 및 객체 이외의 대체 표현식은 인라인으로 대체되므로 상수 폴딩에 참여 가능
   * - 배열 및 객체 대체 표현식은 변수에 저장된 다음 인라인으로 대체되는 대신 식별자를 사용하여 참조되므로 값의 반복 복사본 대체를 피할 수 있지만 값이 상수 폴딩에 참여하지 않습니다.
   *
   * - 문자열 리터럴로 무언가를 바꾸려면 각 정의 항목이 코드를 포함하는 문자열에 매핑되므로 esbuild에 전달되는 대체 값 자체에 따옴표가 포함되어야 한다는 점에 유의.
   * - 따옴표를 생략하면, 대체 값을 식별자로 지정
   */
  define: {
    DEBUG: "true",
  },

  /**
   * Drop
   * - Supported by: Build and Transform
   * - 빌드 전 소스 코드를 편집해서 특정 구문을 삭제(현재 삭제할 수 있는 것은 ['debugger'], ['console'])
   */
  drop: [],

  /**
   * Drop Labels(Supported by: Build and Transform)
   * - 빌드 전 소스 코드를 편집해서 특정 레이블 이름으로 레이블(continue label 등)이 지정된 문을 삭제
   */
  dropLabels: [],

  /**
   * Ignore Annotations
   * - Supported by: Build and Transform
   * - 자바스크립트가 동적 언어라서 컴파일러가 사용하지 않는 코드를 식별하는 것이 매우 어려울 때가 있으므로, 커뮤니티에서는 어떤 코드가 side-effect가 없는 것으로 간주되어 제거할 수 있는지 컴파일러에 알려주는 특정 어노테이션이 개발됨.
   * - esbuild에서 지원하는 side-effect 어노테이션은 ['\/* @__PURE__ *\/'], sideEffects field in package.json
   */
  ignoreAnnotations: true,

  /**
   * Inject
   * - Supported by: Build
   * - 전역 변수를 다른 파일에서 가져온 것으로 자동 대체
   * - 사용자가 제어하지 않는 코드를 새로운 환경에 맞게 조정하는 데 유용
   * - 사용 방법은 문서 참조
   */
  inject: [""],

  /**
   * Keep names
   * - Supported by: Build and Transform
   * - 축소된 코드에서도 원래 이름 값을 유지
   *
   * - JavaScript에서 함수와 클래스의 이름 속성은 기본적으로 소스 코드에서 가까운 식별자로 설정
   * - 이러한 구문 형식은 모두 함수의 이름 속성을 "fn"으로 설정
   *
   * - 그러나 ['minify'] 옵션에서는 코드 크기를 줄이기 위해 심볼의 이름을 바꾸고 번들링에서는 충돌을 피하기 위해 심볼의 이름을 바꿔야 할 때가 있음.
   * - 이 경우 대부분 이름 속성의 값이 변경됩니다. 이름 속성은 일반적으로 디버깅에만 사용되기 때문에 일반적으로는 괜찮습니다. 그러나 일부 프레임워크는 등록 및 바인딩 목적으로 이름 속성에 의존합니다. 이 경우 이 옵션을 활성화하면 축소된 코드에서도 원래 이름 값을 유지할 수 있습니다:
   */
  keepNames: true,

  /**
   * Quoted properties
   * - 기본적으로 esbuild는 문자열 리터럴의 내용을 수정 안함
   * - 즉, 개별 프로퍼티를 문자열로 따옴표로 묶으면 프로퍼티 망글링을 방지할 수 있습니다. 그러나 이 기능을 사용하려면 모든 곳에서 특정 프로퍼티에 따옴표를 사용하거나 따옴표를 사용하지 않는 일관된 방식을 사용해야 합니다. 예를 들어 print({ foo_: 0 }.foo_)는 print({ a: 0 }.a)로 망글링되지만 print({ 'foo_': 0 }['foo_'])는 망글링되지 않습니다.
   */
  // mangleQuoted,

  /**
   * #### Mangle Props ####
   * Supported by: Build and Transform
   * - 정규식과 일치하는 모든 프로퍼티의 이름을 자동으로 변경
   * - 코드에서 특정 속성 이름을 축소하여 생성된 코드를 작게 만들거나 코드의 의도를 다소 난독화하려는 경우에 사용
   */
  MangleProps: {
    /**
     * 정규식과 일치하는 모든 프로퍼티의 이름을 자동으로 변경
     */
    mangleProps: /_$/,

    /**
     *
     */
    mangleQuoted: true,

    /**
     *
     */
    reserveProps: /^_/,
  },

  /**
   * #### Minify ####
   * Supported by: Build and Transform
   * - 활성화하면 빌드 결과물을 축소
   * - 크기가 작아서 다운로드 속도가 빠르나 디버깅이 어려움
   */
  minify: true,

  minifyProps: {
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
  },

  /**
   * #### Tree shaking ####
   * Supported by: Build and Transform
   * - 도달할 수 없는 코드를 자동으로 제거하는 일반적인 컴파일러 최적화인 '데드 코드 제거'
   * - esbuild 내에서 이 용어는 특히 선언 수준(declaration-level)의 데드 코드 제거를 의미
   * - ECMAScript 모듈 가져오기 및 내보내기 문을 사용해야 한다는 점에 유의(CommonJS 모듈에서는 작동 불가)
   * - 기본적으로 트리 흔들기는 번들링이 활성화(bundle: true)되어 있거나 출력 형식이 iife(format: 'iife')로 설정되어 있을 때만 활성화되며, 그렇지 않으면 트리 흔들기가 비활성화
   */
  treeShaking: true,
};

// const mangleProps: Record<string, BuildOptions> = {};

/**
 * Browser
 * - 브라우저에서 소스 맵 설정이 활성화되어 있으면 브라우저의 개발자 도구에서 소스 맵을 자동으로 가져와야 함.
 * - 브라우저는 스택 추적이 콘솔에 기록될 때만 소스 맵을 사용하여 스택 추적의 표시를 변경한다는 점에 유의.
 * - 스택 추적 자체는 수정되지 않으므로 코드에서 error.stack을 검사해도 컴파일된 코드가 포함된 매핑되지 않은 스택 추적이 계속 표시됩니다.
 * - 브라우저의 개발자 도구에서 이 설정을 활성화하는 방법:
 *    - Chrome: ⚙ → Enable JavaScript source maps
 *    - Safari: ⚙ → Sources → Enable source maps
 *    - Firefox: ··· → Enable Source Maps
 *
 * Node.js
 * - 노드에서 소스 맵은 버전 v12.12.0부터 기본적으로 지원(디폴트:비활성화, 플래그를 사용해서 활성화)
 * - 브라우저와 달리 실제 스택 추적도 node에서 수정되므로 코드에서 error.stack을 검사하면 원본 소스 코드가 포함된 매핑된 스택 추적을 볼 수 있음.
 * - 노드에서 이 설정을 활성화하는 방법: 스크립트 파일 이름 앞에 --enable-source-maps 플래그
 */
export const sourcemaps: BuildOptions | Record<string, BuildOptions> = {
  /**
   * 1. linked(true)
   * - 이 모드에서는 소스 맵이 .js 출력 파일과 함께 별도의 .js.map 출력 파일로 생성되며,
   * - .js 출력 파일에는 .js.map 출력 파일을 가리키는 특수 //# sourceMappingURL= 주석이 포함됩니다.
   * - 이렇게 하면 디버거를 열 때 브라우저에서 특정 파일의 소스 맵을 찾을 수 있는 위치를 알 수 있습니다.
   * - 링크된 소스 맵 모드는 다음과 같이 사용하세요:
   *
   * 2. external
   * - 이 모드에서는 소스 맵이 .js 출력 파일과 함께 별도의 .js.map 출력 파일로 생성합니다.
   * - 그러나 ['linked'] 모드와 달리 .js 출력 파일에는 //# sourceMappingURL= 주석이 포함되지 않습니다.
   *
   * 3. inline
   * - 이 모드는 소스 맵이 .js 출력 파일 끝에 //# sourceMappingURL= 주석 안에 base64 페이로드로 추가되는 것을 의미
   * - .js.map 출력 파일은 생성되지 않습니다.
   * - 소스 맵은 원본 소스 코드를 모두 포함하므로 일반적으로 매우 크기 때문에 인라인 소스 맵이 포함된 코드를 전송하지 않는 것이 좋습니다.
   * - 소스 맵에서 소스 코드를 제거하려면(파일 이름과 줄/열 매핑만 유지) `sources content` 옵션을 사용하세요.
   *
   * 4. both
   * - 이 모드는 인라인과 외부의 조합입니다.
   * - 소스 맵이 .js 출력 파일의 끝에 인라인으로 추가되고, 동일한 소스 맵의 다른 복사본이 .js 출력 파일과 함께 별도의 .js.map 출력 파일에 기록됩니다.
   *
   * !
   * 트랜스폼 API는 링크 모드를 지원하지 않습니다.
   *    - 이는 트랜스폼 API에서 반환되는 출력에 연결된 파일명이 없기 때문
   *    - 트랜스폼 API의 출력에 소스 맵 코멘트를 포함하려면 직접 추가하면 됨
   */
  sourcemap: true,

  /**
   * #### Source root ####
   * Supported by: Build and Transform
   * - 소스 맵이 활성화된 경우 사용 가능
   * - 소스 맵의 다른 모든 경로가 상대적인 경로를 지정하는 소스 맵의 sourceRoot 필드 값을 설정
   * - 이 필드가 없으면 소스 맵의 모든 경로는 대신 소스 맵이 포함된 디렉터리를 기준으로 해석
   */
  sourceRoot: "",

  /**
   * #### Sources content ####
   * - 소스 맵은 가장 널리 지원되는 변형인 소스 맵 형식 버전 3을 사용하여 생성됩니다.
   */
  sourcesContent: true,
};
