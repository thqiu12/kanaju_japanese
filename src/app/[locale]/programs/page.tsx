import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/programs">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programsPage" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ProgramsPage({
  params,
}: PageProps<"/[locale]/programs">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("programsPage");

  const structure = t.raw("structure") as { head: string[]; rows: string[][] };
  const levels = t.raw("levels") as { head: string[]; rows: string[][] };
  const approach = t.raw("approach") as { title: string; desc: string }[];
  const subjects = t.raw("subjects") as {
    name: string;
    level: string;
    hours: string;
    goal: string;
    material: string;
  }[];
  const evaluation = t.raw("evaluation") as string[];
  const grades = t.raw("grades") as [string, string][];

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg">
        {/* Hero */}
        <section className="relative h-[400px] overflow-hidden bg-black">
          <Image
            src="/photos/classroom-2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/40 to-primary-dark/80" />
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 lg:px-8">
            <SectionLabel label="PROGRAMS" variant="light" />
            <h1 className="mt-4 font-serif text-4xl font-semibold text-white lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-3xl text-base text-white/85 lg:text-lg">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Structure */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("structureTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("structureIntro")}
            </p>
            <div className="mt-10 overflow-x-auto rounded border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-dark text-white">
                    {structure.head.map((h) => (
                      <th
                        key={h}
                        className="border-r border-white/20 px-4 py-3 text-left font-medium last:border-r-0"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {structure.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-bg-card" : "bg-bg-warm"}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="border-r border-border px-4 py-3 text-text last:border-r-0"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CEFR Levels */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("levelsTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("levelsIntro")}
            </p>
            <div className="mt-10 overflow-x-auto rounded border border-border bg-bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    {levels.head.map((h) => (
                      <th
                        key={h}
                        className="border-r border-white/20 px-4 py-3 text-left font-medium last:border-r-0"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {levels.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={`${i % 2 === 0 ? "bg-bg-card" : "bg-bg-warm"} ${
                        row[0] === "B2" ? "ring-1 ring-primary/30" : ""
                      }`}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`border-r border-border px-4 py-3 leading-[1.7] last:border-r-0 ${
                            j === 0
                              ? "font-serif text-base font-semibold text-primary-dark"
                              : "text-text"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("approachTitle")}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {approach.map((a) => (
                <div
                  key={a.title}
                  className="rounded-lg border border-border bg-bg-card p-6"
                >
                  <h3 className="text-base font-semibold text-primary-dark">
                    {a.title}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.85] text-text-muted">
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Subjects */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("subjectsTitle")}
            </h2>
            <div className="mt-10 space-y-5">
              {subjects.map((s) => (
                <article
                  key={s.name}
                  className="grid gap-5 rounded-lg border border-border bg-bg-card p-7 lg:grid-cols-[1fr_2fr]"
                >
                  <header>
                    <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                      {s.level}
                    </div>
                    <h3 className="mt-3 font-serif text-lg font-semibold text-primary-dark">
                      {s.name}
                    </h3>
                    <div className="mt-2 text-xs text-text-muted">{s.hours}</div>
                  </header>
                  <div>
                    <p className="text-sm leading-[1.85] text-text">{s.goal}</p>
                    <div className="mt-4 rounded bg-primary-pale px-4 py-2.5 text-xs text-primary-dark">
                      📚 {s.material}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 rounded border-l-4 border-accent-warm bg-bg-card px-6 py-4 text-sm leading-[1.85] text-text-muted">
              {t("subjectsNote")}
            </p>
          </div>
        </section>

        {/* Evaluation & Grades */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-primary-dark">
                {t("evaluationTitle")}
              </h2>
              <ul className="mt-6 space-y-2">
                {evaluation.map((e) => (
                  <li
                    key={e}
                    className="flex items-center gap-3 rounded border border-border bg-bg-card px-5 py-3 text-sm"
                  >
                    <span className="text-primary">◆</span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-primary-dark">
                {t("gradesTitle")}
              </h2>
              <div className="mt-6 overflow-hidden rounded border border-border">
                {grades.map(([g, range], i) => (
                  <div
                    key={g}
                    className={`grid grid-cols-[80px_1fr] gap-4 px-5 py-4 ${
                      i % 2 === 0 ? "bg-bg-card" : "bg-bg-warm"
                    }`}
                  >
                    <dt className="font-serif text-xl font-semibold text-primary">
                      {g}
                    </dt>
                    <dd className="self-center text-sm text-text-muted">{range}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
