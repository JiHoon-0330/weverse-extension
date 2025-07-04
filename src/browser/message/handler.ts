import type { IMessageRouter } from "@/src/browser/message/router";

export class MessageHandler {
  private readonly messageRouter: IMessageRouter;

  constructor(messageRouter: IMessageRouter) {
    this.messageRouter = messageRouter;
    browser.runtime.onMessage.addListener(this.handleMessage.bind(this));
  }

  handleMessage(
    message: unknown,
    sender: Browser.runtime.MessageSender,
    sendResponse: (response?: unknown) => void,
  ) {
    console.log("content message", message);
    this.asyncFunc(sendResponse, () => this.messageRouter.route(message));

    return true;
  }

  private async asyncFunc(
    sendResponse: (res: any) => void,
    func: () => Promise<unknown>,
  ) {
    console.log("asyncFunc", sendResponse, func);
    try {
      const res = await func();
      sendResponse({ data: res, error: null });
    } catch (error) {
      console.error("error", error);
      sendResponse({ data: null, error });
    }
  }
}
