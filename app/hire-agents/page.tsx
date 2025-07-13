import Header from "@/components/landing-page/header"
import HireAgentsForm from "@/components/landing-page/hire-agents-form"
import Footer from "@/components/landing-page/footer"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Hire an Agent | Opsly",
  description: "Request a demo to see how our AI agents can help your business.",
}

export default function HireAgentsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#101112]">
      <Header />
      <HireAgentsForm />
      <Footer />
    </main>
  )
}
