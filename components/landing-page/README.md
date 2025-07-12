# Automatic Landing Page Component

This is a modular landing page component for the Automatic website. It's designed to be easily imported and used in any Next.js application.

## Quick Integration

\`\`\`jsx
// In your page file (e.g., app/page.tsx)
import LandingPage from "@/components/landing-page"

export default function Home() {
  return <LandingPage />
}
\`\`\`

## Required Assets

Make sure to include these assets in your public directory:

- `/logo-light.png` - Light mode logo
- `/logo-dark.png` - Dark mode logo
- `/automatic-favicon-no-bg.png` - The Automatic favicon
- `/purple-circle-wave-static.png` - The purple wave graphic used in hero and CTA sections
- `/noise-texture.png` - Texture for dark mode cards
- Project images (or replace with your own)

## Required Font

This component uses the Outfit font from Google Fonts. Make sure to include it in your layout:

\`\`\`jsx
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  )
}
\`\`\`

## Styling

The component includes its own CSS file with all necessary styles. Make sure to import the styles in your app:

\`\`\`jsx
import "@/components/landing-page/styles.css"
\`\`\`

## Tailwind Configuration

This component requires specific Tailwind configuration. Make sure your tailwind.config.js includes:

\`\`\`js
module.exports = {
  // ... other config
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        // ... other colors
      }
    }
  }
}
\`\`\`

## Using Individual Components

You can also import individual components if needed:

\`\`\`jsx
import { Hero, Projects, Services } from "@/components/landing-page"

export default function CustomPage() {
  return (
    <div>
      <Hero />
      <Projects />
      <Services />
    </div>
  )
}
\`\`\`

## Theme Provider

To enable dark mode support, wrap your application with the ThemeProvider:

\`\`\`jsx
import { ThemeProvider } from "@/components/landing-page"

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
