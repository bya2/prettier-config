import { fileURLToPath } from "url";
import { dirname } from "path";

const getFilename = fileURLToPath(import.meta.url);
const getDirname = dirname(getFilename());

export const __dirname = /* @__PURE__ */ getDirname();
export const __filename = /* @__PURE__ */ getFilename();

///

const getImportMetaUrl = () =>
  typeof document === "undefined"
    ? new URL("file:" + __filename).href
    : (document.currentScript && document.currentScript.src) ||
      new URL("main.js", document.baseURI).href;

export const importMetaUrl = /* @__PURE__ */ getImportMetaUrl();
