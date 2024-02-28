import type { Mode, Module, Options, Platform } from "./types";

export function run(
  io: Record<string, string>,
  module: Module,
  platform: Platform,
  mode: Mode
): Options {
  return {
    // general
    bundle: true,
    platform,

    // optimize
    drop: ["console", "debugger"],
  };
}

// #### 계획 ####
// defaults: bundle, drop("debugger", "console")
// args: input, output, module, platform, mode,
// consts: entry Names, chunk Names,  Assets names, outbase, outdir
// inner change: outfile, injects
// user: define,

// #### 유의사항 ####
// 플랫폼:
// - browser: format, mainFields, conditions(autoAdd: broswer, no-cond: 웹팩전용module)
// 트리쉐이킹: 번들링이 활성되거나 iife 형식일 때 자동 활성화(only ESM)
// 축소: process.env의 프로퍼티를 define에 영향
