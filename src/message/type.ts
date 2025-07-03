export enum MessageType {
  ContentScript = "content-script",
  SidePanel = "sidepanel",
  Background = "background",
}

export type SidePanelMessageData = {
  type: "fetchNotiFeedActivities";
  data: {};
};

export type SidePanelMessage = {
  from: MessageType.ContentScript;
  to: MessageType.SidePanel;
  data: SidePanelMessageData;
};

export type ContentScriptMessageData = {
  type: "fetchNotiFeedActivities";
};

export type ContentScriptMessage = {
  from: MessageType.SidePanel;
  to: MessageType.ContentScript;
  data: ContentScriptMessageData;
};

export type Message = SidePanelMessage | ContentScriptMessage;
