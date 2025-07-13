"use client"
import type { AgentCard as AgentCardType } from "@/data/agents"
import AgentCard from "./agent-card"

interface AgentGridProps {
  items: AgentCardType[]
}

export default function AgentMasonryGridFinal({ items }: AgentGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <AgentCard key={item.id} item={item} />
      ))}
    </div>
  )
}
