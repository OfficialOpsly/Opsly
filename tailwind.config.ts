import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "var(--foreground)",
            a: {
              color: "var(--primary)",
              "&:hover": {
                color: "var(--primary)",
              },
            },
            h1: {
              color: "var(--foreground)",
            },
            h2: {
              color: "var(--foreground)",
            },
            h3: {
              color: "var(--foreground)",
            },
            h4: {
              color: "var(--foreground)",
            },
            blockquote: {
              borderLeftColor: "var(--primary)",
            },
            code: {
              color: "var(--foreground)",
            },
            "pre code": {
              color: "var(--foreground)",
              backgroundColor: "transparent",
            },
          },
        },
      },
      gridTemplateColumns: {
        // Complex grid layouts
        "bento-1": "repeat(4, minmax(0, 1fr))",
        "bento-2": "repeat(6, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "auto-dense": "auto",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
}

export default config
