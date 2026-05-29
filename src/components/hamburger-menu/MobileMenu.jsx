import { useState, useEffect } from "react";
import { useLang } from "../i18n/useLang";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const links = [
    { id: "about", label: t("about") },
    { id: "projects", label: t("projects") },
    { id: "contact", label: t("contact") },
  ];

  const handleScroll = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);
  };

  return (
    <div className="md:hidden">
      {/* ─── HAMBURGER TUGMASI ───────────────────────────────────────
          z-index inline style bilan berildi (z-[10001]) chunki
          Tailwind standart skalasida z-110 mavjud emas             */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Menyuni yopish" : "Menyuni ochish"}
        className="relative flex flex-col items-center justify-center w-10 h-10 p-2"
        style={{ zIndex: 10001 }}
      >
        {/* ── 3 chiziq. Gap: 5px → umumiy balandlik 16px, markaz 8px
            Line-1 markazi: 1px   →  +7px harakat kerak
            Line-3 markazi: 15px  →  -7px harakat kerak            */}
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

      {/* ─── FULL-SCREEN OVERLAY ─────────────────────────────────────
          • z-index: 10000 → header (z-50 = 50) dan ancha yuqori
          • backgroundColor: qora + 0.92 opacity → to'q qorong'i
          • backdropFilter: 20px blur → fon xiralashadi
          • visibility + pointerEvents → fokus/tab ni to'sadi       */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          backgroundColor: "rgba(6, 6, 6, 0.93)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          /* Opacity + scale animatsiyasi */
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transform: isOpen ? "scale(1)" : "scale(0.96)",
          transition:
            "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1), visibility 0.45s",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {links.map((link, index) => (
          <button
            key={link.id}
            onClick={() => handleScroll(link.id)}
            /* Staggered kirish animatsiyasi */
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "white",
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: "-0.02em",
              transition: `
                opacity 0.4s ease ${isOpen ? index * 0.08 : 0}s,
                transform 0.4s cubic-bezier(0.16,1,0.3,1) ${isOpen ? index * 0.08 : 0}s,
                color 0.2s ease
              `,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(24px)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f59e0b")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
