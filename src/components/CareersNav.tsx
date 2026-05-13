import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type ActiveKey = "hub" | "message" | "interview" | "positions" | "entry";

const ITEMS: { key: ActiveKey; href: string; labelKey: string }[] = [
  { key: "hub", href: "/careers", labelKey: "recruit.navHub" },
  { key: "message", href: "/careers/message", labelKey: "recruit.navMessage" },
  {
    key: "interview",
    href: "/careers/interview",
    labelKey: "recruit.navInterview",
  },
  {
    key: "positions",
    href: "/careers/positions",
    labelKey: "recruit.navPositions",
  },
  { key: "entry", href: "/careers/entry", labelKey: "recruit.navEntry" },
];

export default async function CareersNav({ active }: { active: ActiveKey }) {
  const t = await getTranslations("contact.careers");
  return (
    <div className="border-b border-border bg-bg-card">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3 lg:px-8">
        <Link
          href="/careers"
          className="flex items-baseline gap-2 text-primary-dark"
        >
          <span className="font-serif text-base font-semibold tracking-wide">
            {t("recruit.siteName")}
          </span>
          <span className="hidden text-[11px] tracking-[0.15em] text-text-muted sm:inline">
            {t("recruit.siteSub")}
          </span>
        </Link>
        <nav
          aria-label="Recruit"
          className="ml-auto -mr-2 flex items-center gap-1 overflow-x-auto whitespace-nowrap text-[12px] sm:text-sm"
        >
          {ITEMS.map((item) => {
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={item.href as any}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "rounded-full bg-primary-pale px-3 py-1.5 font-medium text-primary-dark"
                    : "rounded-full px-3 py-1.5 text-text-muted transition-colors hover:bg-bg-warm hover:text-primary-dark"
                }
              >
                {t(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  item.labelKey as any,
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
