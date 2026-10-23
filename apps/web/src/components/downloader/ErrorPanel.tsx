"use client";

import { AlertCircle, RotateCcw, UploadCloud } from "lucide-react";

interface ErrorPanelProps {
  title?: string;
  message: string;
  code?: string;
  retryAfterSeconds?: number | null;
  onRetry?: () => void;
  onSwitchToLocal?: () => void;
}

export function ErrorPanel({
  title = "Inspection Failed",
  message,
  code,
  retryAfterSeconds,
  onRetry,
  onSwitchToLocal,
}: ErrorPanelProps) {
  return (
    <div
      role="alert"
      className="w-full p-5 rounded-btn border border-red-500/20 bg-red-500/5 dark:bg-red-950/20 space-y-4 text-left"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-text-mainLight dark:text-text-mainDark">
            {title}
          </h3>
          <p className="text-xs text-text-subduedLight dark:text-text-subduedDark leading-relaxed">
            {message}
          </p>
          {retryAfterSeconds && (
            <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1">
              Rate limit in effect. You can retry in approximately {retryAfterSeconds} seconds.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-red-500/10">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-3 py-1.5 rounded-md border border-borderLight dark:border-borderDark hover:bg-surface-light dark:hover:bg-surface-dark text-xs font-medium text-text-mainLight dark:text-text-mainDark flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try another URL</span>
          </button>
        )}

        {onSwitchToLocal && (
          <button
            type="button"
            onClick={onSwitchToLocal}
            className="px-3 py-1.5 rounded-md bg-brand-violet/10 text-brand-violet hover:bg-brand-violet/20 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Use Local File Tool</span>
          </button>
        )}
      </div>
    </div>
  );
}
