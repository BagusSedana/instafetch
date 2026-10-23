export const APP_CONFIG = {
  name: "InstaFetch",
  tagline: "Save the moments you created",
  eyebrow: "A simple media tool for your own content",
  description:
    "An understated, fast utility helping creators download their own Instagram Reels, photos, and carousel items when retrieval is permitted and accessible.",
  disclaimer:
    "InstaFetch is an independent tool and is not affiliated with, endorsed by, or sponsored by Instagram or Meta Platforms, Inc. We do not bypass access controls or download private content.",
  maxFileSizeBytes: 104857600, // 100 MB
  maxCarouselItems: 10,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@instafetch.local",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/reels", label: "Reels" },
  { href: "/photos", label: "Photos" },
  { href: "/carousel", label: "Carousel" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
];

export const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/copyright", label: "Copyright Notice" },
  { href: "/contact", label: "Contact Us" },
];
