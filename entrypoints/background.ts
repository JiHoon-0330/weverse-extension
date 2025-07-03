import {
  BackgroundMessageHandler,
  MessageHandler,
} from "@/src/message/handler";
import { ContentScriptSender, SidePanelSender } from "@/src/message/sender";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
  new MessageHandler(
    new BackgroundMessageHandler(
      new ContentScriptSender(),
      new SidePanelSender(),
    ),
  );
});
