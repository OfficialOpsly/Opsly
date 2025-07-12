"use client"

interface PortfolioFiltersProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export default function PortfolioFilters({ activeFilter, setActiveFilter }: PortfolioFiltersProps) {
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Applications" },
    { id: "web3", label: "Web3 & Blockchain" },
    { id: "ai", label: "AI Solutions" },
    { id: "design", label: "UX/UI Design" },
    { id: "bubble", label: "Bubble Projects" },
    { id: "mobile", label: "Mobile Apps" },
  ]

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${
            activeFilter === filter.id
              ? "bg-[#7A7FEE] text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
