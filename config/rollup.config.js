import terser from "@rollup/plugin-terser";
import { dirname } from "path";
import { cwd } from "process";
import { fileURLToPath } from "url";

// 현재 파일
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

// 스크립트가 실행된 경로
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
