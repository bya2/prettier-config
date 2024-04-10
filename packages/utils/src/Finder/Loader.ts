export interface SyncLoader {
  name?: string;
  test: RegExp;
  loadSync(path: string): any;
}

export interface AsyncLoader {
  name?: string;
  test: RegExp;
  load(path: string): Promise<any>;
}
