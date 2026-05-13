"use client";

import { useEffect, useState, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  useEffect(() => {
    if (!isPending) setPendingLocale(null);
  }, [isPending]);

  const switchLocale = (next: Locale) => {
    if (next === locale || isPending) return;
    setPendingLocale(next);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full bg-primary-pale p-0.5 text-xs sm:gap-1 sm:px-2 sm:py-1 transition-opacity ${
        isPending ? "opacity-70" : ""
      }`}
      aria-busy={isPending}
    >
      {routing.locales.map((code) => {
        const active = code === locale;
        const loading = pendingLocale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchLocale(code)}
            disabled={isPending}
            aria-current={active ? "true" : undefined}
            className={
              (active
                ? "rounded-full bg-primary px-2 py-1 text-white font-medium sm:px-3 sm:py-1.5"
                : "rounded-full px-2 py-1 text-text-muted hover:text-primary transition-colors sm:px-3 sm:py-1.5") +
              (loading ? " animate-pulse" : "") +
              (isPending && !loading ? " cursor-wait" : "")
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
