import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";
import GoogleMap from "@/components/GoogleMap";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");
  const tAccess = await getTranslations("access");

  const channels = t.raw("channels") as {
    name: string;
    value: string;
    desc: string;
  }[];
  const officeHours = t.raw("officeHours") as [string, string][];

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg">
        <section className="bg-gradient-to-br from-primary-dark to-primary px-6 py-20 text-white lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionLabel label="CONTACT" variant="light" />
            <h1 className="mt-4 font-serif text-4xl font-semibold lg:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-[1.9] text-white/85">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Channels */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("channelsTitle")}
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {channels.map((c) => (
                <div
                  key={c.name}
                  className="rounded-lg border border-border bg-bg-card p-7 transition-shadow hover:shadow-lg"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-primary">
                    {c.name}
                  </div>
                  <div className="mt-3 break-all font-serif text-xl font-semibold text-primary-dark">
                    {c.value}
                  </div>
                  <div className="mt-3 text-sm leading-[1.7] text-text-muted">
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="rounded-lg border-l-4 border-accent-warm bg-bg-warm px-6 py-5">
                <p className="text-sm leading-[1.85] text-text">
                  🌐 {t("langNote")}
                </p>
              </div>
              <div className="rounded-lg border-l-4 border-primary bg-primary-pale px-6 py-5">
                <p className="text-sm leading-[1.85] text-primary-dark">
                  📋 {t("agencyNote")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Office hours + Address */}
        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-primary-dark">
                {t("officeHoursTitle")}
              </h2>
              <div className="mt-6 overflow-hidden rounded border border-border bg-bg-card">
                {officeHours.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid grid-cols-[1fr_1fr] gap-4 px-5 py-4 ${
                      i === officeHours.length - 1 ? "" : "border-b border-border"
                    }`}
                  >
                    <dt className="font-medium text-primary-dark">{k}</dt>
                    <dd className="text-text-muted">{v}</dd>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-primary-dark">
                {tAccess("rows.address")}
              </h2>
              <p className="mt-6 whitespace-pre-line rounded border border-border bg-bg-card px-5 py-4 text-text-muted">
                {tCommon("address")}
              </p>
              <p className="mt-4 whitespace-pre-line rounded border border-border bg-bg-card px-5 py-4 text-sm text-text-muted">
                {tAccess("rows.accessValue")}
              </p>
            </div>
          </div>
        </section>

        {/* Inquiry form */}
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-semibold text-primary-dark">
              {t("form.title")}
            </h2>
            <p className="mt-4 text-base leading-[1.85] text-text-muted">
              {t("form.intro")}
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Google Map */}
        <section className="h-[480px]">
          <GoogleMap className="h-full" title={tAccess("title")} />
        </section>
      </main>
      <Footer />
    </>
  );
}
