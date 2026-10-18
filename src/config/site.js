// ⭐ Shaxsiy ma'lumotlaringiz BIR JOYDA. Telefon, havola yoki domen o'zgarsa — faqat shu faylni tahrirlang.

export const siteConfig = {
  name: "Behruz G'ayratov",

  // Saytingiz haqiqiy manzili. Vercel/Netlify'ga chiqargach shu yerga yozing
  // (yoki Vercel'da NEXT_PUBLIC_SITE_URL environment variable qo'ying).
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  phone: "+998(93)-855-84-88",
  email: "gayratovbehruz98@gmail.com",
  telegram: "https://t.me/gvbehruz",
  instagram: "https://www.instagram.com/gv_behruz?igsh=MWNyb2pucXphYWJqOQ==",
  github: "https://github.com/Behruz141",

  // CV (PDF). Faylni public/ papkaga tashlang (masalan public/cv.pdf), so'ng shu yerga "/cv.pdf" deb yozing.
  // null bo'lsa "CV yuklab olish" tugmasi ko'rinmaydi.
  cvUrl: null,

  // Yuqoridagi "Yangi loyihalar uchun ochiqman" nishoni. Band bo'lsangiz false qiling.
  availableForWork: true,
};
