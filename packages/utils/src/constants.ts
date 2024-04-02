// 플랫폼
export const NODE = "node";
export const BROWSER = "browser";
export const NETURAL = "netural";

// 모듈 타입
export const COMMONJS = "commonjs";
export const MODULE = "module";

// 포맷
export const CJS = "cjs";
export const ESM = "esm";
export const IIFE = "iife";

// 확장자
export const DOT_JS = ".js";
export const DOT_CJS = ".cjs";
export const DOT_MJS = ".mjs";
export const DOT_GLOBAL_DOT_JS = ".global.js";

// 환경 변수 상수
export const PROD = "production";
export const DEV = "development";
export const TEST = "test";

// 외부 처리 요소
export const DEFAULT_EXTERNAL = ["*.png", "/images/*", "/assets/*"];

// 패턴
export const DEFAULT_ASSET_NAMES = "assets/[name]-[hash]";
export const DEFAULT_CHUNK_NAMES = "chunks/[name]-[hash]";
export const DEFAULT_ENTRY_NAMES = "[dir]/[name]-[hash]";

// 경로
export const DEFAULT_OUTBASE = "src";
export const DEFAULT_OUTDIR = "dist";
export const DEFAULT_ENTRY = "src/index.ts";

// 메세지
export const FAIL_MEMOIZATION =
  "메모이제이션 실패: 파일 데이터의 키가 없거나 해당 키에 대해 메모이제이션된 데이터가 존재하지 않음.";

// 경로 상수
export const ROOT = "/";
export const CURR = ".";
export const PARENT = "..";
