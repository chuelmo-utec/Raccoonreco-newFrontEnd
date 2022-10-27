/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import ThemeProvider from "./redux/providers/theme-provider";
import PersistProvider from "./redux/providers/persist-provider";
import { store } from "./redux/store";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const container = document.getElementById("root")!;
const root = createRoot(container);
const queryClient = new QueryClient({
    defaultOptions: {
        // These defaults are overriden to avoid data inconsistencies in the application, because not every API request is done using RQ.
        queries: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});

root.render(
    <Provider store={store}>
        <PersistProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </PersistProvider>
    </Provider>
);
