import common from "./common";
import packagejson from "prettier-plugin-packagejson";
import organizeImports from "prettier-plugin-organize-imports";
import tailwindcss from "prettier-plugin-tailwindcss";

export default {
  ...common,
  plugins: [packagejson, organizeImports, tailwindcss],
};
