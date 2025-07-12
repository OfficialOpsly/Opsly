"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import type { PortfolioItem } from "@/utils/csv-parser"

interface ProjectPopupProps {
  project: PortfolioItem | null
  onClose: () => void
}

export default function ProjectPopup({ project, onClose }: ProjectPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div ref={popupRef} className="card w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-2 rounded-full transition-colors z-10"
            aria-label="Close popup"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative mb-6 rounded-xl overflow-hidden">
            <Image
              src={project.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
              alt={project.title}
              width={800}
              height={400}
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>

          <div className="flex items-center gap-4 mb-4">
            {project.logo && (
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={project.logo || "/placeholder.svg"}
                  alt={`${project.title} logo`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{project.shortDescription}</p>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mt-6">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Visit Project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            )}
            <Link href={`/portfolio/${project.slug}`} className="btn-secondary inline-block">
              View Full Case Study
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
