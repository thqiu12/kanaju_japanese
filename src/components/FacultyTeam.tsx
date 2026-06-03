import Image from "next/image";

/**
 * Grid of "faculty working together" candid photos (from the official
 * shoot). Shared by the student-facing /about/faculty page and the
 * recruit /careers/interview page to convey the team atmosphere.
 */
const TEAM = ["team-1", "team-2", "team-3", "team-4"].map(
  (n) => `/photos/faculty/${n}.jpg`,
);

export default function FacultyTeam() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {TEAM.map((src) => (
        <div
          key={src}
          className="relative aspect-[3/2] overflow-hidden rounded-lg bg-bg-warm"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width:1024px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
