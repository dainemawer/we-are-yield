import "server-only";
import { site } from "@/config/site";

/**
 * Server-side configuration. Read lazily (at call time, not import time) so
 * a missing optional variable never breaks the static build.
 */
export function contactEnv() {
  return {
    resendApiKey: process.env.RESEND_API_KEY || null,
    to: process.env.CONTACT_TO_EMAIL || site.email,
    // Must be an address on a domain verified in Resend.
    from:
      process.env.CONTACT_FROM_EMAIL ||
      `Yield Website <website@weareyield.digital>`,
  };
}
