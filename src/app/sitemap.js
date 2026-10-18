import { siteConfig } from "@/config/site";

// Google uchun sahifalar ro'yxati: /sitemap.xml
export default function sitemap() {
  const now = new Date();
  return [
    { url: siteConfig.siteUrl, lastModified: now, priority: 1 },
    { url: `${siteConfig.siteUrl}/about`, lastModified: now, priority: 0.7 },
  ];
}
