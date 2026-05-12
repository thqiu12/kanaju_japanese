import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { fetchAllNewsSlugs } from "@/lib/news";

const SITE_URL = "https://jls.hirai-gakuen.ac.jp";

const staticRoutes = [
  { path: "", priority: 1.0, freq: "weekly" as const },
  { path: "/about", priority: 0.8, freq: "monthly" as const },
  { path: "/programs", priority: 0.9, freq: "monthly" as const },
  { path: "/campus-life", priority: 0.7, freq: "monthly" as const },
  { path: "/admissions", priority: 0.9, freq: "monthly" as const },
  { path: "/news", priority: 0.7, freq: "weekly" as const },
  { path: "/contact", priority: 0.7, freq: "monthly" as const },
  { path: "/info-disclosure", priority: 0.6, freq: "monthly" as const },
  { path: "/privacy", priority: 0.3, freq: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const r of staticRoutes) {
      entries.push({
        url: `${SITE_URL}/${locale}${r.path}`,
        lastModified: new Date(),
        changeFrequency: r.freq,
        priority: r.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${r.path}`]),
          ),
        },
      });
    }
  }

  // News articles (dynamic via microCMS, falls back to mock slugs)
  try {
    const slugs = await fetchAllNewsSlugs();
    for (const locale of routing.locales) {
      for (const slug of slugs) {
        const path = `/news/${slug}`;
        entries.push({
          url: `${SITE_URL}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.5,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
            ),
          },
        });
      }
    }
  } catch (e) {
    console.error("[sitemap] failed to fetch news slugs:", e);
  }

  return entries;
}
