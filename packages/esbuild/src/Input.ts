import type { BuildOptions, Loader, Platform, StdinOptions } from "esbuild";

export default class Input implements BuildOptions {
  entryPoints?:
    | string[]
    | Record<string, string>
    | { in: string; out: string }[]
    | undefined;

  loader?: { [ext: string]: Loader } | undefined;

  stdin?: StdinOptions | undefined;

  platform?: Platform | undefined;

  constructor(input: string, output: string) {}
}

// User Options

// entrypoints
// output
// module: package module
// format: bundle format -> platform
// mode: prod, dev, test
