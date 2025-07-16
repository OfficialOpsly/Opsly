"use client"

import Link from "next/link"
import { agents } from "@/data/agents"
import AgentCard from "../agents/agent-card"

export default function UseCases() {
  const featuredAgents = agents.slice(0, 3)

  return (
    <section id="use-cases" className="my-20">
      <div className="text-center md:text-left">
        <h2 className="text-black dark:text-white mb-6">
          Meet a few of
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">our Agents</span>
        </h2>
        <p className="mb-12 max-w-2xl mx-auto md:mx-0 text-gray-700 dark:text-gray-300">
          Our AI agents are versatile and can be trained to handle a wide range of tasks across different sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredAgents.map((agent) => (
          <AgentCard key={agent.id} item={agent} source="home" />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/agents" className="btn-primary">
          View All Agents
        </Link>
      </div>
    </section>
  )
}
