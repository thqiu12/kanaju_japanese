import { getTranslations } from "next-intl/server";
import SectionLabel from "../SectionLabel";
import GoogleMap from "../GoogleMap";

export default async function Access() {
  const t = await getTranslations();
  const rows = t.raw("access.rows") as {
    address: string;
    addressValue: string;
    access: string;
    accessValue: string;
    tel: string;
    fax: string;
    email: string;
  };

  return (
    <section id="contact" className="grid bg-bg-card lg:grid-cols-2">
      <div className="px-8 py-24 lg:px-16">
        <SectionLabel label={t("access.label")} />
        <h2 className="mt-4 font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-tight text-primary-dark">
          {t("access.title")}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-[1.9] text-text-muted">
          {t("access.desc")}
        </p>

        <dl className="mt-10 space-y-4">
          <Row label={rows.address} value={rows.addressValue} />
          <Row label={rows.access} value={rows.accessValue} />
          <Row label={rows.tel} value={t("common.tel")} />
          <Row label={rows.fax} value={t("common.fax")} />
          <Row label={rows.email} value={t("common.email")} last />
        </dl>
      </div>
      <div className="min-h-[480px] bg-bg-warm">
        <GoogleMap className="h-full min-h-[480px]" title={t("access.title")} />
      </div>
    </section>
  );
}

function Row({
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
      className={`flex gap-6 py-4 text-sm ${last ? "" : "border-b border-border"}`}
    >
      <dt className="min-w-[100px] font-medium text-primary-dark">{label}</dt>
      <dd className="whitespace-pre-line text-text-muted">{value}</dd>
    </div>
  );
}
