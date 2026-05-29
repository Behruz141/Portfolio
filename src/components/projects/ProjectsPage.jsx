import { useContext, useState, useMemo } from "react";
import { LanguageContext } from "../i18n/LanguageContext";
import { getProjects } from "./projectsData";

export default function ProjectsPage() {
  const { t } = useContext(LanguageContext);
  const [activeFilter, setActiveFilter] = useState("All");

  // Har safar render bo'lganda tezlikni pasaytirmaslik uchun useMemo ishlatamiz
  const projects = useMemo(() => getProjects(t), [t]);

  // Kategoriyalarni dinamik aniqlash
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [projects]);

  // Loyihalarni filterlash
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section className="w-full py-16 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Sarlavha Qismi */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 dark:text-white text-zinc-900 tracking-tight">
            {t("projects_title")}
          </h2>
          <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl mx-auto text-sm md:text-base">
            {t("projects_subtitle")}
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full shadow-lg shadow-yellow-500/50"></div>
        </div>

        {/* Tezkor Filter Tugmalari */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        {/* Loyihalar Grid Tizimi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 dark:bg-[#222222]/50 bg-white/80 dark:border-zinc-800 border-zinc-200 hover:border-yellow-500/50 dark:hover:bg-[#222222] shadow-xl hover:shadow-2xl hover:shadow-yellow-500/5"
            >
              <div>
                {/* Kategoriya Badge (cursor-default qo'shildi) */}
                <span className="inline-block text-[10px] uppercase tracking-wider font-bold text-yellow-500 mb-3 bg-yellow-500/10 px-2.5 py-1 rounded-md cursor-default">
                  {project.category}
                </span>

                {/* Loyiha Nomi */}
                <h3 className="text-xl font-bold mb-3 dark:text-white text-zinc-900 group-hover:text-yellow-500 transition-colors duration-200">
                  {project.title}
                </h3>

                {/* Loyiha Haqida Tavsif */}
                <p className="text-sm dark:text-zinc-400 text-zinc-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Texnologiyalar (Tags) (cursor-default shu yerga qo'shildi) */}
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

                {/* Global Link Tugmalari */}
                <div className="flex items-center gap-3 pt-4 border-t dark:border-zinc-800/60 border-zinc-100">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
