import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

/**
 * Catch-all for any path under a valid locale that matches no real route.
 * Without a middleware, unmatched URLs would otherwise fall through to the
 * default (non-localized) Next 404. Setting the request locale and calling
 * notFound() here routes them to the localized [locale]/not-found.tsx instead.
 */
export default async function CatchAllNotFound({
  params,
}: PageProps<"/[locale]/[...rest]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  notFound();
}
