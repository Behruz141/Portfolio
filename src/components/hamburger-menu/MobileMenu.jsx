import { useState } from "react";
import { useLang } from "../i18n/useLang";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLang();

  // Menyu ochilganda asosiy oynani qotirib qo'ymaslik uchun
  // overflow kodini olib tashladik, chunki orqa fon endi to'smaydi.

  // Linklar ro'yxati (Asosiy link qo'shildi)
  const links = [
    { id: "home", path: "/", label: t("home") || "Asosiy" }, // Tarjimada "home" bo'lmasa, "Asosiy" chiqadi
    { id: "about", label: t("about") },
    { id: "projects", label: t("projects") },
    { id: "contact", label: t("contact") },
  ];

  const handleNavigation = (link) => {
    setIsOpen(false);

    if (link.path) {
      // Sahifa yangilanmasdan, eng tepaga silliq chiqadi (Smooth Scroll)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    } else {
      setTimeout(() => {
        const element = document.getElementById(link.id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  };

  return (
    <div className="md:hidden">
      {/* ─── HAMBURGER TUGMASI ─────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Menyuni yopish" : "Menyuni ochish"}
        className="relative flex flex-col items-center justify-center w-10 h-10 p-2"
        style={{ zIndex: 10002 }}
      >
        <span
          className="block bg-gray-800 dark:bg-white"
          style={{
            width: "22px",
            height: "2px",
            borderRadius: "2px",
            marginBottom: "5px",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
            transform: isOpen
              ? "translateY(7px) rotate(45deg)"
              : "translateY(0) rotate(0deg)",
          }}
        />
        <span
          className="block bg-gray-800 dark:bg-white"
          style={{
            width: "22px",
            height: "2px",
            borderRadius: "2px",
            marginBottom: "5px",
            transition:
              "opacity 0.25s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "scaleX(0)" : "scaleX(1)",
          }}
        />
        <span
          className="block bg-gray-800 dark:bg-white"
          style={{
            width: "22px",
            height: "2px",
            borderRadius: "2px",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
            transform: isOpen
              ? "translateY(-7px) rotate(-45deg)"
              : "translateY(0) rotate(0deg)",
          }}
        />
      </button>

      {/* ─── KO'RINMAS ORQA FON (Faqat yopish uchun) ─────────────────
          Xiralashish va qorayish butunlay olib tashlandi */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          backgroundColor: "transparent",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
      />

      {/* ─── KICHIK MENYU KARTASI ──────────────────────────────────── */}
      <div
        className="bg-white dark:bg-[#18181b] shadow-xl rounded-2xl"
        style={{
          position: "absolute",
          top: "4rem",
          right: "1rem",
          zIndex: 10001,
          width: "200px",
          padding: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          border: "0.5px solid rgba(255,255,255,0.1)", // Logodagi kabi nafis hoshiya
          transformOrigin: "top right",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transform: isOpen
            ? "scale(1) translateY(0)"
            : "scale(0.95) translateY(-10px)",
          transition:
            "opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1), visibility 0.3s",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {links.map((link, index) => (
          <button
            key={link.id}
            onClick={() => handleNavigation(link)}
            className="text-gray-800 dark:text-gray-200"
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              textAlign: "left",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              transition: `
                color 0.2s ease,
                background-color 0.2s ease,
                opacity 0.3s ease ${isOpen ? index * 0.05 + 0.1 : 0}s,
                transform 0.3s ease ${isOpen ? index * 0.05 + 0.1 : 0}s
              `,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateX(0)" : "translateX(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f59e0b"; // SIZNING AKSENT RANGINGIZ
              e.currentTarget.style.backgroundColor =
                "rgba(245, 158, 11, 0.05)"; // Yengil hover effekti
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
