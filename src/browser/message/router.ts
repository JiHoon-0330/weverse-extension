import type { RouteMessage } from "@/src/browser/message/type";
import type { IWeverseAPI } from "@/src/remote/weverse";

export interface IMessageRouter {
  route(message: unknown): Promise<unknown>;
}

export class MessageRouter implements IMessageRouter {
  private readonly weverseAPI: IWeverseAPI;

  constructor(weverseAPI: IWeverseAPI) {
    this.weverseAPI = weverseAPI;
  }

  async route(message: RouteMessage) {
    switch (message.type) {
      case "fetchNotiFeedActivities":
        return await this.weverseAPI.fetchNotiFeedActivities();
    }
  }
}
