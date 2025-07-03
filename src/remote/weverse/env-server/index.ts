import { z } from "zod/v4";
import { env } from "@/src/env";
import { AxiosClient } from "@/src/remote/axios";
import type { IRemote } from "@/src/remote/remote";
import {
  Decrypt,
  type IDecrypt,
} from "@/src/remote/weverse/env-server/decrypt";

class ENVServerAPI {
  private readonly remote: IRemote;
  private readonly decrypt: IDecrypt;

  constructor(remote: IRemote, decrypt: IDecrypt) {
    this.remote = remote;
    this.decrypt = decrypt;
  }

  async getWeverseENV() {
    const url = "/env";
    const resp = await this.remote.get(url);

    const schema = z.string().transform((str) => {
      const decrypted = this.decrypt.decrypt(str);
      const decryptedSchema = z.object({
        apiSecret: z.string(),
        appId: z.string(),
        tokenName: z.string(),
      });
      return decryptedSchema.parse(JSON.parse(decrypted));
    });

    return schema.parse(resp);
  }
}

export const envServerAPI = new ENVServerAPI(
  new AxiosClient({
    options: {
      baseURL: "https://weverse-extension-server.onrender.com",
    },
  }),
  new Decrypt(env.WXT_ENV_SERVER_KEY),
);
