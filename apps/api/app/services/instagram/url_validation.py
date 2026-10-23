import re
from urllib.parse import urlparse
from typing import Tuple, Optional

# Valid shortcodes on Instagram consist of alphanumeric characters, hyphens, and underscores
SHORTCODE_REGEX = re.compile(r"^[a-zA-Z0-9_-]{3,40}$")
ALLOWED_HOSTS = {"instagram.com", "www.instagram.com"}


def validate_and_normalize_instagram_url(raw_url: str) -> Tuple[bool, Optional[str], Optional[str], Optional[str], Optional[str]]:
    """
    Validates and normalizes an Instagram URL.
    Returns:
        (is_valid, normalized_url, shortcode, post_type, error_reason)
    """
    if not raw_url or not isinstance(raw_url, str):
        return False, None, None, None, "URL is missing or empty."

    trimmed = raw_url.strip()
    if not trimmed:
        return False, None, None, None, "URL cannot be blank."

    try:
        parsed = urlparse(trimmed)
    except Exception:
        return False, None, None, None, "Malformed URL format."

    # Protocol check: strictly HTTPS
    if parsed.scheme.lower() != "https":
        return False, None, None, None, "Only secure HTTPS URLs are permitted."

    # Credentials check
    if parsed.username or parsed.password:
        return False, None, None, None, "Embedded credentials are not allowed."

    # Port check
    if parsed.port and parsed.port not in (443,):
        return False, None, None, None, "Custom port specifications are not permitted."

    # Hostname check
    hostname = (parsed.hostname or "").lower()
    if hostname not in ALLOWED_HOSTS:
        return False, None, None, None, f"Host '{hostname}' is not supported. Only public Instagram URLs are allowed."

    # Path check: /reel/{shortcode} or /p/{shortcode}
    path_segments = [seg for seg in parsed.path.split("/") if seg]
    if len(path_segments) < 2:
        return False, None, None, None, "URL path must point to a specific Reel (/reel/) or Post (/p/)."

    post_type = path_segments[0].lower()
    if post_type not in ("reel", "p"):
        return False, None, None, None, f"Unsupported Instagram resource '/{post_type}/'. Only Reels and Posts (/p/) are supported."

    shortcode = path_segments[1]
    if not SHORTCODE_REGEX.match(shortcode):
        return False, None, None, None, "Invalid or malformed Instagram media shortcode."

    # Canonical normalized URL (stripped of any tracking parameters or fragments)
    normalized_url = f"https://www.instagram.com/{post_type}/{shortcode}/"
    return True, normalized_url, shortcode, post_type, None
