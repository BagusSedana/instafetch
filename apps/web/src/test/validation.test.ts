import { describe, it, expect } from "vitest";
import { validateInstagramUrl } from "../lib/validation";

describe("validateInstagramUrl", () => {
  it("validates canonical public Reel URLs", () => {
    const res = validateInstagramUrl("https://www.instagram.com/reel/C2g7XYZ1234/");
    expect(res.isValid).toBe(true);
    expect(res.postType).toBe("reel");
    expect(res.shortcode).toBe("C2g7XYZ1234");
    expect(res.normalizedUrl).toBe("https://www.instagram.com/reel/C2g7XYZ1234/");
  });

  it("validates canonical public Post URLs without trailing slash", () => {
    const res = validateInstagramUrl("https://instagram.com/p/abc123_-");
    expect(res.isValid).toBe(true);
    expect(res.postType).toBe("p");
    expect(res.shortcode).toBe("abc123_-");
    expect(res.normalizedUrl).toBe("https://www.instagram.com/p/abc123_-/");
  });

  it("strips tracking queries and fragments", () => {
    const res = validateInstagramUrl(
      "https://www.instagram.com/reel/C2g7XYZ1234/?igsh=abcde123&utm_medium=copy_link#top"
    );
    expect(res.isValid).toBe(true);
    expect(res.normalizedUrl).toBe("https://www.instagram.com/reel/C2g7XYZ1234/");
  });

  it("rejects non-https schemes", () => {
    const res = validateInstagramUrl("http://www.instagram.com/reel/C2g7XYZ1234/");
    expect(res.isValid).toBe(false);
    expect(res.error).toContain("https://");
  });

  it("rejects non-instagram domains", () => {
    const res = validateInstagramUrl("https://fakeinstagram.com/reel/C2g7XYZ1234/");
    expect(res.isValid).toBe(false);
    expect(res.error).toContain("Only official Instagram links");
  });

  it("rejects embedded credentials", () => {
    const res = validateInstagramUrl("https://admin:secret@instagram.com/reel/C2g7XYZ1234/");
    expect(res.isValid).toBe(false);
    expect(res.error).toContain("credentials");
  });

  it("rejects custom ports", () => {
    const res = validateInstagramUrl("https://instagram.com:8080/reel/C2g7XYZ1234/");
    expect(res.isValid).toBe(false);
    expect(res.error).toContain("port");
  });

  it("rejects profile and stories URLs", () => {
    const res = validateInstagramUrl("https://www.instagram.com/username/");
    expect(res.isValid).toBe(false);
    expect(res.error).toContain("Reel (/reel/) or Post (/p/)");
  });
});
