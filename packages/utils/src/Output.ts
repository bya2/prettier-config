import path from "path";
import Format from "./Format";
import type { ModuleFormat, ModuleType } from "./types";

const resolve = (...paths: string[]) => {
  return path.resolve(process.cwd(), ...paths);
};

// esm -> dir preservemodule

export default class Output {
  private module: ModuleType;
  private format: Format;

  moduleRoot = "src";

  private constructor(module: ModuleType, format: ModuleFormat) {
    this.module = module;
    this.format = new Format(format);
  }

  static from(module: ModuleType, format: ModuleFormat) {
    return new Output(module, format);
  }

  ext() {
    if (this.format.isIIFE() || this.format.isESM()) {
      return this.module === "module" ? ".js" : ".mjs";
    }

    if (this.format.isCJS()) {
      return this.module === "commonjs" ? ".js" : ".cjs";
    }
  }

  file(filePath: string) {
    const { name } = path.parse(filePath);
    const ext = this.ext();

    return resolve("dist", `${name}${ext}`);
  }

  sourcemap() {}
}
