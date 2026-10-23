"use client";

import { ShieldCheck } from "lucide-react";

interface RightsConfirmationProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}

export function RightsConfirmation({
  checked,
  onChange,
  disabled = false,
}: RightsConfirmationProps) {
  return (
    <div className="flex items-start gap-2.5 text-xs text-text-subduedLight dark:text-text-subduedDark select-none">
      <input
        type="checkbox"
        id="rights-confirm"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="mt-0.5 w-4 h-4 rounded border-borderLight dark:border-borderDark text-brand-violet focus:ring-brand-violet accent-brand-violet cursor-pointer"
      />
      <label htmlFor="rights-confirm" className="cursor-pointer leading-relaxed">
        <span className="font-medium text-text-mainLight dark:text-text-mainDark">
          I confirm that I own this content or have explicit permission to save it.
        </span>{" "}
        <span className="block mt-0.5 opacity-80">
          InstaFetch does not bypass private account protections, login walls, or copyright restrictions.
        </span>
      </label>
    </div>
  );
}
