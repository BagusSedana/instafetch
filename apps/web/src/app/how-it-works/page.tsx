import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { HowItWorksSteps } from "../../components/landing/HowItWorksSteps";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how InstaFetch verifies, checks, and delivers media safely.",
};

export default function HowItWorksPage() {
  return (
    <div className="w-full space-y-16 py-12">
      <section className="text-center space-y-4">
        <Container size="hero">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet bg-brand-violet/10 dark:bg-brand-violet/20 px-3 py-1 rounded-full">
            Architecture & Workflow
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-mainLight dark:text-text-mainDark mt-3">
            How InstaFetch Operates
          </h1>
          <p className="text-sm sm:text-base text-text-subduedLight dark:text-text-subduedDark max-w-lg mx-auto leading-relaxed mt-2">
            A transparent overview of our security measures, data pipelines, and platform constraints.
          </p>
        </Container>
      </section>

      <section>
        <Container>
          <HowItWorksSteps />
        </Container>
      </section>

      <section>
        <Container className="max-w-3xl space-y-8 text-sm text-text-subduedLight dark:text-text-subduedDark leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-text-mainLight dark:text-text-mainDark">
              1. URL Sanitization & Allowlist Validation
            </h2>
            <p>
              When a link is submitted, our client and server immediately validate that the domain is strictly <code>instagram.com</code> and points to a <code>/reel/</code> or <code>/p/</code> path. All tracking queries (such as <code>?igsh=...</code> or <code>?utm_source=...</code>) are discarded before any network request occurs.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-text-mainLight dark:text-text-mainDark">
              2. Ephemeral Storage on Vercel Blob
            </h2>
            <p>
              When media is generated for delivery, it is written to short-lived Vercel Blob storage with cryptographically randomized filenames. Download links carry a 30-minute logical TTL, and an automated background cleanup process ensures transient files are purged.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-text-mainLight dark:text-text-mainDark">
              3. Client-Side Local Fallback
            </h2>
            <p>
              If Instagram servers restrict access, you can switch seamlessly to our in-browser media inspector. This tool loads media directly from your device into memory using the HTML5 File and Blob APIs, guaranteeing 100% privacy without server transmission.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
