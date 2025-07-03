import { MessageHandler, SidePanelMessageHandler } from "@/src/message/handler";
import "./App.css";
import { useLayoutEffect } from "react";
import { SidePanelMessageRouter } from "@/src/message/router";
import { BackgroundSender } from "@/src/message/sender";
import { MessageType } from "@/src/message/type";
import { useDataStore } from "@/src/sidepanel/store/data.hook";

function App() {
  const data = useDataStore((store) => store.data);
  const setData = useDataStore((store) => store.setData);

  useLayoutEffect(() => {
    new MessageHandler(
      new SidePanelMessageHandler(
        new SidePanelMessageRouter((state) => setData(state)),
      ),
    );

    const sender = new BackgroundSender();
    sender.send({
      from: MessageType.SidePanel,
      to: MessageType.ContentScript,
      data: {
        type: "fetchNotiFeedActivities",
      },
    });
  }, [setData]);

  return (
    <main>
      {data.fetchNotiFeedActivities.isLoading ? (
        <p>Loading...</p>
      ) : (
        JSON.stringify(data.fetchNotiFeedActivities)
      )}
    </main>
  );
}

export default App;
