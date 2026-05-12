import Image from "next/image";
import { getTranslations } from "next-intl/server";
import SectionLabel from "../SectionLabel";

type Item = { num: string; title: string; desc: string };

export default async function StrongPoints() {
  const t = await getTranslations();
  const items = t.raw("strongPoints.items") as Item[];

  return (
    <section id="about" className="bg-bg px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel label={t("strongPoints.label")} />
        <h2 className="mt-4 font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-tight text-primary-dark">
          {t("strongPoints.title")}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
          {t("strongPoints.desc")}
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const isCert = i === 0;
            return (
              <div
                key={item.num}
                className="group rounded-lg border border-border bg-bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-[0_12px_32px_rgba(14,160,130,0.12)]"
              >
                <div className="font-serif text-sm font-medium tracking-[0.2em] text-primary">
                  {item.num} / FOUR REASONS
                </div>
                <div
                  className={
                    isCert
                      ? "mt-6 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-white p-1.5"
                      : "mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary-pale text-2xl font-semibold text-primary-dark"
                  }
                >
                  {isCert ? (
                    <Image
                      src="/cert/mark-symbol.png"
                      alt=""
                      width={48}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  ) : i === 1 ? (
                    "学"
                  ) : i === 2 ? (
                    "医"
                  ) : (
                    "語"
                  )}
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-snug text-primary-dark whitespace-pre-line">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-text-muted">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
