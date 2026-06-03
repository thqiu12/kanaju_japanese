/**
 * The Japanese Language Department (JLS) faculty & staff featured on the
 * site. Names are proper nouns kept in Japanese across all locales; the
 * role is translated via the `faculty.roles.*` message keys.
 *
 * Portraits live in /public/photos/faculty/ (optimized from the official
 * shoot). Only confirmed JLS members are listed here.
 */
export type FacultyRoleKey = "kyomu" | "fulltime" | "admin";

export type FacultyMember = {
  photo: string;
  /** Display name (Japanese, locale-stable) */
  name: string;
  roleKey: FacultyRoleKey;
};

export const FACULTY: FacultyMember[] = [
  { photo: "/photos/faculty/sato.jpg", name: "佐藤 先生", roleKey: "kyomu" },
  { photo: "/photos/faculty/koyama.jpg", name: "小山 先生", roleKey: "fulltime" },
  { photo: "/photos/faculty/matsui.jpg", name: "松井 さん", roleKey: "admin" },
];
