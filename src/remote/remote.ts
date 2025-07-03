export interface IRemote {
  get(url: string, options?: GetOptions): Promise<unknown>;
}

export interface GetOptions {
  params?: Record<string, string>;
}
