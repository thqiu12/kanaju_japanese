"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

// Self-contained strings so the boundary never depends on client-provided
// messages — it must render even when the failure is message/config related.
const T = {
  ja: {
    title: "問題が発生しました",
    desc: "ページの読み込み中にエラーが発生しました。時間をおいて再度お試しください。",
    retry: "再読み込み",
    home: "トップページへ戻る",
  },
  zh: {
    title: "出现了问题",
    desc: "加载页面时发生错误。请稍后重试。",
    retry: "重新加载",
    home: "返回首页",
  },
  en: {
    title: "Something went wrong",
    desc: "An error occurred while loading this page. Please try again in a moment.",
    retry: "Try again",
    home: "Back to home",
  },
  ne: {
    title: "केही गडबड भयो",
    desc: "यो पृष्ठ लोड गर्दा त्रुटि भयो। कृपया केही समयपछि पुनः प्रयास गर्नुहोस्।",
    retry: "पुनः प्रयास",
    home: "गृहपृष्ठमा फर्कनुहोस्",
  },
} as const;

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const locale = useLocale() as keyof typeof T;
  const t = T[locale] ?? T.ja;
  return (
    <main className="flex min-h-[60vh] flex-1 flex-col items-center justify-center bg-bg px-6 py-28 text-center lg:px-8">
      <h1 className="font-serif text-2xl font-semibold text-primary-dark lg:text-3xl">
        {t.title}
      </h1>
      <p className="mt-4 max-w-md text-base leading-[1.9] text-text-muted">
        {t.desc}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          {t.retry}
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-medium text-primary-dark transition-colors hover:bg-primary-pale"
        >
          {t.home} →
        </Link>
      </div>
    </main>
  );
}
