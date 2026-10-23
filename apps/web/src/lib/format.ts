export function formatBytes(bytes?: number): string {
  if (bytes === undefined || bytes === null || bytes === 0) return "Unknown size";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function formatDuration(seconds?: number): string {
  if (!seconds || seconds <= 0) return "";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function formatExpiration(expiresAtIso?: string): string {
  if (!expiresAtIso) return "Expiring in 30 minutes";
  try {
    const diffMs = new Date(expiresAtIso).getTime() - Date.now();
    if (diffMs <= 0) return "Expired";
    const diffMins = Math.ceil(diffMs / 60000);
    return `Expires in ~${diffMins} min`;
  } catch {
    return "Expiring soon";
  }
}
