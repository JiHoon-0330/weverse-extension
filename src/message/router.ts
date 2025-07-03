import type { IMessageSender } from "@/src/message/sender";
import {
  type ContentScriptMessage,
  type Message,
  MessageType,
  type SidePanelMessage,
  type SidePanelMessageData,
} from "@/src/message/type";

export interface IMessageRouter {
  route(message: Message): Promise<void>;
}

export class ContentScriptMessageRouter implements IMessageRouter {
  private readonly sender: IMessageSender;

  constructor(sender: IMessageSender) {
    this.sender = sender;
  }

  async route(message: ContentScriptMessage) {
    switch (message.data.type) {
      case "test":
        await this.sender.send({
          from: MessageType.ContentScript,
          to: MessageType.SidePanel,
          data: {
            type: "test",
          },
        });
        break;

      default:
        console.log("[content script] Unknown message type", { message });
    }
  }
}

export class SidePanelMessageRouter implements IMessageRouter {
  private readonly setState: (state: SidePanelMessageData) => void;

  constructor(setState: (state: SidePanelMessageData) => void) {
    this.setState = setState;
  }

  async route(message: SidePanelMessage) {
    switch (message.data.type) {
      case "test":
        console.log("[side panel] received test message", message);
        this.setState(message.data);
        break;
    }
  }
}
