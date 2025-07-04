import { useQuery } from "@tanstack/react-query";
import { sendMessage } from "@/src/browser/message/send-message";

export function NotiFeed() {
  const query = useQuery({
    queryKey: ["fetchNotiFeedActivities"],
    queryFn: async () => {
      const res = await sendMessage("fetchNotiFeedActivities");
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
