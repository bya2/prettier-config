import path from "path";
import type { Mode, Module, Options, Platform } from "./types";
import {} from "@repo/utils";

// 배열 -> dir
// 문자열 -> file

const resolve = () => {
  return path.resolve(process.cwd(), "");
};

const src = () => {};

export function configureIO(input: string, outExtension: string): Options {
  const { name } = path.parse(input);
  return {
    entryPoints: [input],
    outfile: `${name}${outExtension}`,
  };
}

// export const configureIO = (
//   input: string | string[],
//   output?: string,
//   outExtension?: string
// ): Options => {
//   input = Array.isArray(input) ? input : [input];

//   return input.length === 1
//     ? {
//         entryPoints: input,
//         outfile: ``,
//       }
//     : {};

//   const io: Options =
//     input.length > 1
//       ? {
//           entryPoints: input,
//           outdir: output ?? "dist",
//           outExtension: {
//             ".js": ".mjs",
//           },
//         }
//       : {
//           entryPoints: input,
//           outfile: `${input}${outExtension}`,
//         };

//   return {
//     ...io,
//   };
// };

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

export function configure(
  input: string,
  output: string,
  module: Module,
  platform: Platform
): Options {
  return {
    bundle: true,
    platform,
    drop: ["console", "debugger"],
  };
}

export function io(input: string, outExtension: string): Options {
  const { name } = path.parse(input);
  return {
    entryPoints: [input],
    outfile: `${name}${outExtension}`,
  };
}

export function entries(inputs: string[], outExtension: string): Options {
  return {
    outbase: "src",
    outdir: "dist",
  };
}

export function ext(): string {
  return "";
}
