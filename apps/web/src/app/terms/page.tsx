import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { APP_CONFIG } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of InstaFetch.",
};

export default function TermsPage() {
  return (
    <div className="w-full py-12">
      <Container className="max-w-3xl space-y-8 text-sm text-text-subduedLight dark:text-text-subduedDark leading-relaxed">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
            Terms of Use
          </span>
          <h1 className="text-3xl font-extrabold text-text-mainLight dark:text-text-mainDark">
            Terms of Service
          </h1>
          <p className="text-xs text-text-subduedLight">Last updated: October 23, 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using {APP_CONFIG.name}, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must refrain from using this service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            2. Permitted Use & Ownership Declaration
          </h2>
          <p>
            You agree to use {APP_CONFIG.name} solely to inspect and download content that you own, or for which you have received express, verifiable permission from the rightful copyright owner. You agree <strong>not</strong> to use this service to violate copyright, download unauthorized commercial media, or conduct mass data harvesting.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            3. Platform Non-Affiliation & Access Controls
          </h2>
          <p>
            {APP_CONFIG.disclaimer} We do not bypass login barriers, technological protection measures (TPMs), or private profile restrictions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            4. Disclaimer of Warranties
          </h2>
          <p>
            {APP_CONFIG.name} is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranty of any kind. We make no guarantee that media retrieval will be uninterrupted, error-free, or compatible with future Instagram platform changes.
          </p>
        </section>
      </Container>
    </div>
  );
}
