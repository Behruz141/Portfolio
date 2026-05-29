import { useLang } from "../../components/i18n/useLang";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGithub,
  SiVercel,
  SiFigma,
} from "react-icons/si";

const SKILLS = [
  { name: "HTML5 Web Markup", icon: <SiHtml5 /> },
  { name: "CSS3 / SCSS", icon: <SiCss /> },
  { name: "JavaScript (ES6+)", icon: <SiJavascript /> },
  { name: "React & Vite", icon: <SiReact /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "Vercel & Netlify", icon: <SiVercel /> },
  { name: "UI/UX (Figma)", icon: <SiFigma /> },
];

const About = () => {
  const { t } = useLang();

  return (
    <div className=" w-full pt-30 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          {/* Chap tomon */}
          <div className="flex-1 max-w-2xl animate-fade-up">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              {t("about_greeting")}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {t("about_desc")}
            </p>

            <div className="flex pb-8">
              <a
                href="#more-info"
                className="group inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-semibold text-white 
                  shadow-lg shadow-amber-500/20 hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/30 
                  transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {t("read_more")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>

            <div className="inline-block rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 mb-8">
              <p className="font-semibold text-amber-600 dark:text-amber-500">
                💡 {t("about_skills")}
              </p>
            </div>
          </div>

          {/* O'ng tomon - Skills */}
          <div className="w-full lg:w-[45%]">
            {/* Dinamik tarjima bu yerga joylashtirildi */}
            <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200 animate-fade-up-delay">
              {t("technical_skills")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.map((s, i) => (
                <div
                  key={i}
                  className="skill-card group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4
                    dark:border-white/5 dark:bg-[#1e1e1e]
                    hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-xl
                    transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 dark:bg-[#121212] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-xl">
                    <div className="text-gray-500 dark:text-gray-400 group-hover:text-amber-500 transition-colors">
                      {s.icon}
                    </div>
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade-up { opacity: 0; animation: fadeUp 0.5s ease-out forwards; }
        .animate-fade-up-delay { opacity: 0; animation: fadeUp 0.5s ease-out 0.1s forwards; }
        
        .skill-card { 
          opacity: 0; 
          animation: fadeUp 0.5s ease-out forwards; 
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default About;
