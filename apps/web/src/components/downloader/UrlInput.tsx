"use client";

import { useState } from "react";
import { Link2, Clipboard, Check, X } from "lucide-react";

interface UrlInputProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  disabled?: boolean;
  hasError?: boolean;
}

export function UrlInput({
  value,
  onChange,
  onClear,
  disabled = false,
  hasError = false,
}: UrlInputProps) {
  const [pasteStatus, setPasteStatus] = useState<"idle" | "success" | "denied">("idle");

  const handlePaste = async () => {
    if (disabled) return;
    try {
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        setPasteStatus("denied");
        setTimeout(() => setPasteStatus("idle"), 2500);
        return;
      }
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text.trim());
        setPasteStatus("success");
        setTimeout(() => setPasteStatus("idle"), 1500);
      }
    } catch {
      setPasteStatus("denied");
      setTimeout(() => setPasteStatus("idle"), 2500);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-btn bg-surface-light dark:bg-surface-dark border transition-all ${
          hasError
            ? "border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
            : "border-borderLight dark:border-borderDark focus-within:border-brand-violet focus-within:ring-2 focus-within:ring-brand-violet/20"
        }`}
      >
        <Link2 className="w-5 h-5 text-text-subduedLight dark:text-text-subduedDark shrink-0" />

        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://www.instagram.com/reel/... or /p/..."
          disabled={disabled}
          aria-label="Instagram post or Reel link"
          aria-invalid={hasError}
          className="w-full bg-transparent text-sm sm:text-base text-text-mainLight dark:text-text-mainDark placeholder:text-text-subduedLight/60 dark:placeholder:text-text-subduedDark/60 focus:outline-none"
        />

        {value && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="p-1 rounded text-text-subduedLight dark:text-text-subduedDark hover:text-text-mainLight dark:hover:text-text-mainDark"
            aria-label="Clear link input"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={handlePaste}
          disabled={disabled}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
            pasteStatus === "success"
              ? "bg-brand-mint/10 border-brand-mint text-brand-mint"
              : pasteStatus === "denied"
              ? "bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400"
              : "border-borderLight dark:border-borderDark hover:bg-elevated-light dark:hover:bg-elevated-dark text-text-subduedLight dark:text-text-subduedDark"
          }`}
          aria-label="Paste link from clipboard"
        >
          {pasteStatus === "success" ? (
            <>
              <Check className="w-3.5 h-3.5 text-brand-mint" />
              <span>Pasted!</span>
            </>
          ) : pasteStatus === "denied" ? (
            <span>Use manual paste</span>
          ) : (
            <>
              <Clipboard className="w-3.5 h-3.5" />
              <span>Paste</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
