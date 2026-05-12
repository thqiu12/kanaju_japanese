"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeNames, type Locale } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-primary-pale px-2 py-1 text-xs">
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
                ? "rounded-full bg-primary px-3 py-1.5 text-white font-medium"
                : "rounded-full px-3 py-1.5 text-text-muted hover:text-primary transition-colors"
            }
          >
            {localeNames[code]}
          </button>
        );
      })}
    </div>
  );
}
