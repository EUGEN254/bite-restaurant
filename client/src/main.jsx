import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { RestaurantContextProvider } from "./context/RestaurantContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RestaurantContextProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </RestaurantContextProvider>
    </BrowserRouter>
  </StrictMode>
);
