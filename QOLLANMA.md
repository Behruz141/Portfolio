# Portfolio: Vite (React) → Next.js o'tkazish qo'llanmasi

Bu qo'llanma Next.js bilan hech ishlamagan odam uchun yozilgan. Har bir papka, har bir fayl, har bir o'zgarish tushuntirilgan.

---

## 0. Natija (qisqacha)

- **Dizayn o'zgarmadi.** Ranglar, o'lchamlar, animatsiyalar, 3 til (uz/ru/en), dark/light rejim, matnlar, havolalar, bo'limlar tartibi hammasi o'sha-o'sha.
- Loyiha Next.js 16 (App Router) + React 19 + Tailwind v4 ga ko'chirildi, **JavaScript'da** qoldi (TypeScript majburiy emas).
- `npm run build` xatosiz o'tdi, `npm run lint` xatosiz, brauzerda sinab ko'rildi: dark/light, til almashtirish, menyu, mobil ko'rinish.
- Ichki funksiyalar yaxshilandi (7-bo'limda to'liq ro'yxat).

---

## 1. Vite va Next.js: asosiy farq

| | Vite + React (sizning eski loyihangiz) | Next.js (yangi) |
|---|---|---|
| Sahifa qayerda yasaladi | Brauzerda (bo'sh `index.html` → JS yuklanadi → sahifa chiqadi) | Avval serverda/build vaqtida tayyor HTML yasaladi, brauzer darrov ko'radi |
| Sahifalar (routing) | `react-router-dom` bilan kodda yoziladi | **Papka tuzilishi** o'zi routing: `app/about/page.jsx` → `/about` |
| `<title>`, SEO | `index.html` da qo'lda | `metadata` obyekti orqali, har sahifaga alohida |
| Natija | Google va ijtimoiy tarmoqlar bo'sh sahifa ko'radi | Google va Telegram preview to'liq matnni ko'radi |
| Tezlik | JS to'liq yuklanmaguncha bo'sh ekran | Birinchi ko'rinish juda tez (HTML tayyor) |

Portfolio uchun Next.js shuning uchun yaxshi: **tezroq ochiladi va Google'da topiladi**.

---

## 2. Ishga tushirish (qadamma-qadam)

1. **Node.js** kerak: 20.9 yoki yangi (22 tavsiya). Tekshirish: terminalda `node -v`.
2. Zip'ni oching, terminalda papkaga kiring:
   ```bash
   cd portfolio-next
   ```
3. Kutubxonalarni o'rnating (bu `node_modules` papkasini yaratadi, siz uni o'chirgan edingiz, hozir shu yerda qayta tiklanadi):
   ```bash
   npm install
   ```
4. Ishlab chiqish rejimi:
   ```bash
   npm run dev
   ```
   Brauzerda `http://localhost:3000` oching. Kodni saqlasangiz sahifa o'zi yangilanadi.
5. Production tekshiruvi (haqiqiy tezlikni ko'rish uchun):
   ```bash
   npm run build
   npm start
   ```
6. Kod xatolarini tekshirish: `npm run lint`

> `node_modules` va `.next` papkalarini hech qachon qo'lda tahrirlamang va GitHub'ga yuklamang. `.gitignore` ularni allaqachon ignor qiladi. `.next` papkasi Next.js o'zi yaratadigan vaqtinchalik build papkasi, o'chirib tashlasangiz hech narsa bo'lmaydi.

### Eski git tarixini saqlash
Eski loyihangizda `.git` papkasi bor (10 ta commit). Tarixni yo'qotmaslik uchun: eski loyiha `.git` papkasini yangi papkaga ko'chiring, so'ng `git add . && git commit -m "Next.js ga o'tkazildi"`. Yoki eski papkaning o'zida eski fayllarni o'chirib, yangilarini qo'ying (ish bir xil).

---

## 3. Papka va fayllar tuzilishi

```
portfolio-next/
├── public/                    # statik fayllar (rasm, pdf...). "/" dan to'g'ridan-to'g'ri ochiladi
├── src/
│   ├── app/                   # ★ Next.js "App Router": sahifalar shu yerda
│   │   ├── layout.jsx         # barcha sahifalarga umumiy qobiq (Header, Footer, <html>, <body>)
│   │   ├── page.jsx           # "/" bosh sahifa
│   │   ├── about/page.jsx     # "/about" sahifa
│   │   ├── not-found.jsx      # 404 sahifa
│   │   ├── globals.css        # global CSS + Tailwind
│   │   └── icon.svg           # favicon (brauzer tabidagi ikonka)
│   ├── components/            # qayta ishlatiladigan bo'laklar (eskisi bilan bir xil nom)
│   │   ├── Providers.jsx      # Theme + Language provider'larni birlashtiradi
│   │   ├── header-menu/HeaderMenu.jsx
│   │   ├── hamburger-menu/MobileMenu.jsx
│   │   ├── i18n/              # tillar (LanguageProvider ichida barcha tarjimalar)
│   │   ├── logo/PortfolioLogo.jsx
│   │   ├── projects/          # ProjectsPage.jsx + projectsData.js
│   │   ├── theme/             # dark/light rejim
│   │   └── to-top-btn/ScrollToTopButton.jsx
│   ├── config/site.js         # ⭐ shaxsiy ma'lumotlar (telefon, havolalar, CV) bir joyda
│   ├── hooks/useInView.js     # YANGI: "ekranga kirdi" animatsiya hook'i
│   ├── layouts/               # header/Header.jsx, footer/Footer.jsx
│   └── sections/              # about, contact, services (eski "pages" papkasi)
├── eslint.config.mjs          # kod tekshiruvi sozlamasi
├── jsconfig.json              # "@/..." qisqa import yo'li
├── next.config.mjs            # Next.js sozlamasi
├── postcss.config.mjs         # Tailwind'ni ulaydi
├── package.json               # kutubxonalar va buyruqlar
└── .gitignore
```

### ⚠️ Eng muhim qoida: nega `pages` papkasi `sections` bo'ldi?
Next.js'da `src/pages` papkasi **eski Pages Router** uchun maxsus papka. Agar eski `src/pages/home`, `src/pages/about` papkalarini o'sha nomda qoldirsak, Next ularni sahifa deb o'ylab, 404/chalkashlik chiqaradi. Shuning uchun `About` va `Contact` ni `src/sections` ga ko'chirdik. Kod ichidagi nomlar o'zgarmagan.

---

## 4. Eski → yangi fayllar xaritasi

| Eski (Vite) | Yangi (Next.js) | Nima bo'ldi |
|---|---|---|
| `index.html` | `src/app/layout.jsx` | `<html>`, `<body>`, title shu yerda. Body klasslari ko'chdi |
| `src/main.jsx` | `src/components/Providers.jsx` + `layout.jsx` | Provider'lar `Providers.jsx` ga |
| `src/App.jsx` | `src/app/layout.jsx` | Header/Footer/ScrollToTop/`<main>` layout'ga; `<Outlet/>` → `{children}` |
| `src/Router/index.jsx` | **o'chirildi** | Router kerak emas, papkalar routing qiladi |
| `src/pages/home/Home.jsx` | `src/app/page.jsx` | Bosh sahifa |
| `src/pages/about/About.jsx` | `src/sections/about/About.jsx` + `src/app/about/page.jsx` | `/about` manzili saqlandi |
| `src/pages/contact/Contact.jsx` | `src/sections/contact/Contact.jsx` | |
| `src/index.css` (+`App.css`) | `src/app/globals.css` | Birlashtirildi |
| `vite.config.js` | `next.config.mjs` + `postcss.config.mjs` | |
| `tailwind.config.js` | **kerak emas** | Tailwind v4 da sozlama CSS ichida (`@custom-variant dark`), bu fayl ishlatilmayotgan edi |
| `react-router-dom`, `react-scroll`, `vite`, `@vitejs/*`, `@rolldown/*` | **olib tashlandi** | `react-scroll` kodda umuman ishlatilmagan edi |
| `eslint.config.js` | `eslint.config.mjs` | Next.js qoidalari bilan |
| (yo'q edi) | `icon.svg`, `not-found.jsx`, `useInView.js`, `Providers.jsx` | yangi |

Qolgan hamma komponentlar (`components/...`, `layouts/...`) o'sha joyida, ichidagi JSX/Tailwind klasslari o'zgarmagan.

---

## 5. Har bir fayl nima qiladi

### 5.1 Sozlama fayllari

**`package.json`**: loyiha pasporti.
- `scripts`: `dev`, `build`, `start`, `lint` buyruqlari.
- `dependencies`: ishlayotgan kod uchun kerak (`next`, `react`, `react-dom`, `react-icons`).
- `devDependencies`: faqat ishlab chiqish paytida kerak (`tailwindcss`, `@tailwindcss/postcss`, `eslint`, `babel-plugin-react-compiler`).

**`next.config.mjs`**:
- `reactCompiler: true`: React Compiler yoqilgan (eski Vite loyihangizdagi kabi). U `useMemo`/`useCallback` ni qo'lda yozmasdan komponentlarni avtomatik tezlashtiradi.
- `poweredByHeader: false`: server javobidan "Next.js" yozuvini olib tashlaydi (kichik xavfsizlik tozaligi).

**`postcss.config.mjs`**: Tailwind v4 Next.js'da shu orqali ulanadi. Tegmaydi.

**`jsconfig.json`**: `@/components/...` kabi qisqa yo'l beradi. `@` = `src/` papka. `../../../components/x` o'rniga `@/components/x` yozasiz.

**`eslint.config.mjs`**: kodni tekshiradi (ishlatilmagan o'zgaruvchi, hooks xatolari va h.k.).

### 5.2 `src/app/`: Next.js yuragi

**Tushuncha:** `app/` ichidagi **papka = manzil (URL)**, ichidagi **`page.jsx` = o'sha manzilda ko'rinadigan sahifa**.

| Fayl | URL |
|---|---|
| `app/page.jsx` | `/` |
| `app/about/page.jsx` | `/about` |
| `app/blog/page.jsx` (kelajakda) | `/blog` |
| `app/blog/[slug]/page.jsx` (kelajakda) | `/blog/har-qanday-nom` |

**`layout.jsx`**: barcha sahifalarni o'rab turadi. U bir marta yoziladi, sahifalar almashganda Header/Footer qayta chizilmaydi. Ichida:
1. `import "./globals.css"`: global stillar faqat shu yerda import qilinadi.
2. `export const metadata`: brauzer tabidagi sarlavha, Google tavsifi, ijtimoiy tarmoq preview matni. **Bu yerga o'z ma'lumotlaringizni yozing.**
3. `themeScript`: sahifa chizilishidan **oldin** saqlangan "dark" temani `<html>` ga qo'yadi. Busiz dark rejimda sahifa ochilganda oq ekran "chaqnab" ketardi.
4. `<html lang="uz" suppressHydrationWarning>`: `suppressHydrationWarning` kerak, chunki skript `<html>` klassini o'zgartiradi (Next.js "server va brauzer HTML farq qildi" deb ogohlantirmasligi uchun).
5. `<Providers>` ichida Header, `<main>{children}</main>`, Footer, ScrollToTop. `{children}` = hozir ochilgan sahifa (`page.jsx`).

**`page.jsx`**: eski `Home.jsx`. About, Projects, Contact bo'limlari bir sahifada. Bitta kichik tuzatish: ikkinchi marta `id="about"` yozilgan edi (HTML'da bir id faqat bir marta bo'lishi kerak). "Contact" id'si `Contact.jsx` ichida allaqachon bor, shuning uchun takroriy id olib tashlandi. Scroll joyi o'zgarmadi.

**`about/page.jsx`**: `/about` manzili. Eski Router'dagi `About` yo'li saqlandi. `metadata` bu sahifaga alohida sarlavha beradi ("Men haqimda | Behruz G'ayratov").

**`not-found.jsx`**: noto'g'ri manzil (`/xato`) ochilganda 404 ko'rsatadi. Oldin Vite'da bo'sh ekran chiqardi.

**`globals.css`**:
- `@import "tailwindcss"`: Tailwind v4.
- `@custom-variant dark`: `dark:` klasslari `<html class="dark">` bilan ishlaydi (avvalgidek).
- `body` foni: oldin JS (`document.body.style.backgroundColor`) qo'yardi, endi CSS'da. Ranglar bir xil (`#e5e5e5b7` / `#1a1a1a`), faqat yuklanishda "sakrash" yo'q.

**`icon.svg`**: favicon. Eski `index.html` `/favicon.svg` ga havola qilgan, lekin `public` papkasi bo'sh edi (favicon yo'q edi). Endi logotipingizdagi "P" belgisi tabda ko'rinadi. Xohlasangiz shu faylni o'z rasmingizga almashtiring.

### 5.3 `"use client"` nima?

Next.js'da komponentlar ikki xil:
- **Server komponent** (standart): serverda ishlaydi, brauzerga JS yubormaydi → tez. Lekin `useState`, `useEffect`, `onClick`, `window`, `localStorage` **ishlatib bo'lmaydi**.
- **Client komponent**: faylning birinchi qatoriga `"use client";` yoziladi. Brauzerda ishlaydi, hooks va hodisalar mumkin.

Sizning deyarli barcha komponentlaringiz interaktiv (menyu, tema, til, animatsiya), shuning uchun ularga `"use client";` qo'shildi. `Header.jsx`, `page.jsx`, `layout.jsx`, `projectsData.js` da kerak emas, ular oddiy (server) qoladi.

**Qoida:** `useState`/`useEffect`/`onClick`/`window` yozsangiz → faylning eng tepasiga `"use client";`. Unutsangiz Next.js xatoda aynan shuni aytadi.

### 5.4 Tema (dark/light): `components/theme/`

Eski kod `useState(() => localStorage.getItem("theme"))` edi. Next.js'da kod avval **serverda** ishlaydi, u yerda `localStorage` yo'q, xato bo'lardi. Yangi usul:
- Tema holati `<html class="dark">` ning o'zida turadi.
- `ThemeProvider` shu klassni `useSyncExternalStore` bilan kuzatadi (server uchun "light", brauzer uchun haqiqiy qiymat).
- `toggleTheme()` klassni almashtiradi va `localStorage`ga yozadi.
- `useTheme()` va `ThemeToggle` o'sha-o'sha ishlaydi: `const { dark, toggleTheme } = useTheme()`.

Natija: sahifani yangilasangiz ham, tanlangan tema yo'qolmaydi va oq "chaqnash" yo'q.

### 5.5 Til: `components/i18n/`

- Barcha tarjimalar (`uz`, `ru`, `en`) `LanguageProvider.jsx` ichida: **matnlarni o'zgartirmoqchi bo'lsangiz shu yerga kirasiz.**
- Yangi: tanlangan til `localStorage`da saqlanadi (sahifa yangilansa qoladi) va `<html lang>` til bilan almashadi.
- Standart til hali ham `uz`.
- `t("kalit")` funksiyasi o'sha-o'sha ishlaydi.

Yangi tarjima qo'shish: uchala til ob'ektiga bir xil kalit yozing, komponentda `{t("kalit")}`.

### 5.6 `hooks/useInView.js`: animatsiyalar uchun

About, Contact va Projects'da bir xil `IntersectionObserver` kodi 3 marta takrorlangan edi. Endi bitta hook:
```jsx
const [sectionRef, isVisible] = useInView();
// ref={sectionRef} ni elementga bering, isVisible true bo'lganda animatsiya klassini qo'ying
```
Animatsiya xatti-harakati bir xil: bo'lim ekranga kirsa chiqadi, chiqsa qaytadi.

### 5.7 Qolgan komponentlar

- **`layouts/header/Header.jsx`**: `react-router-dom` `Link` o'rniga `next/link`. `to="/"` → `href="/"`. `next/link` sahifalarni oldindan yuklab qo'yadi (prefetch) → o'tish bir zumda.
- **`HeaderMenu.jsx`**: tepadagi "glider" menyu. Scroll bo'yicha aktiv bo'limni aniqlaydi (`IntersectionObserver`).
- **`MobileMenu.jsx`**: hamburger menyu.
- **`ProjectsPage.jsx` + `projectsData.js`**: loyihalar va filtr. **Yangi loyiha qo'shish** → `projectsData.js` ga yangi obyekt, tarjima kalitlarini `LanguageProvider.jsx` ga.
- **`Contact.jsx`**: aloqa ma'lumotlari (telefon, email, havolalar) shu fayl tepasidagi `contactData` da. Nusxalash tugmasi `navigator.clipboard` ishlatadi (faqat `https` yoki `localhost` da ishlaydi, deploy qilingach muammo yo'q).
- **`Footer.jsx`, `ScrollToTopButton.jsx`, `PortfolioLogo.jsx`**: dizayn o'zgarmagan.

---

## 6. Next.js'da kerak bo'ladigan asosiy tushunchalar (lug'at)

- **App Router**: `src/app` papkasidagi routing tizimi (hozirgi standart).
- **Layout**: umumiy qobiq. **Page**: aniq manzilning mazmuni.
- **Server / Client komponent**: 5.3-bo'lim.
- **Hydration**: server yuborgan tayyor HTML'ga brauzerda JS "jon kiritishi". Server va brauzer birinchi chizishda **bir xil** natija chiqarishi shart. Shuning uchun `localStorage`ni to'g'ridan-to'g'ri `useState`ga yozmaymiz (5.4, 5.5).
- **`@/`**: `src/` papkaga qisqa yo'l.
- **`public/`**: `public/cv.pdf` → `/cv.pdf` manzilida ochiladi.
- **`metadata`**: SEO ma'lumotlari.
- **`next/image`** (kelajakda rasm qo'shsangiz): `<Image src="..." width height alt />`. Rasmni avtomatik kichraytiradi, WebP qiladi, sekin yuklanadi (lazy). Hozir loyihada rasm yo'q, shuning uchun ishlatilmadi.
- **`next/font`** (kelajakda): Google shrift qo'shsangiz shu orqali (sakrash va tashqi so'rov bo'lmaydi). Hozir tizim shriftlari ishlatiladi.

---

## 7. Yaxshilanishlar: nima uchun tezroq, silliqroq, yaxshiroq

### Tezlik
1. **Server-side render / static**: sahifa build vaqtida tayyor HTML bo'ladi, brauzer bo'sh ekran o'rniga darrov kontent ko'radi.
2. **Kamroq JS**: `react-router-dom`, `react-scroll` olib tashlandi. Routing Next'ning o'zida.
3. **React Compiler** yoqilgan (`reactCompiler: true`).
4. **Takroriy kod yo'q**: 3 ta observer o'rniga 1 ta hook.
5. **Passive scroll listener**: `ScrollToTopButton`da scroll silliqroq (brauzer scroll'ni kutib turmaydi).
6. **`next/link` prefetch**: sahifalar o'rtasida o'tish tez.
7. **Tema "chaqnashi"siz**: inline skript + CSS foni.
8. Tailwind v4 PostCSS: faqat ishlatilgan klasslar CSS'ga tushadi.

### Animatsiya
- Animatsiyalar (kirish effekti, hover, glider, hamburger) **o'zgarmadi**, faqat `useInView` hook'iga o'tdi.
- Eslatma: avval men `prefers-reduced-motion` qoidasini qo'shgan edim, lekin u tizimda "animatsiyani kamaytirish" yoqilgan kompyuterlarda barcha animatsiyani o'chirib yuborardi. Siz animatsiyalar aynan avvalgidek ishlashini so'raganingiz uchun uni olib tashladim.
- Kelajakda murakkabroq animatsiya xohlasangiz: `framer-motion` (`npm i framer-motion`), unda komponent `"use client"` bo'lishi shart.
- Maslahat: animatsiyada faqat `transform` va `opacity` ni o'zgartiring (sizda shunday), ular GPU'da ishlaydi, `width/height/top/left` esa sekin.

### Responsive (moslashuvchan dizayn)
Tailwind'da prefikssiz klass = mobil, prefiks = shu kenglikdan **yuqorida**:

| Prefiks | Kenglik |
|---|---|
| (yo'q) | 0px dan (mobil) |
| `sm:` | 640px+ |
| `md:` | 768px+ |
| `lg:` | 1024px+ |
| `xl:` | 1280px+ |

Brauzerda sinab, **2 ta haqiqiy xato** topilib tuzatildi (eski Vite loyihangizda ham bor edi):
1. **Planshet (768–1023px)**: yuqori menyu `min-w-64` (3 × 256px = 768px) tufayli logotip va tugmalarni ekrandan itarib chiqargan edi. Tuzatish: menyu endi `lg` (1024px) dan boshlab ko'rinadi, undan pastda hamburger. `≥1280px` da aynan avvalgidek (`xl:min-w-64`).
2. **Juda tor telefon (320px)**: hamburger tugmasi ekrandan tashqarida qolardi. Tuzatish: kichik ekranda oraliq masofalar (`gap`, `pl`) kamaytirildi (`sm:` va undan katta ekranda avvalgi qiymatlar).

Tekshirilgan kengliklar: 320, 360, 375, 425, 639, 640, 768, 1023, 1024, 1100, 1280, 1440. Gorizontal scroll yo'q.

### Sifat va qulaylik
- `metadata`: Google va Telegram/Instagram preview uchun title/description.
- Favicon qo'shildi (avval yo'q edi).
- 404 sahifa.
- `aria-label`lar: Tepaga qaytish, tema tugmasi, ijtimoiy tarmoq ikonkalari (ekran o'qigichlar uchun).
- `<html lang>` tanlangan tilga mos.
- Tanlangan til saqlanadi.

---

## 8. Deploy (internetga chiqarish): Vercel

1. Loyihani GitHub'ga yuklang (`node_modules` va `.next` o'zi ignor bo'ladi).
2. https://vercel.com ga GitHub bilan kiring → **Add New → Project** → repo'ni tanlang.
3. Framework avtomatik "Next.js" deb aniqlanadi. Hech narsani o'zgartirmay **Deploy** bosing.
4. 1–2 daqiqada `loyiha-nomi.vercel.app` manzil tayyor. Har safar `git push` qilsangiz o'zi qayta deploy bo'ladi.
5. Domen bo'lsa: Project → Settings → Domains.

Netlify ham ishlaydi, lekin Next.js uchun Vercel eng sodda.

---

## 9. Keyingi qadamlar (xohlasangiz)

1. `layout.jsx` dagi `metadata` ga haqiqiy saytingiz manzilini qo'shing: `metadataBase: new URL("https://sizning-domen.uz")`.
2. `public/og.png` (1200×630 rasm) qo'shib, `openGraph.images` ga ulang, shunda Telegram'da chiroyli preview chiqadi.
3. Haqiqiy loyihalaringiz skrinshotlari bo'lsa → `next/image` bilan qo'shing.
4. Aloqa formasi kerak bo'lsa: `app/api/contact/route.js` (Next'ning server funksiyasi).

---

## 10. Tez-tez uchraydigan xatolar

| Xato | Sabab / yechim |
|---|---|
| `You're importing a component that needs useState... "use client"` | Faylning birinchi qatoriga `"use client";` qo'shing |
| `localStorage is not defined` / `window is not defined` | Kod serverda ishlayapti. Faqat `useEffect` ichida yoki hodisa (`onClick`) ichida ishlating |
| `Hydration failed...` | Server va brauzerda birinchi chizish farq qilyapti (`Date.now()`, `Math.random()`, `localStorage`). Qiymatni `useEffect`da o'qing |
| Sahifa 404 | Papka nomi to'g'rimi? Ichida aynan `page.jsx` borligini tekshiring |
| O'zgarish ko'rinmayapti | `.next` papkasini o'chirib `npm run dev` ni qayta ishga tushiring |
| `port 3000 is in use` | `npm run dev -- -p 3001` |
| Tailwind klassi ishlamayapti | Klass nomi to'liq yozilganmi? (`bg-${rang}` kabi dinamik yig'ib bo'lmaydi) |

---

## 11. Ishning ro'yxati (hammasini tekshirdim)

- [x] `npm run build` xatosiz
- [x] `npm run lint` xatosiz
- [x] Brauzer konsolida xato/ogohlantirish yo'q
- [x] Dark ⇄ light, sahifa yangilanganda saqlanadi
- [x] Til almashtirish (uz/ru/en), `<html lang>` yangilanadi
- [x] Menyu orqali bo'limga scroll
- [x] Gorizontal scroll yo'q (320–1440px)

---

## 12. Yangi qo'shilganlar (haqiqiy loyiha bilan) va qayerga nima qo'yish

### 12.1 ⭐ Eng muhim fayl: `src/config/site.js`
Telefon, email, Telegram/Instagram/GitHub havolalari, CV manzili va "ochiqman" nishoni **shu bir faylda**. Contact bo'limi, Footer, "Menga yozing" tugmasi va SEO shu fayldan o'qiydi. Biror narsa o'zgarsa, faqat shu yerni tahrirlaysiz.

### 12.2 Zarhal loyihasining skrinshotini qo'yish (3 qadam)
1. Skrinshotni oling: Zarhal saytini brauzerda oching, to'liq ekranda (masalan 1600×900) rasmga oling. Tavsiya: **16:9 nisbat, PNG yoki WebP**, 2 MB dan kichik.
2. Rasmni `public/projects/` papkaga tashlang. Masalan: `public/projects/zarhal.png`.
3. `src/components/projects/projectsData.js` da `image: null,` qatorini shunday o'zgartiring:
   ```js
   image: "/projects/zarhal.png",
   ```
Tamom: Next.js rasmni avtomatik kichraytiradi va tez yuklaydi (sinab ko'rdim, ishlaydi). Rasm qo'yilmaguncha o'rnida punktir chiziqli bo'sh joy ko'rinadi. Sayt'ni internetga chiqarishdan oldin albatta rasm qo'ying.

### 12.3 Jonli havola
Zarhal'ni Netlify yoki Vercel'ga chiqargach, `projectsData.js` dagi `liveLink: ""` ga manzilni yozing. Bo'sh bo'lsa "Saytni ko'rish" tugmasi ko'rinmaydi (buzuq havola chiqmasligi uchun).

### 12.4 CV tugmasi
CV'ni PDF qilib `public/cv.pdf` ga qo'ying, so'ng `site.js` da `cvUrl: "/cv.pdf",` deb yozing. "CV yuklab olish" tugmasi paydo bo'ladi.

### 12.5 Nima o'zgardi
| Joy | O'zgarish |
|---|---|
| `projectsData.js` | 3 ta namunaviy loyiha o'rniga **faqat haqiqiy Zarhal loyihasi**. GitHub havolasi `Behruz141/jewel-shop-UI` (repo'dan olindi) |
| `ProjectsPage.jsx` | Skrinshot joyi, asosiy imkoniyatlar ro'yxati; 1 ta loyiha bo'lgani uchun katta "featured" karta; bitta kategoriya bo'lganda filtr tugmalari yashirinadi |
| `About.jsx` | "Yangi loyihalar uchun ochiqman" nishoni, "Menga yozing" va "Loyihalarni ko'rish" tugmalari, ko'nikmalarga **TypeScript** va **Next.js** qo'shildi (xohlamasangiz `SKILLS` massividan o'chiring) |
| `sections/services/Services.jsx` | Yangi "Xizmatlar" bo'limi (3 karta: Dizayndan saytga / Saytni yangilash / Biznes sayt) |
| `app/page.jsx` | Services bo'limi About va Projects orasiga qo'yildi |
| `LanguageProvider.jsx` | Yangi matnlar uz/ru/en da |
| `layout.jsx` | `metadataBase`, Open Graph/Twitter, Google uchun JSON-LD ("Person") |
| `app/sitemap.js`, `app/robots.js` | `/sitemap.xml` va `/robots.txt` avtomatik yaratiladi |
| `app/opengraph-image.png`, `twitter-image.png` | Telegram/Instagram'da havola tashlaganda chiqadigan preview rasm (men yasab berdim, xohlasangiz o'z rasmingizga almashtiring, 1200×630) |

### 12.6 Internetga chiqarganda majburiy qadam
Vercel'da: Project → Settings → Environment Variables → `NEXT_PUBLIC_SITE_URL` = `https://sizning-domen.vercel.app` (yoki o'z domeningiz). Shundan keyin sitemap, Open Graph va Google ma'lumotlari to'g'ri manzil bilan chiqadi. Qo'ymasangiz `localhost:3000` yozilib qoladi.

Keyin tekshiring:
- `https://domeningiz/sitemap.xml` ochiladimi
- Havolani Telegram'ga tashlab, preview chiqayotganini ko'ring
- https://search.google.com/search-console ga saytni qo'shing (Google tezroq topadi)

### 12.7 Yangi loyiha qo'shish (kelajakda)
1. `projectsData.js` massiviga yangi blok qo'shing (Zarhal blokidan nusxa oling).
2. `LanguageProvider.jsx` da uchala tilga `p2_title`, `p2_desc`, `p2_h1...` kalitlarini yozing.
3. Skrinshotni `public/projects/` ga qo'ying. 2 ta loyiha bo'lsa karta avtomatik 2 ustunli joylashadi.

---

## 13. Zarhal (jewel-shop-UI) loyihangiz bo'yicha maslahatlar

Loyihangiz haqiqiy va yaxshi: jonli oltin narxi, uzuk o'lchami simulyatori, JWT bilan login. Portfolio'da ko'rsatishdan oldin shularni tuzating, chunki ish beruvchilar GitHub kodingizni ham ochib ko'radi:

1. **🔴 Xavfsizlik: har kim "admin" bo'lib ro'yxatdan o'tishi mumkin.** `netlify/function/auth-register.ts` da `role === "admin" ? "admin" : "customer"` qatori brauzerdan kelgan rolni ishonib qabul qiladi, `AuthModal` ham "Do'kon egasi" tanlovini ko'rsatadi. Rolni foydalanuvchi tanlamasligi kerak: serverda doim `"customer"` bering, adminni esa bazada qo'lda belgilang.
2. **`.env` ni `.gitignore` ga qo'shing.** Hozir unda faqat API manzil bor (maxfiy emas), lekin kelajakda kalit qo'shsangiz GitHub'ga chiqib ketishi mumkin. `.gitignore` ga `.env` qatorini yozing.
3. **`index.html` sarlavhasi `jewel-shop-ui`** (brauzer tabida shunday chiqadi). "Zarhal Fine Jewelry" deb o'zgartiring va `<meta name="description">` qo'shing. Favicon (`/favicon.svg`) ham yo'q ko'rinadi.
4. **`README.md` Vite shablonicha qolgan.** Loyiha nima ekani, skrinshot, ishga tushirish va imkoniyatlar haqida 15–20 qator yozing. GitHub README ko'pincha portfolio'ning o'zidan ko'proq o'qiladi.
5. **Backend manzili:** kod `http://localhost:8081` (alohida API) ga ham, `/.netlify/functions` ga ham bog'langan. Jonli saytda mahsulotlar yuklanishi uchun `VITE_API_BASE_URL` da ishlayotgan server bo'lishi kerak. Jonli havolani portfolio'ga qo'yishdan oldin saytni ochib mahsulotlar chiqayotganini tekshiring, aks holda mijoz bo'sh katalog ko'radi.
6. **GitHub repo sahifasida** "About" qismiga jonli havola va tavsif yozing, repo'ni "Pin" qiling.
