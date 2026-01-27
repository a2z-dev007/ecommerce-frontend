import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  /* 🔥 IMPORTANT: Safelist for dynamic badge classes */
  safelist: [
    // background
    "bg-brand-softer",
    "bg-danger-soft",
    "bg-success-soft",
    "bg-warning-soft",
    "bg-neutral-primary-soft",
    "bg-neutral-secondary-medium",

    // text
    "text-fg-brand-strong",
    "text-fg-danger-strong",
    "text-fg-success-strong",
    "text-fg-warning",
    "text-heading",

    // borders
    "border-brand",
    "border-danger",
    "border-success",
    "border-warning",
    "border-neutral-primary",
    "border-neutral-secondary",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        /* =====================
           EXISTING (unchanged)
        ====================== */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'brand-beige': 'hsl(var(--secondary))',
        'brand-brown': 'hsl(var(--primary))',

        /* =====================
           ✅ BADGE DESIGN TOKENS
        ====================== */
        brand: {
          DEFAULT: "#2563EB",
          softer: "#DBEAFE",
        },

        danger: {
          DEFAULT: "#DC2626",
          soft: "#FEE2E2",
        },

        success: {
          DEFAULT: "#16A34A",
          soft: "#DCFCE7",
        },

        warning: {
          DEFAULT: "#D97706",
          soft: "#FEF3C7",
        },

        neutral: {
          primary: "#6B7280",
          "primary-soft": "#E5E7EB",
          secondary: "#9CA3AF",
          "secondary-medium": "#E5E7EB",
        },

        /* Text tokens */
        "fg-brand-strong": "#1E40AF",
        "fg-danger-strong": "#991B1B",
        "fg-success-strong": "#14532D",
        "fg-warning": "#92400E",

        heading: "#111827",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },

  plugins: [require("tailwindcss-animate")],
};

export default config;
