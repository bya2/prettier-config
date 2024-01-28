import common from "./common";
import packagejson from "prettier-plugin-packagejson";
import tailwindcss from "prettier-plugin-tailwindcss";

export default {
  ...common,
  plugins: [packagejson, tailwindcss],
};
