import esbuild from "esbuild";
import type { BuildOptions } from "esbuild";

interface Options {
  production?: boolean;
  platform?: string;
  target?: string[];
}

const defaults: Required<Options> = {
  production: false,
  platform: "",
  target: [""],
};

const _get = (options: Options): Required<Options> => {
  return {
    ...defaults,
    ...options,
  };
};

type Entry = string | string[] | Record<string, string>;

const _io = (
  entryPoints: Entry,
  output?: string,
  options?: BuildOptions
): BuildOptions => {
  if (typeof entryPoints === "string") entryPoints = [entryPoints];

  if (!output) {
    if (Array.isArray(entryPoints)) {
      for (const entry of entryPoints) {
      }
    } else {
      for (const [output, input] of Object.entries(entryPoints)) {
      }
    }

    return {
      entryPoints,
      chunkNames: "[name]-[hash]", // splitting
      outbase: options?.outbase || "src",

      outdir: options?.outdir || "dist",
    };
  }

  return {
    entryPoints,
    outfile: output,
  };
};

export const outputLocation: BuildOptions = {
  /**
   * 이 설정을 활성화하면 출력 파일이 입력 파일을 덮어쓰기 가능
   * 이 설정은 소스 코드를 덮어쓰는 것을 의미하므로 코드를 체크인하지 않으면 데이터가 손실될 수 있으므로 기본적으로 비활성화!
   * 그러나 이 기능을 지원하면 임시 디렉터리가 필요하지 않아 특정 워크플로가 간편
   * 따라서 소스 코드를 의도적으로 덮어쓰고 싶을 때 활성화
   * build
   */
  // allowOverwrite() {},

  /**
   * 이 옵션은 로더가 파일로 설정될 때 생성되는 추가 출력 파일의 파일 이름을 제어합니다. 출력 경로가 생성될 때 파일에 특정한 값으로 대체되는 자리 표시자가 있는 템플릿을 사용하여 출력 경로를 구성합니다. 예를 들어 자산 이름 템플릿을 assets/[name]-[hash]로 지정하면 모든 자산이 출력 디렉토리 내부의 assets라는 하위 디렉터리에 배치되고 파일 이름에 자산의 콘텐츠 해시가 포함됩니다. 이렇게 하면 다음과 같이 됩니다:
   * placeholders: [dir], [name], [hash], [ext]
   */
  assetNames: "",

  /**
   * 이 옵션은 코드 분할이 활성화될 때 자동으로 생성되는 공유 코드 청크의 파일 이름을 제어합니다. 출력 경로가 생성될 때 청크에 특정한 값으로 대체되는 자리 표시자가 있는 템플릿을 사용하여 출력 경로를 구성합니다. 예를 들어 청크/[이름]-[해시]의 청크 이름 템플릿을 지정하면 생성된 모든 청크가 출력 디렉터리 내부의 청크라는 하위 디렉터리에 저장되고 파일 이름에 청크의 콘텐츠 해시가 포함됩니다. 이렇게 하면 다음과 같이 됩니다:
   * placeholders: [name], [hash], [ext]
   */
  chunkNames: "",

  /**
   * 이 옵션은 각 입력 엔트리 포인트 파일에 해당하는 출력 파일의 파일 이름을 제어합니다. 출력 경로가 생성될 때 파일에 특정한 값으로 대체되는 자리 표시자가 있는 템플릿을 사용하여 출력 경로를 구성합니다. 예를 들어 [dir]/[name]-[hash]의 항목 이름 템플릿을 지정하면 파일 이름에 출력 파일의 해시가 포함되고 파일이 출력 디렉터리, 즉 하위 디렉터리 아래에 배치됩니다(아래 [dir]에 대한 자세한 내용 참조). 이렇게 하면 다음과 같이 됩니다:
   * placeholders: [dir], [name], [hash], [ext]
   */
  entryNames: "",

  /**
   * 이 옵션을 사용하면 esbuild가 생성하는 파일의 파일 확장자를 .js 또는 .css가 아닌 다른 파일로 사용자 지정할 수 있습니다. 특히 .mjs 및 .cjs 파일 확장자는 노드에서 특별한 의미를 갖습니다(각각 ESM 및 CommonJS 형식의 파일을 나타냄). 이 옵션은 esbuild를 사용하여 여러 파일을 생성할 때 아웃파일 옵션 대신 아웃디어 옵션을 사용해야 하는 경우에 유용합니다. 다음과 같이 사용할 수 있습니다:
   */
  outExtension: {},

  /**
   * 빌드에 별도의 디렉터리에 여러 엔트리 포인트가 있는 경우 디렉토리 구조는 아웃베이스 디렉터리를 기준으로 출력 디렉터리로 복제됩니다. 예를 들어 엔트리 포인트가 src/pages/home/index.ts와 src/pages/about/index.ts 두 개이고 아웃베이스 디렉터리가 src인 경우 출력 디렉터리에는 pages/home/index.js와 pages/about/index.js가 포함됩니다. 사용 방법은 다음과 같습니다:
   */
  outbase: "src",

  /**
   * 이 옵션은 빌드 작업의 출력 디렉터리를 설정합니다. 예를 들어, 이 명령은 디렉터리를 생성합니다:
   * 출력 디렉터리가 없는 경우 생성되지만 이미 일부 파일이 포함되어 있는 경우 지워지지 않습니다. 생성된 모든 파일은 같은 이름의 기존 파일을 자동으로 덮어씁니다. 출력 디렉터리에 현재 실행 중인 esbuild의 파일만 포함하도록 하려면 esbuild를 실행하기 전에 출력 디렉터리를 직접 지워야 합니다.
   * 빌드에 별도의 디렉터리에 여러 진입점이 포함된 경우 디렉토리 구조는 모든 입력 진입점 경로 중 가장 낮은 공통 조상 디렉토리부터 시작하여 출력 디렉터리로 리플리케이트됩니다. 예를 들어 src/home/index.ts와 src/about/index.ts가 두 개 있는 경우 출력 디렉터리에는 home/index.js와 about/index.js가 포함됩니다. 이 동작을 사용자 정의하려면 아웃베이스 디렉터리를 변경해야 합니다.
   */
  outdir: "",

  /**
   * 이 옵션은 빌드 작업의 출력 파일 이름을 설정합니다. 이 옵션은 엔트리 포인트가 하나만 있는 경우에만 적용됩니다. 엔트리 포인트가 여러 개 있는 경우 출력 디렉터리를 지정하려면 대신 outdir 옵션을 사용해야 합니다. 아웃파일 사용은 다음과 같습니다:
   */
  outfile: "",

  /**
   * 이 기능은 외부 파일 로더와 함께 사용하면 유용합니다. 기본적으로 해당 로더는 기본 내보내기를 사용하여 가져온 파일의 이름을 문자열로 내보냅니다. 공개 경로 옵션을 사용하면 이 로더가 로드한 각 파일의 내보낸 문자열에 기본 경로를 추가할 수 있습니다:
   * - method: build
   */
  publicPath: "https://www.example.com/v1",

  /**
   * 빌드 API 호출은 파일 시스템에 직접 쓰거나 인메모리 버퍼로 쓰여졌을 파일을 반환할 수 있습니다. 기본적으로 CLI 및 JavaScript API는 파일 시스템에 쓰지만 Go API는 그렇지 않습니다. 인메모리 버퍼를 사용하려면:
   */
  write: false,
};

export const pathResoluion: BuildOptions = {
  /**
   * 이 기능을 사용하면 번들링할 때 한 패키지를 다른 패키지로 대체할 수 있습니다. 아래 예에서는 oldpkg 패키지를 newpkg 패키지로 대체합니다:
   * 이러한 새로운 대체는 esbuild의 다른 모든 경로 확인 로직보다 먼저 발생합니다. 이 기능의 한 가지 사용 사례는 사용자가 제어하지 않는 타사 코드에서 노드 전용 패키지를 브라우저 친화적인 패키지로 대체하는 것입니다.
   * 별칭을 사용하여 가져오기 경로를 대체할 경우 결과 가져오기 경로는 가져오기 경로가 있는 소스 파일이 포함된 디렉터리가 아닌 작업 디렉터리에서 확인됩니다. 필요한 경우 작업 디렉터리 기능을 사용하여 esbuild가 사용하는 작업 디렉터리를 설정할 수 있습니다.
   */
  alias: {},

  /**
   * package.json의 exports 필드가 해석되는 방식을 제어.
   * 조건 설정을 사용하여 사용자 지정 조건을 추가할 수 있습니다. 원하는 만큼 지정할 수 있으며, 그 의미는 전적으로 패키지 작성자에게 달려 있습니다. 현재 노드에서는 개발 및 프로덕션 사용자 지정 조건만 권장 사용을 승인했습니다. 다음은 사용자 정의 조건 custom1 및 custom2를 추가하는 예제입니다:
   */
  conditions: [],

  /**
   * 파일이나 패키지를 [외부 표시]하여 빌드에서 제외.
   * 번들링하는 대신, import로 유지(iife 및 cjs 형식의 경우 require 사용, esm 형식의 경우 import 사용).
   * 그리고 런타임에 대신 평가.
   *
   * *기능 용도
   * - 1. 실행되지 않을 코드 경로에 대해 번들에서 불필요한 코드를 트리밍하는 데 사용(예를 들어 패키지에 노드에서만 실행되는 코드가 포함되어 있지만 브라우저에서만 해당 패키지를 사용 가능)
   * - 2. 번들할 수 없는 패키지에서 런타임에 노드에서 코드를 가져오는 데에도 사용(예를 들어 fsevents 패키지에는 esbuild가 지원하지 않는 네이티브 확장 기능이 포함되어 있습니다)
   */
  external: [],

  /**
   * build
   * 노드에서 패키지를 가져오면 해당 패키지의 package.json 파일의 주요 필드에 따라 가져올 파일이 결정됩니다(다른 많은 규칙과 함께). esbuild를 비롯한 주요 JavaScript 번들러에서는 패키지를 확인할 때 시도할 추가 package.json 필드를 지정할 수 있습니다. 일반적으로 사용되는 필드는 최소 세 가지입니다:
   * [main]: 노드와 함께 사용하려는 모든 패키지의 표준 필드입니다. main이라는 이름은 노드의 모듈 확인 로직 자체에 하드코딩되어 있습니다. 노드와 함께 사용하기 위한 것이므로 이 필드의 파일 경로는 CommonJS 스타일 모듈이라고 예상하는 것이 합리적입니다.
   * [module]: 이 필드는 ECMAScript 모듈을 노드에 통합하는 방법에 대한 제안에서 나온 것입니다. 따라서 이 필드의 파일 경로는 ECMAScript 스타일 모듈이라고 예상하는 것이 합리적입니다. 이 제안은 노드에서 채택되지는 않았지만(노드에서는 "type": "module"을 대신 사용), 주요 번들러에서 채택한 이유는 ECMAScript 스타일 모듈이 트리 흔들림 또는 데드 코드 제거를 개선하기 때문입니다.
   * [browser]: 이 필드는 번들러가 노드별 파일이나 모듈을 브라우저 친화적인 버전으로 대체할 수 있도록 하는 제안에서 비롯되었습니다. 이 필드를 사용하면 브라우저별 대체 진입점을 지정할 수 있습니다. 한 패키지가 브라우저와 모듈 필드를 함께 사용할 수도 있습니다(아래 참고 사항 참조).
   */
  mainFields: [],

  /**
   * 노드의 모듈 확인 알고리즘은 import 경로를 확인할 때 사용할 전역 디렉터리 목록이 포함된 NODE_PATH라는 환경 변수를 지원합니다.
   * 이 경로는 모든 상위 디렉터리에서 node_modules 디렉터리 외에 패키지를 검색합니다.
   * 이 디렉터리 목록은 CLI에서는 환경 변수를 사용하여, JS 및 Go API에서는 배열을 사용하여 esbuild에 전달할 수 있습니다:
   */
  nodePaths: [],

  /**
   * 이 설정을 사용하면 패키지의 모든 종속성을 번들에서 제외할 수 있습니다. 이 설정은 노드용 번들링 시 유용합니다. 많은 npm 패키지가 번들링 시 esbuild가 지원하지 않는 노드별 기능(예: __dirname, import.meta.url, fs.readFileSync 및 *.node 네이티브 바이너리 모듈)을 사용하므로 이 설정이 유용합니다. 사용 방법은 다음과 같습니다:
   * 이 옵션을 활성화하면 npm 패키지처럼 보이는 모든 가져오기 경로(즉, . 또는 . 경로 구성 요소로 시작하지 않고 절대 경로가 아닌 경로)가 자동으로 외부로 표시됩니다. 각 종속성을 외부로 수동으로 전달하는 것과 동일한 효과가 있지만 더 간결합니다. 어떤 종속성을 외부로 설정하고 어떤 종속성을 외부로 설정하지 않을지 사용자 정의하려면 이 설정 대신 외부를 사용해야 합니다.
   * 이 설정은 번들링이 활성화된 경우에만 적용된다는 점에 유의하세요. 또한 가져오기 경로를 외부로 표시하는 것은 구성된 별칭에 의해 가져오기 경로가 다시 작성된 후에 발생하므로 이 설정을 사용해도 별칭 기능은 계속 적용된다는 점에 유의하세요.
   */
  packages: "external",

  /**
   * 이 설정은 노드의 --preserve-symlinks 설정을 미러링합니다. 해당 설정(또는 웹팩의 유사한 resolve.symlinks 설정)을 사용하는 경우 esbuild에서도 이 설정을 활성화해야 할 수 있습니다. 다음과 같이 활성화할 수 있습니다:
   */
  preserveSymlinks: true,

  /**
   * 노드에서 사용하는 resolution 알고리즘은 암시적 파일 확장명을 지원.
   * require('./file')를 사용하면 ./file, ./file.js, ./file.json, ./file.node를 순서대로 검사.
   * esbuild를 비롯한 최신 번들러는 이 개념을 다른 파일 유형에도 확장합니다.
   * esbuild에서 암시적 파일 확장자의 전체 순서는 확장자 확인 설정을 사용하여 사용자 지정할 수 있으며, 기본값은 .tsx,.ts,.jsx,.js,.css,.json입니다:
   */
  resolveExtensions: [".ts", ".js"],

  /**
   * 빌드에 사용할 작업 디렉터리를 지정
   * - default: esbuild의 API를 호출하는 데 사용하는 프로세스의 현재 작업 디렉터리(CWD).
   * - 작업 디렉터리는 API 옵션으로 지정된 상대 경로를 절대 경로로 변환하고 로그 메시지에서 절대 경로를 상대 경로로 예쁘게 인쇄하는 등 몇 가지 다른 용도로 사용.
   */
  absWorkingDir: "",
};

export const transformation: BuildOptions = {
  /**
   * JSX 구문에 대해 esbuild가 수행할 작업
   * - transform
   *  - 이는 JSX 구문을 사용하는 여러 라이브러리 간에 공유되는 범용 트랜스폼을 사용하여 JSX를 JS로 변환하도록 esbuild에 지시합니다.
   *  - 각 JSX 요소는 요소의 컴포넌트(또는 조각의 경우 JSX 조각)를 첫 번째 인수로 사용하여 JSX 팩토리 함수에 대한 호출로 바뀝니다.
   *  - 두 번째 인수는 프로퍼티 배열(또는 프로퍼티가 없는 경우 null)입니다. 존재하는 모든 하위 요소는 두 번째 인수 뒤에 추가 인수가 됩니다.
   *
   * - preserve
   *  - 이렇게 하면 JSX 구문이 함수 호출로 변환되지 않고 출력에 그대로 유지됩니다.
   *  - JSX 요소는 일급 구문으로 취급되며 축소 및 속성 맹글링과 같은 다른 설정의 영향을 여전히 받습니다.
   *
   * - automatic
   *  - 이 변환은 React 17+에서 도입되었으며 React에 매우 특화.
   *  - JSX 가져오기 소스에서 가져오기 문을 자동으로 생성하고 구문 처리 방식과 관련하여 많은 특수한 경우를 도입.
   *  - 자세한 내용은 새로운 JSX 트랜스폼에 대한 React의 문서를 참조. 이 트랜스폼의 개발 모드 버전을 활성화하려면 JSX dev(jsxDev Option) 설정을 추가로 활성화.
   */
  jsx: "automatic",

  /**
   * JSX 트랜스폼(jsx 옵션)이 `automatic`으로 설정된 경우 이 설정을 활성화하면 esbuild가 파일 이름과 소스 위치를 각 JSX element에 자동으로 삽입.
   * 그러면 JSX 라이브러리가 이 정보를 사용하여 디버깅을 도움.
   * JSX 트랜스폼이 자동이 아닌 다른 것으로 설정된 경우 이 설정은 아무 작업도 수행하지 않음.
   */
  jsxDev: true,

  /**
   * 각 JSX 요소에 대해 호출되는 함수를 설정
   *
   *
   * 파일별로 구성하려면 // @jsx h 주석을 사용하여 구성할 수 있습니다. JSX 트랜스폼이 자동으로 설정된 경우에는 이 설정이 적용되지 않습니다.
   */
  jsxFactory: "",

  /**
   * 각 JSX fragement에 대해 호출되는 함수를 설정
   * 파일별로 구성하려면 // @jsxFrag 조각 주석을 사용하여 구성할 수 있습니다. JSX 트랜스폼이 자동으로 설정된 경우에는 이 설정이 적용되지 않습니다.
   */
  jsxFragment: "",

  /**
   * JSX 트랜스폼이 `automatic`으로 설정된 경우, 이를 설정하면 esbuild가 JSX 헬퍼 함수를 자동으로 가져오는 데 사용하는 라이브러리를 변경 가능
   * React 17+에 특정한 JSX 트랜스폼에서만 작동한다는 점에 유의!
   */
  jsxImportSource: "",

  /**
   * 기본적으로 esbuild는 JSX 표현식이 부작용이 없다고 가정하므로 [\/* @__PURE__ *\/] 주석으로 어노테이션되며, 사용하지 않을 경우 번들링 중에 제거.
   * 이는 가상 DOM에 JSX를 일반적으로 사용하는 방식을 따르며 대부분의 JSX 라이브러리에 적용됩니다. 그러나 일부 사람들은 이 속성이 없는 JSX 라이브러리를 작성하기도 합니다(특히 JSX 표현식은 임의의 부작용을 일으킬 수 있으며 사용하지 않을 때 제거할 수 없음). 이러한 라이브러리를 사용하는 경우 이 설정을 사용하여 JSX 표현식에 부작용이 있음을 esbuild에 알릴 수 있습니다:
   */
  jsxSideEffects: true,

  /**
   * 이 설정을 사용하면 개별 구문 기능 레벨에서 esbuild의 지원되지 않는 구문 기능 집합을 커스터마이징 가능
   * - 예를 들어, 이 설정을 사용하여 esbuild에 BigInts가 지원되지 않는다고 알려서 esbuild가 이를 사용하려고 할 때 오류를 생성하도록 할 수 있음.
   * - 일반적으로 이 설정 대신 일반적으로 사용해야 하는 대상 설정을 사용할 때 이 설정이 구성됩니다.
   * - 이 설정과 함께 대상을 지정하면 이 설정이 대상에서 지정한 내용을 재정의합니다.
   */
  supported: {},
};

/**
 * common
 *
 * platform: browser
 * - format: iife
 * - browser field의 각 경로에 path or path-browerify
 * - package.json에서 main, module이 있는데 browser이 없으면 require을 사용하여 import 될 때 module 대신 main이 사용됌.
 * - conditions include browser
 * - no custom conditions include webpack-specfic module condition (module condition: 패키지 작성자가 이중 패키지 위험을 발생시키지 않고, CommonJS 파일에 대한 트리 흔들기 가능한 ESM 대안을 제공하기 위해 사용)
 * - minify -> NODE_ENV=production
 *
 * platform: node
 * - format: cjs
 * - external include built-in modules
 * - mainFields: [main, module] (tree shaking x)
 * - conditions include node
 * - no custom conditions include webpack-specfic module condition (module condition: 패키지 작성자가 이중 패키지 위험을 발생시키지 않고, CommonJS 파일에 대한 트리 흔들기 가능한 ESM 대안을 제공하기 위해 사용)
 * - minify -> NODE_ENV=production
 *
 * platform: netural
 * - format: esm (변경 가능)
 * - main fields is empty
 * - conditions is empty
 */
export const platform = (): BuildOptions => {
  const options: BuildOptions = {};
  return {};
};

export const build = {
  minify(options: Options): boolean {
    return _get(options).production;
  },

  sourcemap(options: Options): boolean {
    return _get(options).production;
  },
};

const baseOptions: BuildOptions = {
  bundle: true,
};

export default baseOptions;
