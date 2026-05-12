type Props = {
  label: string;
  variant?: "default" | "light";
};

export default function SectionLabel({ label, variant = "default" }: Props) {
  const color = variant === "light" ? "text-gold" : "text-primary";
  const before = variant === "light" ? "before:bg-gold" : "before:bg-primary";
  return (
    <div
      className={`flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.3em] ${color} before:block before:h-px before:w-6 ${before}`}
    >
      {label}
    </div>
  );
}
