export const upcast = <I>(implementaion: I): I => implementaion; // 대부분의 빌드 환경에서 minifier에 최적화
// -> obj satisfies I // 모든 빌드 환경에서 minifier에 최적화
