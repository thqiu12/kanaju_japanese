import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ja", "zh", "en", "ne"] as const,
  defaultLocale: "ja",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, string> = {
  ja: "日本語",
  zh: "中文",
  en: "English",
  ne: "नेपाली",
};

export const localeShortLabels: Record<Locale, string> = {
  ja: "JA",
  zh: "中",
  en: "EN",
  ne: "ने",
};
