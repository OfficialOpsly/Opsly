"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import type { PortfolioItem } from "@/utils/csv-parser"

interface PortfolioGridProps {
  items: PortfolioItem[]
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(3)

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

  // Organize items into columns for masonry layout
  const getItemsForColumn = (columnIndex: number) => {
    return items.filter((_, index) => index % columns === columnIndex)
  }

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: columns }).map((_, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4 md:gap-6">
          {getItemsForColumn(columnIndex).map((item) => (
            <PortfolioCard key={item.slug} item={item} />
          ))}
        </div>
      ))}
    </div>
  )
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="card overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg">
      <Link href={`/portfolio/${item.slug}`} className="block relative h-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden p-4">
          <Image
            src={item.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
            alt={item.title}
            width={800}
            height={600}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 md:p-6 w-full">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-white text-lg md:text-xl font-medium">{item.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{item.shortDescription}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-3">
          {item.logo && (
            <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={item.logo || "/placeholder.svg"}
                alt={`${item.title} logo`}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
