import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthCtxProvider } from "./context/AuthCtx";
import { DisplayCtxProvider } from "./context/DisplayCtx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthCtxProvider>
      <DisplayCtxProvider>
        <App />
      </DisplayCtxProvider>
    </AuthCtxProvider>
  </BrowserRouter>
);
