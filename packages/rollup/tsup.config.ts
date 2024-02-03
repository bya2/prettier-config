import { buildToCJS, buildToESM } from "@bya2/configs.tsup";

export default [
  buildToCJS({ index: "src/commonjs.ts" }),
  buildToESM({ index: "src/module.ts" }),
];
