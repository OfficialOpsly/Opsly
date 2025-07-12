"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"
import type { PortfolioItem } from "@/utils/csv-parser"

interface PortfolioDetailPageProps {
  project: PortfolioItem
}

export default function PortfolioDetailPage({ project }: PortfolioDetailPageProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />
      <div className="container py-12">
        <Link href="/portfolio" className="inline-flex items-center text-gray-400 hover:text-[#7A7FEE] mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8 flex items-center justify-center">
              <Image
                src={project.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
                alt={project.title}
                width={1200}
                height={675}
                className="max-w-full h-auto object-contain max-h-[600px]"
                priority
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-[#272829] p-6 rounded-3xl card">
              <div className="flex items-center gap-4 mb-6">
                {project.logo && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2">
                    <Image
                      src={project.logo || "/placeholder.svg"}
                      alt={`${project.title} logo`}
                      width={64}
                      height={64}
                      className="max-w-full h-auto object-contain"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{project.title}</h1>
                  <p className="text-gray-700 dark:text-gray-300">{project.shortDescription}</p>
                </div>
              </div>

              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#7A7FEE] text-white rounded-lg text-base font-medium hover:bg-opacity-90 transition-colors"
                >
                  Visit Project
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {project.categories
                    ?.filter((cat) => cat !== "all")
                    .map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-800 dark:text-gray-200"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
