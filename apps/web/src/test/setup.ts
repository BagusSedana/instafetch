import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock URL.createObjectURL and URL.revokeObjectURL for jsdom environment
if (typeof window !== "undefined") {
  window.URL.createObjectURL = vi.fn(() => "blob:http://localhost:3000/mock-blob-uuid");
  window.URL.revokeObjectURL = vi.fn();
}
