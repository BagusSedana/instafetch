export type DownloadPhase =
  | "idle"
  | "validating"
  | "fetching"
  | "processing"
  | "ready"
  | "unsupported"
  | "failed"
  | "expired";

export type MediaKind = "image" | "video";

export interface MediaAsset {
  id: string;
  kind: MediaKind;
  filename: string;
  mimeType: string;
  width?: number;
  height?: number;
  durationSeconds?: number;
  sizeBytes?: number;
  previewUrl?: string;
  downloadUrl?: string;
  expiresAt?: string;
}

export interface InspectResult {
  requestId: string;
  status: "ready" | "unsupported" | "pending" | "failed";
  sourceType?: "reel" | "post" | "carousel";
  assets?: MediaAsset[];
  jobId?: string;
  code?:
    | "INVALID_URL"
    | "RIGHTS_REQUIRED"
    | "PRIVATE_OR_UNAVAILABLE"
    | "UPSTREAM_RESTRICTED"
    | "UNSUPPORTED_FORMAT"
    | "TOO_LARGE"
    | "RATE_LIMITED"
    | "TIMEOUT"
    | "INTERNAL_ERROR";
  message?: string;
  retryAfterSeconds?: number;
}

export interface LocalMediaItem {
  id: string;
  file: File;
  kind: MediaKind;
  filename: string;
  sizeBytes: number;
  objectUrl: string;
  dimensions?: { width: number; height: number };
}
