import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact.privacy");
  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg px-6 py-20 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold leading-tight text-primary-dark lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-8 leading-[1.95] text-text-muted">{t("intro")}</p>

          <div className="mt-12 space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-serif text-xl font-semibold text-primary-dark">
                  {s.title}
                </h2>
                <p className="mt-3 leading-[1.95] text-text">{s.body}</p>
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-border pt-6 text-xs text-text-light">
            {t("lastUpdated")}
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
