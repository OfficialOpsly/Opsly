"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { PortfolioItem } from "@/utils/csv-parser"

interface PortfolioBentoGridProps {
  items: PortfolioItem[]
}

export default function PortfolioBentoGrid({ items }: PortfolioBentoGridProps) {
  // Function to determine grid span classes based on index
  const getGridSpan = (index: number): string => {
    // Create a pattern that repeats
    const pattern = [
      // First row
      "col-span-2 md:col-span-2 lg:col-span-2 row-span-2", // Large feature
      "col-span-2 md:col-span-1 lg:col-span-1 row-span-1", // Medium
      "col-span-2 md:col-span-1 lg:col-span-1 row-span-1", // Medium

      // Second row
      "col-span-2 md:col-span-1 lg:col-span-1 row-span-1", // Medium
      "col-span-2 md:col-span-1 lg:col-span-1 row-span-1", // Medium
      "col-span-2 md:col-span-2 lg:col-span-2 row-span-1", // Wide

      // Third row
      "col-span-2 md:col-span-1 lg:col-span-1 row-span-2", // Tall
      "col-span-2 md:col-span-2 lg:col-span-2 row-span-1", // Wide
      "col-span-2 md:col-span-1 lg:col-span-1 row-span-1", // Medium
    ]

    return pattern[index % pattern.length]
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
      {items.map((item, index) => {
        const gridSpan = getGridSpan(index)
        const isLarge = gridSpan.includes("col-span-2") && gridSpan.includes("row-span-2")
        const isTall = gridSpan.includes("row-span-2") && !gridSpan.includes("col-span-2 lg:col-span-2")
        const isWide = gridSpan.includes("col-span-2 lg:col-span-2") && !gridSpan.includes("row-span-2")

        return (
          <div
            key={item.slug}
            className={`${gridSpan} group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/30 transition-all duration-300 hover:shadow-md flex flex-col`}
          >
            {/* Image container - no padding, full width */}
            <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
              <Image
                src={item.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Text container - with padding */}
            <div className="p-4 md:p-6 flex-grow">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  {item.categories && item.categories.length > 1 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {item.categories[1].charAt(0).toUpperCase() + item.categories[1].slice(1)}
                    </span>
                  )}
                </div>
                <h3
                  className={`font-medium text-gray-900 dark:text-white ${isLarge ? "text-xl md:text-2xl" : "text-lg"} mb-2`}
                >
                  {item.title}
                </h3>
                {(isLarge || isWide || isTall) && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{item.shortDescription}</p>
                )}
                <div className="mt-auto pt-4">
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="inline-flex items-center text-[#7A7FEE] hover:underline text-sm font-medium"
                  >
                    View Project
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
