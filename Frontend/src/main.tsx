import "@/features/i18n/i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./app/index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing in index.html");

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
