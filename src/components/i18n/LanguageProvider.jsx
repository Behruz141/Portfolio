"use client";

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { LanguageContext } from "./LanguageContext";

const translations = {
  uz: {
    home: "Asosiy",
    about: "Men haqimda",
    projects: "Loyihalar",
    portfolio: "Portfolio",
    services: "Xizmatlar",
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
    status_busy: "Hozircha yangi loyihalar uchun bandman",
    cta_write: "Menga yozing",
    cta_projects: "Loyihalarni ko'rish",
    cta_cv: "CV yuklab olish",
    features_label: "Asosiy imkoniyatlar",
    screenshot_here: "Loyiha skrinshoti",

    // XIZMATLAR VA TARIFLAR
    services_badge: "Xizmatlar & Narxlar",
    services_title: "Sizga Qanday Yordam Bera Olaman?",
    services_subtitle:
      "O'zingizga mos tarifni tanlang, vazifalarni bajarib 50% gacha chegirmaga ega bo'ling!",
    per_project: "/ loyiha",
    tier_selected: "Tanlangan tarif",
    tier_select: "Tarifni tanlash",
    popular_badge: "Eng Ommabop",

    // Tariflar
    tier_basic_name: "Arzon Tarif",
    tier_basic_badge: "Boshlang'ich",
    tier_standard_name: "O'rta Tarif",
    tier_standard_badge: "Ommabop",
    tier_premium_name: "Top Tarif",
    tier_premium_badge: "Professional",

    // Shartlar (Tasks)
    task_section_title: "Chegirma va Bonus Vazifalari",
    task_selected_tier: "Tanlangan tarif",
    task_desc: "Shartlarni bajaring va chegirmaga ega bo'ling!",
    your_discount: "Sizning chegirmangiz",
    max_bonus: "MAX BONUS!",
    condition_label: "-shart",
    link_text: "Havola",
    screenshot_text: "Skrinshot orqali",
    pricing_notice:
      "Muhim Eslatma: Shartlarni bajarish majburiy emas. Bajarilgan shartlar men tomonimdan tekshirilgandan so'ng hisobga olinadi. Aniq narx esa loyihaning qiyinlik darajasini to'liq ko'rib chiqqanimdan so'ng belgilanadi, ungacha shoshilish shart emas!",

    // Vazifalar matni
    b1_task: "Telegram kanalga obuna bo'lish",
    b2_task: "Instagram akkauntga obuna bo'lish",
    b3_task: "Telegram kanalga kamida 1 stars tashlash",
    s1_task: "Telegram kanalga kamida 3 ta do'st qo'shish",
    s2_task: "Mening xizmatimni ijtimoiy tarmoqda reklama qilish",
    s3_task: "Telegram akkauntga 10~15 starsli sovg'a tashlash",
    p1_task: "Kamida 2K a'zoli IT/sohaviy kanalda reklama berish",
    p2_task: "Telegram kanalga kamida 5 ta stars bosish",
    p3_task: "Telegram akkauntga 25 dan 200 gacha stars sovg'a tashlash",

    // Forma
    form_title: "Buyurtma Qoldirish",
    form_subtitle:
      "Quyidagi ma'lumotlarni to'ldiring, tez orada siz bilan bog'lanaman",
    form_name: "Ismingiz *",
    form_name_ph: "Masalan: Behruz",
    form_phone: "Telefon Raqam *",
    form_email: "Gmail pochtangiz *",
    form_tg: "Telegram Username (bog'lanish uchun)",
    form_comment: "Loyiha haqida qisqacha izoh",
    form_comment_ph:
      "Sayt qanday bo'lishi kerak, qanday sahifalar bo'lishi kerakligi haqida...",
    form_submit: "Buyurtmani Tasdiqlash",
    form_sending: "Yuborilmoqda...",

    p1_title: "Zarhal Fine Jewelry — Zargarlik onlayn do'koni",
    p1_desc:
      "Zargarlik buyumlari sotiladigan to'liq onlayn do'kon interfeysi: katalog, kategoriya va filtrlar, savat hamda sevimlilar. Mijoz buyum narxini bugungi oltin kursi bo'yicha o'zi hisoblab ko'ra oladi.",
    p1_h1: "Jonli oltin narxi kalkulyatori (jahon narxi + MB kursi)",
    p1_h2: "Uzuk o'lchami simulyatori",
    p1_h3: "Savat, sevimlilar va ro'yxatdan o'tish (JWT)",
    p1_h4: "Kategoriya va filtrlar orqali buyum qidirish",

    contact_title: "Men bilan bog'lanish",
    contact_subtitle:
      "Yangi loyihalar va hamkorlik uchun har doim ochiqman. O'zingizga qulay tarmoq orqali yozing!",
    phone: "Telefon raqam",
    email: "Elektron pochta",
    socials: "Ijtimoiy tarmoqlar",
    copied: "Nusxa olindi!",

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
    services: "Услуги",
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
    status_busy: "Временно занят текущими проектами",
    cta_write: "Написать мне",
    cta_projects: "Смотреть проекты",
    cta_cv: "Скачать резюме",
    features_label: "Основные возможности",
    screenshot_here: "Скриншот проекта",

    // XIZMATLAR VA TARIFLAR
    services_badge: "Услуги и Тарифы",
    services_title: "Чем я могу вам помочь?",
    services_subtitle:
      "Выберите подходящий тариф, выполните условия и получите скидку до 50%!",
    per_project: "/ проект",
    tier_selected: "Выбранный тариф",
    tier_select: "Выбрать тариф",
    popular_badge: "Популярный",

    // Tariflar
    tier_basic_name: "Базовый Тариф",
    tier_basic_badge: "Старт",
    tier_standard_name: "Стандартный Тариф",
    tier_standard_badge: "Популярный",
    tier_premium_name: "Топ Тариф",
    tier_premium_badge: "Профи",

    // Shartlar (Tasks)
    task_section_title: "Бонусные задания и Скидки",
    task_selected_tier: "Выбранный тариф",
    task_desc: "Выполняйте условия и получайте скидку!",
    your_discount: "Ваша скидка",
    max_bonus: "МАКС БОНУС!",
    condition_label: "-условие",
    link_text: "Ссылка",
    screenshot_text: "Через скриншот",
    pricing_notice:
      "Важное примечание: Выполнение условий не обязательно. Выполненные пункты будут учтены после моей проверки. Точная стоимость проекта определяется после полного анализа сложности задачи, так что спешить не стоит!",

    // Vazifalar matni
    b1_task: "Подписаться на Telegram-канал",
    b2_task: "Подписаться на профиль в Instagram",
    b3_task: "Отправить хотя бы 1 звезду (stars) в канал",
    s1_task: "Пригласить минимум 3 друзей в Telegram-канал",
    s2_task: "Сделать репост/рекламу моих услуг в соцсетях",
    s3_task: "Подарок 10~15 звезд (stars) на личный Telegram",
    p1_task: "Реклама в IT/тематическом канале с аудиторией от 2К",
    p2_task: "Отправить минимум 5 звезд (stars) в Telegram-канал",
    p3_task: "Подарок от 25 до 200 звезд (stars) на личный Telegram",

    // Forma
    form_title: "Оформить Заказ",
    form_subtitle: "Заполните форму ниже, и я свяжусь с вами в ближайшее время",
    form_name: "Ваше имя *",
    form_name_ph: "Например: Бехруз",
    form_phone: "Номер телефона *",
    form_email: "Ваш Gmail *",
    form_tg: "Telegram юзернейм (для связи)",
    form_comment: "Кратко о проекте",
    form_comment_ph: "Каким должен быть сайт, какие разделы требуются...",
    form_submit: "Подтвердить Заказ",
    form_sending: "Отправка...",

    p1_title: "Zarhal Fine Jewelry — онлайн-магазин украшений",
    p1_desc:
      "Полноценный интерфейс интернет-магазина ювелирных изделий: каталог, категории и фильтры, корзина и избранное. Покупатель может сам рассчитать стоимость изделия по актуальному курсу золота.",
    p1_h1:
      "Калькулятор стоимости золота в реальном времени (мировая цена + курс ЦБ)",
    p1_h2: "Симулятор размера кольца",
    p1_h3: "Корзина, избранное и регистрация (JWT)",
    p1_h4: "Поиск украшений по категориям и фильтрам",

    contact_title: "Связаться со мной",
    contact_subtitle:
      "Я всегда открыт для новых проектов и сотрудничества. Напишите мне в удобной для вас сети!",
    phone: "Номер телефона",
    email: "Электронная почта",
    socials: "Социальные сети",
    copied: "Скопировано!",

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
    services: "Services",
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
    status_busy: "Currently busy with ongoing projects",
    cta_write: "Message me",
    cta_projects: "View projects",
    cta_cv: "Download CV",
    features_label: "Key features",
    screenshot_here: "Project screenshot",

    // XIZMATLAR VA TARIFLAR
    services_badge: "Services & Pricing",
    services_title: "How Can I Help You?",
    services_subtitle:
      "Choose the plan that suits you, complete tasks, and get up to 50% discount!",
    per_project: "/ project",
    tier_selected: "Selected plan",
    tier_select: "Select plan",
    popular_badge: "Most Popular",

    // Tariflar
    tier_basic_name: "Basic Plan",
    tier_basic_badge: "Starter",
    tier_standard_name: "Standard Plan",
    tier_standard_badge: "Popular",
    tier_premium_name: "Top Plan",
    tier_premium_badge: "Professional",

    // Shartlar (Tasks)
    task_section_title: "Discount & Bonus Tasks",
    task_selected_tier: "Selected plan",
    task_desc: "Complete the tasks and earn your discount!",
    your_discount: "Your discount",
    max_bonus: "MAX BONUS!",
    condition_label: "task",
    link_text: "Link",
    screenshot_text: "Via screenshot",
    pricing_notice:
      "Important Note: Completing tasks is optional. Completed tasks will be verified and credited upon discussion. The exact price will be agreed upon after reviewing project complexity, so no rush!",

    // Vazifalar matni
    b1_task: "Subscribe to Telegram channel",
    b2_task: "Follow Instagram profile",
    b3_task: "Send at least 1 star to Telegram channel",
    s1_task: "Add at least 3 friends to Telegram channel",
    s2_task: "Promote/share my services on social media",
    s3_task: "Send 10~15 stars gift to personal Telegram",
    p1_task: "Promotion in IT/tech channel with 2K+ subscribers",
    p2_task: "Send at least 5 stars to Telegram channel",
    p3_task: "Send 25 to 200 stars gift to personal Telegram",

    // Forma
    form_title: "Place an Order",
    form_subtitle: "Fill out the form below and I will get back to you shortly",
    form_name: "Your Name *",
    form_name_ph: "E.g.: Behruz",
    form_phone: "Phone Number *",
    form_email: "Your Gmail *",
    form_tg: "Telegram Username (for contact)",
    form_comment: "Brief project details",
    form_comment_ph: "Describe your website idea, required pages, etc...",
    form_submit: "Confirm Order",
    form_sending: "Sending...",

    p1_title: "Zarhal Fine Jewelry — Online Jewelry Store",
    p1_desc:
      "A complete online jewelry store front-end: catalog, categories and filters, cart and favorites. Customers can calculate an item's price using the current gold rate.",
    p1_h1: "Live gold price calculator (world price + central bank rate)",
    p1_h2: "Ring size simulator",
    p1_h3: "Cart, favorites and sign-up (JWT)",
    p1_h4: "Browse by category with filters",

    contact_title: "Get in Touch",
    contact_subtitle:
      "I'm always open to new projects and collaborations. Feel free to reach out via your preferred network!",
    phone: "Phone Number",
    email: "Email Address",
    socials: "Social Media",
    copied: "Copied!",

    footer_description:
      "I specialize in building modern, fast, and interactive web applications. Turning your ideas into code, not just pictures.",
    quick_links: "Quick Links",
    follow_me: "Follow Me",
    rights_reserved: "All rights reserved.",
  },
};

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

const getServerSnapshot = () => "uz";

export function LanguageProvider({ children }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next) => {
    try {
      localStorage.setItem("lang", next);
    } catch {}
    listeners.forEach((l) => l());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: (key) => translations[lang]?.[key] ?? key }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
