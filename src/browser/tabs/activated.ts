export class TabActivated {
  handleTabActivated(
    handler: (activeInfo: Browser.tabs.TabActiveInfo) => void,
  ) {
    browser.tabs.onActivated.addListener(handler);
  }
}
