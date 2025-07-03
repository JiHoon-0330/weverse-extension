import { expect, test } from "bun:test";
import { env } from "@/src/env";
import { Hamc } from "@/src/remote/weverse/hamc";

test("createHmac", async () => {
  const data =
    "/noti/feed/v2.0/activities?appId=be4d79eb8fc7bd008ee82c8ec4ff6fd4&excludeGroup=COLLECTION%2CCO_HOST_LIVE%2CPARTY%2CCALENDAR&language=ko&os=WEB&platform=WEB&seen=true&wpf=pc1751475897609";
  const result = "Ci7Be2XJkiDXhibh57JrJQkElh8=";
  const hamc = new Hamc(env.WXT_WVK, "SHA-1");
  const sha1 = await hamc.createHmac(data);
  expect(sha1).toBe(result);
});
