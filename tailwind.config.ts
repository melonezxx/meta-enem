import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0A0F1E",
          card: "#111827",
          elevated: "#1A2235",
        },
        primary: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
          light: "#60A5FA",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        border: {
          DEFAULT: "#1F2937",
          light: "#374151",
        },
        text: {
          primary: "#F9FAFB",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
        accent: {
          purple: "#8B5CF6",
          orange: "#F59E0B",
          red: "#EF4444",
          pink: "#EC4899",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #3B82F6, 0 0 10px #3B82F6" },
          "100%": { boxShadow: "0 0 20px #3B82F6, 0 0 40px #3B82F6" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":
          "linear-gradient(135deg, #0A0F1E 0%, #0D1B3E 50%, #0A0F1E 100%)",
        "gradient-card":
          "linear-gradient(135deg, #111827 0%, #1A2235 100%)",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.1) 50%, transparent 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-green": "0 0 20px rgba(16, 185, 129, 0.3)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.6)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
