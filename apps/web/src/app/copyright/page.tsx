import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { APP_CONFIG } from "../../lib/constants";

export const metadata: Metadata = {
  title: "Copyright Policy",
  description: "Intellectual property guidelines and DMCA reporting for InstaFetch.",
};

export default function CopyrightPage() {
  return (
    <div className="w-full py-12">
      <Container className="max-w-3xl space-y-8 text-sm text-text-subduedLight dark:text-text-subduedDark leading-relaxed">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
            Intellectual Property
          </span>
          <h1 className="text-3xl font-extrabold text-text-mainLight dark:text-text-mainDark">
            Copyright Policy
          </h1>
          <p className="text-xs text-text-subduedLight">Last updated: October 23, 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            Respect for Intellectual Property Rights
          </h2>
          <p>
            {APP_CONFIG.name} respects the rights of artists, creators, and copyright holders. Our service is designed to serve as a personal backup and inspection utility for creators retrieving their own content.
          </p>
          <p>
            We require all users to explicitly confirm they have rightful authority over any media submitted to the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-text-mainLight dark:text-text-mainDark">
            DMCA & Copyright Infringement Takedown Notice
          </h2>
          <p>
            Because {APP_CONFIG.name} does not permanently host or index media files, transient download URLs expire after 30 minutes. However, if you are a copyright owner or an authorized agent and believe your content is being misused, please send a notification to:
          </p>
          <div className="p-4 rounded-btn bg-elevated-light dark:bg-elevated-dark font-mono text-xs text-text-mainLight dark:text-text-mainDark">
            Email: {APP_CONFIG.contactEmail}
            <br />
            Subject: Copyright / DMCA Takedown Notice
          </div>
          <p>
            Please include identification of the copyrighted work, the specific Instagram URL in question, and your authorized contact details.
          </p>
        </section>
      </Container>
    </div>
  );
}
