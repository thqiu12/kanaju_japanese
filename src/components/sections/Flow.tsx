import { getTranslations } from "next-intl/server";
import SectionLabel from "../SectionLabel";

type Step = { num: string; when: string; what: string };

export default async function Flow() {
  const t = await getTranslations();
  const steps = t.raw("flow.steps") as Step[];

  return (
    <section id="admission" className="bg-bg-warm px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel label={t("flow.label")} />
        <h2 className="mt-4 font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-tight text-primary-dark">
          {t("flow.title")}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
          {t("flow.desc")}
        </p>

        <div className="relative mt-16">
          <div className="absolute left-[5%] right-[5%] top-8 hidden h-px bg-border lg:block" />
          <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-bg-card font-serif text-2xl font-semibold text-primary shadow-[0_4px_12px_rgba(14,160,130,0.15)]">
                  {step.num}
                </div>
                <div className="text-[11px] tracking-wide text-text-muted">
                  {step.when}
                </div>
                <div className="mt-1 whitespace-pre-line text-[13px] font-medium leading-snug text-primary-dark">
                  {step.what}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
