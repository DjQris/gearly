import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core monochrome system
        bg: "#0A0A0A",
        "surface-2": "#111111",
        "surface-3": "#171717",
        ink: "#F5F5F5",
        "ink-secondary": "#A3A3A3",
        "ink-muted": "#737373",
        line: "#262626",
        light: "#F5F5F2",
        "light-ink": "#111111",
        // Single restrained accent
        accent: "#D7FF3F",
        "accent-dim": "#B9DE2A",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Fluid editorial scale
        hero: [
          // Max 71px (4.4375rem); scales down for tablet/mobile.
          "clamp(2.5rem, 1rem + 6vw, 4.4375rem)",
          { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "600" },
        ],
        display: [
          "clamp(2.5rem, 1.4rem + 5vw, 4.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.025em", fontWeight: "600" },
        ],
        section: [
          "clamp(2rem, 1.2rem + 3.2vw, 3.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        stat: [
          "clamp(2.5rem, 1.5rem + 4.5vw, 5.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "600" },
        ],
      },
      maxWidth: {
        shell: "1440px",
      },
      borderRadius: {
        DEFAULT: "8px",
        card: "12px",
      },
      letterSpacing: {
        label: "0.14em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        // Slow, premium background drift for hero imagery.
        "ken-burns": "ken-burns 18s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
