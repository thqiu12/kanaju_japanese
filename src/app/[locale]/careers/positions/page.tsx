import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";
import CareersNav from "@/components/CareersNav";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/careers/positions">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.careers" });
  return { title: t("recruit.positionsPageTitle"), description: t("subtitle") };
}

type Why = { title: string; desc: string };
type Position = {
  name: string;
  type: string;
  deadline: string;
  desc: string;
  requirements: string[];
};
type Row = [string, string];

export default async function CareersPositionsPage({
  params,
}: PageProps<"/[locale]/careers/positions">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact.careers");

  const whyItems = t.raw("whyItems") as Why[];
  const positions = t.raw("positions") as Position[];
  const commonRows = t.raw("commonRows") as Row[];

  return (
    <>
      <Header />
      <NoticeBar />
      <CareersNav active="positions" />
      <main className="flex-1 bg-bg">
        <section className="bg-gradient-to-br from-primary-dark to-primary px-6 py-20 text-white lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionLabel label="POSITIONS" variant="light" />
            <h1 className="mt-4 font-serif text-3xl font-semibold lg:text-4xl">
              {t("recruit.positionsPageTitle")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-[1.85] text-white/90">
              {t("recruit.positionsPageLead")}
            </p>
          </div>
        </section>

        {/* Why work here */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("whyTitle")}
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {whyItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border bg-bg-card p-6"
                >
                  <h3 className="text-base font-semibold text-primary-dark">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Positions */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("positionsTitle")}
            </h2>
            <div className="mt-10 space-y-5">
              {positions.map((p) => (
                <article
                  key={p.name}
                  className="rounded-lg border border-border bg-bg-card p-7"
                >
                  <header className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-serif text-xl font-semibold text-primary-dark">
                      {p.name}
                    </h3>
                    <span className="rounded-full bg-primary-pale px-3 py-1 text-xs font-medium text-primary-dark">
                      {p.type}
                    </span>
                    <span className="text-xs text-text-muted">
                      {p.deadline}
                    </span>
                  </header>
                  <p className="mt-4 text-sm leading-[1.85] text-text">
                    {p.desc}
                  </p>
                  <h4 className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Requirements
                  </h4>
                  <ul className="space-y-1.5">
                    {p.requirements.map((r) => (
                      <li
                        key={r}
                        className="flex gap-2 text-sm leading-[1.7] text-text-muted before:mt-2.5 before:block before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-primary"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Common conditions */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-primary-dark">
              {t("commonTitle")}
            </h2>
            <dl className="mt-8 overflow-hidden rounded border border-border">
              {commonRows.map(([k, v], i) => (
                <div
                  key={k}
                  className={`grid grid-cols-1 gap-3 px-5 py-4 sm:grid-cols-[160px_1fr] sm:gap-6 ${
                    i % 2 === 0 ? "bg-bg-card" : "bg-bg-warm"
                  }`}
                >
                  <dt className="font-medium text-primary-dark">{k}</dt>
                  <dd className="text-sm text-text-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 text-center">
              <Link
                href="/careers/entry"
                className="inline-flex items-center gap-2 rounded bg-accent-warm px-8 py-4 text-sm font-medium text-white tracking-wide shadow-lg shadow-accent-warm/30 transition-all hover:-translate-y-0.5 hover:bg-[#C56544]"
              >
                {t("recruit.navEntry")} →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
