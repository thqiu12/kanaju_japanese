import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

const SITE_URL = "https://jls.hirai-gakuen.ac.jp";

const OG_LOCALE: Record<Locale, string> = {
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

export type CareersSubpage =
  | "hub"
  | "message"
  | "interview"
  | "positions"
  | "entry";

const SUBPATH: Record<CareersSubpage, string> = {
  hub: "/careers",
  message: "/careers/message",
  interview: "/careers/interview",
  positions: "/careers/positions",
  entry: "/careers/entry",
};

function buildAlternates(locale: Locale, sub: CareersSubpage) {
  const path = SUBPATH[sub];
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
 * Build per-page metadata for a /careers/* page.
 * - Overrides the root layout's canonical (which would otherwise mark
 *   every careers sub-page as a duplicate of /[locale]).
 * - Sets full hreflang alternates with x-default.
 * - Provides page-specific OG + Twitter cards.
 */
export function buildCareersMetadata({
  locale,
  sub,
  title,
  description,
  siteTitle,
}: {
  locale: Locale;
  sub: CareersSubpage;
  title: string;
  description: string;
  siteTitle: string;
}): Metadata {
  const fullTitle = `${title} | ${siteTitle}`;
  return {
    title,
    description,
    alternates: buildAlternates(locale, sub),
    robots: { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}/${locale}${SUBPATH[sub]}`,
      siteName: siteTitle,
      locale: OG_LOCALE[locale],
      type: "website",
      images: [
        {
          url: "/photos/building-exterior.jpg",
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/photos/building-exterior.jpg"],
    },
  };
}

// ---------------- Structured data (JSON-LD) ----------------

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue | undefined };

type Position = {
  name: string;
  type: string;
  deadline: string;
  desc: string;
  requirements: string[];
};

function detectEmploymentType(typeLabel: string): string[] {
  const t = typeLabel.toLowerCase();
  const out = new Set<string>();
  if (
    t.includes("正社員") ||
    t.includes("专职") ||
    t.includes("full-time") ||
    t.includes("पूर्णकालीन")
  )
    out.add("FULL_TIME");
  if (
    t.includes("非常勤") ||
    t.includes("兼职") ||
    t.includes("part-time") ||
    t.includes("आंशिक")
  )
    out.add("PART_TIME");
  if (out.size === 0) out.add("FULL_TIME");
  return [...out];
}

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
  } satisfies JsonLdValue;
}

export function breadcrumbsLd(
  locale: Locale,
  sub: CareersSubpage,
  labels: { home: string; careers: string; current?: string },
) {
  const items: { "@type": "ListItem"; position: number; name: string; item: string }[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: labels.home,
      item: `${SITE_URL}/${locale}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: labels.careers,
      item: `${SITE_URL}/${locale}/careers`,
    },
  ];
  if (sub !== "hub" && labels.current) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: labels.current,
      item: `${SITE_URL}/${locale}${SUBPATH[sub]}`,
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  } satisfies JsonLdValue;
}

export function jobPostingsLd({
  locale,
  positions,
  siteTitle,
  address,
  datePosted,
  validThrough,
}: {
  locale: Locale;
  positions: Position[];
  siteTitle: string;
  address: string;
  datePosted: string;
  validThrough: string;
}) {
  const hiringOrganization = {
    "@type": "EducationalOrganization",
    name: siteTitle,
    sameAs: SITE_URL,
    logo: `${SITE_URL}/cert/mark-full.jpg`,
  };
  const jobLocation = {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: "Sagamihara",
      addressRegion: "Kanagawa",
      postalCode: "252-0313",
      addressCountry: "JP",
    },
  };
  return positions.map((p) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: p.name,
    description: `<p>${p.desc}</p><ul>${p.requirements
      .map((r) => `<li>${r}</li>`)
      .join("")}</ul>`,
    datePosted,
    validThrough,
    employmentType: detectEmploymentType(p.type),
    hiringOrganization,
    jobLocation,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "JP",
    },
    directApply: true,
    inLanguage: locale,
    url: `${SITE_URL}/${locale}/careers/entry`,
  })) satisfies JsonLdValue[];
}
