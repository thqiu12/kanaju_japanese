import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function NoticeBar() {
  const t = await getTranslations();
  return (
    <div className="bg-primary text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-3 text-[13px] lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-9 items-center rounded bg-white p-1">
            <Image
              src="/cert/mark-symbol.png"
              alt={t("noticeBar.tag")}
              width={40}
              height={40}
              className="h-full w-auto"
            />
          </span>
          <span>
            <strong className="font-semibold">{t("noticeBar.tag")}</strong>
            <span className="ml-2 opacity-90">{t("noticeBar.info")}</span>
          </span>
        </div>
        <div className="hidden text-[12px] opacity-90 md:block">
          {t("common.tel")} &nbsp;|&nbsp; {t("common.email")}
        </div>
      </div>
    </div>
  );
}
