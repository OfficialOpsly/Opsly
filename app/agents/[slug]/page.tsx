import AgentDetailView from "@/components/agents/agent-detail"
import { getAgentBySlug, getAgentPaths } from "@/lib/agents"
import { type Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const paths = await getAgentPaths()
  return paths
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const agent = await getAgentBySlug(params.slug)

  if (!agent) {
    return {
      title: "Agent Not Found | Opsly",
    }
  }

  return {
    title: `${agent.name} | Opsly`,
    description: agent.description,
    openGraph: {
      title: `${agent.name} | Opsly`,
      description: agent.description,
      images: [
        {
          url: agent.heroImage,
          width: 1200,
          height: 630,
          alt: agent.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${agent.name} | Opsly`,
      description: agent.description,
      images: [agent.heroImage],
    },
  }
}

export default async function AgentDetailPage({ params }: { params: { slug: string } }) {
  const agent = await getAgentBySlug(params.slug)

  if (!agent) {
    notFound()
  }

  return <AgentDetailView agent={agent} />
}
