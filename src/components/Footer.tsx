import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const ABOUT_HREFS = [
  "/about",
  "/about#philosophy",
  "/about#history",
  "/about#operator",
  "/about#faculty",
] as const;

const APPLICANT_HREFS = [
  "/programs",
  "/admissions",
  "/admissions#flow",
  "/admissions#fees",
  "/contact",
] as const;

const DISCLOSURE_HREFS = [
  "/info-disclosure#regulations",
  "/info-disclosure#curriculum",
  "/info-disclosure#people",
  "/info-disclosure#fees",
  "/info-disclosure#career",
] as const;

export default async function Footer() {
  const t = await getTranslations();
  const aboutLinks = t.raw("footer.groups.about.links") as string[];
  const applicantsLinks = t.raw("footer.groups.applicants.links") as string[];
  const disclosureLinks = t.raw("footer.groups.disclosure.links") as string[];

  return (
    <footer className="bg-footer-bg px-6 pb-10 pt-20 text-white/70 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-base font-semibold text-white">
              {t("footer.schoolFull")}
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed">
              {t("footer.operator")}
              <br />
              {t("common.address")}
              <br />
              TEL: {t("common.tel")} / FAX: {t("common.fax")}
            </p>
            <div className="mt-7 max-w-[320px] rounded-md bg-white p-4">
              <Image
                src="/cert/mark-full.jpg"
                alt={t("noticeBar.tag")}
                width={1000}
                height={1000}
                className="h-auto w-full"
              />
              <p className="mt-3 text-center text-[10px] tracking-wide text-text-muted">
                {t("footer.certCaption")}
              </p>
            </div>
          </div>

          <FooterGroup
            title={t("footer.groups.about.title")}
            links={aboutLinks}
            hrefs={ABOUT_HREFS}
          />
          <FooterGroup
            title={t("footer.groups.applicants.title")}
            links={applicantsLinks}
            hrefs={APPLICANT_HREFS}
          />
          <FooterGroup
            title={t("footer.groups.disclosure.title")}
            links={disclosureLinks}
            hrefs={DISCLOSURE_HREFS}
          />
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 text-[12px] sm:flex-row sm:items-center">
          <div>{t("footer.copyright")}</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold">
              {t("footer.privacy")}
            </Link>
            <Link href="/sitemap" className="hover:text-gold">
              {t("footer.sitemap")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({
  title,
  links,
  hrefs,
}: {
  title: string;
  links: string[];
  hrefs: readonly string[];
}) {
  return (
    <div>
      <h4 className="mb-5 text-[13px] font-semibold tracking-wide text-white">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((label, i) => {
          const target = hrefs[i] ?? hrefs[hrefs.length - 1];
          return (
            <li key={label}>
              <Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={target as any}
                className="text-[13px] text-white/60 transition-colors hover:text-gold"
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
