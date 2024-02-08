import type { Config } from "jest";
import options_2 from "./options";

export const merge = (...configs: Config[]): Config => {
  return configs.reduce((obj, t) => {
    obj = { ...obj, ...t };
    return obj;
  }, {});
};

export const options = options_2;
