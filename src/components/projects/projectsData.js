import { siteConfig } from "@/config/site";

// ⭐ Yangi loyiha qo'shish: massivga yangi {...} blok qo'shing va
// uning matnlari uchun LanguageProvider.jsx'da tarjima kalitlarini yozing.
export const getProjects = (t) => [
  {
    id: 1,
    title: t("p1_title"),
    description: t("p1_desc"),
    category: "E-Commerce",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "REST API",
      "PostgreSQL",
      "Netlify",
    ],
    highlights: [t("p1_h1"), t("p1_h2"), t("p1_h3"), t("p1_h4")],

    // 📸 SKRINSHOT: rasmni public/projects/ papkaga tashlang (masalan zarhal.png),
    // so'ng pastdagi qatorni shunday o'zgartiring:  image: "/projects/zarhal.png",
    // Tavsiya: 1600×900 (16:9) PNG yoki WebP. null bo'lsa, o'rnida bo'sh joy ko'rinadi.
    image: "/projects/zarhal-foto.png",

    // 🌐 JONLI HAVOLA: loyihani Netlify/Vercel'ga chiqargach manzilni yozing.
    // Bo'sh ("") bo'lsa, "Saytni ko'rish" tugmasi ko'rinmaydi.
    liveLink: "https://jewel-shop-ui.vercel.app/",

    gitLink: `${siteConfig.github}/jewel-shop-UI`,
  },
];
