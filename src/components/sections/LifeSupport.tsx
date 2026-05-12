import { getTranslations } from "next-intl/server";
import SectionLabel from "../SectionLabel";

type Item = { title: string; desc: string };

export default async function LifeSupport() {
  const t = await getTranslations();
  const items = t.raw("lifeSupport.items") as Item[];

  return (
    <section
      id="life"
      className="bg-gradient-to-br from-primary-dark to-primary px-6 py-24 text-white lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel label={t("lifeSupport.label")} variant="light" />
        <h2 className="mt-4 font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-tight">
          {t("lifeSupport.title")}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.9] text-white/78">
          {t("lifeSupport.desc")}
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-8 transition-colors hover:border-gold hover:bg-white/[0.08]"
            >
              <h4 className="mb-4 flex items-center gap-3 text-lg font-semibold before:block before:h-px before:w-8 before:bg-gold">
                {item.title}
              </h4>
              <p className="text-sm leading-[1.9] text-white/75">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
