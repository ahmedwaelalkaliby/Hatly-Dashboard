import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { BreadCrumbProvider } from "./context/BreadCrumbContext";
import { CountriesProvider } from "./context/CountriesProvider";
import { router } from "./Router/Router";
 
function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <BreadCrumbProvider>
            <CountriesProvider>
              <RouterProvider router={router} />
            </CountriesProvider>
          </BreadCrumbProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
