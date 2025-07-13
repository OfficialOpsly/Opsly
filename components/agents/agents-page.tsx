"use client"

import { useState, useEffect } from "react"
import AgentMasonryGridFinal from "./agent-masonry-grid-final"
import AgentFilters from "./agent-filters"
import type { AgentCard as AgentCardType } from "@/data/agents"
import Header from "../landing-page/header"
import Footer from "../landing-page/footer"

interface AgentsPageProps {
  initialData: AgentCardType[]
}

export default function AgentsPage({ initialData }: AgentsPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All Agents")
  const [isLoading, setIsLoading] = useState(true)

  // Add a loading state to prevent layout shifts
  useEffect(() => {
    // Simulate loading of images
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const filteredItems =
    activeFilter === "All Agents"
      ? initialData
      : initialData.filter((item) => item.category === activeFilter)

  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />
      <div className="container pt-8 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-medium text-black dark:text-white mb-4">
            Our <span className="text-[#7A7FEE]">Agents</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
            Browse Opsly’s ready-to-hire AI agents. Each one has a unique skill-set, personality and API integration.
          </p>
        </div>

        <AgentFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 h-80"
              ></div>
            ))}
          </div>
        ) : (
          <AgentMasonryGridFinal items={filteredItems} />
        )}
      </div>
      <Footer />
    </main>
  )
}
