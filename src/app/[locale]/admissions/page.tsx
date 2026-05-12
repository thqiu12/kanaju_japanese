import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/admissions">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admissions" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function AdmissionsPage({
  params,
}: PageProps<"/[locale]/admissions">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admissions");
  const tProg = await getTranslations("programs");
  const tFees = await getTranslations("disclosure.items.fees");

  const eligibilityItems = t.raw("eligibility.items") as string[];
  const jpLevelRows = t.raw("eligibility.japaneseLevelRows") as string[][];
  const stages = t.raw("selection.stages") as {
    stage: string;
    name: string;
    method: string;
    criteria: string;
  }[];
  const applicantDocs = t.raw("documents.applicant") as string[][];
  const guarantorCases = t.raw("documents.guarantorCases") as {
    title: string;
    items: string[];
  }[];
  const notes = t.raw("documents.notes") as string[];
  const scheduleItems = t.raw("feesPage.scheduleItems") as string[];
  const methods = t.raw("feesPage.methods") as { name: string; desc: string }[];
  const refundRules = t.raw("feesPage.refundRules") as {
    case: string;
    rule: string;
  }[];
  const agencies = t.raw("agencies.list") as {
    name: string;
    address: string;
    tel: string;
    email: string;
  }[];
  const programItems = tProg.raw("items") as {
    month: string;
    name: string;
    fee: string;
  }[];
  const grandTotalTitle = tFees("grandTotalTitle");
  const grandTotalNote = tFees("grandTotalNote");
  const grandTotal = tFees.raw("grandTotal") as [string, string][];

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg">
        {/* Header banner */}
        <section className="bg-gradient-to-br from-primary-dark to-primary px-6 py-20 text-white lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionLabel label="ADMISSIONS" variant="light" />
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-white/85">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Eligibility */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("eligibility.title")}
            </h2>
            <ul className="mt-8 space-y-3">
              {eligibilityItems.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded border border-border bg-bg-card px-6 py-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-pale font-serif text-sm font-semibold text-primary-dark">
                    {i + 1}
                  </span>
                  <span className="text-text">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 mb-5 font-serif text-xl font-semibold text-primary-dark">
              {t("eligibility.japaneseLevelTitle")}
            </h3>
            <div className="overflow-hidden rounded border border-border">
              {jpLevelRows.map(([prog, level], i) => (
                <div
                  key={prog}
                  className={`grid grid-cols-1 gap-3 px-6 py-4 sm:grid-cols-[1fr_2fr] sm:gap-8 ${
                    i % 2 === 0 ? "bg-bg-card" : "bg-bg-warm"
                  }`}
                >
                  <div className="font-medium text-primary-dark">{prog}</div>
                  <div className="text-text-muted">{level}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selection 3-stage */}
        <section id="flow" className="scroll-mt-24 bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("selection.title")}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("selection.intro")}
            </p>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {stages.map((s, i) => (
                <div
                  key={s.stage}
                  className="rounded-lg border border-border bg-bg-card p-7"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-serif text-base font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-primary">
                      {s.stage}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-dark">
                    {s.name}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.85] text-text-muted">
                    {s.method}
                  </p>
                  <div className="mt-5 rounded bg-primary-pale px-4 py-3 text-xs leading-[1.7] text-primary-dark">
                    {s.criteria}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("documents.title")}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("documents.intro")}
            </p>

            <h3 className="mt-10 mb-5 font-serif text-xl font-semibold text-primary-dark">
              {t("documents.applicantTitle")}
            </h3>
            <div className="overflow-hidden rounded border border-border">
              {applicantDocs.map(([name, note], i) => (
                <div
                  key={name}
                  className={`grid grid-cols-1 gap-3 px-6 py-4 sm:grid-cols-[200px_1fr] sm:gap-8 ${
                    i % 2 === 0 ? "bg-bg-card" : "bg-bg-warm"
                  }`}
                >
                  <div className="font-medium text-primary-dark">
                    {i + 1}. {name}
                  </div>
                  <div className="text-sm text-text-muted">{note}</div>
                </div>
              ))}
            </div>

            <h3 className="mt-12 mb-5 font-serif text-xl font-semibold text-primary-dark">
              {t("documents.guarantorTitle")}
            </h3>
            <div className="grid gap-5 lg:grid-cols-3">
              {guarantorCases.map((c) => (
                <div
                  key={c.title}
                  className="rounded border border-border bg-bg-card p-6"
                >
                  <h4 className="text-base font-semibold text-primary-dark">
                    {c.title}
                  </h4>
                  <ul className="mt-4 space-y-2 text-sm text-text-muted">
                    {c.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 leading-[1.7] before:mt-2 before:block before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-primary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded border-l-4 border-accent-warm bg-bg-warm px-6 py-5">
              <h4 className="font-semibold text-text">Notes / 注意事項</h4>
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                {notes.map((n) => (
                  <li key={n}>· {n}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Fees & Payment */}
        <section id="fees" className="scroll-mt-24 bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("feesPage.title")}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("feesPage.intro")}
            </p>

            {/* First-year fees mini */}
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {programItems.map((p) => (
                <div
                  key={p.month}
                  className="rounded border border-border bg-bg-card p-6 text-center"
                >
                  <div className="text-xs uppercase tracking-[0.15em] text-text-muted">
                    {p.month} · ENTRY
                  </div>
                  <div className="mt-2 text-base font-medium text-primary-dark">
                    {p.name}
                  </div>
                  <div className="mt-4 font-serif text-3xl font-semibold text-primary">
                    ¥{p.fee}
                  </div>
                  <div className="mt-1 text-[11px] text-text-muted">
                    {tFees("tableTitle1")}
                  </div>
                </div>
              ))}
            </div>

            {/* Grand total (full duration) */}
            <h3 className="mt-12 mb-3 font-serif text-xl font-semibold text-primary-dark">
              {grandTotalTitle}
            </h3>
            <p className="mb-5 text-sm text-text-muted">{grandTotalNote}</p>
            <div className="overflow-hidden rounded-lg border-2 border-primary bg-gradient-to-br from-primary-pale to-bg-card">
              {grandTotal.map(([course, amount], i) => (
                <div
                  key={course}
                  className={`grid grid-cols-1 gap-3 px-6 py-5 sm:grid-cols-[1.4fr_1fr] sm:items-baseline ${
                    i === grandTotal.length - 1
                      ? ""
                      : "border-b border-primary/20"
                  }`}
                >
                  <div className="font-medium text-primary-dark">{course}</div>
                  <div className="font-serif text-2xl font-semibold text-primary-dark sm:text-right">
                    ¥{amount}
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule */}
            <h3 className="mt-12 mb-5 font-serif text-xl font-semibold text-primary-dark">
              {t("feesPage.scheduleTitle")}
            </h3>
            <ul className="space-y-3">
              {scheduleItems.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded border border-border bg-bg-card px-6 py-4 text-sm text-text"
                >
                  <span className="font-serif text-primary">▸</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Methods */}
            <h3 className="mt-12 mb-5 font-serif text-xl font-semibold text-primary-dark">
              {t("feesPage.methodsTitle")}
            </h3>
            <div className="grid gap-5 md:grid-cols-3">
              {methods.map((m) => (
                <div
                  key={m.name}
                  className="rounded border border-border bg-bg-card p-6"
                >
                  <h4 className="text-base font-semibold text-primary-dark">
                    {m.name}
                  </h4>
                  <p className="mt-3 text-sm leading-[1.8] text-text-muted">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Refund */}
            <h3 className="mt-12 mb-3 font-serif text-xl font-semibold text-primary-dark">
              {t("feesPage.refundTitle")}
            </h3>
            <p className="mb-6 text-sm text-text-muted">
              {t("feesPage.refundIntro")}
            </p>
            <div className="overflow-hidden rounded border border-border">
              {refundRules.map((r, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-1 gap-3 px-6 py-4 sm:grid-cols-[1fr_2fr] sm:gap-8 ${
                    i % 2 === 0 ? "bg-bg-card" : "bg-bg-warm"
                  }`}
                >
                  <div className="text-sm font-medium text-primary-dark">
                    {r.case}
                  </div>
                  <div className="text-sm leading-[1.8] text-text-muted">
                    {r.rule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agencies */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("agencies.title")}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("agencies.intro")}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {agencies.map((a) => (
                <div
                  key={a.name}
                  className="rounded border border-border bg-bg-card p-6"
                >
                  <h4 className="text-base font-semibold text-primary-dark">
                    {a.name}
                  </h4>
                  <div className="mt-3 space-y-1 text-sm text-text-muted">
                    <div>📍 {a.address}</div>
                    <div>📞 {a.tel}</div>
                    {a.email && (
                      <div className="break-all">✉ {a.email}</div>
                    )}
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
