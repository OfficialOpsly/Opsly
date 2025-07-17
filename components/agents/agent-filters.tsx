"use client"

interface AgentFiltersProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export default function AgentFilters({ activeFilter, setActiveFilter }: AgentFiltersProps) {
  const filters = [
    { id: "All Agents", label: "All Agents" },
    { id: "Customer Support", label: "Customer Support" },
    { id: "Sales", label: "Sales" },
    { id: "Email", label: "Email" },
    { id: "Custom", label: "Finance" },
    { id: "Custom", label: "Custom" },
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
