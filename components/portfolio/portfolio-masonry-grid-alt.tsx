"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { PortfolioItem } from "@/utils/csv-parser"

interface PortfolioMasonryGridProps {
  items: PortfolioItem[]
}

export default function PortfolioMasonryGridAlt({ items }: PortfolioMasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(3)
  const [itemHeights, setItemHeights] = useState<Record<string, number>>({})
  const [loaded, setLoaded] = useState(false)

  // Determine number of columns based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(1)
      } else if (window.innerWidth < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Track when all images are loaded
  useEffect(() => {
    if (Object.keys(itemHeights).length === items.length && !loaded) {
      setLoaded(true)
    }
  }, [itemHeights, items.length, loaded])

  // Handle image load and record height
  const handleImageLoad = (slug: string, height: number) => {
    setItemHeights((prev) => ({
      ...prev,
      [slug]: height,
    }))
  }

  // Organize items into columns for masonry layout
  const getItemsForColumn = (columnIndex: number) => {
    return items.filter((_, index) => index % columns === columnIndex)
  }

  // Determine if an item should be featured (larger)
  const isFeatured = (index: number) => {
    // Make every 5th item featured
    return index % 5 === 0
  }

  return (
    <div
      ref={gridRef}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ${
        loaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      {Array.from({ length: columns }).map((_, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4 md:gap-6">
          {getItemsForColumn(columnIndex).map((item, index) => {
            const featured = isFeatured(index)
            return (
              <div
                key={item.slug}
                className="overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement
                      handleImageLoad(item.slug, img.height)
                    }}
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
        </div>
      ))}
    </div>
  )
}
