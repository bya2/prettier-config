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
export const DEFAULT_ASSET_NAMES = "assets/[name]-[hash]"; // [dir] [name] [hash] [ext]
export const DEFAULT_CHUNK_NAMES = "chunks/[name]-[hash]"; // [name] [hash] [ext]
export const DEFAULT_ENTRY_NAMES = "[dir]/[name]-[hash]"; // // [dir] [name] [hash] [ext]

// 경로
export const DEFAULT_OUTBASE = "src";
export const DEFAULT_OUTDIR = "dist";
export const DEFAULT_ENTRY = "src/index.ts";
