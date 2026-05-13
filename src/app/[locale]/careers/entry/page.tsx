import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";
import CareersNav from "@/components/CareersNav";
import ApplyByEmailButton from "@/components/ApplyByEmailButton";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/careers/entry">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.careers" });
  return { title: t("recruit.entryPageTitle"), description: t("subtitle") };
}

type Step = { num: string; title: string; desc: string };

export default async function CareersEntryPage({
  params,
}: PageProps<"/[locale]/careers/entry">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact.careers");
  const steps = t.raw("recruit.entryFlowSteps") as Step[];

  return (
    <>
      <Header />
      <NoticeBar />
      <CareersNav active="entry" />
      <main className="flex-1 bg-bg">
        <section className="bg-gradient-to-br from-primary-dark to-primary px-6 py-20 text-white lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionLabel label="ENTRY" variant="light" />
            <h1 className="mt-4 font-serif text-3xl font-semibold lg:text-4xl">
              {t("recruit.entryPageTitle")}
            </h1>
            <p className="mt-6 text-base leading-[1.85] text-white/90">
              {t("recruit.entryPageLead")}
            </p>
          </div>
        </section>

        {/* Apply CTA box */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-lg border border-border bg-bg-card p-10 text-center">
            <h2 className="font-serif text-2xl font-semibold text-primary-dark">
              {t("applyTitle")}
            </h2>
            <p className="mx-auto mt-5 text-sm leading-[1.95] text-text-muted">
              {t("applyDesc")}
            </p>
            <p className="mt-5 text-sm text-text">
              {t("applyEmailLabel")}{" "}
              <a
                href={`mailto:${t("applyEmail")}?subject=${encodeURIComponent("Career application — " + t("title"))}`}
                className="font-medium text-primary underline underline-offset-4 hover:text-accent-warm"
              >
                {t("applyEmail")}
              </a>
            </p>
            <ApplyByEmailButton
              email={t("applyEmail")}
              subject={`Career application — ${t("title")}`}
              label={t("applyButton")}
              copiedLabel={t("applyCopied")}
            />
            <p className="mx-auto mt-5 max-w-xl text-xs leading-[1.85] text-text-light">
              {t("applyHint")}
            </p>
          </div>
        </section>

        {/* Flow */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-2xl font-semibold text-primary-dark lg:text-3xl">
              {t("recruit.entryFlowTitle")}
            </h2>
            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <li
                  key={s.num}
                  className="relative rounded-lg border border-border bg-bg-card p-6"
                >
                  <span className="text-[11px] font-medium tracking-[0.2em] text-accent-warm">
                    {s.num}
                  </span>
                  <h3 className="mt-2 font-serif text-base font-semibold text-primary-dark">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.85] text-text-muted">
                    {s.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pre-application questions */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-xl font-semibold text-primary-dark">
              {t("recruit.entryQuestionsTitle")}
            </h2>
            <p className="mt-4 text-sm leading-[1.95] text-text-muted">
              {t("recruit.entryQuestionsDesc")}
            </p>
            <p className="mt-5 text-sm">
              <a
                href={`mailto:${t("applyEmail")}`}
                className="font-medium text-primary underline underline-offset-4 hover:text-accent-warm"
              >
                {t("applyEmail")}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
