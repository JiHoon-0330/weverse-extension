import type {
  AxiosInstance,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import type { GetOptions, IRemote } from "@/src/remote/remote";

interface CreateAxiosConfig {
  options: CreateAxiosDefaults;
  beforeHooks?: Array<
    (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>
  >;
}

export class AxiosClient implements IRemote {
  private readonly axios: AxiosInstance;

  constructor({ options, beforeHooks }: CreateAxiosConfig) {
    this.axios = axios.create(options);
    if (beforeHooks) {
      this.axios.interceptors.request.use(async (config) => {
        let newConfig = config;
        for (const hook of beforeHooks) {
          newConfig = await hook(newConfig);
        }
        return newConfig;
      });
    }
  }

  async get(url: string, options?: GetOptions): Promise<unknown> {
    const resp = await this.axios.get(url, options);
    return resp.data;
  }
}
