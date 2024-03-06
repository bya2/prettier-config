import { ESLint, Linter } from "eslint";

type Plugins =
  | "recommended"
  | "recommended-type-checked"
  | "stylistic"
  | "stylistic-type-checked";

type Rules = Partial<Linter.RulesRecord>;

// /** @type {import("eslint").ESLint.ConfigData} */

interface Recommended extends Rules {}

interface RecommendedTypeChecked extends Rules {}

interface Stylistic extends Rules {}

interface StylisticTypeChecke extends Rules {}

export const options: Record<Plugins, Rules> = {
  // #
  recommended: {
    /**
     * "@ts-<directive>" 주석을 비허용
     */
    "@typescript-eslint/ban-ts-comment": "error",

    /**
     * 특정 타입 비허용
     * - Alias가 있는 내장 타입의 경우 Alias를 사용 (Function의 경우 고려 필요)
     */
    "@typescript-eslint/ban-types": "warn",
  },

  // #
  "recommended-type-checked": {
    "@typescript-eslint/await-thenable": "error",
  },

  // #
  stylistic: {
    /**
     *
     */
    "@typescript-eslint/array-type": "off",

    /**
     *
     */
    "@typescript-eslint/adjacent-overload-signatures": "error",

    /**
     * tslint 주석을 비허용
     */
    "@typescript-eslint/ban-tslint-comment": "error",

    /**
     * Class의 Literal이 일관된 스타일로 노출되도록 강요
     */
    "@typescript-eslint/class-literal-property-style": "error",

    /**
     * 생성자 호출의 타입 어노테이션 또는 생성자 이름에 일반 유형 인수를 지정하도록 강제
     */
    "@typescript-eslint/consistent-generic-constructors": "error",

    /**
     * Record 혹은 { [key: Type]: ValueType } 둘 중 하나만 강제
     * --fix
     */
    "@typescript-eslint/consistent-indexed-object-style": [
      "error",
      ...(["record"] as ["index-signature" | "record"]),
    ],

    /**
     * 타입 Assertion의 일관된 사용을 강제
     * --fix
     */
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      ...([{ assertionStyle: "as", objectLiteralTypeAssertions: "allow" }] as [
        | {
            assertionStyle: "angle-bracket" | "as";
            objectLiteralTypeAssertions?:
              | "allow"
              | "allow-as-parameter"
              | "never";
          }
        | {
            assertionStyle: "never";
          },
      ]),
    ],

    /**
     * 객체 타입에 대해 인터페이스와 타입 둘 중 하나의 일관된 사용 강제
     */
    "@typescript-eslint/consistent-type-definitions": [
      "error",
      ...(["interface"] as ["interface" | "type"]),
    ],
  },

  // #
  "stylistic-type-checked": {
    ...{
      "dot-notation": "off",
      "@typescript-eslint/dot-notation": "error",
    },
  },
};

const config: ESLint.ConfigData = {
  rules: {
    // 불필요
    ...{
      "class-methods-use-this": "off",
      "@typescript-eslint/class-methods-use-this": "error",
    },

    /**
     * 타입 export의 일관된 사용
     * --fix
     * 옵션
     * - true: export { x, type T };
     * - false: export type { T };
     *          export { x };
     */
    "@typescript-eslint/consistent-type-exports": [
      "warn",
      { fixMixedExportsWithInlineTypeSpecifier: true } as {
        fixMixedExportsWithInlineTypeSpecifier?: boolean;
      },
    ],

    /**
     * 타입 import의 일관된 사용
     * --fix
     */
    "@typescript-eslint/consistent-type-imports": "warn",
    // [
    //   "warn",
    //   {} as {
    //     disallowTypeAnnotations?: boolean;
    //     fixStyle?: "inline-type-imports" | "separate-type-imports";
    //     prefer?: "no-type-imports" | "type-imports";
    //   },
    // ],

    ...{
      "default-param-last": "off",
      "@typescript-eslint/default-param-last": "error",
    },

    /**
     * 함수나 클래스 메서드에 리턴 타입 명시
     */
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      { allowExpressions: true },
    ],

    // "@typescript-eslint/explicit-member-accessibility": "error",

    /**
     * 내보낸 함수와 클래스의 공용 클래스 메서드에 명시적인 반환 및 인수 유형을 요구
     */
    // "@typescript-eslint/explicit-module-boundary-types": "error",

    ...{
      // 변수 선언에서 초기화 요구 여부
      "init-declarations": "off",
      "@typescript-eslint/init-declarations": "warn",
    },

    ...{
      // 최대 매개변수 수를 적용
      "max-params": "off",
      "@typescript-eslint/max-params": ["warn", 3],
    },

    // 일관된 멤버 선언 순서
    "@typescript-eslint/member-ordering": "warn",

    // 클래스 메서드 문법 선택
    "@typescript-eslint/method-signature-style": [
      "error",
      ...(["method"] as ["method" | "property"]),
    ],

    // 이름 컨벤션
    "@typescript-eslint/naming-convention": [
      "warn",
      // Type, Enum
      {
        format: ["PascalCase"],
        selector: ["typeLike", "enumMember"],
      },

      // Interface, Props, State
      {
        custom: {
          match: false,
          regex: "^I[A-Z]|^(Interface|Props|State)$",
        },
        format: ["PascalCase"],
        selector: "interface",
      },

      // 상수
      {
        selector: "variable",
        modifiers: ["const"],
        format: ["UPPER_CASE"],
      },
    ],
  },
};

export default config;
