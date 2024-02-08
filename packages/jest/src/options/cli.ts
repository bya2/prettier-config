interface Options {
  bail?: number;
  cache?: boolean;
  clearMocks?: boolean;
  collectCoverage?: boolean; // --coverage
  collectCoverageFrom?: string[];
  coverageDirectory?: string;
  coverageProvider?: "babel" | "v8";
  verbose?: boolean;
  watch?: boolean;
  watchAll?: boolean;
  watchman?: boolean;
}

export default function cli(options: Options) {
  return options;
}
