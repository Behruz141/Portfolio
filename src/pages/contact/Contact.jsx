import { useState, useContext } from "react";
import { LanguageContext } from "../../components/i18n/LanguageContext";

export default function Contact() {
  const { t } = useContext(LanguageContext);
  const [copiedText, setCopiedText] = useState(null);

  const contactData = {
    phone: "+998(93)-855-84-88",
    email: "gayratovbehruz98@gmail.com",
    telegram: "https://t.me/astraveyn",
    instagram: "https://www.instagram.com/gv_behruz?igsh=MWNyb2pucXphYWJqOQ==",
    github: "https://github.com/Behruz141",
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section
      id="contact"
      className="w-full flex flex-col items-center py-24 px-4 md:px-0 bg-transparent select-none"
    >
      {/* Sarlavha qismi */}
      <div className="text-center mb-16 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-500">
          {t("contact_title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg transition-colors duration-500">
          {t("contact_subtitle")}
        </p>
      </div>

      {/* Asosiy konteyner */}
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {/* Yuqori qator: Telefon va Email */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Telefon karta */}
          <div
            onClick={() => handleCopy(contactData.phone, "phone")}
            className="relative flex-1 group cursor-pointer bg-white/40 dark:bg-[#18181b]/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-xs hover:shadow-2xl dark:hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] hover:border-amber-500/50 dark:hover:border-amber-500/40 hover:-translate-y-2 transform-gpu will-change-transform transition-all duration-500 ease-out"
          >
            <div className="flex items-center gap-4 mb-4">
              {/* Ikonka konteyneri - transform-gpu qo'shildi */}
              <div className="p-3.5 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl transform-gpu transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white dark:group-hover:bg-amber-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-500">
                {t("phone")}
              </h3>
            </div>
            <p className="text-xl font-medium text-gray-900 dark:text-white transition-colors duration-500 antialiased">
              {contactData.phone}
            </p>

            {/* Nusxa olinganlik haqida tooltip */}
            <div
              className={`absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full transition-all duration-500 ${
                copiedText === "phone"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {t("copied")}
            </div>
          </div>

          {/* Email karta */}
          <div
            onClick={() => handleCopy(contactData.email, "email")}
            className="relative flex-1 group cursor-pointer bg-white/40 dark:bg-[#18181b]/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-xs hover:shadow-2xl dark:hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] hover:border-amber-500/50 dark:hover:border-amber-500/40 hover:-translate-y-2 transform-gpu will-change-transform transition-all duration-500 ease-out"
          >
            <div className="flex items-center gap-4 mb-4">
              {/* Ikonka konteyneri - transform-gpu qo'shildi */}
              <div className="p-3.5 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl transform-gpu transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white dark:group-hover:bg-amber-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-500">
                {t("email")}
              </h3>
            </div>
            <p className="text-xl font-medium text-gray-900 dark:text-white break-all transition-colors duration-500 antialiased">
              {contactData.email}
            </p>

            {/* Nusxa olinganlik haqida tooltip */}
            <div
              className={`absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full transition-all duration-500 ${
                copiedText === "email"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {t("copied")}
            </div>
          </div>
        </div>

        {/* Pastki qator: Ijtimoiy tarmoqlar */}
        <div className="w-full flex flex-col items-center mt-6">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wider uppercase mb-6 transition-colors duration-500">
            {t("socials")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {/* Telegram */}
            <a
              href={contactData.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-white/40 dark:bg-[#18181b]/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-xs hover:bg-[#229ED9]/5 dark:hover:bg-[#229ED9]/10 hover:border-[#229ED9]/50 hover:shadow-[0_0_25px_rgba(34,158,217,0.25)] hover:-translate-y-1.5 transform-gpu will-change-transform transition-all duration-500 ease-out"
            >
              <div className="p-3 bg-[#229ED9]/10 text-[#229ED9] rounded-xl transform-gpu transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-[#229ED9] group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                  <path d="M22 2 11 13"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-500">
                  Telegram
                </h4>
                <p className="text-base font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-500">
                  @astraveyn
                </p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={contactData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-white/40 dark:bg-[#18181b]/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-xs hover:bg-[#ee2a7b]/5 dark:hover:bg-[#ee2a7b]/10 hover:border-[#ee2a7b]/50 hover:shadow-[0_0_25px_rgba(238,42,123,0.25)] hover:-translate-y-1.5 transform-gpu will-change-transform transition-all duration-300 ease-out"
            >
              <div className="p-3 bg-linear-to-tr from-[#f9ce34]/10 via-[#ee2a7b]/10 to-[#6228d7]/10 text-[#ee2a7b] rounded-xl transform-gpu transition-all duration-300 ease-out group-hover:scale-100 group-hover:bg-linear-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/xl"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-500">
                  Instagram
                </h4>
                <p className="text-base font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-500">
                  @gv_behruz
                </p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href={contactData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-white/40 dark:bg-[#18181b]/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-xs hover:bg-black/5 dark:hover:bg-white/5 hover:border-gray-900 dark:hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:-translate-y-1.5 transform-gpu will-change-transform transition-all duration-500 ease-out"
            >
              <div className="p-3 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white rounded-xl transform-gpu transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors duration-500">
                  GitHub
                </h4>
                <p className="text-base font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-500">
                  @Behruz141
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
