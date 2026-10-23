"use client";

import { useState } from "react";
import { ArrowRight, Sparkles, HardDrive, Link as LinkIcon, RefreshCw } from "lucide-react";
import { useDownloader } from "../../hooks/useDownloader";
import { UrlInput } from "./UrlInput";
import { RightsConfirmation } from "./RightsConfirmation";
import { JobStatus } from "./JobStatus";
import { MediaGrid } from "./MediaGrid";
import { ErrorPanel } from "./ErrorPanel";
import { UnsupportedPanel } from "./UnsupportedPanel";
import { LocalFileFallback } from "./LocalFileFallback";
import { MediaAsset } from "../../types";

interface DownloaderFormProps {
  initialUrl?: string;
  defaultMode?: "link" | "local";
}

export function DownloaderForm({ initialUrl = "", defaultMode = "link" }: DownloaderFormProps) {
  const [activeTab, setActiveTab] = useState<"link" | "local">(defaultMode);
  const [demoAssets, setDemoAssets] = useState<MediaAsset[] | null>(null);

  const {
    url,
    setUrl,
    rightsConfirmed,
    setRightsConfirmed,
    phase,
    validationError,
    result,
    retryAfter,
    submit,
    reset,
    clearError,
  } = useDownloader();

  const isBusy = phase === "validating" || phase === "fetching" || phase === "processing";

  // Clearly labeled local demo fixture (for testing UI layout without simulating Instagram scraping)
  const loadDemoFixture = () => {
    setDemoAssets([
      {
        id: "demo_1",
        kind: "image",
        filename: "creator_sample_photo.jpg",
        mimeType: "image/jpeg",
        width: 1080,
        height: 1080,
        sizeBytes: 840230,
        previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        downloadUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        expiresAt: new Date(Date.now() + 1800000).toISOString(),
      },
      {
        id: "demo_2",
        kind: "image",
        filename: "creator_sample_artwork.jpg",
        mimeType: "image/jpeg",
        width: 1080,
        height: 1350,
        sizeBytes: 1240192,
        previewUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80",
        downloadUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80",
        expiresAt: new Date(Date.now() + 1800000).toISOString(),
      },
    ]);
  };

  return (
    <div className="w-full space-y-6">
      {/* Mode Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 p-1 bg-elevated-light dark:bg-elevated-dark rounded-btn max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab("link")}
          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "link"
              ? "bg-surface-light dark:bg-surface-dark text-text-mainLight dark:text-text-mainDark shadow-sm"
              : "text-text-subduedLight dark:text-text-subduedDark hover:text-text-mainLight"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Instagram Link</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("local")}
          className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "local"
              ? "bg-surface-light dark:bg-surface-dark text-text-mainLight dark:text-text-mainDark shadow-sm"
              : "text-text-subduedLight dark:text-text-subduedDark hover:text-text-mainLight"
          }`}
        >
          <HardDrive className="w-3.5 h-3.5" />
          <span>Local Device Files</span>
        </button>
      </div>

      {activeTab === "local" ? (
        <LocalFileFallback />
      ) : (
        <div className="space-y-6">
          {/* Main Input Form Card */}
          <div className="w-full p-6 sm:p-8 rounded-card border border-borderLight dark:border-borderDark bg-surface-light dark:bg-surface-dark shadow-sm space-y-5">
            <div className="space-y-2 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-subduedLight dark:text-text-subduedDark">
                Instagram post or Reel link
              </label>
              <UrlInput
                value={url}
                onChange={(val) => {
                  setUrl(val);
                  if (validationError) clearError();
                }}
                onClear={reset}
                disabled={isBusy}
                hasError={Boolean(validationError)}
              />
              {validationError && (
                <p className="text-xs text-red-500 font-medium">{validationError}</p>
              )}
            </div>

            {/* Rights Declaration Checkbox */}
            <RightsConfirmation
              checked={rightsConfirmed}
              onChange={(val) => {
                setRightsConfirmed(val);
                if (validationError) clearError();
              }}
              disabled={isBusy}
            />

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-borderLight dark:border-borderDark/60">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadDemoFixture}
                  className="text-xs text-brand-violet hover:underline flex items-center gap-1 font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Demo Fixture</span>
                </button>
              </div>

              <button
                type="button"
                onClick={submit}
                disabled={isBusy || !url.trim()}
                className="py-2.5 px-6 rounded-btn bg-brand-violet hover:bg-brand-violet/90 disabled:opacity-50 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>{isBusy ? "Checking…" : "Check media"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Job State Timeline */}
          {phase !== "idle" && <JobStatus phase={phase} message={result?.message} />}

          {/* Demo Fixture View */}
          {demoAssets && (
            <div className="space-y-3 pt-4 border-t border-borderLight dark:border-borderDark">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet bg-brand-violet/10 px-2.5 py-1 rounded-full">
                  Internal Test Demo Fixture (Simulated UI)
                </span>
                <button
                  type="button"
                  onClick={() => setDemoAssets(null)}
                  className="text-xs text-text-subduedLight hover:text-text-mainLight"
                >
                  Clear Demo
                </button>
              </div>
              <MediaGrid assets={demoAssets} sourceType="carousel" />
            </div>
          )}

          {/* Real Success Result State */}
          {phase === "ready" && result?.assets && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-text-mainLight dark:text-text-mainDark">
                  Your Media is Ready
                </h3>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs text-brand-violet hover:underline flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Check another link</span>
                </button>
              </div>
              <MediaGrid assets={result.assets} sourceType={result.sourceType} />
            </div>
          )}

          {/* Unsupported State */}
          {phase === "unsupported" && (
            <UnsupportedPanel
              message={result?.message}
              onSwitchToLocal={() => setActiveTab("local")}
            />
          )}

          {/* Failed State */}
          {phase === "failed" && (
            <ErrorPanel
              message={result?.message || "Failed to inspect media."}
              code={result?.code}
              retryAfterSeconds={retryAfter}
              onRetry={reset}
              onSwitchToLocal={() => setActiveTab("local")}
            />
          )}
        </div>
      )}
    </div>
  );
}
