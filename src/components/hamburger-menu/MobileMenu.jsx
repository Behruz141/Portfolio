import { useState, useEffect } from "react";
import { useLang } from "../i18n/useLang";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLang();

  // Menyu ochilganda sahifani qotirib qo'yish
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  const links = [
    { id: "about", label: t("about") },
    { id: "projects", label: t("projects") },
    { id: "contact", label: t("contact") },
  ];

  const handleScroll = (id) => {
    setIsOpen(false); // Menyu bosilganda yopilishi
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Tugmasi */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 text-gray-800 dark:text-white"
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

      {/* Menyuning O'zi (Overlay) */}
      <div
        className={`fixed inset-0 z-40 bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScroll(link.id)}
            className="text-2xl font-bold text-gray-800 dark:text-white hover:text-amber-500 transition-colors"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
