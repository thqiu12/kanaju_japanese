import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("subtitle") };
}

type Row = [string, string];

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const purposes = t.raw("purposes") as { title: string; items: string[] }[];
  const goals = t.raw("goals") as string[];
  const operatorRows = t.raw("operatorRows") as Row[];
  const history = t.raw("history") as { year: string; event: string }[];
  const facultyRows = t.raw("facultyRows") as Row[];
  const facilities = t.raw("facilities") as string[];

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg">
        {/* Hero */}
        <section className="relative h-[420px] overflow-hidden bg-black">
          <Image
            src="/photos/principal-speech.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/40 to-primary-dark/80" />
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 lg:px-8">
            <SectionLabel label="ABOUT" variant="light" />
            <h1 className="mt-4 font-serif text-4xl font-semibold text-white lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/85 lg:text-lg">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section id="philosophy" className="scroll-mt-24 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionLabel label="EDUCATIONAL PHILOSOPHY" />
            <h2 className="mt-4 font-serif text-3xl font-semibold text-primary-dark">
              {t("philosophyTitle")}
            </h2>
            <p className="mt-6 rounded-lg border-l-4 border-primary bg-primary-pale px-7 py-6 text-base leading-[1.95] text-text">
              {t("philosophy")}
            </p>
          </div>
        </section>

        {/* Purposes */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("purposeTitle")}
            </h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {purposes.map((p) => (
                <div
                  key={p.title}
                  className="rounded-lg border border-border bg-bg-card p-7"
                >
                  <h3 className="text-lg font-semibold text-primary-dark">
                    {p.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {p.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-[1.85] text-text-muted before:mt-2.5 before:block before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-primary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="mt-16 mb-6 font-serif text-2xl font-semibold text-primary-dark">
              {t("goalTitle")}
            </h3>
            <ul className="space-y-3">
              {goals.map((g, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded border border-border bg-bg-card px-6 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="leading-[1.8] text-text">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionLabel label="WHAT MAKES US DIFFERENT" />
            <h2 className="mt-4 font-serif text-3xl font-semibold text-primary-dark">
              {t("featuresTitle")}
            </h2>
            <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-5 text-base leading-[1.95] text-text-muted whitespace-pre-line">
                {t("featuresBody")}
              </div>
              <div className="relative h-[420px] overflow-hidden rounded-lg">
                <Image
                  src="/photos/dojo.jpg"
                  alt=""
                  fill
                  sizes="(min-width:1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Operator + History */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div id="operator" className="scroll-mt-24">
              <h2 className="font-serif text-2xl font-semibold text-primary-dark">
                {t("operatorTitle")}
              </h2>
              <div className="mt-6 overflow-hidden rounded border border-border bg-bg-card">
                {operatorRows.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid grid-cols-[120px_1fr] gap-6 px-5 py-4 ${
                      i === operatorRows.length - 1 ? "" : "border-b border-border"
                    }`}
                  >
                    <dt className="text-sm font-medium text-primary-dark">{k}</dt>
                    <dd className="text-sm text-text-muted">{v}</dd>
                  </div>
                ))}
              </div>
            </div>

            <div id="history" className="scroll-mt-24">
              <h2 className="font-serif text-2xl font-semibold text-primary-dark">
                {t("historyTitle")}
              </h2>
              <ol className="mt-6 space-y-5">
                {history.map((h) => (
                  <li
                    key={h.year}
                    className="relative border-l-2 border-primary pl-6 before:absolute before:-left-[7px] before:top-1.5 before:block before:h-3 before:w-3 before:rounded-full before:bg-primary"
                  >
                    <div className="font-serif text-sm font-semibold text-primary">
                      {h.year}
                    </div>
                    <div className="mt-1 text-sm leading-[1.7] text-text">
                      {h.event}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Faculty */}
        <section id="faculty" className="scroll-mt-24 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("facultyTitle")}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {facultyRows.map(([role, count]) => (
                <div
                  key={role}
                  className="rounded border border-border bg-bg-card p-5"
                >
                  <div className="text-xs uppercase tracking-wide text-text-muted">
                    {role}
                  </div>
                  <div className="mt-1 font-serif text-2xl font-semibold text-primary-dark">
                    {count}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded border-l-4 border-accent-warm bg-bg-warm px-6 py-5 text-sm leading-[1.85] text-text">
              {t("facultyNote")}
            </p>
          </div>
        </section>

        {/* Facilities */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("facilitiesTitle")}
            </h2>
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {facilities.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 rounded border border-border bg-bg-card px-5 py-4 text-sm"
                  >
                    <span className="text-primary">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="relative h-[360px] overflow-hidden rounded-lg">
                <Image
                  src="/photos/classroom-4.jpg"
                  alt=""
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
