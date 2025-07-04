export class TabUpdated {
  handleTabUpdate(
    handler: (
      tabId: number,
      changeInfo: globalThis.Browser.tabs.TabChangeInfo,
      tab: globalThis.Browser.tabs.Tab,
    ) => void,
  ) {
    browser.tabs.onUpdated.addListener(handler);
  }
}
