import { Loader2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { DownloadPhase } from "../../types";

interface JobStatusProps {
  phase: DownloadPhase;
  message?: string;
}

export function JobStatus({ phase, message }: JobStatusProps) {
  if (phase === "idle") return null;

  const steps = [
    { key: "validating", label: "Validating link" },
    { key: "fetching", label: "Checking availability" },
    { key: "processing", label: "Analyzing media" },
    { key: "ready", label: "Ready" },
  ];

  const getStepIndex = (p: DownloadPhase) => {
    switch (p) {
      case "validating":
        return 0;
      case "fetching":
        return 1;
      case "processing":
        return 2;
      case "ready":
        return 3;
      default:
        return -1;
    }
  };

  const currentIndex = getStepIndex(phase);
  const isLoading = phase === "validating" || phase === "fetching" || phase === "processing";

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full p-4 rounded-btn border border-borderLight dark:border-borderDark bg-surface-light dark:bg-surface-dark space-y-3"
    >
      <div className="flex items-center justify-between text-xs font-medium">
        <div className="flex items-center gap-2">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-brand-violet" />}
          {phase === "ready" && <CheckCircle2 className="w-4 h-4 text-brand-mint" />}
          {phase === "unsupported" && <AlertTriangle className="w-4 h-4 text-amber-500" />}
          {phase === "failed" && <XCircle className="w-4 h-4 text-red-500" />}

          <span className="text-text-mainLight dark:text-text-mainDark capitalize">
            {phase === "unsupported"
              ? "Access Restricted"
              : phase === "failed"
              ? "Inspection Failed"
              : isLoading
              ? "Checking media…"
              : "Media Ready"}
          </span>
        </div>

        {message && (
          <span className="text-text-subduedLight dark:text-text-subduedDark max-w-xs truncate">
            {message}
          </span>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-4 gap-2 pt-1">
          {steps.map((s, idx) => (
            <div key={s.key} className="space-y-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx < currentIndex
                    ? "bg-brand-mint"
                    : idx === currentIndex
                    ? "bg-brand-violet animate-pulse"
                    : "bg-elevated-light dark:bg-elevated-dark"
                }`}
              />
              <span className="block text-[10px] text-text-subduedLight dark:text-text-subduedDark truncate">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
