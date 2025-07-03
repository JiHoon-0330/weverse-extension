import { delay } from "es-toolkit";
import type { IMessageRouter } from "@/src/message/router";
import type { IMessageSender } from "@/src/message/sender";
import { type Message, MessageType } from "@/src/message/type";

interface IMessageHandler {
  handle(
    message: Message,
    sender: Browser.runtime.MessageSender,
    sendResponse: (response: unknown) => void,
  ): Promise<void>;
}

export class BackgroundMessageHandler implements IMessageHandler {
  private readonly contentScriptSender: IMessageSender;
  private readonly sidePanelSender: IMessageSender;

  constructor(
    contentScriptSender: IMessageSender,
    sidePanelSender: IMessageSender,
  ) {
    this.contentScriptSender = contentScriptSender;
    this.sidePanelSender = sidePanelSender;
  }

  async handle(
    message: Message,
    sender: Browser.runtime.MessageSender,
    sendResponse: (response: unknown) => void,
  ): Promise<void> {
    switch (message.to) {
      case MessageType.ContentScript:
        console.log("[background] to content script", message);

        this.contentScriptSender.send(message).catch(async () => {
          await delay(1_000);
          this.handle(message, sender, sendResponse);
        });
        break;

      case MessageType.SidePanel:
        console.log("[background] to side panel", message);
        this.sidePanelSender.send(message).catch(async () => {
          await delay(1_000);
          this.handle(message, sender, sendResponse);
        });
        break;

      default:
        console.log("[background] Unknown message type", { message });
    }
  }
}

export class ContentScriptMessageHandler implements IMessageHandler {
  private readonly router: IMessageRouter;

  constructor(router: IMessageRouter) {
    this.router = router;
  }

  async handle(
    message: Message,
    sender: Browser.runtime.MessageSender,
    sendResponse: (response: unknown) => void,
  ): Promise<void> {
    switch (message.to) {
      case MessageType.ContentScript: {
        console.log("[content script] received content script", message);
        await this.router.route(message).catch(async () => {
          await delay(1_000);
          this.handle(message, sender, sendResponse);
        });
        break;
      }

      default:
        console.log("[content script] Unknown message type", { message });
    }
  }
}

export class SidePanelMessageHandler implements IMessageHandler {
  private readonly router: IMessageRouter;

  constructor(router: IMessageRouter) {
    this.router = router;
  }

  async handle(
    message: Message,
    sender: Browser.runtime.MessageSender,
    sendResponse: (response: unknown) => void,
  ): Promise<void> {
    switch (message.to) {
      case MessageType.SidePanel:
        console.log("[side panel] received side panel", message);
        await this.router.route(message).catch(async () => {
          await delay(1_000);
          this.handle(message, sender, sendResponse);
        });
        break;

      default:
        console.log("[side panel] Unknown message type", { message });
    }
  }
}

export class MessageHandler {
  private readonly handler: IMessageHandler;

  constructor(handler: IMessageHandler) {
    this.handler = handler;
    this.addListener();
  }

  addListener() {
    browser.runtime.onMessage.addListener(
      this.handler.handle.bind(this.handler),
    );
  }
}
