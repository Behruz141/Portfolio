import { useState } from "react";
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
      "Siz mening texnik mahoratlarimni (skills) saytning o'ng tomonida ko'rishingiz mumkin!",
    read_more: "Batafsil ma'lumot",
    technical_skills: "Texnik mahoratlar",
    projects_title: "Mening professional loyihalarim",
    projects_subtitle:
      "Eng so'nggi texnologiyalar, yuqori tezlik va mukammal UI/UX dizayn asosida yaratilgan ishlarim.",
    filter_all: "Barchasi",
    view_live: "Saytni ko'rish",
    p1_title: "ArShop — Knight Minimalist E-Commerce",
    p1_desc:
      "Ritsarlar mavzusidagi minimalist dizaynga ega ilg'or elektron tijorat platformasi. Yuqori yuklanish tezligi va silliq animatsiyalar bilan ta'minlangan.",
    p2_title: "Personal Discipline Master",
    p2_desc:
      "Stoik falsafasiga asoslangan shaxsiy intizom, odatlar va vaqtni boshqarish platformasi. Chuqur yashil va olovli vizual effektlar bilan boyitilgan.",
    p3_title: "DevNexus Crypto Dashboard",
    p3_desc:
      "Kriptovalyuta bozoridagi o'zgarishlarni real vaqt rejimida tahlil qiluvchi va vizuallashtiruvchi yuqori samarali boshqaruv paneli.",

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
      "Вы можете ознакомиться с моими техническими навыками в правой части экрана!",
    read_more: "Подробнее",
    technical_skills: "Технические навыки",
    projects_title: "Мои профессиональные проекты",
    projects_subtitle:
      "Мои работы, созданные на основе передовых технологий, высокой скорости и идеального UI/UX дизайна.",
    filter_all: "Все",
    view_live: "Посмотреть сайт",
    p1_title: "ArShop — Knight Minimalist E-Commerce",
    p1_desc:
      "Продвинутая платформа электронной коммерции в минималистичном рыцарском стиле. Обеспечена высокая скорость загрузки и плавные анимации.",
    p2_title: "Personal Discipline Master",
    p2_desc:
      "Платформа для управления личной дисциплиной и привычками, основанная на стоической философии. Оформлена в глубоких зеленых и огненных тонах.",
    p3_title: "DevNexus Crypto Dashboard",
    p3_desc:
      "Высокопроизводительная панель управления для анализа и визуализации изменений на криптовалютном рынке в реальном времени.",

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
      "You can check out my technical skills on the right side of the screen!",
    read_more: "Read more",
    technical_skills: "Technical Skills",
    projects_title: "My Professional Projects",
    projects_subtitle:
      "My finest works built with cutting-edge technologies, high performance, and pixel-perfect UI/UX design.",
    filter_all: "All",
    view_live: "Live Preview",
    p1_title: "ArShop — Knight Minimalist E-Commerce",
    p1_desc:
      "An advanced e-commerce platform featuring a knight-themed minimalist design. Optimized for blazing fast loading speeds and smooth transitions.",
    p2_title: "Personal Discipline Master",
    p2_desc:
      "A personal discipline and habit-tracking platform rooted in stoic philosophy. Designed with rich deep-green tones and flame-like aesthetic features.",
    p3_title: "DevNexus Crypto Dashboard",
    p3_desc:
      "A high-performance data visualization dashboard analyzing and tracking real-time cryptocurrency market analytics.",

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

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("uz");
  const t = (key) => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
