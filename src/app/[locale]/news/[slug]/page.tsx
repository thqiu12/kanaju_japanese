import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import { Link } from "@/i18n/navigation";
import { fetchNewsBySlug, fetchAllNewsSlugs, formatNewsDate } from "@/lib/news";
import { routing } from "@/i18n/routing";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await fetchAllNewsSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const news = await fetchNewsBySlug(
    slug,
    (routing.locales as readonly string[]).includes(locale)
      ? (locale as (typeof routing.locales)[number])
      : routing.defaultLocale,
  );
  if (!news) return { title: "Not Found" };
  return {
    title: news.title,
    description: news.title,
  };
}

export default async function NewsDetailPage({
  params,
}: PageProps<"/[locale]/news/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const typedLocale = (routing.locales as readonly string[]).includes(locale)
    ? (locale as (typeof routing.locales)[number])
    : routing.defaultLocale;

  const [t, news] = await Promise.all([
    getTranslations("news"),
    fetchNewsBySlug(slug, typedLocale),
  ]);
  if (!news) notFound();

  const CATEGORY_TAG: Record<string, { bg: string; text: string }> = {
    announcement: { bg: "bg-primary-pale", text: "text-primary-dark" },
    event: { bg: "bg-[#FFF6E1]", text: "text-accent-warm" },
    press: { bg: "bg-[#F0E6F5]", text: "text-[#6B3F8E]" },
  };
  const cat = CATEGORY_TAG[news.category] ?? CATEGORY_TAG.announcement;

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg px-6 py-20 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <Link
            href={"/news" as never}
            className="inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-primary"
          >
            ← {t("back")}
          </Link>

          <header className="mt-8 border-b border-border pb-8">
            <div className="flex items-center gap-3 text-xs">
              <span
                className={`rounded-full px-3 py-1 font-medium ${cat.bg} ${cat.text}`}
              >
                {t(`categories.${news.category}`)}
              </span>
              <time
                dateTime={news.publishedAt}
                className="font-serif text-text-muted"
              >
                {formatNewsDate(news.publishedAt, typedLocale)}
              </time>
            </div>
            <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-primary-dark lg:text-4xl">
              {news.title}
            </h1>
          </header>

          {news.thumbnail && (
            <div className="mt-8 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={news.thumbnail.url}
                alt=""
                className="h-auto w-full"
              />
            </div>
          )}

          <div
            className="news-content mt-10 leading-[1.95] text-text"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
