import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/sitemap">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.sitemap" });
  return { title: t("title"), description: t("subtitle") };
}

type LinkEntry = { label: string; href: string };
type Group = { title: string; links: LinkEntry[] };

export default async function SitemapPage({
  params,
}: PageProps<"/[locale]/sitemap">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact.sitemap");
  const groups = t.raw("groups") as Group[];

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg px-6 py-20 lg:px-8">
        <article className="mx-auto max-w-5xl">
          <header className="border-b border-border pb-10">
            <h1 className="font-serif text-4xl font-semibold leading-tight text-primary-dark lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-base leading-[1.9] text-text-muted">
              {t("subtitle")}
            </p>
          </header>

          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <section key={g.title}>
                <h2 className="font-serif text-lg font-semibold text-primary-dark">
                  {g.title}
                </h2>
                <ul className="mt-4 space-y-2">
                  {g.links.map((l) => {
                    const isExternal =
                      l.href.endsWith(".pdf") || l.href.startsWith("http");
                    if (isExternal) {
                      return (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded border border-border bg-bg-card px-4 py-2.5 text-sm transition-colors hover:border-primary hover:bg-primary-pale"
                          >
                            <span className="text-xs text-primary">▸</span>
                            <span>{l.label}</span>
                            <span className="ml-auto text-[10px] text-text-light">
                              ↗
                            </span>
                          </a>
                        </li>
                      );
                    }
                    return (
                      <li key={l.href}>
                        <Link
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          href={l.href as any}
                          className="flex items-center gap-2 rounded border border-border bg-bg-card px-4 py-2.5 text-sm transition-colors hover:border-primary hover:bg-primary-pale"
                        >
                          <span className="text-xs text-primary">▸</span>
                          <span>{l.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-16 border-t border-border pt-6 text-sm text-text-muted">
            {t("xmlNote")}
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary-dark"
            >
              {t("xmlLink")}
            </a>
            {t("xmlSuffix")}
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
