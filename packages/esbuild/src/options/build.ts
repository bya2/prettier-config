import esbuild, {
  analyzeMetafile,
  build,
  type BuildOptions,
  type BuildResult,
  type SameShape,
} from "esbuild";

export const buildMetadata: BuildOptions = {
  /**
   * Analyze
   * 보고서 생성
   */
  /**
   * 빌드에 대한 일부 메타데이터를 JSON 형식으로 생성
   * ex) 메타데이터를 meta.json이라는 파일에 넣기: "fs.writeFileSync('meta.json', JSON.stringify(result.metafile))"
   */
  metafile: true,
};

// export async function report<T>(bundle: BuildResult<T>) {
//   return await analyzeMetafile(bundle.metafile);
// }

esbuild.build;
esbuild.transform;
esbuild.context;
