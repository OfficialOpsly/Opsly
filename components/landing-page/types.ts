import type React from "react"

// Update the ProjectType interface to match our new data structure
export interface ProjectType {
  id: number
  name: string
  image: string
  color: string
  description: string
  longDescription: string
  technologies: string[]
  link: string
}

export interface ServiceType {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export interface FaqType {
  id: number
  question: string
  answer: string
}

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: "light" | "dark"
  storageKey?: string
}

export interface LandingPageProps {
  showHeader?: boolean
  showFooter?: boolean
}
