# InstaFetch — UI/UX & Design System Specification

## 1. Visual Identity & Brand Philosophy

**InstaFetch** is built as an understated, calm, and highly responsive utility tool.
- **Design tone**: Utilitarian minimalism, spacious layout, clear typography, restrained borders and shadows.
- **No stock hero art** or generic neon gradients. Every element exists to provide utility.
- **Typography**: `Inter` / `Geist Sans` for UI copy; `Geist Mono` / monospace for shortcodes, technical parameters, and code snippets.
- **Color Tokens**:
  - Primary violet accent: `#6D5EF9`
  - Secondary mint accent: `#3DD9A1` (used for successful state and badges)
  - Light mode: Canvas `#F8FAFC`, Surface `#FFFFFF`, Elevated `#F1F5F9`, Text `#0F172A`, Subdued `#64748B`, Border `#E2E8F0`
  - Dark mode: Canvas `#0B1020`, Surface `#131B2D`, Elevated `#1B2740`, Text `#F8FAFC`, Subdued `#A9B5C9`, Border `#29364E`
  - All contrast ratios strictly exceed WCAG AA (4.5:1 for normal text, 3:1 for large text and UI components).

---

## 2. Layout & Responsive Breakpoints

- **Max content container**: `1120px` width, centered with horizontal padding (`px-4 sm:px-6 lg:px-8`).
- **Hero form container**: `760px` max width for high focus.
- **Breakpoints**:
  - **Mobile (<640px)**: Single column, touch-friendly targets (minimum 44x44px), stacked controls, collapsible mobile navigation menu.
  - **Tablet (640px - 1023px)**: Two-column feature grids, balanced side-by-side elements.
  - **Desktop (1024px+)**: Spatially generous, preview on left and verified metadata/actions on right for ready states.
  - **Resilience**: Tested at 320px minimum viewport to guarantee zero horizontal scrollbars.

---

## 3. UI Component Architecture

1. **`SiteHeader`**: Sticky header with brand logo, links to Reels, Photos, Carousel, How It Works, FAQ, and `ThemeToggle`.
2. **`SiteFooter`**: Direct links to Terms, Privacy, Copyright, Contact, and explicit Meta non-affiliation disclaimer.
3. **`DownloaderForm`**: Core interactive unit housing URL input, clipboard paste trigger, rights declaration checkbox, and submit action.
4. **`UrlInput` & `PasteButton`**: Input with leading icon, URL pattern guidance, and one-click paste using Browser Clipboard API with clear permission-denied feedback.
5. **`RightsConfirmation`**: Explicit un-checked checkbox requiring user confirmation of authorization.
6. **`JobStatus` & `StatusTimeline`**: Honest status representation (`validating` -> `fetching` -> `analyzing` -> `processing` -> `ready`).
7. **`MediaPreview` & `MediaCard`**: Clean presentation with lazy loading, video player with standard controls, and verified dimensions/file size badges.
8. **`MediaGrid` & `SelectAllCheckbox`**: Multi-asset carousel view supporting granular selection and batch download.
9. **`ErrorPanel` & `UnsupportedPanel`**: Actionable error states (e.g., private media, rate-limited, upstream-restricted) offering alternative steps or local fallback.
10. **`LocalFileFallback`**: Instant local drag-and-drop or file picker for user-owned media on their device, completely bypasses network calls.
11. **`FAQAccordion`**: Semantic accessible disclosure items for common questions.
12. **`Skeleton`**: Transient placeholders strictly during real network operations.
