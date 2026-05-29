export const getProjects = (t) => [
  {
    id: 1,
    title: t("p1_title"),
    description: t("p1_desc"),
    category: "E-Commerce",
    tags: ["React", "Tailwind CSS", "Vite", "Netlify"],
    liveLink: "https://arshop-knights.netlify.app", // Istalgan global linkni qo'yishingiz mumkin
    gitLink: "https://github.com/behruz-gayratov/arshop",
  },
  {
    id: 2,
    title: t("p2_title"),
    description: t("p2_desc"),
    category: "Web App",
    tags: ["React", "SCSS", "Context API", "Vercel"],
    liveLink: "https://discipline-master.vercel.app",
    gitLink: "https://github.com/behruz-gayratov/discipline-master",
  },
  {
    id: 3,
    title: t("p3_title"),
    description: t("p3_desc"),
    category: "Dashboard",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    liveLink: "https://devnexus-dashboard.vercel.app",
    gitLink: "https://github.com/behruz-gayratov/crypto-dashboard",
  },
];
