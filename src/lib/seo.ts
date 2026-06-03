import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL = "https://jls.hirai-gakuen.ac.jp";

export const OG_LOCALE: Record<Locale, string> = {
  ja: "ja_JP",
  zh: "zh_CN",
  en: "en_US",
  ne: "ne_NP",
};

const ALT_LANG_MAP: Record<Locale, string> = {
  ja: "ja",
  zh: "zh-CN",
  en: "en",
  ne: "ne",
};

const DEFAULT_OG_IMAGE = "/photos/building-exterior-2.jpg";

/**
 * Per-page canonical + hreflang alternates. `path` is the route under the
 * locale segment, e.g. "/about" or "" for the home page.
 */
export function pageAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[ALT_LANG_MAP[l]] = `${SITE_URL}/${l}${path}`;
  }
  // x-default points to the Japanese version (master locale)
  languages["x-default"] = `${SITE_URL}/ja${path}`;
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages,
  };
}

/**
 * Build per-page metadata for any standard page so it gets a proper
 * canonical, full hreflang alternates (with x-default), robots and
 * OG/Twitter cards — instead of inheriting the root layout's generic
 * `/[locale]` canonical (which marks every page as a duplicate of home).
 */
export async function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
}: {
  locale: Locale;
  path: string;
  title: string;
  description?: string;
  image?: string;
}): Promise<Metadata> {
  const meta = await getTranslations({ locale, namespace: "meta" });
  const siteTitle = meta("siteTitle");
  const fullTitle = `${title} | ${siteTitle}`;
  return {
    title,
    description,
    alternates: pageAlternates(locale, path),
    robots: { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: siteTitle,
      locale: OG_LOCALE[locale],
      type: "website",
      images: [{ url: image, width: 1920, height: 1280, alt: siteTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/**
 * Serialize a JSON-LD object for injection via dangerouslySetInnerHTML.
 * Escapes `<` to `<` so a value containing `</script>` can never break
 * out of the surrounding <script> tag.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Site-wide WebSite JSON-LD for the home page. */
export function websiteLd(siteTitle: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    description,
    url: SITE_URL,
    inLanguage: ["ja", "zh-CN", "en", "ne"],
    publisher: { "@type": "EducationalOrganization", name: siteTitle },
  };
}

/** Site-wide EducationalOrganization JSON-LD (used on the home page). */
export function organizationLd(siteTitle: string, address: string) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteTitle,
    legalName: "学校法人 平井学園",
    url: SITE_URL,
    logo: `${SITE_URL}/cert/mark-full.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Sagamihara",
      addressRegion: "Kanagawa",
      postalCode: "252-0313",
      addressCountry: "JP",
    },
    sameAs: ["https://hirai-gakuen.ac.jp"],
  };
}
