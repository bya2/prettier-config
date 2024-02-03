import { generateJSByFormat, generateDTSByFormat } from ".";
import type { BuildJSOptions, BuildDTSOptions } from ".";

const module = "module";

export const generateJS = (entry: string, options?: BuildJSOptions) => {
  return generateJSByFormat(entry, module, options);
};

/**
 * precondition: tsc --emitDeclarationOnly --declaration [--outFile types/index.d.ts | --outDir types]
 * @param entry
 * @param options
 */
export const generateDTS = (entry: string, options?: BuildDTSOptions) => {
  return generateDTSByFormat(entry, module, options);
};
