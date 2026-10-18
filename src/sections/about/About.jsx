"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { siteConfig } from "@/config/site";
import { useLang } from "../../components/i18n/useLang";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGithub,
  SiVercel,
  SiFigma,
} from "react-icons/si";

const SKILLS = [
  {
    name: "HTML5 Web Markup",
    icon: <SiHtml5 />,
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS3 / SCSS",
    icon: <SiCss />,
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "JavaScript (ES6+)",
    icon: <SiJavascript />,
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "React & Vite",
    icon: <SiReact />,
    url: "https://react.dev/learn",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    url: "https://www.typescriptlang.org/docs/",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    url: "https://nextjs.org/docs",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    url: "https://tailwindcss.com/docs",
  },
  {
    name: "GitHub",
    icon: <SiGithub />,
    url: "https://docs.github.com/",
  },
  {
    name: "Vercel & Netlify",
    icon: <SiVercel />,
    url: "https://vercel.com/kb/guide/vercel-vs-netlify",
  },
  {
    name: "UI (Figma)",
    icon: <SiFigma />,
    url: "https://en.wikipedia.org/wiki/User_interface",
  },
];

const About = () => {
  const { t } = useLang();
  const [sectionRef, isVisible] = useInView();

  return (
    <div
      ref={sectionRef}
      className="w-full pt-30 transition-colors duration-500 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div
            className={`flex-1 max-w-2xl transition-all duration-800 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            {siteConfig.availableForWork && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                {t("status_open")}
              </div>
            )}
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              {t("about_greeting")}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {t("about_desc")}
            </p>
            <div className="mb-2 flex flex-wrap gap-3">
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-600"
              >
                {t("cta_write")}
              </a>
              <Link
                href="/#projects"
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60 hover:text-amber-600 dark:border-white/15 dark:text-gray-300 dark:hover:text-amber-400"
              >
                {t("cta_projects")}
              </Link>
              {siteConfig.cvUrl && (
                <a
                  href={siteConfig.cvUrl}
                  download
                  className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60 hover:text-amber-600 dark:border-white/15 dark:text-gray-300 dark:hover:text-amber-400"
                >
                  {t("cta_cv")}
                </a>
              )}
            </div>
            <div className="inline-block rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 mb-8 mt-12">
              <p className="font-semibold text-amber-600 dark:text-amber-500">
                {t("about_skills")}
              </p>
            </div>
          </div>

          <div className="w-full lg:w-[45%]">
            <h3
              className={`mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-800 delay-100 ease-out transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              {t("technical_skills")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.map((s, i) => (
                <div
                  key={i}
                  className={`transform transition-all duration-600 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${i * 60 + 150}ms` : "0ms",
                  }}
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4
                      dark:border-white/5 dark:bg-[#1e1e1e]
                      hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-xl
                      cursor-pointer transition-all duration-200 ease-in-out w-full h-full"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 dark:bg-[#121212] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-xl">
                      <div className="text-gray-500 dark:text-gray-400 group-hover:text-amber-500 transition-colors">
                        {s.icon}
                      </div>
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {s.name}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
