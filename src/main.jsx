import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthCtxProvider } from "./context/AuthCtx";
import { DisplayCtxProvider } from "./context/DisplayCtx";
import { BrowserRouter } from "react-router-dom";
import { ContactCtxProvider } from "./context/ContactCtx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthCtxProvider>
      <DisplayCtxProvider>
        <ContactCtxProvider>
          <App />
        </ContactCtxProvider>
      </DisplayCtxProvider>
    </AuthCtxProvider>
  </BrowserRouter>
);
