import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CTA() {
  const t = await getTranslations();
  return (
    <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light px-6 py-24 text-center text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-tight">
          {t("cta.title")}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base opacity-85">
          {t("cta.desc")}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-accent-warm px-8 py-4 text-sm font-medium tracking-wide shadow-lg shadow-accent-warm/40 transition-all hover:-translate-y-0.5 hover:bg-[#C56544]"
          >
            {t("cta.primary")} →
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded border border-white/40 px-8 py-4 text-sm font-medium tracking-wide transition-colors hover:bg-white/10"
          >
            {t("cta.secondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
