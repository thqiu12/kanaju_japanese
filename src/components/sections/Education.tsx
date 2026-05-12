import Image from "next/image";
import { getTranslations } from "next-intl/server";
import SectionLabel from "../SectionLabel";

type Item = { title: string; desc: string };

export default async function Education() {
  const t = await getTranslations();
  const items = t.raw("education.items") as Item[];

  return (
    <section id="education" className="bg-bg px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel label={t("education.label")} />
        <h2 className="mt-4 font-serif text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-tight text-primary-dark">
          {t("education.title")}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.9] text-text-muted">
          {t("education.intro")}
        </p>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative h-[480px] overflow-hidden rounded-lg">
            <Image
              src="/photos/classroom-1.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <ul className="space-y-7">
            {items.map((item) => (
              <li
                key={item.title}
                className="relative border-l-2 border-border pb-2 pl-7 before:absolute before:-left-[7px] before:top-1.5 before:block before:h-3 before:w-3 before:rounded-full before:bg-primary"
              >
                <h4 className="text-lg font-semibold text-primary-dark">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-[1.85] text-text-muted">
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
