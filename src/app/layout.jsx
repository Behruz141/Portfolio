import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/layouts/header/Header";
import Footer from "@/layouts/footer/Footer";
import ScrollToTopButton from "@/components/to-top-btn/ScrollToTopButton";
import { siteConfig } from "@/config/site";

// <head> ichidagi teglar (title, description, og...) shu yerda yoziladi
export const metadata = {
  // Havolalar (og rasm va h.k.) uchun asosiy manzil. siteConfig.siteUrl ni o'zgartiring.
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Behruz G'ayratov — Portfolio",
    template: "%s | Behruz G'ayratov",
  },
  description:
    "Behruz G'ayratov — Full-Stack Frontend Developer. Zamonaviy, tezkor va interaktiv veb-ilovalar.",
  openGraph: {
    title: "Behruz G'ayratov — Portfolio",
    description:
      "Full-Stack Frontend Developer. Zamonaviy, tezkor va interaktiv veb-ilovalar.",
    type: "website",
    siteName: "Behruz G'ayratov",
    locale: "uz_UZ",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// Sahifa chizilishidan OLDIN ishlaydi: saqlangan temani <html> ga qo'yadi,
// shunda dark rejimda sahifa ochilganda oq "chaqnash" bo'lmaydi.
const themeScript = `
try {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}
`;

// Google uchun "bu odam kim" ma'lumoti (JSON-LD, schema.org)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Full-Stack Frontend Developer",
  url: siteConfig.siteUrl,
  email: siteConfig.email,
  sameAs: [siteConfig.github, siteConfig.telegram, siteConfig.instagram],
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: yuqoridagi skript <html> klassini o'zgartiradi
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="text-gray-900 dark:text-white transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Providers>
          <div className="flex flex-col min-h-screen bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white transition-colors duration-300">
            <Header />

            <main className="container mx-auto grow pt-24 px-4">
              {children}
            </main>

            <Footer />

            <ScrollToTopButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
