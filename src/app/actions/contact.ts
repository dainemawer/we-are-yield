"use server";

import { Resend } from "resend";
import { site } from "@/config/site";
import { contactSchema } from "@/lib/contact-schema";
import type { ContactField, ContactState } from "@/lib/contact-types";
import { contactEnv } from "@/lib/env";

/** Anyone on the internet can call this: validate everything, trust nothing. */
export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real people never see or fill this field.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success", firstName: "" };
  }

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    message: String(formData.get("message") ?? ""),
    services: formData.getAll("services").map(String),
  };
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", fieldErrors, values };
  }

  const data = parsed.data;
  const firstName = data.name.split(/\s+/)[0] ?? "";
  const env = contactEnv();

  if (!env.resendApiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY not set — logging instead:", data);
      return { status: "success", firstName };
    }
    console.error("[contact] RESEND_API_KEY is not configured");
    return {
      status: "error",
      message: `We couldn’t send that just now. Please email us at ${site.email}.`,
      values,
    };
  }

  const resend = new Resend(env.resendApiKey);
  const { error } = await resend.emails.send({
    from: env.from,
    to: env.to,
    replyTo: data.email,
    subject: `New enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || "—"}`,
      `Interested in: ${data.services.join(", ") || "—"}`,
      "",
      data.message || "(No message)",
    ].join("\n"),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please try again, or email us at ${site.email}.`,
      values,
    };
  }

  return { status: "success", firstName };
}
