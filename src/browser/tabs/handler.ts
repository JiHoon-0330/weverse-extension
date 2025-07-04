export class TabActivated {
  constructor(handler: (activeInfo: Browser.tabs.TabActiveInfo) => void) {
    browser.tabs.onActivated.addListener(handler);
  }
}

export class TabUpdated {
  constructor(
    handler: (
      tabId: number,
      changeInfo: globalThis.Browser.tabs.TabChangeInfo,
      tab: globalThis.Browser.tabs.Tab,
    ) => void,
  ) {
    browser.tabs.onUpdated.addListener(handler);
  }
}
