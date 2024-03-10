import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import { CartProviderWrapper } from "./context/cart.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <CartProviderWrapper>
          <App />
        </CartProviderWrapper>
      </AuthProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
