import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import SectionLabel from "@/components/SectionLabel";
import CareersNav from "@/components/CareersNav";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/careers/message">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.careers" });
  return { title: t("recruit.messagePageTitle"), description: t("subtitle") };
}

export default async function CareersMessagePage({
  params,
}: PageProps<"/[locale]/careers/message">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact.careers");
  const paragraphs = t.raw("recruit.messageParagraphs") as string[];

  return (
    <>
      <Header />
      <NoticeBar />
      <CareersNav active="message" />
      <main className="flex-1 bg-bg">
        <section className="bg-gradient-to-br from-primary-dark to-primary px-6 py-20 text-white lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionLabel label="MESSAGE" variant="light" />
            <h1 className="mt-4 font-serif text-3xl font-semibold lg:text-4xl">
              {t("recruit.messagePageTitle")}
            </h1>
            <p className="mt-6 text-lg leading-[1.85] text-white/90">
              {t("recruit.messagePageLead")}
            </p>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-7">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-[2] text-text first:font-medium first:text-primary-dark"
              >
                {p}
              </p>
            ))}
            <p className="whitespace-pre-line border-t border-border pt-7 text-right text-sm leading-[1.85] text-text-muted">
              {t("recruit.messageSignature")}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
