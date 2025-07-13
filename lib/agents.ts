import { agents } from "@/data/agents"

export async function getAgentBySlug(slug: string) {
  return agents.find((agent) => agent.id === slug)
}

export async function getAgentPaths() {
  return agents.map((agent) => ({
    slug: agent.id,
  }))
} 