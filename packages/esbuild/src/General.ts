import type { BuildOptions, Platform } from "esbuild";

export default class GeneralOptions implements BuildOptions {
  bundle?: boolean | undefined;
  platform?: Platform | undefined;
}

// live reload: watch serve

// rebuild: context.rebuild()
// watch: context.watch()

// platform -> format, external, mainField(module,main), condition(auto add node, module(no-custom)),
