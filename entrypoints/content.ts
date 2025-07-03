import {
  ContentScriptMessageHandler,
  MessageHandler,
} from "@/src/message/handler";
import { ContentScriptMessageRouter } from "@/src/message/router";
import { BackgroundSender } from "@/src/message/sender";
import { weverseAPI } from "@/src/remote/weverse";

export default defineContentScript({
  matches: ["https://weverse.io/*"],
  main() {
    console.log("Hello content.");

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
