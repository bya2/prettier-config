import type { Options } from "tsup";

const envOptions: Record<"common" | "dev" | "prod", Options> = {
  common: {
    splitting: true,
    format: ["cjs", "esm"],
    clean: true,
    shims: true,
    dts: true,
  },
  prod: {
    sourcemap: true,
    minify: true,
  },
  dev: {
    sourcemap: "inline",
  },
};

interface BuildOptions {
  dev?: boolean;
  watch?: boolean;
}

export const build = (input: string, options?: BuildOptions): Options => {
  const active: BuildOptions = {
    dev: false,
    watch: false,
    ...options,
  };

  const envIsDev = active.dev;

  return {
    entry: [input],
    ...(envIsDev ? envOptions.dev : envOptions.prod),
    ...envOptions.common,
    watch: active.watch,
  };
};
