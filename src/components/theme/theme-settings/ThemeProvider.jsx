"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { ThemeContext } from "./ThemeContext";

// Tema haqiqatda <html class="dark"> da saqlanadi. Biz shu klassni "kuzatamiz".
// (Server'da localStorage yo'q, shuning uchun useState(localStorage...) xato bergan bo'lardi.)
function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false; // server doim "light" deb hisoblaydi

export function ThemeProvider({ children }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    // Sahifa foni globals.css'da (html.dark body) — bu yerda JS kerak emas
  }, []);

  const value = useMemo(() => ({ dark, toggleTheme }), [dark, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
