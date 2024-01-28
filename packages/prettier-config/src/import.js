import common from "./common";
import packagejson from "prettier-plugin-packagejson";
import organizeImports from "prettier-plugin-organize-imports";

export default {
  ...common,
  plugins: [packagejson, organizeImports],
};
