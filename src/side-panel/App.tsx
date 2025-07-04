import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { NotiFeed } from "@/src/side-panel/noti-feed/component/NotiFeed";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 10,
      retryDelay: 2_000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <NotiFeed />
      </main>
    </QueryClientProvider>
  );
}

export default App;
