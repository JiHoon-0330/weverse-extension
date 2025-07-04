export class SidePanelManager {
  private readonly path: string;
  private readonly checkEnabledUrl: (url: string) => boolean;

  constructor(path: string, checkEnabledUrl: (url: string) => boolean) {
    this.path = path;
    this.checkEnabledUrl = checkEnabledUrl;
    browser.sidePanel.setOptions({ enabled: false });
    browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  }

  updateSidePanelState(url: string | undefined, tabId: number | undefined) {
    if (!url || !tabId) {
      return;
    }

    const enabled = this.checkEnabledUrl(url);
    browser.sidePanel.setOptions({ enabled, tabId, path: this.path });
  }
}
