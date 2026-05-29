import { useState, useEffect } from "react";
import { useLang } from "../i18n/useLang";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const links = [
    { id: "about", label: t("about") },
    { id: "projects", label: t("projects") },
    { id: "contact", label: t("contact") },
  ];

  const handleScroll = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300); // Delayni sal oshirdik, menyu to'liq yopilib bo'lishi uchun
    }
  };

  return (
    <div className="md:hidden">
      {/* HAMBURGER TUGMASI */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-110 p-2 text-gray-800 dark:text-white transition-all duration-300 hover:opacity-70"
      >
        <div
          className={`w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`}
        />
        <div
          className={`w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <div
          className={`w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"}`}
        />
      </button>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-100 bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "opacity-100 visible scale-100"
            : "opacity-0 invisible scale-95"
        }`}
      >
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScroll(link.id)}
            className="text-4xl font-bold text-gray-800 dark:text-white transition-all hover:text-amber-500 hover:scale-110 active:scale-95"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
