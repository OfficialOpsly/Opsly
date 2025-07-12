"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Masonry from "react-masonry-css"
import type { PortfolioItem } from "@/utils/csv-parser"

interface PortfolioMasonryGridProps {
  items: PortfolioItem[]
}

export default function PortfolioMasonryGrid({ items }: PortfolioMasonryGridProps) {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth)

    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Determine number of columns based on screen width
  const getColumnCount = () => {
    if (windowWidth < 640) return 1
    if (windowWidth < 1024) return 2
    return 3
  }

  // Determine if an item should be featured (larger)
  const isFeatured = (index: number) => {
    // Make every 5th item featured
    return index % 5 === 0
  }

  return (
    <Masonry breakpointCols={getColumnCount()} className="flex w-full -ml-4" columnClassName="pl-4 bg-clip-padding">
      {items.map((item, index) => {
        const featured = isFeatured(index)
        return (
          <div
            key={item.slug}
            className={`mb-4 overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 transition-all duration-300 hover:shadow-lg ${
              featured ? "mb-6" : "mb-4"
            }`}
          >
            <div className="relative overflow-hidden">
              <Image
                src={item.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
                alt={item.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              {item.categories && item.categories.length > 1 && (
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                    {item.categories[1].charAt(0).toUpperCase() + item.categories[1].slice(1)}
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 md:p-6">
              <h3 className={`font-medium text-white ${featured ? "text-xl md:text-2xl" : "text-lg"} mb-2`}>
                {item.title}
              </h3>
              <p className="text-sm text-gray-300 mb-4">{item.shortDescription}</p>
              <Link
                href={`/portfolio/${item.slug}`}
                className="inline-flex items-center text-[#7A7FEE] hover:underline text-sm font-medium"
              >
                View Project <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        )
      })}
    </Masonry>
  )
}
