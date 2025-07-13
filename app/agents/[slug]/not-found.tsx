import Link from "next/link"
import Header from "@/components/landing-page/header"
import Footer from "@/components/landing-page/footer"
import { ArrowLeft } from "lucide-react"

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Agent Not Found</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Sorry, we couldn't find the agent you were looking for.
        </p>
        <div className="mt-8">
          <Link
            href="/agents"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#7A7FEE] hover:bg-opacity-90"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Agents
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
