import {
  ContentScriptMessageHandler,
  MessageHandler,
} from "@/src/message/handler";
import { ContentScriptMessageRouter } from "@/src/message/router";
import { BackgroundSender } from "@/src/message/sender";
import { createWeverseAPI } from "@/src/remote/weverse";

export default defineContentScript({
  matches: ["https://weverse.io/*"],
  async main() {
    console.log("Hello content.");
    const weverseAPI = await createWeverseAPI();

    new MessageHandler(
      new ContentScriptMessageHandler(
        new ContentScriptMessageRouter(new BackgroundSender()),
      ),
    );

    weverseAPI
      .fetchNotiFeedActivities()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  },
});
