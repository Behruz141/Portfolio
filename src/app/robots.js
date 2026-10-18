import { siteConfig } from "@/config/site";

// Qidiruv robotlariga ruxsat: /robots.txt
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
