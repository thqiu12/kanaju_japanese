"use server";

import { Resend } from "resend";

const SCHOOL_EMAIL =
  process.env.SCHOOL_CONTACT_EMAIL ?? "gakuen@hirai-gakuen.ac.jp";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "noreply@hirai-gakuen.ac.jp";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const TOPIC_LABELS: Record<string, string> = {
  brochure: "資料請求 / Brochure",
  admission: "入学相談 / Admission counseling",
  application: "出願質問 / Application question",
  other: "その他 / Other",
};

const LANG_LABELS: Record<string, string> = {
  ja: "日本語",
  zh: "中文",
  en: "English",
  ne: "नेपाली",
};

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitContactForm(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — bots fill hidden fields; humans don't.
  if (formData.get("website")) {
    // Pretend success, but do nothing.
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const topic = String(formData.get("topic") ?? "other");
  const message = String(formData.get("message") ?? "").trim();
  const preferredLang = String(formData.get("preferredLang") ?? "ja");
  const sourceLocale = String(formData.get("_locale") ?? "ja");

  if (!name || !email || !message) {
    return { status: "error", message: "Missing required fields." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Invalid email address." };
  }
  if (message.length > 5000) {
    return { status: "error", message: "Message too long." };
  }

  const subject = `[Web問合せ] ${TOPIC_LABELS[topic] ?? topic} — ${name}`;
  const html = `
    <h2>Web Inquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><b>Topic</b></td><td>${escape(TOPIC_LABELS[topic] ?? topic)}</td></tr>
      <tr><td><b>Name</b></td><td>${escape(name)}</td></tr>
      <tr><td><b>Email</b></td><td>${escape(email)}</td></tr>
      <tr><td><b>Country</b></td><td>${escape(country) || "—"}</td></tr>
      <tr><td><b>Preferred reply</b></td><td>${escape(LANG_LABELS[preferredLang] ?? preferredLang)}</td></tr>
      <tr><td><b>Source locale</b></td><td>${escape(sourceLocale)}</td></tr>
    </table>
    <h3 style="margin-top:20px">Message</h3>
    <pre style="white-space:pre-wrap;font-family:sans-serif;font-size:14px;background:#f5f5f5;padding:12px;border-radius:4px;">${escape(message)}</pre>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev mode without key — log the payload so devs can verify.
    console.warn(
      "[contact-form] RESEND_API_KEY missing — payload would have been:",
      { subject, name, email, country, topic, preferredLang, message },
    );
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: SCHOOL_EMAIL,
      replyTo: email,
      subject,
      html,
    });
    if (error) {
      console.error("[contact-form] Resend error:", error);
      return { status: "error", message: "Failed to send. Try again later." };
    }
    return { status: "success" };
  } catch (e) {
    console.error("[contact-form] Unexpected error:", e);
    return { status: "error", message: "Failed to send. Try again later." };
  }
}
