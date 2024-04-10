import { ensure } from "..";
import { Loc } from "../Location";

export const normalizedFlag = Symbol("normalizedFlag");

export interface Options {
  files?: string[];
  key?: string;
  baseDir?: string;
  stopDir?: string;
  [normalizedFlag]?: boolean;
}

export function normalize(options: Options): Required<Options> {
  const files = ensure(options.files).map((fp) => Loc(fp).basename);

  if (!files.length) {
    throw new Error(
      "[conSys] Invalid length: `files` property must be an non-empty array."
    );
  }

  const key = options.key || "";

  if (!key) {
    throw new Error("[conSys] No value: `key` property must have a value.");
  }

  const baseDir = options.baseDir
    ? Loc(options.baseDir).unwrap()
    : process.cwd();

  const stopDir = options.stopDir
    ? Loc(options.stopDir).unwrap()
    : Loc(baseDir)["/"];

  return {
    files,
    key,
    baseDir,
    stopDir,
    [normalizedFlag]: true,
  };
}
