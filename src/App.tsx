import { QueryClient, QueryClientProvider } from "react-query";
import TopPg from "./components/5-pg/topPg";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TopPg />
    </QueryClientProvider>
  );
}

export default App;
