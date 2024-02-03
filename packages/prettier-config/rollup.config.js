import fs from "fs";
import path from "path";
import { generateJS } from "@bya2/rollup-config";

const resolveSrc = (...paths) => path.resolve("src", ...paths);

const print = (input) => process.stdout.write(input);

export default fs.readdirSync("src").flatMap((filename, i) => {
  const entry = resolveSrc(filename);

  print(`#${i + 1} CREATE CONFIG - ${entry}: `);

  let config;

  try {
    config = generateJS(entry, {
      minify: filename !== "index.js",
    });
    print("O");
  } catch (err) {
    print("X");
    console.error(err);
    process.exit(1);
  }
  print("\n");

  return config;
});
