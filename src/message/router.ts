import type { IMessageSender } from "@/src/message/sender";
import {
  type ContentScriptMessage,
  type Message,
  MessageType,
  type SidePanelMessage,
} from "@/src/message/type";
import type { IWeverseAPI } from "@/src/remote/weverse";
import type { IData } from "@/src/sidepanel/store/data";

export interface IMessageRouter {
  route(message: Message): Promise<void>;
}

export class ContentScriptMessageRouter implements IMessageRouter {
  private readonly sender: IMessageSender;
  private readonly weverseAPI: IWeverseAPI;

  constructor(sender: IMessageSender, weverseAPI: IWeverseAPI) {
    this.sender = sender;
    this.weverseAPI = weverseAPI;
  }

  async route(message: ContentScriptMessage) {
    switch (message.data.type) {
      case "fetchNotiFeedActivities":
        await this.sender.send({
          from: MessageType.ContentScript,
          to: MessageType.SidePanel,
          data: {
            type: "fetchNotiFeedActivities",
            // TODO: 데이터 타입 추가
            data: (await this.weverseAPI.fetchNotiFeedActivities()) as {},
          },
        });
        break;

      default:
        console.log("[content script] Unknown message type", { message });
    }
  }
}

export class SidePanelMessageRouter implements IMessageRouter {
  private readonly setState: (state: IData) => void;

  constructor(setState: (state: IData) => void) {
    this.setState = setState;
  }

  async route(message: SidePanelMessage) {
    switch (message.data.type) {
      case "fetchNotiFeedActivities":
        console.log(
          "[side panel] received fetchNotiFeedActivities message",
          message,
        );
        this.setState({
          fetchNotiFeedActivities: {
            isLoading: false,
            data: message.data.data,
          },
        });
        break;
    }
  }
}
