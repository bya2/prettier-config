import terser from "@rollup/plugin-terser";
import { cwd } from "process";

const CWD = cwd();
const SRC = `${CWD}/src`;
const DIST = `${CWD}/dist`;

export default {
  input: `${SRC}/index.js`,
  output: [
    {
      file: `${DIST}/index.cjs`,
      format: "cjs",
    },
    {
      file: `${DIST}/index.js`,
      format: "esm",
    },
  ],
  plugins: [terser()],
};
