import type { Format, Options } from "tsup";

const baseOptions: Record<"common" | "dev" | "prod", Options> = {
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

type Entry = string | string[] | Record<string, string>;

export const build = (entry: Entry, options?: BuildOptions): Options => {
  const active: BuildOptions = {
    dev: false,
    watch: false,
    ...options,
  };

  const envIsDev = active.dev;

  if (typeof entry === "string") {
    entry = [entry];
  }

  return {
    entry,
    ...(envIsDev ? baseOptions.dev : baseOptions.prod),
    ...baseOptions.common,
    watch: active.watch,
  };
};

export const buildToFormat = (
  entry: Entry,
  format: Format,
  options?: BuildOptions
): Options => {
  return {
    ...build(entry, options),
    format,
  };
};

export const buildToCJS = (entry: Entry, options?: BuildOptions) => {
  return buildToFormat(entry, "cjs", options);
};

export const buildToESM = (entry: Entry, options?: BuildOptions) => {
  return buildToFormat(entry, "esm", options);
};

export const buildToIIFE = (entry: Entry, options?: BuildOptions) => {
  return buildToFormat(entry, "iife", options);
};
