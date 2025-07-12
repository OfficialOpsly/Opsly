import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { PortfolioItem } from "@/utils/csv-parser"

interface PortfolioCardProps {
  item: PortfolioItem
}

export default function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <div className="card overflow-hidden rounded-3xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg h-full">
      <Link href={`/portfolio/${item.slug}`} className="block h-full flex flex-col">
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
          <div className="inline-flex items-center text-[#7A7FEE] hover:underline text-sm font-medium mt-auto">
            View Project <ArrowUpRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </Link>
    </div>
  )
}
