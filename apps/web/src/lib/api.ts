import { InspectResult } from "../types";

export async function inspectUrl(
  url: string,
  rightsConfirmed: boolean
): Promise<InspectResult> {
  try {
    const res = await fetch("/api/v1/inspect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        rights_confirmed: rightsConfirmed,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        requestId: data.requestId || "err_client",
        status: "failed",
        code: data.code || "INTERNAL_ERROR",
        message: data.message || "Failed to inspect media. Please try again.",
        retryAfterSeconds: data.retryAfterSeconds,
      };
    }

    return data as InspectResult;
  } catch (err: any) {
    return {
      requestId: "err_network",
      status: "failed",
      code: "INTERNAL_ERROR",
      message:
        "Unable to reach the server. Please check your network connection or try again later.",
    };
  }
}
