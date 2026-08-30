/**
 * The canonical production origin. Used for every canonical URL, hreflang
 * alternate, OG url, JSON-LD @id, the sitemap and robots.txt — kept in one
 * place so the whole site agrees on one origin.
 *
 * Overridable per environment via NEXT_PUBLIC_SITE_URL; defaults to the live
 * production domain. Set the env var (no trailing slash) in any deployment
 * that should canonicalize to a different origin.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jls.hirai-gakuen.ac.jp";
