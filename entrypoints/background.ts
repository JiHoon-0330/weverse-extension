import { SidePanelManager } from "@/src/browser/side-panel/manager";
import { TabActivated, TabUpdated } from "@/src/browser/tabs/handler";
import { Whitelist } from "@/src/util/whitelist";

export default defineBackground(() => {
  const whitelist = new Whitelist(["https://weverse.io/"]);
  const sidePanelManager = new SidePanelManager(
    "side-panel.html",
    whitelist.isAllowed.bind(whitelist),
  );
  new TabUpdated((tabId, _, tab) => {
    sidePanelManager.updateSidePanelState(tab.url, tabId);
  });
  new TabActivated(async (activeInfo) => {
    const tab = await browser.tabs.get(activeInfo.tabId);
    sidePanelManager.updateSidePanelState(tab.url, activeInfo.tabId);
  });
});
