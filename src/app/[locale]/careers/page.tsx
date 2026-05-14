import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";
import CareersNav from "@/components/CareersNav";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  buildCareersMetadata,
  breadcrumbsLd,
  organizationLd,
} from "@/lib/careers-seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/careers">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.careers" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  return buildCareersMetadata({
    locale: locale as Locale,
    sub: "hub",
    title: t("title"),
    description: t("subtitle"),
    siteTitle: meta("siteTitle"),
  });
}

type Card = { key: string; tag: string; title: string; desc: string };

const HREFS: Record<string, string> = {
  message: "/careers/message",
  interview: "/careers/interview",
  positions: "/careers/positions",
  entry: "/careers/entry",
};

export default async function CareersHubPage({
  params,
}: PageProps<"/[locale]/careers">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact.careers");
  const tCommon = await getTranslations("common");
  const meta = await getTranslations("meta");
  const tNav = await getTranslations("nav");
  const cards = t.raw("recruit.hubCards") as Card[];

  const orgLd = organizationLd(meta("siteTitle"), tCommon("address"));
  const breadcrumbLd = breadcrumbsLd(locale as Locale, "hub", {
    home: tCommon("home"),
    careers: tNav("careers"),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />
      <NoticeBar />
      <CareersNav active="hub" />
      <main className="flex-1 bg-bg">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-dark to-primary px-6 py-24 text-white lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionLabel label={t("recruit.hubTagline")} variant="light" />
            <h1 className="mt-5 whitespace-pre-line font-serif text-3xl font-semibold leading-[1.35] lg:text-5xl lg:leading-[1.25]">
              {t("recruit.hubTitle")}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-[1.95] text-white/90">
              {t("recruit.hubLead")}
            </p>
          </div>
        </section>

        {/* Hub cards */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-5 sm:grid-cols-2">
              {cards.map((card) => (
                <Link
                  key={card.key}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={(HREFS[card.key] ?? "/careers") as any}
                  className="group relative overflow-hidden rounded-lg border border-border bg-bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                >
                  <span className="text-[11px] font-medium tracking-[0.2em] text-accent-warm">
                    {card.tag}
                  </span>
                  <h2 className="mt-3 font-serif text-xl font-semibold text-primary-dark">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                    {card.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium tracking-wide text-primary transition-colors group-hover:text-accent-warm">
                    {t("recruit.hubCardCta")}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About teaser */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionLabel label="ABOUT US" />
            <h2 className="mt-4 font-serif text-2xl font-semibold text-primary-dark lg:text-3xl">
              {t("recruit.hubAboutTitle")}
            </h2>
            <p className="mt-5 text-base leading-[1.95] text-text">
              {t("recruit.hubAboutText")}
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent-warm"
            >
              {t("recruit.hubAboutCta")}
            </Link>
          </div>
        </section>

        {/* Entry CTA */}
        <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light px-6 py-20 text-center text-white lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-semibold lg:text-4xl">
              {t("applyTitle")}
            </h2>
            <p className="mx-auto mt-5 text-base leading-[1.85] opacity-90">
              {t("applyDesc")}
            </p>
            <Link
              href="/careers/entry"
              className="mt-8 inline-flex items-center gap-2 rounded bg-accent-warm px-8 py-4 text-sm font-medium tracking-wide shadow-lg shadow-accent-warm/30 transition-all hover:-translate-y-0.5 hover:bg-[#C56544]"
            >
              {t("recruit.navEntry")} →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
