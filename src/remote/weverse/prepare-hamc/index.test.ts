import { expect, test } from "bun:test";
import { PrepareHmac } from "@/src/remote/weverse/prepare-hamc";

test("prepareData", () => {
  const url = "/weverse/wevweb/noti/feed/v2.0/activities";
  const excludeGroup = "COLLECTION,CO_HOST_LIVE,PARTY,CALENDAR";
  const params: Record<string, string> = {
    appId: "be4d79eb8fc7bd008ee82c8ec4ff6fd4",
    excludeGroup: encodeURIComponent(excludeGroup),
    language: "ko",
    os: "WEB",
    platform: "WEB",
    seen: "true",
    wpf: "pc",
  };
  const prepareHmac = new PrepareHmac("/weverse/wevweb");
  const data = prepareHmac.prepareData(url, params, "1751475897609");
  expect(data).toMatchObject({
    data: "/noti/feed/v2.0/activities?appId=be4d79eb8fc7bd008ee82c8ec4ff6fd4&excludeGroup=COLLECTION%252CCO_HOST_LIVE%252CPARTY%252CCALENDAR&language=ko&os=WEB&platform=WEB&seen=true&wpf=pc1751475897609",
    time: "1751475897609",
  });
});
