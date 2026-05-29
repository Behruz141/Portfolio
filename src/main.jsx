import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./Router";
import { ThemeProvider } from "./components/theme/theme-settings/ThemeProvider";
import { LanguageProvider } from "./components/i18n/LanguageProvider"; // ← QO'SHILDI

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        {" "}
        {/* ← QO'SHILDI */}
        <AppRouter />
      </LanguageProvider>{" "}
      {/* ← QO'SHILDI */}
    </ThemeProvider>
  </React.StrictMode>,
);
