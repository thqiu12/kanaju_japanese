"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  submitContactForm,
  type ContactState,
} from "@/lib/contact-action";

const INITIAL: ContactState = { status: "idle" };

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    INITIAL,
  );

  const topicKeys = ["brochure", "admission", "application", "agency", "other"];
  const langKeys = ["ja", "zh", "en", "ne"];

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-primary bg-primary-pale p-8 text-center">
        <div className="text-3xl">✓</div>
        <p className="mt-4 text-base font-medium text-primary-dark">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="_locale" value={locale} />
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <Row label={t("fields.name")} required>
        <input
          type="text"
          name="name"
          required
          placeholder={t("fields.namePlaceholder")}
          className="w-full rounded border border-border bg-bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </Row>

      <Row label={t("fields.email")} required>
        <input
          type="email"
          name="email"
          required
          placeholder={t("fields.emailPlaceholder")}
          className="w-full rounded border border-border bg-bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </Row>

      <Row label={t("fields.country")}>
        <input
          type="text"
          name="country"
          placeholder={t("fields.countryPlaceholder")}
          className="w-full rounded border border-border bg-bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </Row>

      <Row label={t("fields.topic")} required>
        <select
          name="topic"
          required
          defaultValue="brochure"
          className="w-full rounded border border-border bg-bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {topicKeys.map((k) => (
            <option key={k} value={k}>
              {t(`fields.topicOptions.${k}`)}
            </option>
          ))}
        </select>
      </Row>

      <Row label={t("fields.preferredLang")}>
        <div className="flex flex-wrap gap-3">
          {langKeys.map((k, i) => (
            <label
              key={k}
              className="flex cursor-pointer items-center gap-2 rounded border border-border bg-bg-card px-4 py-2.5 text-sm transition-colors hover:border-primary has-checked:border-primary has-checked:bg-primary-pale"
            >
              <input
                type="radio"
                name="preferredLang"
                value={k}
                defaultChecked={k === locale || (i === 0 && !langKeys.includes(locale))}
                className="accent-primary"
              />
              {t(`fields.preferredLangOptions.${k}`)}
            </label>
          ))}
        </div>
      </Row>

      <Row label={t("fields.message")} required>
        <textarea
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder={t("fields.messagePlaceholder")}
          className="w-full rounded border border-border bg-bg-card px-4 py-3 text-sm leading-[1.7] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </Row>

      <label className="flex items-start gap-3 text-sm text-text-muted">
        <input
          type="checkbox"
          required
          className="mt-1 h-4 w-4 accent-primary"
        />
        {t("fields.consent")}
      </label>

      {state.status === "error" && (
        <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {t("error")}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded bg-accent-warm px-8 py-4 text-sm font-medium tracking-wide text-white shadow-lg shadow-accent-warm/30 transition-all hover:-translate-y-0.5 hover:bg-[#C56544] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? t("submitting") : t("submit") + " →"}
      </button>
    </form>
  );
}

function Row({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-primary-dark">
        {label}
        {required && <span className="ml-1 text-accent-warm">*</span>}
      </label>
      {children}
    </div>
  );
}
