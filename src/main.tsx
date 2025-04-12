import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/custom-bootstrap.scss";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider authType="cookie" authName="_auth" cookieDomain={window.location.hostname} cookieSecure={false}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
