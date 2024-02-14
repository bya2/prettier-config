import type { ModuleFormat } from "./types";

export default class Format {
  private inner: ModuleFormat;

  constructor(format: ModuleFormat) {
    this.inner = format;
  }

  public isIIFE() {
    return this.inner === "iife";
  }

  public isESM() {
    return (
      this.inner === "es" || this.inner === "esm" || this.inner === "module"
    );
  }

  public isCJS() {
    return this.inner === "cjs" || this.inner === "commonjs";
  }
}
