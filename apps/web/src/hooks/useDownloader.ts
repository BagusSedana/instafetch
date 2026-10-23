"use client";

import { useState, useCallback } from "react";
import { DownloadPhase, InspectResult } from "../types";
import { validateInstagramUrl } from "../lib/validation";
import { inspectUrl } from "../lib/api";

export function useDownloader() {
  const [url, setUrl] = useState("");
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [phase, setPhase] = useState<DownloadPhase>("idle");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [result, setResult] = useState<InspectResult | null>(null);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  const reset = useCallback(() => {
    setUrl("");
    setRightsConfirmed(false);
    setPhase("idle");
    setValidationError(null);
    setResult(null);
    setRetryAfter(null);
  }, []);

  const clearError = useCallback(() => {
    setValidationError(null);
    if (phase === "failed" || phase === "unsupported") {
      setPhase("idle");
    }
  }, [phase]);

  const submit = useCallback(async () => {
    setValidationError(null);

    // 1. Client-side URL validation
    const validation = validateInstagramUrl(url);
    if (!validation.isValid) {
      setValidationError(validation.error || "Invalid URL.");
      setPhase("idle");
      return;
    }

    // 2. Rights confirmation check
    if (!rightsConfirmed) {
      setValidationError("You must confirm you own or have permission to access this content.");
      setPhase("idle");
      return;
    }

    setPhase("validating");
    // Transition to fetching
    setTimeout(() => {
      setPhase("fetching");
    }, 200);

    const inspectRes = await inspectUrl(validation.normalizedUrl!, rightsConfirmed);

    setResult(inspectRes);
    if (inspectRes.status === "ready") {
      setPhase("ready");
    } else if (inspectRes.status === "unsupported") {
      setPhase("unsupported");
    } else {
      setPhase("failed");
      if (inspectRes.retryAfterSeconds) {
        setRetryAfter(inspectRes.retryAfterSeconds);
      }
    }
  }, [url, rightsConfirmed]);

  return {
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
  };
}
