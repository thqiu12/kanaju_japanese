import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import SectionLabel from "../SectionLabel";
import NewsCard from "../NewsCard";
import { fetchNewsList } from "@/lib/news";
import type { Locale } from "@/i18n/routing";

export default async function NewsHome({ locale }: { locale: Locale }) {
  const [t, items] = await Promise.all([
    getTranslations("news"),
    fetchNewsList(locale, 3),
  ]);

  if (items.length === 0) return null;

  return (
    <section className="bg-bg px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <SectionLabel label={t("sectionLabel")} />
            <h2 className="mt-4 font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-tight text-primary-dark">
              {t("sectionTitle")}
            </h2>
          </div>
          <Link
            href={"/news" as never}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            {t("viewAll")} →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((n) => (
            <NewsCard
              key={n.id}
              news={n}
              locale={locale}
              categoryLabel={t(`categories.${n.category}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
