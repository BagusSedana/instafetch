"use client";

import { ShieldAlert, HardDrive, Info } from "lucide-react";

interface UnsupportedPanelProps {
  message?: string;
  onSwitchToLocal?: () => void;
}

export function UnsupportedPanel({
  message = "Instagram has restricted public access to this content, or automated extraction is toggled off for compliance.",
  onSwitchToLocal,
}: UnsupportedPanelProps) {
  return (
    <div className="w-full p-5 rounded-btn border border-amber-500/20 bg-amber-500/5 dark:bg-amber-950/20 space-y-4 text-left">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-text-mainLight dark:text-text-mainDark">
            Media Retrieval Restricted
          </h3>
          <p className="text-xs text-text-subduedLight dark:text-text-subduedDark leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <div className="p-3 rounded-md bg-surface-light dark:bg-surface-dark border border-borderLight dark:border-borderDark text-xs text-text-subduedLight dark:text-text-subduedDark space-y-1.5">
        <div className="flex items-center gap-1.5 font-medium text-text-mainLight dark:text-text-mainDark">
          <Info className="w-4 h-4 text-brand-violet shrink-0" />
          <span>Why is this happening?</span>
        </div>
        <p className="leading-relaxed">
          Instagram protects private media and frequently restricts unauthenticated server requests. InstaFetch does not bypass platform protections or collect user login cookies.
        </p>
      </div>

      {onSwitchToLocal && (
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={onSwitchToLocal}
            className="px-4 py-2 rounded-md bg-brand-violet hover:bg-brand-violet/90 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Open Local Media Fallback Tool</span>
          </button>
        </div>
      )}
    </div>
  );
}
