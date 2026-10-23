import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: "#6D5EF9",
          mint: "#3DD9A1",
        },
        canvas: {
          light: "#F8FAFC",
          dark: "#0B1020",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#131B2D",
        },
        elevated: {
          light: "#F1F5F9",
          dark: "#1B2740",
        },
        text: {
          mainLight: "#0F172A",
          subduedLight: "#64748B",
          mainDark: "#F8FAFC",
          subduedDark: "#A9B5C9",
        },
        borderLight: "#E2E8F0",
        borderDark: "#29364E",
      },
      borderRadius: {
        card: "20px",
        btn: "12px",
      },
      maxWidth: {
        content: "1120px",
        hero: "760px",
      },
    },
  },
  plugins: [],
};

export default config;
