import { describe, it, expect } from "vitest";
import { formatBytes, formatDuration } from "../lib/format";

describe("Formatting Utilities", () => {
  it("formats file sizes cleanly", () => {
    expect(formatBytes(0)).toBe("Unknown size");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(10485760)).toBe("10 MB");
    expect(formatBytes(52428800)).toBe("50 MB");
  });

  it("formats durations cleanly", () => {
    expect(formatDuration(0)).toBe("");
    expect(formatDuration(45)).toBe("0:45");
    expect(formatDuration(75)).toBe("1:15");
    expect(formatDuration(125)).toBe("2:05");
  });
});
