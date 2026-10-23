import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { APP_CONFIG } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data retention practices for InstaFetch.",
};

export default function PrivacyPage() {
  return (
    <div className="w-full py-12">
      <Container className="max-w-3xl space-y-8 text-sm text-text-subduedLight dark:text-text-subduedDark leading-relaxed">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
            Legal & Privacy
          </span>
          <h1 className="text-3xl font-extrabold text-text-mainLight dark:text-text-mainDark">
            Privacy Policy
          </h1>
          <p className="text-xs text-text-subduedLight">Last updated: October 23, 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            1. Zero Account / Zero Credential Policy
          </h2>
          <p>
            InstaFetch does not require user accounts, email registration, or passwords. We will <strong>never</strong> ask for or collect your Instagram username, password, session cookies, or personal account tokens.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            2. URL & Log Data Scrubbing
          </h2>
          <p>
            Our server logging system strictly records operational telemetry (such as status codes, duration in milliseconds, and coarse media kind). We do <strong>not</strong> record full submitted Instagram URLs, media shortcodes, or personal user IP addresses in permanent application logs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            3. File Storage & 30-Minute Expiration
          </h2>
          <p>
            Any temporary files generated to facilitate media downloads are assigned cryptographically unguessable UUID paths and an automatic 30-minute Time-To-Live (TTL). Once expired, assets become inaccessible and are scheduled for physical deletion. We do not maintain a permanent media gallery or searchable catalog.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            4. Local File Tool Privacy
          </h2>
          <p>
            When utilizing the Local Device Files tool, media files are processed 100% within your local web browser using client-side JavaScript. No file data, metadata, or media bytes are transmitted over the network or uploaded to our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            5. Contact Information
          </h2>
          <p>
            For privacy inquiries or deletion requests, please contact us at{" "}
            <a href={`mailto:${APP_CONFIG.contactEmail}`} className="text-brand-violet underline">
              {APP_CONFIG.contactEmail}
            </a>.
          </p>
        </section>
      </Container>
    </div>
  );
}
