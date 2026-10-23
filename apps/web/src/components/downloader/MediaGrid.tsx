"use client";

import { useState } from "react";
import { Download, CheckSquare, Square } from "lucide-react";
import { MediaAsset } from "../../types";
import { MediaCard } from "./MediaCard";

interface MediaGridProps {
  assets: MediaAsset[];
  sourceType?: "reel" | "post" | "carousel";
}

export function MediaGrid({ assets, sourceType = "post" }: MediaGridProps) {
  const isCarousel = assets.length > 1;
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(assets.map((a) => a.id))
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === assets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(assets.map((a) => a.id)));
    }
  };

  const handleDownloadSelected = () => {
    assets
      .filter((a) => selectedIds.has(a.id) && a.downloadUrl)
      .forEach((a) => {
        const link = document.createElement("a");
        link.href = a.downloadUrl!;
        link.download = a.filename;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  return (
    <div className="w-full space-y-4">
      {isCarousel && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-btn bg-elevated-light dark:bg-elevated-dark text-xs">
          <button
            type="button"
            onClick={toggleSelectAll}
            className="flex items-center gap-1.5 font-medium text-text-mainLight dark:text-text-mainDark hover:text-brand-violet transition-colors"
          >
            {selectedIds.size === assets.length ? (
              <CheckSquare className="w-4 h-4 text-brand-violet" />
            ) : (
              <Square className="w-4 h-4 text-text-subduedLight" />
            )}
            <span>
              {selectedIds.size === assets.length ? "Deselect All" : "Select All"} ({selectedIds.size}/{assets.length})
            </span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSelected}
            disabled={selectedIds.size === 0}
            className="px-3 py-1.5 rounded-md bg-brand-violet hover:bg-brand-violet/90 disabled:opacity-50 text-white font-medium flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Selected</span>
          </button>
        </div>
      )}

      <div
        className={`grid gap-4 ${
          assets.length === 1
            ? "grid-cols-1 max-w-md mx-auto"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {assets.map((asset) => (
          <MediaCard
            key={asset.id}
            asset={asset}
            selected={selectedIds.has(asset.id)}
            onSelectToggle={() => toggleSelect(asset.id)}
            showSelectCheckbox={isCarousel}
          />
        ))}
      </div>
    </div>
  );
}
