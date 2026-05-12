"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  routing,
  localeNames,
  localeShortLabels,
  type Locale,
} from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full bg-primary-pale p-0.5 text-xs sm:gap-1 sm:px-2 sm:py-1">
      {routing.locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchLocale(code)}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded-full bg-primary px-2 py-1 text-white font-medium sm:px-3 sm:py-1.5"
                : "rounded-full px-2 py-1 text-text-muted hover:text-primary transition-colors sm:px-3 sm:py-1.5"
            }
          >
            <span className="sm:hidden">{localeShortLabels[code]}</span>
            <span className="hidden sm:inline">{localeNames[code]}</span>
          </button>
        );
      })}
    </div>
  );
}
