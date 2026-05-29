import { useState, useRef, useEffect } from "react";
import { useLang } from "./useLang";
import { useTheme } from "../theme/theme-settings/useTheme";

const LANGS = [
  { code: "uz", flag: "🇺🇿", label: "O'zb" },
  { code: "ru", flag: "🇷🇺", label: "Рус" },
  { code: "en", flag: "en", label: "Eng" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  // Theme kontekstini to'g'ri chaqiramiz
  const theme = useTheme();
  const dark = theme?.dark ?? false;

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGS.find((l) => l.code === lang);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", userSelect: "none" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 120,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          borderRadius: 10,
          cursor: "pointer",
          outline: "none",
          // Asosiy tugma foni
          background: open
            ? "rgba(245,158,11,0.15)"
            : dark
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.04)", // Light rejim uchun biroz ochroq fon
          // Tugma chegarasi (Border)
          border: `1px solid ${
            open
              ? "rgba(245,158,11,0.5)"
              : dark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.08)" // Light rejim borderini noziklashtirdik
          }`,
          transition: "all 0.2s ease",
        }}
      >
        <span style={{ fontSize: 14, color: "#f59e0b" }}>{current.flag}</span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            // Asosiy tugma matni rangi
            color: open ? "#f59e0b" : dark ? "#d1d5db" : "#110e09cf", // Matn logotip bilan bir xil qoramtir rangda bo'lishi uchun
            transition: "color 0.2s",
          }}
        >
          {current.label}
        </span>
        <span
          style={{
            fontSize: 12,
            color: open ? "#f59e0b" : dark ? "#9ca3af" : "#6b7280",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "all 0.2s",
          }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            // Ochiladigan menyu foni
            background: dark ? "#2a2a2e" : "#ffffff",
            border: `1px solid ${
              dark ? "rgba(245,158,11,0.25)" : "rgba(0,0,0,0.08)"
            }`,
            borderRadius: 10,
            overflow: "hidden",
            minWidth: 110,
            // Ochiladigan menyu soyasi
            boxShadow: dark
              ? "0 8px 24px rgba(0,0,0,0.4)"
              : "0 8px 24px rgba(0,0,0,0.08)", // Light rejimda yumshoqroq soya
            animation: "fadeDown 0.15s ease",
            zIndex: 50, // Boshqa elementlar ostida qolib ketmasligi uchun
          }}
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "8px 14px",
                cursor: "pointer",
                background:
                  l.code === lang ? "rgba(245,158,11,0.15)" : "transparent",
                border: "none",
                outline: "none",
                borderLeft: `2px solid ${
                  l.code === lang ? "#f59e0b" : "transparent"
                }`,
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (l.code !== lang)
                  e.currentTarget.style.background = dark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.03)"; // Light rejim hover effekti
              }}
              onMouseLeave={(e) => {
                if (l.code !== lang)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 14, color: "#f59e0b" }}>{l.flag}</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  // Menyu ichidagi matn ranglari
                  color:
                    l.code === lang ? "#f59e0b" : dark ? "#d1d5db" : "#374151",
                }}
              >
                {l.label}
              </span>
            </button>
          ))}
        </div>
      )}
      <style>{`@keyframes fadeDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
