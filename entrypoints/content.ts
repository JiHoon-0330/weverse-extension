import { delay } from "es-toolkit";
import { createWeverseAPI, type IWeverseAPI } from "@/src/remote/weverse";

export default defineContentScript({
  matches: ["https://weverse.io/*"],
  async main() {
    console.log("Hello content.");
    await delay(5_000);
    const messageRouter = new MessageRouter(await createWeverseAPI());
    console.log("wverseAPI loaded.");

    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log("content message", message);
      asyncFunc(sendResponse, () => messageRouter.route(message));

      return true;
    });

    async function asyncFunc(
      sendResponse: (res: any) => void,
      func: () => Promise<unknown>,
    ) {
      try {
        const res = await func();
        sendResponse({ data: res, error: null });
      } catch (error) {
        console.error("error", error);
        sendResponse({ data: null, error });
      }
    }
  },
});

class MessageRouter {
  private readonly weverseAPI: IWeverseAPI;

  constructor(weverseAPI: IWeverseAPI) {
    this.weverseAPI = weverseAPI;
  }

  async route(message: any) {
    const { type, data } = message;
    switch (type) {
      case "fetchNotiFeedActivities":
        return await this.weverseAPI.fetchNotiFeedActivities();
    }
  }
}
