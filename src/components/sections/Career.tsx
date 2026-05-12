import { getTranslations } from "next-intl/server";
import SectionLabel from "../SectionLabel";

export default async function Career() {
  const t = await getTranslations();
  const schools = t.raw("career.schools") as string[];

  return (
    <section id="career" className="bg-bg px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel label={t("career.label")} />
        <h2 className="mt-4 font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-tight text-primary-dark">
          {t("career.title")}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
          {t("career.desc")}
        </p>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((s) => (
            <li
              key={s}
              className="flex items-center gap-2.5 rounded border border-border bg-bg-card px-5 py-4 text-sm transition-colors hover:border-primary hover:bg-primary-pale"
            >
              <span className="text-xs text-primary">▸</span>
              {s}
            </li>
          ))}
          <li className="flex items-center gap-2.5 rounded border border-primary/30 bg-primary-pale px-5 py-4 text-sm font-medium text-primary-dark">
            <span className="text-xs">→</span>
            {t("career.more")}
          </li>
        </ul>
      </div>
    </section>
  );
}
