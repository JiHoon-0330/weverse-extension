import { MessageHandler, SidePanelMessageHandler } from "@/src/message/handler";
import "./App.css";
import { SidePanelMessageRouter } from "@/src/message/router";
import { BackgroundSender } from "@/src/message/sender";
import { MessageType, type SidePanelMessageData } from "@/src/message/type";

function App() {
  const [response, setResponse] = useState<SidePanelMessageData | null>(null);

  useEffect(() => {
    new MessageHandler(
      new SidePanelMessageHandler(
        new SidePanelMessageRouter((state) => setResponse(state)),
      ),
    );
  }, []);

  return (
    <main>
      <button
        type="button"
        onClick={async () => {
          const sender = new BackgroundSender();
          await sender.send({
            from: MessageType.SidePanel,
            to: MessageType.ContentScript,
            data: {
              type: "test",
            },
          });
        }}
      >
        메세지 보내기
      </button>
      <p>응답: {response?.type}</p>
    </main>
  );
}

export default App;
