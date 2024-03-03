import path from "path";
import { extensionMap, formatMap } from "./maps";
import type {
  Options,
  ErrorOptions,
  Extension,
  Format,
  Mode,
  Module,
  Platform,
} from "./types";
import { resolve } from ".";

export function throwError(message?: string, options?: ErrorOptions): never {
  const err = new Error(
    message,
    options?.cause ? { cause: options.cause } : undefined
  );

  if (options && "code" in options) (err as any).code = options.code;

  throw err;
}

export function mapGet<T>(
  map: Record<any, T>,
  key: any,
  errorMessage?: string,
  errorOptions?: ErrorOptions
): NonNullable<T> {
  const mapped = map[key];
  if (!mapped) {
    throwError(errorMessage || "Key not found in map", errorOptions);
  }
  return mapped;
}

export const format = (input: string): Format => {
  return mapGet(formatMap, input, "Invalid format:");
};

export const extension = ({
  module,
  platform,
}: Pick<Options, "module" | "platform">): Extension => {
  return mapGet(mapGet(extensionMap, module), platform);
};

export const outFile = ({
  entry,
  module,
  platform,
}: Pick<Options, "entry" | "module" | "platform">) => {
  const { name } = path.parse(entry);
  const ext = extension({ module, platform });
  return resolve("dist", `${name}${ext}`);
};
