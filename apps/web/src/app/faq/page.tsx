import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { FAQAccordion } from "../../components/landing/FAQAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions regarding copyright, file formats, and Instagram download limitations.",
};

export default function FAQPage() {
  return (
    <div className="w-full space-y-16 py-12">
      <section className="text-center space-y-4">
        <Container size="hero">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet bg-brand-violet/10 dark:bg-brand-violet/20 px-3 py-1 rounded-full">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-mainLight dark:text-text-mainDark mt-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-text-subduedLight dark:text-text-subduedDark max-w-lg mx-auto leading-relaxed mt-2">
            Answers to common questions about permissions, technical limitations, and file formats.
          </p>
        </Container>
      </section>

      <section>
        <Container>
          <FAQAccordion />
        </Container>
      </section>
    </div>
  );
}
