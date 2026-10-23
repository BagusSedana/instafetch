import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { DownloaderForm } from "../../components/downloader/DownloaderForm";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Instagram Carousels & Sidecars",
  description: "Extract multi-item Instagram posts and carousel albums in original sequence.",
};

export default function CarouselPage() {
  return (
    <div className="w-full space-y-16 py-12">
      <section className="text-center space-y-6">
        <Container size="hero" className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-violet bg-brand-violet/10 dark:bg-brand-violet/20 px-3 py-1 rounded-full">
            <Layers className="w-3.5 h-3.5" />
            <span>Carousel & Sidecar</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-mainLight dark:text-text-mainDark">
            Download Multi-Item Carousels
          </h1>
          <p className="text-sm sm:text-base text-text-subduedLight dark:text-text-subduedDark max-w-lg mx-auto leading-relaxed">
            Preserve carousel albums with up to 10 photos or videos in their original chronological sequence.
          </p>
        </Container>

        <Container size="hero">
          <DownloaderForm />
        </Container>
      </section>

      <section>
        <Container className="max-w-3xl space-y-6 text-sm text-text-subduedLight dark:text-text-subduedDark">
          <h2 className="text-xl font-bold text-text-mainLight dark:text-text-mainDark">
            Multi-Select and Carousel Ordering
          </h2>
          <p>
            Instagram sidecars (carousels) can contain a mix of static images and video clips. InstaFetch preserves the verified sequence number for each asset and lets you selectively download individual slides or batch download all available slides.
          </p>
        </Container>
      </section>
    </div>
  );
}
