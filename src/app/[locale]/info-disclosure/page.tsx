import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/info-disclosure">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "disclosure" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

type Row = [string, string];

export default async function InfoDisclosurePage({
  params,
}: PageProps<"/[locale]/info-disclosure">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("disclosure");

  const setter = t.raw("items.setter") as { title: string; rows: Row[] };
  const school = t.raw("items.school") as { title: string; rows: Row[] };
  const curriculum = t.raw("items.curriculum") as {
    title: string;
    intro: string;
    subjects: string;
    table: { head: string[]; rows: string[][] };
  };
  const people = t.raw("items.people") as { title: string; rows: Row[] };
  const fees = t.raw("items.fees") as {
    title: string;
    intro: string;
    tableTitle1: string;
    tableTitle2: string;
    firstYear: { head: string[]; rows: string[][] };
    secondYear: { head: string[]; rows: string[][] };
  };
  const regulations = t.raw("items.regulations") as {
    title: string;
    desc: string;
    link: string;
    url: string;
  };
  const features = t.raw("items.features") as {
    title: string;
    intro: string;
    body: string;
  };
  const activities = t.raw("items.activities") as {
    title: string;
    intro: string;
    seasons: { title: string; items: string }[];
    external: string;
  };
  const career = t.raw("items.career") as {
    title: string;
    intro: string;
    schools: string[];
    note: string;
  };
  const selfEvaluation = t.raw("items.selfEvaluation") as {
    title: string;
    intro: string;
    categories: string[];
    publication: string;
    link: string;
    url: string;
  };

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <header className="mb-16 border-b border-border pb-12">
            <h1 className="font-serif text-4xl font-semibold text-primary-dark lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("subtitle")}
            </p>
          </header>

          <Block id="setter" title={setter.title}>
            <RowTable rows={setter.rows} />
          </Block>

          <Block id="school" title={school.title}>
            <RowTable rows={school.rows} />
          </Block>

          <Block id="curriculum" title={curriculum.title}>
            <p className="mb-8 leading-[1.9] text-text-muted">
              {curriculum.intro}
            </p>
            <DataTable
              head={curriculum.table.head}
              rows={curriculum.table.rows}
            />
            <p className="mt-6 rounded bg-primary-pale px-5 py-4 text-sm leading-[1.85] text-primary-dark">
              {curriculum.subjects}
            </p>
          </Block>

          <Block id="people" title={people.title}>
            <RowTable rows={people.rows} />
          </Block>

          <Block id="fees" title={fees.title}>
            <p className="mb-6 text-sm leading-[1.85] text-text-muted">
              {fees.intro}
            </p>
            <h3 className="mt-8 mb-4 font-serif text-lg font-semibold text-primary-dark">
              {fees.tableTitle1}
            </h3>
            <DataTable head={fees.firstYear.head} rows={fees.firstYear.rows} />
            <h3 className="mt-8 mb-4 font-serif text-lg font-semibold text-primary-dark">
              {fees.tableTitle2}
            </h3>
            <DataTable head={fees.secondYear.head} rows={fees.secondYear.rows} />
          </Block>

          <Block id="regulations" title={regulations.title}>
            <p className="leading-[1.9] text-text-muted">{regulations.desc}</p>
            <a
              href={regulations.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded border border-primary bg-primary-pale px-6 py-3 text-sm font-medium text-primary-dark transition-colors hover:bg-primary hover:text-white"
            >
              📄 {regulations.link} →
            </a>
          </Block>

          <Block id="features" title={features.title}>
            <p className="leading-[1.9] text-text-muted">{features.intro}</p>
            <p className="mt-5 leading-[1.9] text-text-muted">{features.body}</p>
          </Block>

          <Block id="activities" title={activities.title}>
            <p className="mb-8 leading-[1.9] text-text-muted">
              {activities.intro}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {activities.seasons.map((s) => (
                <div
                  key={s.title}
                  className="rounded border border-border bg-bg-card p-5"
                >
                  <h4 className="font-serif text-base font-semibold text-primary">
                    {s.title}
                  </h4>
                  <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                    {s.items}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 rounded bg-bg-warm px-5 py-4 text-sm leading-[1.85] text-text-muted">
              {activities.external}
            </p>
          </Block>

          <Block id="career" title={career.title}>
            <p className="mb-6 leading-[1.9] text-text-muted">{career.intro}</p>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {career.schools.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2.5 rounded border border-border bg-bg-card px-4 py-3 text-sm"
                >
                  <span className="text-xs text-primary">▸</span>
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-text-light">{career.note}</p>
          </Block>

          <Block id="self-evaluation" title={selfEvaluation.title}>
            <p className="leading-[1.9] text-text-muted">
              {selfEvaluation.intro}
            </p>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {selfEvaluation.categories.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2.5 rounded border border-border bg-bg-card px-4 py-3 text-sm"
                >
                  <span className="text-xs text-primary">◆</span>
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-accent-warm/10 px-4 py-1.5 text-xs font-medium text-accent-warm">
                {selfEvaluation.publication}
              </span>
              <a
                href={selfEvaluation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-primary bg-primary-pale px-6 py-3 text-sm font-medium text-primary-dark transition-colors hover:bg-primary hover:text-white"
              >
                📄 {selfEvaluation.link} →
              </a>
            </div>
          </Block>

          <footer className="mt-16 border-t border-border pt-8 text-sm leading-[1.85] text-text-light">
            {t("footer")}
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Block({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="mb-6 font-serif text-2xl font-semibold text-primary-dark lg:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function RowTable({ rows }: { rows: Row[] }) {
  return (
    <dl className="overflow-hidden rounded border border-border">
      {rows.map(([label, value], i) => (
        <div
          key={label}
          className={`grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-6 ${
            i % 2 === 0 ? "bg-bg-card" : "bg-bg-warm"
          }`}
        >
          <dt className="font-medium text-primary-dark">{label}</dt>
          <dd className="text-text-muted">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary-dark text-white">
            {head.map((h) => (
              <th
                key={h}
                className="border-r border-white/20 px-3 py-3 text-left font-medium last:border-r-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-bg-card" : "bg-bg-warm"}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border-r border-border px-3 py-3 text-text last:border-r-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
