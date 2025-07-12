"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ThemeToggleProps {
  className?: string
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`p-2 rounded-full ${className}`} />
  }

  const isDarkMode = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      className={`p-2 rounded-full transition-colors bg-transparent ${
        isDarkMode ? "hover:bg-gray-800/20" : "hover:bg-gray-200/50"
      } ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-gray-800" />}
    </button>
  )
}
