import path from "path";

export const resolve = (...paths: string[]) => {
  return path.resolve(process.cwd(), ...paths);
};
