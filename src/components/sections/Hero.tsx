import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Hero() {
  const t = await getTranslations();
  return (
    <section className="relative min-h-[640px] h-[92vh] overflow-hidden bg-black">
      <Image
        src="/photos/building-exterior.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover brightness-[0.55]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/35 to-primary-dark/80" />

      <div className="absolute right-3 top-3 z-10 rounded-md bg-white/95 p-2 shadow-xl backdrop-blur sm:right-5 sm:top-5 sm:p-2.5 lg:right-8 lg:top-8 lg:p-3">
        <Image
          src="/cert/mark-full.jpg"
          alt="文部科学省 認定日本語教育機関 / Nationally Accredited Japanese language educational institutions for Study in Japan"
          width={1041}
          height={954}
          priority
          className="h-20 w-auto sm:h-24 lg:h-36"
        />
      </div>

      <div className="relative z-[2] mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-24 text-white lg:px-8">
        <div className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-white/12 px-5 py-2 text-xs tracking-[0.1em] backdrop-blur">
          <span className="block h-1.5 w-1.5 rounded-full bg-gold" />
          {t("hero.badge")}
        </div>
        <h1 className="font-serif text-[clamp(36px,6vw,72px)] font-bold leading-[1.15] tracking-tight">
          {t("hero.titleLine1")}
          <br />
          {t("hero.titleLine2")}
          <span className="text-gold">{t("hero.titleAccent")}</span>
          {t("hero.titleSuffix")}
          {t("hero.titleLine3") && (
            <>
              <br />
              {t("hero.titleLine3")}
            </>
          )}
        </h1>
        <p className="mt-6 max-w-2xl text-base font-light leading-[1.85] opacity-90 lg:text-lg">
          {t("hero.sub")}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 rounded bg-accent-warm px-8 py-4 text-sm font-medium tracking-wide shadow-lg shadow-accent-warm/35 transition-all hover:-translate-y-0.5 hover:bg-[#C56544]"
          >
            {t("hero.ctaPrimary")} →
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 rounded border border-white/40 px-8 py-4 text-sm font-medium tracking-wide transition-colors hover:bg-white/10"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 text-center text-[11px] tracking-[0.3em] text-white/90">
        {t("hero.scroll")}
        <div className="mx-auto mt-3 h-8 w-px bg-white/60" />
      </div>
    </section>
  );
}
