"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ExternalLink } from "lucide-react"
import { useTheme } from "next-themes"
import type { PortfolioItem } from "@/utils/csv-parser"

interface ProjectPopupProps {
  project: PortfolioItem | null
  onClose: () => void
}

export default function ProjectPopup({ project, onClose }: ProjectPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Add event listener for escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    // Add event listener for clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // Prevent body scrolling when modal is open
    if (project) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleEscKey)
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Cleanup
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleEscKey)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [project, onClose])

  if (!project) return null

  // Create a simplified HTML version of the content without relying on prose classes
  const createSimpleContent = () => {
    // Basic sanitization - remove script tags
    const sanitized = project.content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")

    return sanitized
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div ref={popupRef} className="card w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#272829]">
        <div className="relative p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-full transition-colors z-10"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6 flex items-center justify-center">
            <Image
              src={project.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
              alt={project.title}
              width={800}
              height={400}
              className="max-w-full h-auto object-contain max-h-[400px]"
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            {project.logo && (
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2">
                <Image
                  src={project.logo || "/placeholder.svg"}
                  alt={`${project.title} logo`}
                  width={48}
                  height={48}
                  className="max-w-full h-auto object-contain"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{project.shortDescription}</p>
            </div>
          </div>

          <div className="custom-content text-gray-700 dark:text-gray-300 space-y-4">
            <div dangerouslySetInnerHTML={{ __html: createSimpleContent() }} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7A7FEE] text-white rounded-md hover:bg-opacity-90 transition-all text-sm font-medium shadow-sm"
              >
                Visit Project
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <Link
              href={`/portfolio/${project.slug}`}
              className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] text-sm font-medium"
              onClick={onClose}
            >
              View Full Case Study
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
