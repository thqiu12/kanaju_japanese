import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";
import CareersNav from "@/components/CareersNav";
import type { Locale } from "@/i18n/routing";
import { buildCareersMetadata, breadcrumbsLd } from "@/lib/careers-seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/careers/interview">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.careers" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  return buildCareersMetadata({
    locale: locale as Locale,
    sub: "interview",
    title: t("recruit.interviewPageTitle"),
    description: t("recruit.interviewPageLead"),
    siteTitle: meta("siteTitle"),
  });
}

type Placeholder = { role: string; timing: string };

export default async function CareersInterviewPage({
  params,
}: PageProps<"/[locale]/careers/interview">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact.careers");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const placeholders = t.raw("recruit.interviewPlaceholders") as Placeholder[];

  const breadcrumbLd = breadcrumbsLd(locale as Locale, "interview", {
    home: tCommon("home"),
    careers: tNav("careers"),
    current: t("recruit.navInterview"),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />
      <NoticeBar />
      <CareersNav active="interview" />
      <main className="flex-1 bg-bg">
        <section className="bg-gradient-to-br from-primary-dark to-primary px-6 py-20 text-white lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionLabel label="INTERVIEW" variant="light" />
            <h1 className="mt-4 font-serif text-3xl font-semibold lg:text-4xl">
              {t("recruit.interviewPageTitle")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[1.85] text-white/90">
              {t("recruit.interviewPageLead")}
            </p>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-lg border border-dashed border-border bg-bg-card p-10 text-center">
              <span className="inline-block rounded-full bg-primary-pale px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-primary-dark">
                {t("recruit.interviewComingSoonTag")}
              </span>
              <h2 className="mt-5 font-serif text-2xl font-semibold text-primary-dark">
                {t("recruit.interviewComingSoonTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-[1.95] text-text-muted">
                {t("recruit.interviewComingSoonDesc")}
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {placeholders.map((p, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border border-border bg-bg-card"
                  aria-hidden="true"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary-pale to-bg-warm">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-7xl text-primary/15">
                        #{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-medium tracking-[0.15em] text-text-light">
                      {p.timing}
                    </span>
                    <h3 className="mt-2 text-base font-medium text-primary-dark/60">
                      {p.role}
                    </h3>
                    <div className="mt-3 h-3 w-2/3 rounded bg-bg-warm" />
                    <div className="mt-2 h-3 w-5/6 rounded bg-bg-warm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
