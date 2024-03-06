// import { rules } from "@typescript-eslint/eslint-plugin";
// import { type } from "eslint-plugin-import";

// const disableRules = {
//   "import"
// };

const fixableRules = [
  "no-empty-named-blocks", // import {} from "module" 예시와 같이 빈 블록을 비허용 "warn"
  "no-import-module-exports",
  "no-absolute-path", // 절대 경로를 사용하여 모듈을 가져오는 것을 비허용 "warn"
  "no-relative-packages", // 상대 경로를 사용하여 패키지를 가져오는 것을 비허용 "off"
  "no-useless-path-segments", // 가져오기 및 요구문에서 불필요한 경로 세그먼트를 비허용 "...
  "consistent-type-specifier-style", // import { a as b } from "module" 예시와 같이 as로 형식을 지정하는 것을 비허용 "off"
  "first", // import 문이 다른 구문 이전에 나타나는 것을 비허용 "error"
  "newline-after-import", // import 문 다음 줄이 비어있지 않는 것을 비허용 "warn"
];

// no-empty-named-blocks: import {} from "module" 불가능
