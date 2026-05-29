import { useState, useEffect } from "react"; // useEffect qo'shildi
import { useLang } from "../i18n/useLang";
import { useTheme } from "../theme/theme-settings/useTheme";

// Glider stillari: dark va light rejimlariga qarab dinamik o'zgaradi
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
  const [animated, setAnimated] = useState(false);

  const gliderStyles = getGliderStyles(dark);

  const plans = [
    { id: "about", label: t("about") },
    { id: "projects", label: t("projects") },
    { id: "contact", label: t("contact") },
  ];

  // 1. SCROLL SPY FUNKSIYASI (FOYDALANUVCHI SKROL QILGANDA MENYUNI YANGILASH)
  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          setSelected(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    });

    // TO'G'RILANDI: plans o'rniga to'g'ridan-to'g'ri ID-larni yozdik
    ["about", "projects", "contact"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []); // Endi bu yer bo'm-bo'sh tursa ham ESLint urishmaydi!

  // 2. TUGMA BOSILGANDA SAHIFANI SKROL QILISH FUNKSIYASI
  const handleSelect = (id) => {
    if (!animated) setAnimated(true);
    setSelected(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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
          className={`relative z-10 flex min-w-64 flex-1 cursor-pointer items-center justify-center px-6 py-[0.9rem] text-[16px] font-semibold tracking-[0.3px] transition-all duration-300 ease-in-out
            ${
              selected === plan.id
                ? "text-gray-800 dark:text-white"
                : "text-gray-500 dark:text-[#e5e5e5] hover:text-gray-900 dark:hover:text-white hover:-translate-y-0.5"
            }`}
        >
          <input
            type="radio"
            name="plan"
            value={plan.id}
            checked={selected === plan.id}
            onChange={() => handleSelect(plan.id)}
            className="hidden"
          />
          {plan.label}
        </label>
      ))}

      {selected && (
        <div
          className="absolute bottom-0 top-0 z-0 w-1/3 rounded-2xl"
          style={{
            ...gliderStyles[selected],
            transition: animated
              ? "transform 0.5s cubic-bezier(0.37,1.95,0.66,0.56), background 0.4s ease-in-out, box-shadow 0.4s ease-in-out"
              : "none",
          }}
        />
      )}
    </div>
  );
}
