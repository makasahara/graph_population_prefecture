import { QueryClient, QueryClientProvider } from "react-query";
import TopPg from "./components/5-pg/topPg";
import LoadingBoundary from "./components/1-atm/loadingBoundary";
import ErrorCatcher from "./components/1-atm/errorCatcher";
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
    <LoadingBoundary>
      <ErrorCatcher>
        <QueryClientProvider client={queryClient}>
          <TopPg />
        </QueryClientProvider>
      </ErrorCatcher>
    </LoadingBoundary>
  );
}

export default App;
