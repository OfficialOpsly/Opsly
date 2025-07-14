import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import "@/components/landing-page/styles.css"
import { Suspense } from "react"
import Script from "next/script"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Opsly - Hire AI agents that work like teammates.",
  description: "Hire AI agents that work like teammates.",
  metadataBase: new URL("https://opsly.ca"), // Replace with your actual domain
  openGraph: {
    title: "Opsly - Hire AI agents that work like teammates.",
    description: "Hire AI agents that work like teammates.",
    url: "https://opsly.ca", // Replace with your actual domain
    siteName: "Opsly",
    images: [
      {
        url: "/opsly-favicon-no-bg.png",
        width: 1200,
        height: 630,
        alt: "Opsly",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Opsly - Hire AI agents that work like teammates.",
    description: "Hire AI agents that work like teammates.",
    images: ["/opsly-favicon-no-bg.png"],
  },
  icons: {
    icon: [{ url: "/opsly-favicon-no-bg.png", type: "image/png" }],
    shortcut: ["/opsly-favicon-no-bg.png"],
    apple: [{ url: "/opsly-favicon-no-bg.png" }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <Script
          src="https://cdn.jsdelivr.net/npm/@vonage/client-sdk@2.0.0/dist/vonage-voice.min.js"
          strategy="afterInteractive"
        />
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
