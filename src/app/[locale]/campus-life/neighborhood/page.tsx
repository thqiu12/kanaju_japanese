import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBar from "@/components/NoticeBar";
import PageHero from "@/components/PageHero";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/campus-life/neighborhood">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "campusLife" });
  return buildPageMetadata({ locale: locale as Locale, path: "/campus-life/neighborhood", title: t("nbGalleryTitle"), description: t("nbGallerySubtitle") });
}

const STATION = Array.from(
  { length: 24 },
  (_, i) => `/photos/neighborhood/gallery/station-${String(i + 1).padStart(2, "0")}.jpg`,
);
const AREA = Array.from(
  { length: 26 },
  (_, i) => `/photos/neighborhood/gallery/area-${String(i + 1).padStart(2, "0")}.jpg`,
);

function PhotoGrid({ photos }: { photos: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {photos.map((src) => (
        <div
          key={src}
          className="relative aspect-[4/3] overflow-hidden rounded-lg bg-bg-warm"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

export default async function NeighborhoodGalleryPage({
  params,
}: PageProps<"/[locale]/campus-life/neighborhood">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("campusLife");

  return (
    <>
      <Header />
      <NoticeBar />
      <main className="flex-1 bg-bg">
        <PageHero
          label="NEIGHBORHOOD"
          title={t("nbGalleryTitle")}
          subtitle={t("nbGallerySubtitle")}
          image="/photos/neighborhood/station-rotary.jpg"
        />

        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-2xl font-semibold text-primary-dark lg:text-3xl">
              {t("nbStationTitle")}
            </h2>
            <div className="mt-8">
              <PhotoGrid photos={STATION} />
            </div>

            <h2 className="mt-16 font-serif text-2xl font-semibold text-primary-dark lg:text-3xl">
              {t("nbAreaTitle")}
            </h2>
            <div className="mt-8">
              <PhotoGrid photos={AREA} />
            </div>

            <div className="mt-14">
              <Link
                href="/campus-life"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent-warm"
              >
                ← {t("nbBack")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
