import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router";
import "./styles/globals.css";
import { FinanceProvider } from "./context/FinanceProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FinanceProvider>
    <AppRouter />
    </FinanceProvider>
  </React.StrictMode>
);
