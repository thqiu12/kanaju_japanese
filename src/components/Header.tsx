import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

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

  const careersItem = {
    href: "/careers",
    label: t("nav.careers"),
    sub: t("nav.careersSub"),
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:gap-6 lg:px-8">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-[13px] font-semibold text-primary-dark sm:text-base">
            {t("common.schoolName")}{" "}
            <span className="text-accent-warm">{t("common.departmentName")}</span>
          </span>
          <span className="mt-0.5 hidden text-[10px] tracking-[0.1em] text-text-muted sm:block">
            Department of Japanese Language · Kanagawa Jusei Shinkyu School
          </span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block whitespace-nowrap text-sm text-text transition-colors hover:text-accent-warm"
                >
                  {item.label}
                  <span className="mt-0.5 block whitespace-nowrap text-[10px] tracking-[0.1em] text-text-light">
                    {item.sub}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/careers"
            className="hidden items-center gap-1.5 rounded-full border border-accent-warm/40 bg-accent-warm/10 px-3 py-1.5 text-[12px] font-medium text-accent-warm transition-colors hover:bg-accent-warm hover:text-white lg:inline-flex"
          >
            <span aria-hidden>●</span>
            {t("nav.careers")}
          </Link>
          <LanguageSwitcher />
          <MobileMenu items={[...navItems, careersItem]} />
        </div>
      </div>
    </header>
  );
}
