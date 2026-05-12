import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import type { Locale } from "@/i18n/routing";

/**
 * News content shape — single microCMS endpoint "news" with per-language fields.
 *
 * Required microCMS fields:
 *   - id (auto)
 *   - slug      : text       (URL-safe identifier)
 *   - category  : select     ("announcement" | "event" | "press")
 *   - publishedAt : datetime
 *   - title_ja  : text
 *   - title_zh  : text   (optional, falls back to JA)
 *   - title_en  : text   (optional, falls back to JA)
 *   - title_ne  : text   (optional, falls back to JA)
 *   - content_ja: richEditor
 *   - content_zh: richEditor (optional)
 *   - content_en: richEditor (optional)
 *   - content_ne: richEditor (optional)
 *   - thumbnail : image       (optional)
 */

export type NewsCategory = "announcement" | "event" | "press";

type MicroCMSImage = { url: string; width?: number; height?: number };

export type RawNews = {
  id: string;
  slug: string;
  category?: NewsCategory[] | NewsCategory;
  publishedAt: string;
  title_ja: string;
  title_zh?: string;
  title_en?: string;
  title_ne?: string;
  content_ja?: string;
  content_zh?: string;
  content_en?: string;
  content_ne?: string;
  thumbnail?: MicroCMSImage;
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
};

export type News = {
  id: string;
  slug: string;
  category: NewsCategory;
  publishedAt: string;
  title: string;
  content: string;
  thumbnail?: { url: string; width?: number; height?: number };
};

/** Pick a localized field with JA fallback. */
function pick(
  data: RawNews,
  base: "title" | "content",
  locale: Locale,
): string {
  const value = data[`${base}_${locale}` as keyof RawNews] as
    | string
    | undefined;
  if (value && value.trim().length > 0) return value;
  return (data[`${base}_ja` as keyof RawNews] as string) ?? "";
}

function normalizeCategory(c: RawNews["category"]): NewsCategory {
  if (Array.isArray(c)) return (c[0] ?? "announcement") as NewsCategory;
  return (c ?? "announcement") as NewsCategory;
}

export function localizeNews(raw: RawNews, locale: Locale): News {
  return {
    id: raw.id,
    slug: raw.slug || raw.id,
    category: normalizeCategory(raw.category),
    publishedAt: raw.publishedAt,
    title: pick(raw, "title", locale),
    content: pick(raw, "content", locale),
    thumbnail: raw.thumbnail
      ? {
          url: raw.thumbnail.url,
          width: raw.thumbnail.width,
          height: raw.thumbnail.height,
        }
      : undefined,
  };
}

/* ---------- microCMS client (lazy) ---------- */

let client: ReturnType<typeof createClient> | null = null;
function getClient() {
  if (client) return client;
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) return null;
  client = createClient({ serviceDomain, apiKey });
  return client;
}

/* ---------- Mock data (used in dev/build without API key) ---------- */

const NOW = new Date();
function isoDaysAgo(d: number) {
  const t = new Date(NOW);
  t.setDate(t.getDate() - d);
  return t.toISOString();
}

const MOCK_NEWS: RawNews[] = [
  {
    id: "mock-3",
    slug: "opening-october-2026",
    category: "announcement",
    publishedAt: isoDaysAgo(2),
    title_ja: "2026年10月、日本語学科 開校予定のお知らせ",
    title_zh: "2026 年 10 月，日语学科开校通知",
    title_en: "Japanese Language Department opening October 2026",
    title_ne: "जापानी भाषा विभाग अक्टोबर २०२६ मा खुल्ने सूचना",
    content_ja:
      "<p>神奈川柔整鍼灸専門学校 日本語学科は、2026年10月1日に開校予定です。文部科学省認定日本語教育機関として、留学生の専門学校進学と日本でのキャリア実現を全力でサポートします。</p><p>現在、4月・7月・10月入学の3つの進学課程について願書を受付中です。詳細は「入学案内」ページをご覧ください。</p>",
    content_zh:
      "<p>神奈川柔整针灸专门学校 日语学科预计于 2026 年 10 月 1 日开校。作为文部科学省认定日语教育机构，将全力支持留学生的专门学校升学和在日本的职业发展。</p><p>4 月、7 月、10 月入学的三大升学课程现已开始受理申请。详情请参考「入学申请」页面。</p>",
    content_en:
      "<p>Kanagawa JLS — Japanese Language Department — is scheduled to open on October 1, 2026. As a MEXT-accredited Japanese language institution, we will fully support international students from vocational-school admission to careers in Japan.</p><p>Applications are now being accepted for our three programs (April, July, October entry). See the Admissions page for details.</p>",
    content_ne:
      "<p>कानागावा जापानी भाषा विभाग अक्टोबर १, २०२६ मा खुल्ने तय छ। MEXT-मान्यताप्राप्त संस्थाको रूपमा, हामी विदेशी विद्यार्थीहरूको विशिष्ट विद्यालय भर्ना र जापानमा करिअर बनाउने यात्रामा साथ दिनेछौं।</p><p>तीन पाठ्यक्रम (अप्रिल, जुलाई, अक्टोबर भर्ना) का लागि आवेदन खुला छ। थप जानकारीका लागि 'भर्ना' पृष्ठ हेर्नुहोस्।</p>",
    createdAt: isoDaysAgo(2),
    updatedAt: isoDaysAgo(2),
    revisedAt: isoDaysAgo(2),
  },
  {
    id: "mock-2",
    slug: "nepal-partner-agencies",
    category: "press",
    publishedAt: isoDaysAgo(10),
    title_ja: "ネパールの提携代理店6社のご紹介",
    title_zh: "尼泊尔合作代理 6 家介绍",
    title_en: "Introducing our 6 partner agencies in Nepal",
    title_ne: "नेपालमा हाम्रा ६ साझेदार एजेन्सीहरूको परिचय",
    content_ja:
      "<p>本学科では、ネパールから安心して出願いただけるよう、Kathmandu・Rupandehi 地域の6社の現地代理店と提携しています。詳細は「入学案内」ページの「出願先」をご覧ください。</p>",
    content_zh:
      "<p>为方便尼泊尔学生顺利申请，本学科已与 Kathmandu、Rupandehi 地区的 6 家当地代理建立合作。详情请参考「入学申请」页的「申请窗口」一节。</p>",
    content_en:
      "<p>To make applying from Nepal easier, we've partnered with 6 local agencies in the Kathmandu and Rupandehi regions. See the 'Local Offices' section of the Admissions page for details.</p>",
    content_ne:
      "<p>नेपालबाट सहज आवेदनका लागि, हामीले काठमाडौँ र रूपन्देही क्षेत्रका ६ स्थानीय एजेन्सीहरूसँग साझेदारी गरेका छौं। थप विवरणका लागि 'भर्ना' पृष्ठको 'स्थानीय कार्यालय' खण्ड हेर्नुहोस्।</p>",
    createdAt: isoDaysAgo(10),
    updatedAt: isoDaysAgo(10),
    revisedAt: isoDaysAgo(10),
  },
  {
    id: "mock-1",
    slug: "mext-accreditation",
    category: "announcement",
    publishedAt: isoDaysAgo(25),
    title_ja: "文部科学省 認定日本語教育機関に認定されました",
    title_zh: "本校已通过文部科学省认定日语教育机构认证",
    title_en: "Accredited as a MEXT Japanese Language Institution",
    title_ne: "MEXT जापानी भाषा संस्थाको रूपमा मान्यता प्राप्त",
    content_ja:
      "<p>本学科は、文部科学省より「認定日本語教育機関」として認定を受けました。質の高い教育課程と運営体制のもと、留学生の皆さんを安心してお迎えできる体制が整いました。</p>",
    content_zh:
      "<p>本学科已获得文部科学省「认定日语教育机构」资格。我们将以高品质的教学课程和运营体系，为留学生提供放心的留学环境。</p>",
    content_en:
      "<p>We are pleased to announce that our Department has been officially accredited as a 'Recognized Japanese Language Institution' by Japan's MEXT. With a quality curriculum and operational framework in place, we are ready to welcome international students.</p>",
    content_ne:
      "<p>हाम्रो विभागलाई जापानको MEXT बाट 'मान्यताप्राप्त जापानी भाषा संस्था' को आधिकारिक मान्यता प्राप्त भएको छ। गुणस्तरीय पाठ्यक्रम र सञ्चालन ढाँचाका साथ, हामी विदेशी विद्यार्थीहरूलाई स्वागत गर्न तयार छौं।</p>",
    createdAt: isoDaysAgo(25),
    updatedAt: isoDaysAgo(25),
    revisedAt: isoDaysAgo(25),
  },
];

/* ---------- Public fetchers ---------- */

export async function fetchNewsList(
  locale: Locale,
  limit = 100,
): Promise<News[]> {
  const c = getClient();
  if (!c) {
    return MOCK_NEWS.map((r) => localizeNews(r, locale));
  }
  try {
    const queries: MicroCMSQueries = {
      orders: "-publishedAt",
      limit,
      fields:
        "id,slug,category,publishedAt,title_ja,title_zh,title_en,title_ne,content_ja,content_zh,content_en,content_ne,thumbnail",
    };
    const res = await c.getList<RawNews>({ endpoint: "news", queries });
    return res.contents.map((r) => localizeNews(r, locale));
  } catch (e) {
    console.error("[news] microCMS fetch failed, falling back to mock:", e);
    return MOCK_NEWS.map((r) => localizeNews(r, locale));
  }
}

export async function fetchNewsBySlug(
  slug: string,
  locale: Locale,
): Promise<News | null> {
  const c = getClient();
  if (!c) {
    const found = MOCK_NEWS.find((r) => r.slug === slug);
    return found ? localizeNews(found, locale) : null;
  }
  try {
    const res = await c.getList<RawNews>({
      endpoint: "news",
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    });
    const raw = res.contents[0];
    return raw ? localizeNews(raw, locale) : null;
  } catch (e) {
    console.error("[news] microCMS fetch failed, falling back to mock:", e);
    const found = MOCK_NEWS.find((r) => r.slug === slug);
    return found ? localizeNews(found, locale) : null;
  }
}

export async function fetchAllNewsSlugs(): Promise<string[]> {
  const c = getClient();
  if (!c) return MOCK_NEWS.map((r) => r.slug);
  try {
    const res = await c.getList<RawNews>({
      endpoint: "news",
      queries: { fields: "slug", limit: 100 },
    });
    return res.contents.map((r) => r.slug).filter(Boolean);
  } catch (e) {
    console.error("[news] microCMS slugs fetch failed:", e);
    return MOCK_NEWS.map((r) => r.slug);
  }
}

/* ---------- Helpers ---------- */

export function formatNewsDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  const localeMap: Record<Locale, string> = {
    ja: "ja-JP",
    zh: "zh-CN",
    en: "en-US",
    ne: "ne-NP",
  };
  return d.toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
