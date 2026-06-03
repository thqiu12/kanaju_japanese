import Image from "next/image";
import { getTranslations } from "next-intl/server";
import SectionLabel from "../SectionLabel";

export default async function Gallery() {
  const t = await getTranslations();
  const captions = t.raw("gallery.captions") as {
    ceremony: string;
    interview: string;
    admission: string;
    classroom: string;
    entrance: string;
  };

  const tiles = [
    { src: "/photos/entrance-ceremony.jpg", caption: captions.ceremony, big: true },
    { src: "/photos/interview-practice.jpg", caption: captions.interview },
    { src: "/photos/admission-day.jpg", caption: captions.admission },
    { src: "/photos/classroom-2.jpg", caption: captions.classroom },
    { src: "/photos/building-entrance.jpg", caption: captions.entrance },
  ];

  return (
    <section id="gallery" className="bg-bg px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel label={t("gallery.label")} />
        <h2 className="mt-4 font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-tight text-primary-dark">
          {t("gallery.title")}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
          {t("gallery.desc")}
        </p>

        <div className="mt-12 grid h-auto gap-3 lg:h-[520px] lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-2">
          {tiles.map((tile, i) => (
            <div
              key={tile.src}
              className={`relative h-[200px] overflow-hidden rounded ${
                tile.big ? "lg:h-auto lg:row-span-2" : "lg:h-auto"
              }`}
            >
              <Image
                src={tile.src}
                alt={tile.caption}
                fill
                sizes={tile.big ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 100vw"}
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-xs tracking-wide text-white">
                {tile.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
