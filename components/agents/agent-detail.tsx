"use client"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"
import type { AgentCard as AgentCardType } from "@/data/agents"

interface AgentDetailProps {
  agent: AgentCardType
}

export default function AgentDetail({ agent }: AgentDetailProps) {
  const searchParams = useSearchParams()
  const fromHome = searchParams.get("from") === "home"

  const backLinkHref = fromHome ? "/" : "/agents"
  const backLinkText = fromHome ? "Back to Home" : "Back to Agents"

  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />
      <div className="container py-12">
        <div className="mb-8">
          <Link
            href={backLinkHref}
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLinkText}
          </Link>
        </div>

        {/* Responsive column-reverse on mobile */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <div className="bg-white dark:bg-[#272829] p-6 rounded-3xl card">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{agent.name}</h1>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{agent.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Category</h3>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-800 dark:text-gray-200">
                  {agent.category}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">{agent.tagline}</p>
                <p className="text-gray-700 dark:text-gray-300">{agent.intro}</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-4 flex items-center justify-center">
            <Image
              src={agent.heroImage || "/placeholder.svg?height=600&width=800&query=project"}
              alt={agent.name}
              width={1200}
              height={675}
              className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px] lg:max-h-[600px]"
              priority
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
