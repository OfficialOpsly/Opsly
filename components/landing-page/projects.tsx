"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import ProjectPopup from "../portfolio/project-popup"
import { fetchPortfolioData } from "@/utils/csv-parser"
import type { PortfolioItem } from "@/utils/csv-parser"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)
  const [projects, setProjects] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch portfolio data on component mount
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchPortfolioData()
        // Get the first 3 projects for the landing page
        setProjects(data.slice(0, 3))
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  const openProjectPopup = (project: PortfolioItem) => {
    setSelectedProject(project)
  }

  const closeProjectPopup = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="my-20">
      <h2 className="text-black dark:text-white mb-6">
        Explore Our
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Latest Projects</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        From AI-driven automation to custom marketplaces, our work helps businesses scale smarter. Explore some of the
        platforms, tools, and solutions we've created for our clients and ourselves.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="card overflow-hidden shadow-lg animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))
          : projects.map((project) => (
              <div
                key={project.slug}
                className="card overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                onClick={() => openProjectPopup(project)}
              >
                <div className="flex items-center justify-center p-4 pt-6 bg-gray-100 dark:bg-gray-800 relative">
                  <Image
                    src={project.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain max-h-[220px]"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl font-semibold text-black dark:text-white">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 mb-4">{project.shortDescription}</p>
                  <div className="inline-flex items-center text-[#7A7FEE] text-sm font-medium group">
                    View Project{" "}
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/portfolio" className="btn-primary">
          View All Projects
        </Link>
      </div>

      {/* Project Popup */}
      <ProjectPopup project={selectedProject} onClose={closeProjectPopup} />
    </section>
  )
}
