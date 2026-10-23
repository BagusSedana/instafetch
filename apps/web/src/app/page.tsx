import { Container } from "../components/ui/Container";
import { DownloaderForm } from "../components/downloader/DownloaderForm";
import { HowItWorksSteps } from "../components/landing/HowItWorksSteps";
import { FeatureCards } from "../components/landing/FeatureCards";
import { FAQAccordion } from "../components/landing/FAQAccordion";
import { APP_CONFIG } from "../lib/constants";

export default function HomePage() {
  return (
    <div className="w-full space-y-20 py-10 sm:py-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <Container size="hero" className="space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-violet bg-brand-violet/10 dark:bg-brand-violet/20 px-3 py-1 rounded-full">
            {APP_CONFIG.eyebrow}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-mainLight dark:text-text-mainDark leading-[1.15]">
            Save the moments <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-mint">
              you created
            </span>
          </h1>
          <p className="text-sm sm:text-base text-text-subduedLight dark:text-text-subduedDark max-w-lg mx-auto leading-relaxed">
            Download your own Instagram Reels, photos, and carousel albums when media is accessible. Free, simple, and privacy-first.
          </p>
        </Container>

        {/* Downloader Form Island */}
        <Container size="hero">
          <DownloaderForm />
        </Container>
      </section>

      {/* How It Works Section */}
      <section>
        <Container className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
              Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-mainLight dark:text-text-mainDark">
              Simple 3-step retrieval
            </h2>
            <p className="text-xs sm:text-sm text-text-subduedLight dark:text-text-subduedDark">
              We never ask for your Instagram password or cookies. Everything runs under your explicit rights confirmation.
            </p>
          </div>
          <HowItWorksSteps />
        </Container>
      </section>

      {/* Feature Formats Section */}
      <section>
        <Container className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
              Supported Media
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-mainLight dark:text-text-mainDark">
              What you can save
            </h2>
            <p className="text-xs sm:text-sm text-text-subduedLight dark:text-text-subduedDark">
              InstaFetch focuses strictly on public Reels and post media permitted by content owners.
            </p>
          </div>
          <FeatureCards />
        </Container>
      </section>

      {/* FAQ Section */}
      <section>
        <Container className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
              Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-mainLight dark:text-text-mainDark">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQAccordion />
        </Container>
      </section>
    </div>
  );
}
