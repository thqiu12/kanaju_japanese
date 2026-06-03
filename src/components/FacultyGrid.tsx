import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FACULTY } from "@/lib/faculty";

/**
 * Portrait grid of the JLS faculty & staff. Shared by /about (教職員)
 * and /careers/interview. Names are Japanese (locale-stable); roles are
 * translated via faculty.roles.*.
 */
export default async function FacultyGrid() {
  const t = await getTranslations("faculty");
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {FACULTY.map((m) => (
        <figure
          key={m.photo}
          className="overflow-hidden rounded-lg border border-border bg-bg-card"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={m.photo}
              alt={m.name}
              fill
              sizes="(min-width:640px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="px-5 py-4">
            <div className="text-[11px] font-medium uppercase tracking-[0.15em] text-accent-warm">
              {t(`roles.${m.roleKey}`)}
            </div>
            <div className="mt-1 font-serif text-lg font-semibold text-primary-dark">
              {m.name}
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
