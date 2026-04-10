import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { QueryClientProvider } from "@/providers/QueryClientProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <QueryClientProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>,
);
