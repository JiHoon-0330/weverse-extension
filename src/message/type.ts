export enum MessageType {
  ContentScript = "content-script",
  SidePanel = "sidepanel",
  Background = "background",
}

export type SidePanelMessageData = {
  type: "test";
};

export type SidePanelMessage = {
  from: MessageType.ContentScript;
  to: MessageType.SidePanel;
  data: SidePanelMessageData;
};

export type ContentScriptMessageData = {
  type: "test";
};

export type ContentScriptMessage = {
  from: MessageType.SidePanel;
  to: MessageType.ContentScript;
  data: ContentScriptMessageData;
};

export type Message = SidePanelMessage | ContentScriptMessage;
