"use client";

import { useContext } from "react";
import { LuPenTool, LuRefreshCw, LuRocket } from "react-icons/lu";
import { LanguageContext } from "@/components/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";

const SERVICES = [
  { id: "s1", icon: <LuPenTool /> },
  { id: "s2", icon: <LuRefreshCw /> },
  { id: "s3", icon: <LuRocket /> },
];

export default function Services() {
  const { t } = useContext(LanguageContext);
  const [sectionRef, isVisible] = useInView();

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden px-4 py-16 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`mb-12 text-center transform transition-all duration-800 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            {t("services_title")}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 md:text-base">
            {t("services_subtitle")}
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              className={`transform transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionDelay: isVisible ? `${i * 100 + 150}ms` : "0ms",
              }}
            >
              <div className="group h-full rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/5 dark:border-zinc-800 dark:bg-[#222222]/50 dark:hover:bg-[#222222]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-2xl text-yellow-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {s.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-zinc-900 transition-colors duration-200 group-hover:text-yellow-500 dark:text-white">
                  {t(`${s.id}_title`)}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t(`${s.id}_desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
