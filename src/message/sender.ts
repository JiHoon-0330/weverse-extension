import type {
  ContentScriptMessage,
  Message,
  SidePanelMessage,
} from "@/src/message/type";

export interface IMessageSender {
  send(message: Message): Promise<unknown>;
}

export class BackgroundSender implements IMessageSender {
  async send(message: Message) {
    return await browser.runtime.sendMessage(message);
  }
}

export class ContentScriptSender implements IMessageSender {
  async send(message: ContentScriptMessage) {
    const tab = await browser.tabs.query({ active: true, currentWindow: true });
    const currentTabId = tab[0].id;

    if (!currentTabId) {
      throw new Error("No active tab found");
    }

    return await browser.tabs.sendMessage(currentTabId, message);
  }
}

export class SidePanelSender implements IMessageSender {
  async send(message: SidePanelMessage) {
    return await browser.runtime.sendMessage(message);
  }
}
