import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { WishProvider } from "./context/WishProvider.tsx";
import { SnackbarProvider } from "./context/SnackbarContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <WishProvider>
          <App />
        </WishProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </StrictMode>
);
