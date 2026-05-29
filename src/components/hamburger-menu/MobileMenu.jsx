import { useState, useEffect } from "react";
import { useLang } from "../i18n/useLang";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLang();

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
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // scrollIntoView oldin menyuni yopib, keyin skroll qilish uchun kichik delay
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Tugmasi */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-110 p-2 text-gray-800 dark:text-white focus:outline-none"
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
        className={`fixed inset-0 z-100 bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScroll(link.id)}
            className="text-3xl font-bold text-gray-800 dark:text-white hover:text-amber-500 transition-all active:scale-95"
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
