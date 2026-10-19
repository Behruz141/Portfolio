"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useLang } from "../i18n/useLang";
import { useTheme } from "../theme/theme-settings/useTheme";

const getGliderStyles = (dark) => ({
  about: {
    transform: "translateX(0%)",
    background: dark
      ? "linear-gradient(135deg, #46464654, #d4d4d4)"
      : "linear-gradient(135deg, #c0c0c0, #ffd9d9)",
    boxShadow: dark
      ? "0 0 18px rgba(192,192,192,0.5), 0 0 10px rgba(255,255,255,0.4) inset"
      : "0 4px 15px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
  },
  projects: {
    transform: "translateX(100%)",
    background: dark
      ? "linear-gradient(135deg, #ffd70055, #ffcc00)"
      : "linear-gradient(135deg, #ffeaa7, #ffcc00)",
    boxShadow: dark
      ? "0 0 18px rgba(255,215,0,0.5), 0 0 10px rgba(255,235,150,0.4) inset"
      : "0 4px 15px rgba(255, 204, 0, 0.3), 0 1px 3px rgba(0,0,0,0.05)",
  },
  services: {
    transform: "translateX(200%)",
    background: dark
      ? "linear-gradient(135deg, #8b5cf655, #a78bfa)"
      : "linear-gradient(135deg, #ddd6fe, #a78bfa)",
    boxShadow: dark
      ? "0 0 18px rgba(139,92,246,0.5), 0 0 10px rgba(167,139,250,0.4) inset"
      : "0 4px 15px rgba(167, 139, 250, 0.4), 0 1px 3px rgba(0,0,0,0.05)",
  },
  contact: {
    transform: "translateX(300%)",
    background: dark
      ? "linear-gradient(135deg, #e56e6e54, #65bdfcac)"
      : "linear-gradient(135deg, #ffb1b1, #9cd5ff)",
    boxShadow: dark
      ? "0 0 18px rgba(160,216,255,0.5), 0 0 10px rgba(200,240,255,0.4) inset"
      : "0 4px 15px rgba(156, 213, 255, 0.4), 0 1px 3px rgba(0,0,0,0.05)",
  },
});

export default function HeaderMenu() {
  const { t } = useLang();
  const theme = useTheme();
  const dark = theme?.dark ?? false;

  const [selected, setSelected] = useState("about");
  const isClickScrolling = useRef(false);

  const plans = useMemo(
    () => [
      { id: "about", label: t("about") || "Haqimda" },
      { id: "projects", label: t("projects") || "Loyihalar" },
      { id: "services", label: t("services") || "Xizmatlar" },
      { id: "contact", label: t("contact") || "Aloqa" },
    ],
    [t],
  );

  const gliderStyles = getGliderStyles(dark);

  // Foydalanuvchi scroll qilganda aynan qaysi section ekranda turganini hisoblash
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const scrollPosition = window.scrollY + 200; // Header balandligi va ozgina ofset
      const sectionIds = ["about", "projects", "services", "contact"];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setSelected(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Dastlabki yuklanishda tekshirish

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    isClickScrolling.current = true;
    setSelected(id);

    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 90;
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);
  };

  return (
    <div
      className="relative flex w-fit overflow-hidden rounded-2xl bg-black/10 dark:bg-white/10 backdrop-blur-md"
      style={{
        boxShadow: dark
          ? "inset 1px 1px 4px rgba(255,255,255,0.467), inset -1px -1px 6px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15)"
          : "inset 1px 1px 4px rgba(0,0,0,0.1), inset -1px -1px 6px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {plans.map((plan) => (
        <button
          key={plan.id}
          type="button"
          onClick={() => scrollToSection(plan.id)}
          className={`relative z-10 flex min-w-24 flex-1 xl:min-w-44 cursor-pointer items-center justify-center px-4 xl:px-6 py-[0.85rem] text-[15px] xl:text-[16px] font-semibold tracking-[0.3px] transition-colors duration-300 outline-none select-none
            ${
              selected === plan.id
                ? "text-gray-900 dark:text-white font-bold"
                : "text-gray-500 dark:text-[#e5e5e5] hover:text-gray-900 dark:hover:text-white"
            }`}
        >
          {plan.label}
        </button>
      ))}

      <div
        className="absolute bottom-0 top-0 z-0 w-1/4 rounded-2xl transition-all duration-500 ease-in-out"
        style={{
          ...gliderStyles[selected],
        }}
      />
    </div>
  );
}
