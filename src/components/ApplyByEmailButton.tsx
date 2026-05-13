"use client";

import { useState } from "react";

type Props = {
  email: string;
  subject: string;
  label: string;
  copiedLabel: string;
};

export default function ApplyByEmailButton({
  email,
  subject,
  label,
  copiedLabel,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    } catch {
      // best-effort: feedback below still runs so the click is visibly acknowledged
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-live="polite"
      className="mt-8 inline-flex items-center gap-2 rounded bg-accent-warm px-8 py-4 text-sm font-medium tracking-wide shadow-lg shadow-accent-warm/30 transition-all hover:-translate-y-0.5 hover:bg-[#C56544]"
    >
      {copied ? (
        <>
          <span aria-hidden>✓</span>
          {copiedLabel}
        </>
      ) : (
        <>
          {label} →
        </>
      )}
    </button>
  );
}
