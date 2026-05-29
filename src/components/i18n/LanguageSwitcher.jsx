import { useState, useRef, useEffect } from "react";
import { useLang } from "./useLang";

const LANGS = [
  { code: "uz", flag: "🇺🇿", label: "O'zb" },
  { code: "ru", flag: "🇷🇺", label: "Рус" },
  { code: "en", flag: "🇬🇧", label: "Eng" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGS.find((l) => l.code === lang);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative select-none">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border transition-all duration-200 w-full min-w-25
          ${
            open
              ? "bg-amber-500/10 border-amber-500/50 text-amber-500"
              : "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20"
          }`}
      >
        <span className="text-lg">{current.flag}</span>
        <span className="font-semibold text-sm">{current.label}</span>
        <span
          className={`text-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-full min-w-30 bg-white dark:bg-[#2a2a2e] rounded-xl border border-gray-200 dark:border-white/10 shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-2 text-sm transition-all
                ${
                  l.code === lang
                    ? "bg-amber-500/10 text-amber-500 font-bold border-l-2 border-amber-500"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 border-l-2 border-transparent"
                }`}
            >
              <span>{l.flag}</span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
