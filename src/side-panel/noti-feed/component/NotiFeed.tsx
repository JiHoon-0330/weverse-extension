import { useQuery } from "@tanstack/react-query";

export function NotiFeed() {
  const query = useQuery({
    queryKey: ["fetchNotiFeedActivities"],
    queryFn: async () => {
      const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      const currentTabId = tab.id;

      if (!currentTabId) throw new Error("No active tab found");

      const res = await browser.tabs.sendMessage(currentTabId, {
        from: "side",
        to: "content",
        data: {
          type: "fetchNotiFeedActivities",
        },
      });
      console.log("res", res);
      return res;
    },
  });

  return (
    <div>
      <h1>NotiFeed</h1>

      {query.isLoading ? <p>Loading...</p> : JSON.stringify(query.data)}
    </div>
  );
}
