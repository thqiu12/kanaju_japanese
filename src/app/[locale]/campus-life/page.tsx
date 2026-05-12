import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/campus-life">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "campusLife" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function CampusLifePage({
  params,
}: PageProps<"/[locale]/campus-life">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("campusLife");

  const seasons = t.raw("seasons") as {
    season: string;
    title: string;
    items: string[];
  }[];
  const community = t.raw("community") as string[];
  const support = t.raw("support") as { title: string; desc: string }[];
  const facilities = t.raw("facilities") as { name: string; desc: string }[];

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg">
        {/* Hero */}
        <section className="relative h-[420px] overflow-hidden bg-black">
          <Image
            src="/photos/entrance-ceremony.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/40 to-primary-dark/85" />
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 lg:px-8">
            <SectionLabel label="CAMPUS LIFE" variant="light" />
            <h1 className="mt-4 font-serif text-4xl font-semibold text-white lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-3xl text-base text-white/85 lg:text-lg">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Annual events / 4 seasons */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("annualTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("annualIntro")}
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {seasons.map((s) => (
                <div
                  key={s.season}
                  className="relative overflow-hidden rounded-lg border border-border bg-gradient-to-br from-primary-pale to-bg-card p-7 transition-shadow hover:shadow-[0_8px_24px_rgba(14,160,130,0.1)]"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-primary">
                    {s.title}
                  </div>
                  <h3 className="mt-2 font-serif text-3xl font-semibold text-primary-dark">
                    {s.season}
                  </h3>
                  <ul className="mt-6 space-y-2.5">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-[1.7] text-text before:mt-2 before:block before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-primary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-primary-dark">
                {t("communityTitle")}
              </h2>
              <p className="mt-6 text-base leading-[1.9] text-text-muted">
                {t("communityIntro")}
              </p>
            </div>
            <ul className="space-y-3">
              {community.map((c, i) => (
                <li
                  key={c}
                  className="flex items-center gap-4 rounded border border-border bg-bg-card px-6 py-4 text-text"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-pale font-serif text-sm font-semibold text-primary-dark">
                    {i + 1}
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Support */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("supportTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("supportIntro")}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {support.map((s) => (
                <div
                  key={s.title}
                  className="rounded-lg border border-border bg-bg-card p-6 transition-all hover:border-primary hover:shadow-[0_8px_24px_rgba(14,160,130,0.1)]"
                >
                  <h3 className="flex items-center gap-3 text-base font-semibold text-primary-dark before:block before:h-px before:w-6 before:bg-primary">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("facilitiesTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("facilitiesIntro")}
            </p>

            <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {facilities.map((f) => (
                  <li
                    key={f.name}
                    className="rounded border border-border bg-bg-card p-5"
                  >
                    <div className="flex items-center gap-2 font-medium text-primary-dark">
                      <span className="text-primary">◆</span>
                      {f.name}
                    </div>
                    <div className="mt-2 text-xs leading-[1.65] text-text-muted">
                      {f.desc}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <div className="relative h-[220px] overflow-hidden rounded-lg">
                  <Image
                    src="/photos/classroom-3.jpg"
                    alt=""
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-[220px] overflow-hidden rounded-lg">
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
