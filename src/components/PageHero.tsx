import Image from "next/image";
import SectionLabel from "./SectionLabel";

type Props = {
  label: string;
  title: string;
  subtitle: string;
  /** Background photo path under /public */
  image: string;
  /** Inner container max width (default max-w-6xl) */
  maxWidth?: string;
};

/**
 * Page-header banner with a background photo under a brand-green
 * diagonal overlay. Text sits on the darker (left) side for contrast;
 * the photo shows through more on the right. Used by the utility pages
 * (admissions / contact / faq / news) so their headers match the
 * photo-backed heroes on about / programs / campus-life.
 */
export default function PageHero({
  label,
  title,
  subtitle,
  image,
  maxWidth = "max-w-6xl",
}: Props) {
  return (
    <section className="relative overflow-hidden px-6 py-20 text-white lg:px-8">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover brightness-[0.6]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/85 via-primary-dark/65 to-primary/45" />
      <div className={`relative z-10 mx-auto ${maxWidth}`}>
        <SectionLabel label={label} variant="light" />
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight lg:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-[1.9] text-white/85">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
