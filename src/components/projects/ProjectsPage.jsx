"use client";

import Image from "next/image";
import { useContext, useState, useMemo } from "react";
import { useInView } from "@/hooks/useInView";
import { LanguageContext } from "../i18n/LanguageContext";
import { getProjects } from "./projectsData";

export default function ProjectsPage() {
  const { t } = useContext(LanguageContext);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sectionRef, isVisible] = useInView();

  const projects = useMemo(() => getProjects(t), [t]);

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  // Faqat 1 ta loyiha bo'lsa — uni katta "asosiy" karta qilib ko'rsatamiz
  const featured = filteredProjects.length === 1;

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-4 md:px-8 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 transform transition-all duration-800 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white text-zinc-900 tracking-tight">
            {t("projects_title")}
          </h2>
          <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl mx-auto text-sm md:text-base">
            {t("projects_subtitle")}
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full shadow-lg shadow-yellow-500/50"></div>
        </div>

        {categories.length > 2 && (
          <div
            className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-800 delay-150 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 transform active:scale-95 border ${
                  activeFilter === cat
                    ? "bg-yellow-500 text-black border-yellow-500 shadow-md shadow-yellow-500/20"
                    : "bg-transparent dark:text-zinc-400 text-zinc-700 dark:border-zinc-800 border-zinc-300 hover:border-yellow-500 dark:hover:text-white hover:text-black"
                }`}
              >
                {cat === "All" ? t("filter_all") : cat}
              </button>
            ))}
          </div>
        )}

        <div
          className={`grid gap-8 ${
            featured
              ? "grid-cols-1 max-w-5xl mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`transform transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100 + 200}ms` : "0ms",
              }}
            >
              <article
                className={`group relative flex h-full flex-col rounded-2xl border p-6 ${featured ? "lg:flex-row lg:gap-8" : ""} transition-all duration-300 hover:-translate-y-2 dark:bg-[#222222]/50 bg-white/80 dark:border-zinc-800 border-zinc-200 hover:border-yellow-500/50 dark:hover:bg-[#222222] shadow-xl hover:shadow-2xl hover:shadow-yellow-500/5`}
              >
                {/* 📸 Skrinshot (yoki hali rasm bo'lmasa — bo'sh joy) */}
                <div
                  className={`relative mb-6 aspect-video w-full shrink-0 overflow-hidden rounded-xl border dark:border-zinc-800 border-zinc-200 ${
                    featured
                      ? "lg:mb-0 lg:aspect-auto lg:min-h-80 lg:w-1/2"
                      : ""
                  }`}
                >
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes={
                        featured
                          ? "(min-width: 1024px) 480px, 100vw"
                          : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                      }
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-yellow-500/30 bg-yellow-500/5 text-yellow-600 dark:text-yellow-500/70">
                      <svg
                        className="h-10 w-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.16-5.16a2.25 2.25 0 013.18 0l5.16 5.16m-1.5-1.5l1.41-1.41a2.25 2.25 0 013.18 0l2.16 2.16M3.75 19.5h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z"
                        />
                      </svg>
                      <span className="text-xs font-medium">
                        {t("screenshot_here")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-yellow-500 mb-3 bg-yellow-500/10 px-2.5 py-1 rounded-md cursor-default">
                      {project.category}
                    </span>

                    <h3 className="text-xl font-bold mb-3 dark:text-white text-zinc-900 group-hover:text-yellow-500 transition-colors duration-200">
                      {project.title}
                    </h3>

                    <p className="text-sm dark:text-zinc-400 text-zinc-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {project.highlights?.length > 0 && (
                      <div className="mb-6">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          {t("features_label")}
                        </p>
                        <ul className="space-y-1.5">
                          {project.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex gap-2 text-sm dark:text-zinc-300 text-zinc-700"
                            >
                              <span className="text-yellow-500">✓</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded dark:bg-zinc-800 dark:text-zinc-300 bg-zinc-100 text-zinc-700 border dark:border-zinc-700/50 border-zinc-200 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t dark:border-zinc-800/60 border-zinc-100">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center py-2 px-4 rounded-xl text-xs font-bold transition-all duration-300 bg-yellow-500 hover:bg-yellow-600 text-black flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20"
                        >
                          <span>{t("view_live")}</span>
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}

                      <a
                        href={project.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl border transition-all duration-200 dark:border-zinc-800 border-zinc-200 dark:text-zinc-400 text-zinc-600 dark:hover:bg-zinc-800 hover:bg-zinc-100 hover:text-black dark:hover:text-white"
                        title="Source Code"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.068.069-.068 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
