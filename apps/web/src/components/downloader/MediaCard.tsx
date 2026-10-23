"use client";

import { Download, Film, Image as ImageIcon } from "lucide-react";
import { MediaAsset } from "../../types";
import { formatBytes, formatDuration, formatExpiration } from "../../lib/format";

interface MediaCardProps {
  asset: MediaAsset;
  selected?: boolean;
  onSelectToggle?: () => void;
  showSelectCheckbox?: boolean;
}

export function MediaCard({
  asset,
  selected = false,
  onSelectToggle,
  showSelectCheckbox = false,
}: MediaCardProps) {
  const isVideo = asset.kind === "video";

  return (
    <div
      className={`relative rounded-btn border transition-all overflow-hidden bg-surface-light dark:bg-surface-dark ${
        selected
          ? "border-brand-violet ring-1 ring-brand-violet"
          : "border-borderLight dark:border-borderDark hover:border-text-subduedLight"
      }`}
    >
      {/* Media Preview Stage */}
      <div className="relative aspect-video w-full bg-elevated-light dark:bg-elevated-dark overflow-hidden flex items-center justify-center">
        {isVideo ? (
          <video
            src={asset.previewUrl || asset.downloadUrl}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={asset.previewUrl || asset.downloadUrl}
            alt={asset.filename}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}

        {/* Media Kind Badge */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
          {isVideo ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
          <span>{isVideo ? "Video" : "Photo"}</span>
        </div>

        {/* Multi-Select Checkbox */}
        {showSelectCheckbox && onSelectToggle && (
          <div className="absolute top-2.5 right-2.5">
            <input
              type="checkbox"
              checked={selected}
              onChange={onSelectToggle}
              aria-label={`Select ${asset.filename}`}
              className="w-5 h-5 rounded border-borderLight text-brand-violet focus:ring-brand-violet accent-brand-violet cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Content & Metadata */}
      <div className="p-3.5 space-y-2.5">
        <div>
          <p className="text-xs font-medium text-text-mainLight dark:text-text-mainDark truncate">
            {asset.filename}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-text-subduedLight dark:text-text-subduedDark">
            {asset.sizeBytes ? <span>{formatBytes(asset.sizeBytes)}</span> : null}
            {asset.width && asset.height ? (
              <span>
                {asset.width}x{asset.height}
              </span>
            ) : null}
            {asset.durationSeconds ? <span>{formatDuration(asset.durationSeconds)}</span> : null}
            <span className="text-brand-mint">{formatExpiration(asset.expiresAt)}</span>
          </div>
        </div>

        {/* Download Button */}
        {asset.downloadUrl && (
          <a
            href={asset.downloadUrl}
            download={asset.filename}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-md bg-brand-violet hover:bg-brand-violet/90 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        )}
      </div>
    </div>
  );
}
