import { setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import Hero from "@/components/sections/Hero";
import StrongPoints from "@/components/sections/StrongPoints";
import Programs from "@/components/sections/Programs";
import Education from "@/components/sections/Education";
import LifeSupport from "@/components/sections/LifeSupport";
import Career from "@/components/sections/Career";
import Flow from "@/components/sections/Flow";
import Gallery from "@/components/sections/Gallery";
import Access from "@/components/sections/Access";
import CTA from "@/components/sections/CTA";
import NewsHome from "@/components/sections/NewsHome";
import { routing } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = (routing.locales as readonly string[]).includes(locale)
    ? (locale as (typeof routing.locales)[number])
    : routing.defaultLocale;

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1">
        <Hero />
        <NewsHome locale={typedLocale} />
        <StrongPoints />
        <Programs />
        <Education />
        <LifeSupport />
        <Career />
        <Flow />
        <Gallery />
        <Access />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
