"use client";

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { LanguageContext } from "./LanguageContext";

const translations = {
  uz: {
    home: "Asosiy",
    about: "Men haqimda",
    projects: "Loyihalar",
    portfolio: "Portfolio",
    contact: "Aloqa",
    about_greeting: "Salom, mening ismim G'ayratov Behruz.",
    about_desc:
      "Men Full-Stack Frontend Developerman va katta loyihalarni xohishingizga ko'ra muammosiz o'zgartirib yoki noldan yaratib bera olaman. Menga shunchaki qilmoqchi yoki o'zgartirmoqchi bo'lgan saytingiz dizaynini tashlang va men uni xuddi dizayndagidek qilib jonlantirib beraman.",
    about_skills:
      "Siz mening texnik mahoratlarimni (skills) saytning o'ng yoki pastki tomonida ko'rishingiz mumkin!",
    read_more: "Batafsil ma'lumot",
    technical_skills: "Texnik mahoratlar",
    projects_title: "Mening professional loyihalarim",
    projects_subtitle:
      "Eng so'nggi texnologiyalar, yuqori tezlik va mukammal UI/UX dizayn asosida yaratilgan ishlarim.",
    filter_all: "Barchasi",
    view_live: "Saytni ko'rish",
    status_open: "Yangi loyihalar uchun ochiqman",
    cta_write: "Menga yozing",
    cta_projects: "Loyihalarni ko'rish",
    cta_cv: "CV yuklab olish",
    features_label: "Asosiy imkoniyatlar",
    screenshot_here: "Loyiha skrinshoti",
    services_title: "Xizmatlar",
    services_subtitle: "Sizga qanday yordam bera olaman",
    s1_title: "Dizayndan saytga",
    s1_desc: "Figma yoki boshqa dizayn maketingizni piksel-aniq, tez va barcha ekranlarga moslashgan saytga aylantiraman.",
    s2_title: "Mavjud saytni yangilash",
    s2_desc: "Eski yoki sekin saytingizni zamonaviy dizayn, yuqori tezlik va yangi imkoniyatlar bilan qayta ishlab beraman.",
    s3_title: "Biznes sayt va landing",
    s3_desc: "Do'kon, xizmat yoki shaxsiy brend uchun ishonchli va tez ochiladigan sayt yasayman.",
    p1_title: "Zarhal Fine Jewelry — Zargarlik onlayn do'koni",
    p1_desc:
      "Zargarlik buyumlari sotiladigan to'liq onlayn do'kon interfeysi: katalog, kategoriya va filtrlar, savat hamda sevimlilar. Mijoz buyum narxini bugungi oltin kursi bo'yicha o'zi hisoblab ko'ra oladi.",
    p1_h1: "Jonli oltin narxi kalkulyatori (jahon narxi + MB kursi)",
    p1_h2: "Uzuk o'lchami simulyatori",
    p1_h3: "Savat, sevimlilar va ro'yxatdan o'tish (JWT)",
    p1_h4: "Kategoriya va filtrlar orqali buyum qidirish",

    // ALOQA QISMI
    contact_title: "Men bilan bog'lanish",
    contact_subtitle:
      "Yangi loyihalar va hamkorlik uchun har doim ochiqman. O'zingizga qulay tarmoq orqali yozing!",
    phone: "Telefon raqam",
    email: "Elektron pochta",
    socials: "Ijtimoiy tarmoqlar",
    copied: "Nusxa olindi!",

    // FOOTER UCHUN QO'SHILGAN QISM
    footer_description:
      "Zamonaviy, tezkor va interaktiv veb-ilovalar yaratish bilan shug'ullanaman. G'oyalaringizni rasmga emas, kodga aylantiramiz.",
    quick_links: "Menyular",
    follow_me: "Ijtimoiy Tarmoqlar",
    rights_reserved: "Barcha huquqlar himoyalangan.",
  },
  ru: {
    home: "Главная",
    about: "Обо мне",
    projects: "Проекты",
    portfolio: "Портфолио",
    contact: "Контакт",
    about_greeting: "Здравствуйте, меня зовут Бехруз Гайратов.",
    about_desc:
      "Я Full-Stack Frontend разработчик, способный без проблем создавать или изменять крупные проекты по вашему желанию. Просто отправьте мне дизайн сайта, который вы хотите создать или обновить, и я воплощу его в жизнь в точности по макету.",
    about_skills:
      "Вы можете ознакомиться с моими техническими навыками в правой или нижней части экрана!",
    read_more: "Подробнее",
    technical_skills: "Технические навыки",
    projects_title: "Мои профессиональные проекты",
    projects_subtitle:
      "Мои работы, созданные на основе передовых технологий, высокой скорости и идеального UI/UX дизайна.",
    filter_all: "Все",
    view_live: "Посмотреть сайт",
    status_open: "Открыт для новых проектов",
    cta_write: "Написать мне",
    cta_projects: "Смотреть проекты",
    cta_cv: "Скачать резюме",
    features_label: "Основные возможности",
    screenshot_here: "Скриншот проекта",
    services_title: "Услуги",
    services_subtitle: "Чем я могу вам помочь",
    s1_title: "Из дизайна в сайт",
    s1_desc: "Превращаю ваш макет из Figma или другой программы в пиксель-точный, быстрый и адаптивный сайт.",
    s2_title: "Обновление сайта",
    s2_desc: "Переработаю ваш старый или медленный сайт: современный дизайн, высокая скорость и новые возможности.",
    s3_title: "Бизнес-сайт и лендинг",
    s3_desc: "Создаю надёжный и быстрый сайт для магазина, услуги или личного бренда.",
    p1_title: "Zarhal Fine Jewelry — онлайн-магазин украшений",
    p1_desc:
      "Полноценный интерфейс интернет-магазина ювелирных изделий: каталог, категории и фильтры, корзина и избранное. Покупатель может сам рассчитать стоимость изделия по актуальному курсу золота.",
    p1_h1: "Калькулятор стоимости золота в реальном времени (мировая цена + курс ЦБ)",
    p1_h2: "Симулятор размера кольца",
    p1_h3: "Корзина, избранное и регистрация (JWT)",
    p1_h4: "Поиск украшений по категориям и фильтрам",

    // ALOQA QISMI
    contact_title: "Связаться со мной",
    contact_subtitle:
      "Я всегда открыт для новых проектов и сотрудничества. Напишите мне в удобной для вас сети!",
    phone: "Номер телефона",
    email: "Электронная почта",
    socials: "Социальные сети",
    copied: "Скопировано!",

    // FOOTER UCHUN QO'SHILGAN QISM
    footer_description:
      "Я специализируюсь на создании современных, быстрых и интерактивных веб-приложений. Превращаю ваши идеи в код.",
    quick_links: "Быстрые ссылки",
    follow_me: "Социальные сети",
    rights_reserved: "Все права защищены.",
  },
  en: {
    home: "Home",
    about: "About",
    projects: "Projects",
    portfolio: "Portfolio",
    contact: "Contact",
    about_greeting: "Hello, my name is Behruz G'ayratov.",
    about_desc:
      "I am a Full-Stack Frontend Developer, capable of seamlessly creating or modifying large-scale projects according to your requirements. Just send me the design of the website you want to build or update, and I will bring it to life exactly as envisioned.",
    about_skills:
      "You can check out my technical skills on the right or on the bottom side of the screen!",
    read_more: "Read more",
    technical_skills: "Technical Skills",
    projects_title: "My Professional Projects",
    projects_subtitle:
      "My finest works built with cutting-edge technologies, high performance, and pixel-perfect UI/UX design.",
    filter_all: "All",
    view_live: "Live Preview",
    status_open: "Open to new projects",
    cta_write: "Message me",
    cta_projects: "View projects",
    cta_cv: "Download CV",
    features_label: "Key features",
    screenshot_here: "Project screenshot",
    services_title: "Services",
    services_subtitle: "How I can help you",
    s1_title: "Design to website",
    s1_desc: "I turn your Figma or other design mockup into a pixel-perfect, fast, fully responsive website.",
    s2_title: "Website redesign",
    s2_desc: "I rebuild your old or slow website with modern design, high speed and new features.",
    s3_title: "Business site & landing page",
    s3_desc: "I build a reliable, fast-loading website for your shop, service or personal brand.",
    p1_title: "Zarhal Fine Jewelry — Online Jewelry Store",
    p1_desc:
      "A complete online jewelry store front-end: catalog, categories and filters, cart and favorites. Customers can calculate an item's price using the current gold rate.",
    p1_h1: "Live gold price calculator (world price + central bank rate)",
    p1_h2: "Ring size simulator",
    p1_h3: "Cart, favorites and sign-up (JWT)",
    p1_h4: "Browse by category with filters",

    // ALOQA QISMI
    contact_title: "Get in Touch",
    contact_subtitle:
      "I'm always open to new projects and collaborations. Feel free to reach out via your preferred network!",
    phone: "Phone Number",
    email: "Email Address",
    socials: "Social Media",
    copied: "Copied!",

    // FOOTER UCHUN QO'SHILGAN QISM
    footer_description:
      "I specialize in building modern, fast, and interactive web applications. Turning your ideas into code, not just pictures.",
    quick_links: "Quick Links",
    follow_me: "Follow Me",
    rights_reserved: "All rights reserved.",
  },
};

// Tanlangan til localStorage'da saqlanadi (sahifa yangilansa ham qoladi)
const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  try {
    const saved = localStorage.getItem("lang");
    return saved && translations[saved] ? saved : "uz";
  } catch {
    return "uz";
  }
}

const getServerSnapshot = () => "uz"; // server doim "uz" bilan boshlaydi

export function LanguageProvider({ children }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next) => {
    try {
      localStorage.setItem("lang", next);
    } catch {}
    listeners.forEach((l) => l());
  }, []);

  // <html lang="..."> ni tilga moslab turamiz (SEO va ekran o'qigichlar uchun)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: (key) => translations[lang][key] ?? key }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
