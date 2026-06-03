import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import PageHero from "@/components/PageHero";
import FacultyGrid from "@/components/FacultyGrid";
import FacultyTeam from "@/components/FacultyTeam";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about/faculty">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faculty" });
  return buildPageMetadata({ locale: locale as Locale, path: "/about/faculty", title: t("pageTitle"), description: t("pageSubtitle") });
}

export default async function FacultyPage({
  params,
}: PageProps<"/[locale]/about/faculty">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faculty");
  const tAbout = await getTranslations("about");

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg">
        <PageHero
          label="FACULTY"
          title={t("pageTitle")}
          subtitle={t("pageSubtitle")}
          image="/photos/classroom-1.jpg"
        />

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("introLead")}
            </p>
            <div className="mt-10">
              <FacultyGrid />
            </div>
          </div>
        </section>

        <section className="bg-bg-warm px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-2xl font-semibold text-primary-dark lg:text-3xl">
              {t("teamTitle")}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-[1.9] text-text-muted">
              {t("teamLead")}
            </p>
            <div className="mt-10">
              <FacultyTeam />
            </div>

            <div className="mt-12">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent-warm"
              >
                ← {tAbout("title")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
