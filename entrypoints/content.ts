import { delay } from "es-toolkit";
import { MessageHandler } from "@/src/browser/message/handler";
import { MessageRouter } from "@/src/browser/message/router";
import { createWeverseAPI } from "@/src/remote/weverse";

export default defineContentScript({
  matches: ["https://weverse.io/*"],
  async main() {
    console.log("Hello content.");
    await delay(5_000);
    const messageRouter = new MessageRouter(await createWeverseAPI());
    new MessageHandler(messageRouter);
  },
});
