import { Link } from "@/i18n/navigation";
import type { News } from "@/lib/news";
import { formatNewsDate } from "@/lib/news";
import type { Locale } from "@/i18n/routing";

const CATEGORY_TAG: Record<string, { bg: string; text: string }> = {
  announcement: { bg: "bg-primary-pale", text: "text-primary-dark" },
  event: { bg: "bg-[#FFF6E1]", text: "text-accent-warm" },
  press: { bg: "bg-[#F0E6F5]", text: "text-[#6B3F8E]" },
};

export default function NewsCard({
  news,
  locale,
  categoryLabel,
}: {
  news: News;
  locale: Locale;
  categoryLabel: string;
}) {
  const cat = CATEGORY_TAG[news.category] ?? CATEGORY_TAG.announcement;
  return (
    <Link
      href={`/news/${news.slug}` as never}
      className="group block overflow-hidden rounded-lg border border-border bg-bg-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_8px_24px_rgba(14,160,130,0.1)]"
    >
      <article className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between text-xs">
          <span
            className={`rounded-full px-3 py-1 font-medium ${cat.bg} ${cat.text}`}
          >
            {categoryLabel}
          </span>
          <time
            dateTime={news.publishedAt}
            className="font-serif text-text-muted"
          >
            {formatNewsDate(news.publishedAt, locale)}
          </time>
        </div>
        <h3 className="mt-4 line-clamp-3 text-base font-semibold leading-snug text-primary-dark transition-colors group-hover:text-primary">
          {news.title}
        </h3>
      </article>
    </Link>
  );
}
