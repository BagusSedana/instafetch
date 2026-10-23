const ALLOWED_HOSTS = new Set(["instagram.com", "www.instagram.com"]);
const SHORTCODE_REGEX = /^[a-zA-Z0-9_-]{3,40}$/;

export interface UrlValidationResult {
  isValid: boolean;
  error?: string;
  normalizedUrl?: string;
  postType?: "reel" | "p";
  shortcode?: string;
}

export function validateInstagramUrl(rawUrl: string): UrlValidationResult {
  if (!rawUrl || typeof rawUrl !== "string") {
    return { isValid: false, error: "Please enter an Instagram post or Reel link." };
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { isValid: false, error: "The URL field cannot be empty." };
  }

  try {
    const parsed = new URL(trimmed);

    if (parsed.protocol !== "https:") {
      return { isValid: false, error: "Only secure https:// links are supported." };
    }

    if (parsed.username || parsed.password) {
      return { isValid: false, error: "Links with embedded credentials are not allowed." };
    }

    if (parsed.port && parsed.port !== "443") {
      return { isValid: false, error: "Custom port numbers are not permitted." };
    }

    const host = parsed.hostname.toLowerCase();
    if (!ALLOWED_HOSTS.has(host)) {
      return {
        isValid: false,
        error: `Only official Instagram links (instagram.com) are supported. Got '${host}'.`,
      };
    }

    const segments = parsed.pathname.split("/").filter(Boolean);
    if (segments.length < 2) {
      return {
        isValid: false,
        error: "Link must point to a specific Reel (/reel/) or Post (/p/).",
      };
    }

    const postType = segments[0].toLowerCase();
    if (postType !== "reel" && postType !== "p") {
      return {
        isValid: false,
        error: `Resource '/${postType}/' is unsupported. Only Reels (/reel/) and Posts (/p/) are allowed.`,
      };
    }

    const shortcode = segments[1];
    if (!SHORTCODE_REGEX.test(shortcode)) {
      return { isValid: false, error: "Invalid Instagram media identifier." };
    }

    return {
      isValid: true,
      normalizedUrl: `https://www.instagram.com/${postType}/${shortcode}/`,
      postType,
      shortcode,
    };
  } catch {
    return { isValid: false, error: "Please enter a valid, well-formed URL." };
  }
}
