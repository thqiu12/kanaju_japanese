import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";
import CareersNav from "@/components/CareersNav";
import FacultyGrid from "@/components/FacultyGrid";
import FacultyTeam from "@/components/FacultyTeam";
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

export default async function CareersInterviewPage({
  params,
}: PageProps<"/[locale]/careers/interview">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact.careers");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const tFaculty = await getTranslations("faculty");

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
            <h2 className="font-serif text-2xl font-semibold text-primary-dark">
              {tFaculty("introTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-[1.9] text-text-muted">
              {tFaculty("introLead")}
            </p>
            <div className="mt-10">
              <FacultyGrid />
            </div>

            <h2 className="mt-16 font-serif text-2xl font-semibold text-primary-dark">
              {tFaculty("teamTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-[1.9] text-text-muted">
              {tFaculty("teamLead")}
            </p>
            <div className="mt-10">
              <FacultyTeam />
            </div>

            <div className="mt-16 rounded-lg border border-dashed border-border bg-bg-card p-10 text-center">
              <span className="inline-block rounded-full bg-primary-pale px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] text-primary-dark">
                {t("recruit.interviewComingSoonTag")}
              </span>
              <h3 className="mt-5 font-serif text-2xl font-semibold text-primary-dark">
                {t("recruit.interviewComingSoonTitle")}
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-[1.95] text-text-muted">
                {t("recruit.interviewComingSoonDesc")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
