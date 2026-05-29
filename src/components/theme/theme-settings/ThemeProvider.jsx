import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    // Light va Dark uchun fon ranglarini shu yerda o'rnatamiz
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      // Dark rejimda body rangi
      document.body.style.backgroundColor = "#1a1a1a";
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      // LIGHT REJIMDA O'ZINGIZ ISTAGAN RANGNI SHU YERGA YOZING
      document.body.style.backgroundColor = "#e5e5e5b7";
    }
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
