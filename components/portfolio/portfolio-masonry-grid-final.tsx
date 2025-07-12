"use client"
import { useState } from "react"
import type { PortfolioItem } from "@/utils/csv-parser"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import ProjectPopup from "./project-popup"

interface PortfolioGridProps {
  items: PortfolioItem[]
}

export default function PortfolioMasonryGridFinal({ items }: PortfolioGridProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)

  const openProjectPopup = (project: PortfolioItem) => {
    setSelectedProject(project)
  }

  const closeProjectPopup = () => {
    setSelectedProject(null)
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.slug}
            className="card overflow-hidden rounded-3xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg h-full cursor-pointer"
            onClick={() => openProjectPopup(item)}
          >
            <div className="block h-full flex flex-col">
              <div className="flex items-center justify-center p-4 pt-6 bg-gray-100 dark:bg-gray-800 relative">
                <Image
                  src={item.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain max-h-[220px]"
                />
                {item.categories && item.categories.length > 1 && (
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-xs text-gray-800 dark:text-white">
                      {item.categories[1].charAt(0).toUpperCase() + item.categories[1].slice(1)}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{item.shortDescription}</p>
                <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium mt-auto group">
                  View Project{" "}
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Popup */}
      <ProjectPopup project={selectedProject} onClose={closeProjectPopup} />
    </>
  )
}
