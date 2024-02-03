import { buildToCJS, buildToESM } from "@bya2/tsup-config";

export default [
  buildToCJS({ index: "src/commonjs.ts" }),
  buildToESM({ index: "src/module.ts" }),
];
