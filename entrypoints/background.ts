import { SidePanelManager } from "@/src/browser/side-panel/manager";
import { TabActivated } from "@/src/browser/tabs/activated";
import { TabUpdated } from "@/src/browser/tabs/updated";
import { Whitelist } from "@/src/util/whitelist";

export default defineBackground(() => {
  const whitelist = new Whitelist(["https://weverse.io/"]);
  const sidePanelManager = new SidePanelManager(
    "side-panel.html",
    whitelist.isAllowed.bind(whitelist),
  );
  const tabUpdated = new TabUpdated();
  const tabActivated = new TabActivated();
  tabUpdated.handleTabUpdate((tabId, _, tab) => {
    sidePanelManager.updateSidePanelState(tab.url, tabId);
  });
  tabActivated.handleTabActivated(async (activeInfo) => {
    const tab = await browser.tabs.get(activeInfo.tabId);
    sidePanelManager.updateSidePanelState(tab.url, activeInfo.tabId);
  });
});
