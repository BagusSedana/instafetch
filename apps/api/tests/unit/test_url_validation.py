import pytest
from app.services.instagram.url_validation import validate_and_normalize_instagram_url


def test_valid_canonical_reel_urls():
    urls = [
        "https://www.instagram.com/reel/C2g7XYZ1234/",
        "https://instagram.com/reel/C2g7XYZ1234",
        "  https://www.instagram.com/reel/abc-123_XYZ/  ",
    ]
    for url in urls:
        valid, norm, shortcode, ptype, err = validate_and_normalize_instagram_url(url)
        assert valid is True
        assert ptype == "reel"
        assert norm.startswith("https://www.instagram.com/reel/")
        assert err is None


def test_valid_canonical_post_urls():
    urls = [
        "https://www.instagram.com/p/C2g7XYZ1234/",
        "https://instagram.com/p/abc123_",
    ]
    for url in urls:
        valid, norm, shortcode, ptype, err = validate_and_normalize_instagram_url(url)
        assert valid is True
        assert ptype == "p"
        assert norm.startswith("https://www.instagram.com/p/")


def test_strips_tracking_query_and_fragments():
    url = "https://www.instagram.com/reel/C2g7XYZ1234/?igsh=MTZkMTZk&utm_source=ig_web_copy_link#fragment"
    valid, norm, shortcode, ptype, err = validate_and_normalize_instagram_url(url)
    assert valid is True
    assert norm == "https://www.instagram.com/reel/C2g7XYZ1234/"
    assert "?" not in norm
    assert "#" not in norm


def test_rejects_insecure_or_non_https():
    insecure = [
        "http://www.instagram.com/reel/C2g7XYZ1234/",
        "ftp://www.instagram.com/reel/C2g7XYZ1234/",
        "javascript:alert(1)",
        "file:///etc/passwd",
    ]
    for url in insecure:
        valid, _, _, _, err = validate_and_normalize_instagram_url(url)
        assert valid is False
        assert "HTTPS" in err or "Malformed" in err


def test_rejects_non_instagram_hosts():
    bad_hosts = [
        "https://evil.com/reel/C2g7XYZ1234/",
        "https://fakeinstagram.com/p/C2g7XYZ1234/",
        "https://www.instagram.com.attacker.com/p/123/",
        "https://sub.instagram.com/p/123/",
    ]
    for url in bad_hosts:
        valid, _, _, _, err = validate_and_normalize_instagram_url(url)
        assert valid is False
        assert "not supported" in err


def test_rejects_embedded_credentials():
    url = "https://user:password@www.instagram.com/reel/C2g7XYZ1234/"
    valid, _, _, _, err = validate_and_normalize_instagram_url(url)
    assert valid is False
    assert "credentials" in err.lower()


def test_rejects_custom_ports():
    url = "https://www.instagram.com:8443/reel/C2g7XYZ1234/"
    valid, _, _, _, err = validate_and_normalize_instagram_url(url)
    assert valid is False
    assert "port" in err.lower()


def test_rejects_unsupported_instagram_resources():
    unsupported = [
        "https://www.instagram.com/stories/user/123/",
        "https://www.instagram.com/explore/",
        "https://www.instagram.com/username/",
        "https://www.instagram.com/reels/",
    ]
    for url in unsupported:
        valid, _, _, _, err = validate_and_normalize_instagram_url(url)
        assert valid is False
        assert "Unsupported" in err or "path" in err
