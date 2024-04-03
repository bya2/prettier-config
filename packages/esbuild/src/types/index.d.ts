import {
  BuildContext,
  BuildOptions,
  BuildResult,
  SameShape,
  TransformOptions,
  TransformResult,
} from "esbuild";

export type TInput = string | Uint8Array;

export type Options = BuildOptions;
export type BOptions<T extends BuildOptions> = SameShape<BuildOptions, T>;
export type TOptions<T extends TransformOptions> = SameShape<
  TransformOptions,
  T
>;

export type Result<T> = Promise<BuildResult<T>>;
export type Context<T> = Promise<BuildContext<T>>;
export type TResult<T> = Promise<TransformResult<T>>;

export type Entry =
  | string
  | string[]
  | Record<string, string>
  | { in: string; out: string }[];

export interface Props {
  input?: string | string[];
  format?: Format;
  mode?: Mode;
  module?: Module;
  platform?: Platform;
  ts?: boolean;
  watch?: boolean;
  react?: boolean;
  jsx?: boolean;
  splitting?: boolean;
}
