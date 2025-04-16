import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";  // Impor BrowserRouter
import './index.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>  {/* Membungkus App dengan BrowserRouter */}
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);
