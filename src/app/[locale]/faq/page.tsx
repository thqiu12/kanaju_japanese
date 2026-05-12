import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.faq" });
  return { title: t("title"), description: t("subtitle") };
}

type Item = { q: string; a: string };
type Category = { title: string; items: Item[] };

export default async function FaqPage({
  params,
}: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact.faq");
  const categories = t.raw("categories") as Category[];

  // JSON-LD structured data for SEO
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: categories.flatMap((c) =>
      c.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    ),
  };

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-dark to-primary px-6 py-20 text-white lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionLabel label="FAQ" variant="light" />
            <h1 className="mt-4 font-serif text-4xl font-semibold lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-white/85">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-14">
            {categories.map((cat) => (
              <div key={cat.title}>
                <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl font-semibold text-primary-dark before:block before:h-px before:w-8 before:bg-primary">
                  {cat.title}
                </h2>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-lg border border-border bg-bg-card transition-colors open:border-primary"
                    >
                      <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 text-base font-medium text-primary-dark transition-colors hover:text-primary">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-pale font-serif text-sm font-semibold text-primary">
                          Q
                        </span>
                        <span className="flex-1">{item.q}</span>
                        <span className="text-text-muted transition-transform group-open:rotate-180">
                          ▾
                        </span>
                      </summary>
                      <div className="flex items-start gap-4 border-t border-border bg-bg-warm px-6 py-5 text-sm leading-[1.95] text-text">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-warm/20 font-serif text-sm font-semibold text-accent-warm">
                          A
                        </span>
                        <span className="flex-1">{item.a}</span>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light px-6 py-20 text-center text-white lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-semibold lg:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-5 text-base leading-[1.85] opacity-90">
              {t("ctaDesc")}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded bg-accent-warm px-8 py-4 text-sm font-medium tracking-wide shadow-lg shadow-accent-warm/30 transition-all hover:-translate-y-0.5 hover:bg-[#C56544]"
            >
              {t("ctaButton")} →
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
