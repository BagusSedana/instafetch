"use client";

import { useRef } from "react";
import { UploadCloud, File, Trash2, Download, HardDrive } from "lucide-react";
import { useLocalMedia } from "../../hooks/useLocalMedia";
import { formatBytes } from "../../lib/format";

export function LocalFileFallback() {
  const { items, addFiles, removeItem, clearAll, downloadItem } = useLocalMedia();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full space-y-6">
      {/* Notice Banner */}
      <div className="p-3.5 rounded-btn bg-brand-violet/5 dark:bg-brand-violet/10 border border-brand-violet/20 flex items-start gap-3">
        <HardDrive className="w-5 h-5 text-brand-violet shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs text-text-subduedLight dark:text-text-subduedDark">
          <p className="font-semibold text-text-mainLight dark:text-text-mainDark">
            Local Device File Inspector
          </p>
          <p>
            Process, inspect dimensions, and re-save media stored directly on your phone or computer.
            <strong> Zero bytes are uploaded to our servers</strong>.
          </p>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-borderLight dark:border-borderDark hover:border-brand-violet dark:hover:border-brand-violet rounded-card p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors bg-surface-light dark:bg-surface-dark"
      >
        <div className="w-12 h-12 rounded-full bg-brand-violet/10 flex items-center justify-center text-brand-violet">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-text-mainLight dark:text-text-mainDark">
            Click to browse or drag and drop your media here
          </p>
          <p className="text-xs text-text-subduedLight dark:text-text-subduedDark">
            Supports MP4 videos, JPEG, PNG, and WebP images
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
          }}
        />
      </div>

      {/* Selected Local Items Preview */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-text-mainLight dark:text-text-mainDark">
              Loaded Local Media ({items.length})
            </span>
            <button
              type="button"
              onClick={clearAll}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-btn border border-borderLight dark:border-borderDark overflow-hidden bg-surface-light dark:bg-surface-dark space-y-2 p-3"
              >
                <div className="aspect-video bg-elevated-light dark:bg-elevated-dark rounded overflow-hidden flex items-center justify-center">
                  {item.kind === "video" ? (
                    <video
                      src={item.objectUrl}
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={item.objectUrl}
                      alt={item.filename}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-text-mainLight dark:text-text-mainDark truncate">
                    {item.filename}
                  </p>
                  <p className="text-[11px] text-text-subduedLight dark:text-text-subduedDark">
                    {formatBytes(item.sizeBytes)} • {item.kind === "video" ? "Video" : "Image"}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => downloadItem(item)}
                    className="flex-1 py-1.5 px-2.5 rounded bg-brand-violet hover:bg-brand-violet/90 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded border border-borderLight dark:border-borderDark text-text-subduedLight hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
