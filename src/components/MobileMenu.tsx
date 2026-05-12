"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";

type NavItem = { href: string; label: string; sub: string };

export default function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded text-primary-dark transition-colors hover:bg-primary-pale lg:hidden"
      >
        <span aria-hidden className="relative block h-3.5 w-5">
          <span
            className={`absolute left-0 top-0 block h-[2px] w-full rounded bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span
            className={`absolute left-0 top-[6px] block h-[2px] w-full rounded bg-current transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute left-0 top-[12px] block h-[2px] w-full rounded bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </span>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* Slide-in panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-[min(360px,85vw)] bg-bg-card shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <span className="text-xs uppercase tracking-[0.2em] text-text-muted">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded text-text-muted transition-colors hover:bg-bg-warm hover:text-primary"
          >
            ✕
          </button>
        </div>
        <nav className="overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={item.href as any}
                  className="block rounded px-4 py-3 transition-colors hover:bg-primary-pale"
                >
                  <span className="block text-base font-medium text-primary-dark">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[10px] uppercase tracking-[0.15em] text-text-light">
                    {item.sub}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
