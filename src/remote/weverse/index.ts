import Cookies from "js-cookie";
import { env } from "@/src/env";
import { AxiosClient } from "@/src/remote/axios";
import type { IRemote } from "@/src/remote/remote";
import { Hamc, type IHamc } from "@/src/remote/weverse/hamc";
import {
  type IPrepareHmac,
  PrepareHmac,
} from "@/src/remote/weverse/prepare-hamc";

class WeverseAPI {
  private readonly remote: IRemote;
  private readonly hamc: IHamc;
  private readonly prepareHmac: IPrepareHmac;
  private readonly appId = "be4d79eb8fc7bd008ee82c8ec4ff6fd4";
  private readonly language = "ko";
  private readonly os = "WEB";
  private readonly platform = "WEB";
  private readonly wpf = "pc";

  constructor(remote: IRemote, hamc: IHamc, prepareHmac: IPrepareHmac) {
    this.remote = remote;
    this.hamc = hamc;
    this.prepareHmac = prepareHmac;
  }

  async fetchNotiFeedActivities() {
    const url = "/weverse/wevweb/noti/feed/v2.0/activities";
    const excludeGroup = "COLLECTION,CO_HOST_LIVE,PARTY,CALENDAR";
    const params: Record<string, string> = {
      appId: this.appId,
      excludeGroup: encodeURIComponent(excludeGroup),
      language: this.language,
      os: this.os,
      platform: this.platform,
      seen: "true",
      wpf: this.wpf,
    };

    const prepareData = this.prepareHmac.prepareData(url, params);
    const wmd = await this.hamc.createHmac(prepareData.data);

    params.wmsgpad = prepareData.time;
    params.wmd = wmd;

    const resp = await this.remote.get(url, { params });
    return resp;
  }
}

export const weverseAPI = new WeverseAPI(
  new AxiosClient({
    options: {
      baseURL: "https://global.apis.naver.com",
      headers: {
        "wev-timezone-id": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    },
    beforeHooks: [
      async (config) => {
        const token = Cookies.get("we2_access_token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
    ],
  }),
  new Hamc(env.WXT_WVK),
  new PrepareHmac("/weverse/wevweb"),
);
