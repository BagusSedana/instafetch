import type { Metadata } from "next";
import { Container } from "../../components/ui/Container";
import { DownloaderForm } from "../../components/downloader/DownloaderForm";
import { Film } from "lucide-react";

export const metadata: Metadata = {
  title: "Download Instagram Reels",
  description: "Save and archive your own Instagram Reels in original MP4 format.",
};

export default function ReelsPage() {
  return (
    <div className="w-full space-y-16 py-12">
      <section className="text-center space-y-6">
        <Container size="hero" className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-violet bg-brand-violet/10 dark:bg-brand-violet/20 px-3 py-1 rounded-full">
            <Film className="w-3.5 h-3.5" />
            <span>Reels Downloader</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-text-mainLight dark:text-text-mainDark">
            Download Your Own Instagram Reels
          </h1>
          <p className="text-sm sm:text-base text-text-subduedLight dark:text-text-subduedDark max-w-lg mx-auto leading-relaxed">
            Archive your public Reels in original MP4 quality with sound. Requires link verification and creator rights.
          </p>
        </Container>

        <Container size="hero">
          <DownloaderForm />
        </Container>
      </section>

      <section>
        <Container className="max-w-3xl space-y-6 text-sm text-text-subduedLight dark:text-text-subduedDark">
          <h2 className="text-xl font-bold text-text-mainLight dark:text-text-mainDark">
            About Instagram Reel Downloads
          </h2>
          <p>
            Reels on Instagram are short-form vertical videos served in MP4 format. When you paste an authorized Reel URL (such as <code>https://www.instagram.com/reel/abc123/</code>), InstaFetch checks whether the media is publicly accessible and provides an original-resolution stream.
          </p>
          <p>
            <strong>Note on Audio & Restrictions:</strong> If a Reel uses copyrighted music restricted in certain regions or belongs to a private account, Instagram restricts serverless access. In such cases, InstaFetch truthfully reports access limitations and offers the local device tool as an alternative.
          </p>
        </Container>
      </section>
    </div>
  );
}
