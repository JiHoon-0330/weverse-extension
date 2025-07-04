import type {
  Message,
  MessagesWithOptions,
  MessagesWithoutOptions,
} from "@/src/browser/message/type";

export async function sendMessage<K extends keyof MessagesWithoutOptions>(
  type: K,
): Promise<Message[K]["response"]["data"]>;
export async function sendMessage<K extends keyof MessagesWithOptions>(
  type: K,
  options: Message[K]["options"],
): Promise<Message[K]["response"]["data"]>;
export async function sendMessage<K extends keyof Message>(
  type: K,
  options?: Message[K]["options"],
): Promise<Message[K]["response"]["data"]> {
  const currentTabId = await getCurrentTabId();

  const res: Message[K]["response"] = await browser.tabs.sendMessage(
    currentTabId,
    {
      type,
      options,
    },
  );
  console.log("res", res);

  if (res.error) {
    throw res.error;
  }

  return res.data;
}

async function getCurrentTabId() {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  const currentTabId = tab.id;

  if (!currentTabId) throw new Error("No active tab found");

  return currentTabId;
}
