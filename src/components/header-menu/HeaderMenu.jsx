import { useState, useEffect, useMemo } from "react";
import { useLang } from "../i18n/useLang";
import { useTheme } from "../theme/theme-settings/useTheme";

// Original dizayningizdagi gradientlar saqlab qolindi
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
  contact: {
    transform: "translateX(200%)",
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
  const [isScrolling, setIsScrolling] = useState(false);

  // useMemo orqali ESLint ogohlantirishini yechamiz
  const plans = useMemo(
    () => [
      { id: "about", label: t("about") },
      { id: "projects", label: t("projects") },
      { id: "contact", label: t("contact") },
    ],
    [t],
  );

  const gliderStyles = getGliderStyles(dark);

  // Scroll Spy: Sahifa skroll bo'lganda menyuni kuzatish
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return; // Agar tugma bosilgan bo'lsa, avtomatik o'zgarishni vaqtincha to'xtatamiz

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelected(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    plans.forEach((p) => {
      const element = document.getElementById(p.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [plans, isScrolling]);

  const handleSelect = (id) => {
    setIsScrolling(true);
    setSelected(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Scroll tugagach (800ms) kuzatuvni qayta yoqamiz
    setTimeout(() => setIsScrolling(false), 800);
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
        <label
          key={plan.id}
          className={`relative z-10 flex min-w-64 flex-1 cursor-pointer items-center justify-center px-6 py-[0.9rem] text-[16px] font-semibold tracking-[0.3px] transition-colors duration-300
            ${
              selected === plan.id
                ? "text-gray-800 dark:text-white"
                : "text-gray-500 dark:text-[#e5e5e5] hover:text-gray-900 dark:hover:text-white"
            }`}
        >
          <input
            type="radio"
            name="plan"
            className="hidden"
            checked={selected === plan.id}
            onChange={() => handleSelect(plan.id)}
          />
          {plan.label}
        </label>
      ))}

      {/* Glider (Slider) */}
      <div
        className="absolute bottom-0 top-0 z-0 w-1/3 rounded-2xl transition-all duration-500 ease-in-out"
        style={{
          ...gliderStyles[selected],
        }}
      />
    </div>
  );
}
