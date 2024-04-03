import {
  mapExtension,
  mapFormat,
  getOutFile,
  place,
  filter,
  resolve,
} from "@repo/utils";
import {
  DEFAULT_ASSET_NAMES,
  DEFAULT_CHUNK_NAMES,
  DEFAULT_ENTRY,
  DEFAULT_ENTRY_NAMES,
  DEFAULT_OUTBASE,
  DEFAULT_OUTDIR,
  NODE,
  BROWSER,
  CJS,
  ESM,
  PROD,
  IIFE,
  DEV,
} from "@repo/utils/constants";
import type { Options, Props } from "./types";

const when =
  (condition: number | boolean) =>
  <T>(value: T) =>
    place(value, condition);

export function configure({
  input,
  format,
  mode,
  module,
  platform,
  react,
  splitting,
  // jsx,
}: Props): Options {
  input = !input
    ? [DEFAULT_ENTRY]
    : typeof input === "string"
      ? [input]
      : input;
  format = mapFormat(platform ?? format ?? CJS);

  const isNode = platform === NODE;
  const isCJS = format === CJS;
  const isESM = format === ESM;
  const isProd = mode === PROD;

  const whenNode = when(platform === NODE);
  const whenBro = when(platform === BROWSER);
  const whenCJS = when(isCJS);
  const whenESM = when(isESM);
  const whenProd = when(isProd);
  const whenDev = when(!isProd);

  const jsx = whenBro(react ? "automatic" : "transform");
  const whenJSX = when(!!jsx);

  const entry = input[0];
  const outFile = getOutFile({ entry, module, platform });

  return filter<Options>({
    // 공용
    bundle: true,
    platform,

    // 입력
    entryPoints: input,
    loader: {
      ".aac": "file",
      ".css": "file",
      ".eot": "file",
      ".flac": "file",
      ".gif": "file",
      ".jpeg": "file",
      ".jpg": "file",
      ".mp3": "file",
      ".mp4": "file",
      ".ogg": "file",
      ".otf": "file",
      ".png": "file",
      ".svg": "file",
      ".ttf": "file",
      ".wav": "file",
      ".webm": "file",
      ".webp": "file",
      ".woff": "file",
      ".woff2": "file",
    },

    // 출력 내용
    format: typeof platform === "undefined" ? format : undefined,
    splitting:
      format === IIFE
        ? false
        : typeof splitting === "undefined"
          ? splitting
          : format === ESM,

    // 출력 위치
    assetNames: DEFAULT_ASSET_NAMES,
    chunkNames: DEFAULT_CHUNK_NAMES,
    entryNames: whenESM(DEFAULT_ENTRY_NAMES),

    outExtension: { ".js": mapExtension({ module, platform }) },

    outbase: DEFAULT_OUTBASE,
    outdir: whenESM(DEFAULT_OUTDIR),
    outfile: whenCJS(outFile),

    publicPath: undefined,
    write: false,

    // 경로 해석
    alias: { "@/": "./" },
    packages: whenNode("external"),
    mainFields: isNode ? ["module", "main"] : ["browser", "module", "main"],

    conditions: undefined,
    external: undefined,
    nodePaths: undefined,

    // 변형
    jsxDev: jsx === "automatic" ? true : undefined, // 디버깅 헬퍼
    jsxImportSource: whenJSX(jsx === "automatic" ? undefined : undefined),
    jsxFactory: whenJSX(undefined),
    jsxFragment: whenJSX(undefined),
    jsxSideEffects: whenJSX(undefined),

    supported: undefined,
    target: undefined,

    // 최적화
    define:
      whenProd({}) ||
      whenDev({
        DEBUG: "true",
      }),
    drop: whenProd(["console", "debugger"]),
    dropLabels: whenProd(["DEV", "TEST"]),
    ignoreAnnotations: false,

    inject: [
      isCJS ? resolve(import.meta.dirname, "./cjs_shims.js") : "",
      isESM ? resolve(import.meta.dirname, "./esm_shims.js") : "",
    ].filter(Boolean),

    keepNames: mode !== PROD,
    minify: mode === PROD,

    // 소스맵
    sourcemap: mode === PROD || "inline",
    sourceRoot: undefined,
    sourcesContent: undefined,

    // 로그
    logLevel: "error",
  });
}

export function configureLoader({
  loader,
  publicPath,
}: Options): Pick<Options, "loader" | "publicPath"> {
  return {
    loader,
    publicPath,
  };
}
