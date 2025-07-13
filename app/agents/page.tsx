import AgentsView from "@/components/agents/agents-page"
import { agents } from "@/data/agents"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agents | Opsly",
  description:
    "Browse Opsly’s ready-to-hire AI agents. Each one has a unique skill-set, personality and API integration.",
}

export default async function AgentsPage() {
  return <AgentsView initialData={agents} />
}
