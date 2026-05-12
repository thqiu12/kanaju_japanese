import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Header() {
  const t = await getTranslations();

  const navItems = [
    { href: "/about", label: t("nav.about"), sub: t("nav.aboutSub") },
    { href: "/programs", label: t("nav.programs"), sub: t("nav.programsSub") },
    { href: "/campus-life", label: t("nav.campusLife"), sub: t("nav.campusLifeSub") },
    { href: "/admissions", label: t("nav.admissions"), sub: t("nav.admissionsSub") },
    { href: "/news", label: t("nav.news"), sub: t("nav.newsSub") },
    { href: "/contact", label: t("nav.contact"), sub: t("nav.contactSub") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-base font-semibold text-primary-dark">
            {t("common.schoolName")}{" "}
            <span className="text-accent-warm">{t("common.departmentName")}</span>
          </span>
          <span className="mt-0.5 text-[10px] tracking-[0.15em] text-text-muted">
            KANAGAWA JLS · HIRAI GAKUEN
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block text-sm text-text transition-colors hover:text-accent-warm"
                >
                  {item.label}
                  <span className="mt-0.5 block text-[10px] tracking-[0.1em] text-text-light">
                    {item.sub}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
