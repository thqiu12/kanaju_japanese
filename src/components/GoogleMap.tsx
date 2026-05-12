type Props = {
  className?: string;
  title: string;
  /** Embed query — defaults to the school's address. */
  query?: string;
};

/**
 * Google Maps embed via the public "maps?output=embed" URL.
 * No API key required — works as long as Google Maps is reachable.
 */
export default function GoogleMap({
  className = "h-[420px]",
  title,
  query = "〒252-0313 神奈川県相模原市南区松が枝町 6-7",
}: Props) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&hl=ja`;
  return (
    <iframe
      title={title}
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`w-full border-0 ${className}`}
      allowFullScreen
    />
  );
}
