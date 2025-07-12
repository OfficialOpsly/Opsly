"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Footer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which logo to show based on theme
  const logoSrc = mounted && resolvedTheme === "dark" ? "/logo-light.png" : "/logo-dark.png"

  return (
    <footer className="container py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col items-center text-center">
        <Link href="/" className="flex items-center justify-center mb-4">
          {mounted ? (
            <Image
              src={logoSrc || "/placeholder.svg"}
              alt="Automatic Logo"
              width={200}
              height={50}
              className="h-12 w-auto"
            />
          ) : (
            <div className="h-12 w-[200px]" />
          )}
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          Your AI-first development partner building high-quality, scalable platforms.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Automatic. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
