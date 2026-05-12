import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import NewsCard from "@/components/NewsCard";
import SectionLabel from "@/components/SectionLabel";
import { fetchNewsList } from "@/lib/news";
import { routing } from "@/i18n/routing";

export const revalidate = 300; // ISR — revalidate every 5 minutes

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/news">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function NewsIndexPage({
  params,
}: PageProps<"/[locale]/news">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = (routing.locales as readonly string[]).includes(locale)
    ? (locale as (typeof routing.locales)[number])
    : routing.defaultLocale;

  const t = await getTranslations("news");
  const items = await fetchNewsList(typedLocale, 100);

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg">
        <section className="bg-gradient-to-br from-primary-dark to-primary px-6 py-20 text-white lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionLabel label="NEWS & TOPICS" variant="light" />
            <h1 className="mt-4 font-serif text-4xl font-semibold lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-white/85">
              {t("subtitle")}
            </p>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {items.length === 0 ? (
              <p className="rounded border border-border bg-bg-card py-20 text-center text-text-muted">
                {t("empty")}
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((n) => (
                  <NewsCard
                    key={n.id}
                    news={n}
                    locale={typedLocale}
                    categoryLabel={t(`categories.${n.category}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
