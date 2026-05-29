import { useContext } from "react";
import { LanguageContext } from "../../components/i18n/LanguageContext";
import PortfolioLogo from "../../components/logo/PortfolioLogo";

export default function Footer() {
  const { t, lang, setLang } = useContext(LanguageContext);
  const currentYear = new Date().getFullYear();

  // Silliq o'tish funksiyasi (Kutubxonalar kerak emas)
  const handleScroll = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const socialLinks = [
    {
      name: "Telegram",
      url: "https://t.me/astraveyn",
      color: "hover:bg-[#229ED9]",
      icon: <path d="m22 2-7 20-4-9-9-4Z" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/gv_behruz?igsh=MWNyb2pucXphYWJqOQ==",
      color: "hover:bg-[#E1306C]",
      icon: (
        <>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
        </>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/Behruz141",
      color: "hover:bg-[#333]",
      icon: (
        <>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </>
      ),
    },
  ];

  return (
    <footer className="w-full bg-white/30 dark:bg-[#09090b]/40 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 pt-16 pb-8 mt-12 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo - Tepaga qaytish */}
          <div className="flex flex-col items-start">
            <button
              onClick={() => handleScroll("top")}
              className="mb-6 cursor-pointer transform-gpu transition-transform hover:scale-105"
            >
              <PortfolioLogo />
            </button>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t("footer_description")}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:items-center">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-6">
              {t("quick_links")}
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => handleScroll("top")}
                  className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-amber-500 transition-all capitalize"
                >
                  {t("home")}
                </button>
              </li>
              {["about", "projects", "contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleScroll(item)}
                    className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-amber-500 transition-all capitalize"
                  >
                    {t(item)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-6">
              {t("follow_me")}
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-100 dark:bg-white/5 border border-transparent rounded-xl text-gray-600 dark:text-gray-400 transition-all duration-300 ${social.color} hover:text-white hover:-translate-y-1`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500">
            © {currentYear} Behruz G'ayratov.
          </p>
          <div className="flex items-center gap-4">
            {/* Lang Switcher */}
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10">
              {["uz", "en", "ru"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg uppercase transition-all ${lang === l ? "bg-white dark:bg-[#27272a] text-amber-500 shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Tepaga qaytish */}
            <button
              onClick={() => handleScroll("top")}
              className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:text-amber-500 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
