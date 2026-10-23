import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { DownloaderForm } from "../../components/downloader/DownloaderForm";
import { Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Instagram Photos",
  description: "Save high-resolution photos and pictures from your own public Instagram posts.",
};

export default function PhotosPage() {
  return (
    <div className="w-full space-y-16 py-12">
      <section className="text-center space-y-6">
        <Container size="hero" className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-violet bg-brand-violet/10 dark:bg-brand-violet/20 px-3 py-1 rounded-full">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photo Downloader</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-mainLight dark:text-text-mainDark">
            Download Your Instagram Photos
          </h1>
          <p className="text-sm sm:text-base text-text-subduedLight dark:text-text-subduedDark max-w-lg mx-auto leading-relaxed">
            Retrieve individual high-resolution JPEG images directly from your authorized Instagram posts.
          </p>
        </Container>

        <Container size="hero">
          <DownloaderForm />
        </Container>
      </section>

      <section>
        <Container className="max-w-3xl space-y-6 text-sm text-text-subduedLight dark:text-text-subduedDark">
          <h2 className="text-xl font-bold text-text-mainLight dark:text-text-mainDark">
            High-Resolution Photo Extraction
          </h2>
          <p>
            Instagram compresses and stores multiple image dimensions. When available, InstaFetch extracts the highest quality uncompressed resolution provided by Instagram's servers without artificial upscaling or recompression.
          </p>
          <p>
            We strictly reject attempts to access private photo profiles or scrape user archives in bulk.
          </p>
        </Container>
      </section>
    </div>
  );
}
