import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center bg-bg px-6 py-28 text-center lg:px-8">
        <div className="font-serif text-[clamp(64px,12vw,120px)] font-bold leading-none text-primary/20">
          404
        </div>
        <h1 className="mt-4 font-serif text-2xl font-semibold text-primary-dark lg:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-md text-base leading-[1.9] text-text-muted">
          {t("desc")}
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          {t("home")} →
        </Link>
      </main>
      <Footer />
    </>
  );
}
