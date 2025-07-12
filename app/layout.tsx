import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import "@/components/landing-page/styles.css"
import { Suspense } from "react"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Automatic - Your AI-first Development Partner",
  description:
    "We build high-quality, scalable platforms—client portals, marketplaces, AI automations, and SaaS—using the best tools for the job, no shortcuts.",
  icons: {
    icon: [{ url: "/automatic-favicon-no-bg.png", type: "image/png" }],
    apple: [{ url: "/automatic-favicon-no-bg.png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
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
