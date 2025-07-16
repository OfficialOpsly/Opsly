import Image from "next/image"
import Link from "next/link"
import type { AgentCard as AgentCardType } from "@/data/agents"

interface AgentCardProps {
  item: AgentCardType
  source?: "home"
}

export default function AgentCard({ item, source }: AgentCardProps) {
  const href = source === "home" ? `/agents/${item.id}?from=home` : `/agents/${item.id}`
  return (
    <div className="card overflow-hidden rounded-3xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg h-full">
      <Link href={href} className="block h-full flex flex-col">
        <div className="flex items-center justify-center p-4 pt-6 bg-gray-100 dark:bg-gray-800 relative">
          <Image
            src={item.heroImage || "/placeholder.svg?height=600&width=800&query=project"}
            alt={item.name}
            width={600}
            height={400}
            className="w-full h-auto object-contain max-h-[220px]"
          />
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-xs text-gray-800 dark:text-white">
              {item.category}
            </span>
          </div>
        </div>

        <div className="p-4 md:p-6 flex flex-col flex-grow">
          <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2">{item.name}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{item.tagline}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{item.intro}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-grow">{item.description}</p>
        </div>
      </Link>
    </div>
  )
}
