import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { APP_CONFIG } from "../../lib/constants";
import { Mail, HelpCircle, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the InstaFetch team.",
};

export default function ContactPage() {
  const email = APP_CONFIG.contactEmail;

  return (
    <div className="w-full py-12">
      <Container className="max-w-3xl space-y-8 text-sm text-text-subduedLight dark:text-text-subduedDark leading-relaxed">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
            Support & Inquiries
          </span>
          <h1 className="text-3xl font-extrabold text-text-mainLight dark:text-text-mainDark">
            Contact Us
          </h1>
          <p className="text-sm">
            Have questions about platform features, reporting an issue, or rights clearance?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-btn border border-borderLight dark:border-borderDark bg-surface-light dark:bg-surface-dark space-y-2">
            <div className="w-8 h-8 rounded-md bg-brand-violet/10 dark:bg-brand-violet/20 flex items-center justify-center text-brand-violet">
              <Mail className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-text-mainLight dark:text-text-mainDark">
              Direct Inquiries
            </h2>
            <p className="text-xs">
              Reach out directly to our team via email:
            </p>
            <a
              href={`mailto:${email}`}
              className="text-xs font-medium text-brand-violet hover:underline block pt-1"
            >
              {email}
            </a>
          </div>

          <div className="p-5 rounded-btn border border-borderLight dark:border-borderDark bg-surface-light dark:bg-surface-dark space-y-2">
            <div className="w-8 h-8 rounded-md bg-brand-mint/10 dark:bg-brand-mint/20 flex items-center justify-center text-brand-mint">
              <Shield className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-text-mainLight dark:text-text-mainDark">
              Legal & Copyright
            </h2>
            <p className="text-xs">
              For DMCA notices, rights enforcement, or privacy requests:
            </p>
            <a
              href={`mailto:${email}?subject=Legal%20Notice`}
              className="text-xs font-medium text-brand-violet hover:underline block pt-1"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="p-4 rounded-btn bg-elevated-light dark:bg-elevated-dark text-xs flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
          <p>
            <strong>Before contacting:</strong> Please review our{" "}
            <a href="/faq" className="text-brand-violet underline">
              FAQ
            </a>{" "}
            for common questions regarding private accounts and download limitations.
          </p>
        </div>
      </Container>
    </div>
  );
}
