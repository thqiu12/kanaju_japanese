import { getTranslations } from "next-intl/server";
import SectionLabel from "../SectionLabel";

type Item = {
  month: string;
  name: string;
  nameEn: string;
  duration: string;
  entryLevel: string;
  exitLevel: string;
  capacity: string;
  fee: string;
};

export default async function Programs() {
  const t = await getTranslations();
  const items = t.raw("programs.items") as Item[];
  const labels = t.raw("programs.labels") as {
    entryMonth: string;
    duration: string;
    entryLevel: string;
    exitLevel: string;
    capacity: string;
    firstYearFee: string;
    taxIncluded: string;
  };

  return (
    <section id="programs" className="bg-bg-warm px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel label={t("programs.label")} />
        <h2 className="mt-4 font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-tight text-primary-dark">
          {t("programs.title")}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
          {t("programs.desc")}
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.month}
              className="overflow-hidden rounded-lg border border-border bg-bg-card transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(14,160,130,0.12)]"
            >
              <div className="bg-primary-dark p-7 text-white">
                <div className="text-[11px] tracking-[0.2em] text-white/70">
                  {labels.entryMonth}
                </div>
                <div className="mt-1 font-serif text-5xl font-semibold leading-none text-gold">
                  {item.month}
                </div>
                <div className="mt-5 text-lg font-semibold">{item.name}</div>
                <div className="mt-1 text-xs font-light tracking-wide text-white/70">
                  {item.nameEn}
                </div>
              </div>
              <div className="p-7">
                <ProgramRow label={labels.duration} value={item.duration} />
                <ProgramRow label={labels.entryLevel} value={item.entryLevel} />
                <ProgramRow label={labels.exitLevel} value={item.exitLevel} />
                <ProgramRow
                  label={labels.capacity}
                  value={item.capacity}
                  last
                />
                <div className="mt-5 flex items-baseline justify-between rounded bg-bg-warm p-4">
                  <span className="text-xs text-text-muted">
                    {labels.firstYearFee}
                  </span>
                  <span className="font-serif text-2xl font-semibold text-primary-dark">
                    ¥{item.fee}{" "}
                    <span className="text-xs font-normal text-text-muted">
                      {labels.taxIncluded}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex justify-between py-3.5 text-sm ${last ? "" : "border-b border-dashed border-border"}`}
    >
      <span className="text-text-muted">{label}</span>
      <span className="font-medium text-text">{value}</span>
    </div>
  );
}
