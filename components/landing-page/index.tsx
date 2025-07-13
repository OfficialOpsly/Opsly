import Header from "./header"
import Hero from "./hero"
import UseCases from "./use-cases"
import Services from "./services"
import Faq from "./faq"
import CallToAction from "./call-to-action"
import Footer from "./footer"
import HireAgentsForm from "./hire-agents-form"
import type { LandingPageProps } from "./types"

// Export individual components for flexible usage
export { Header, Hero, UseCases, Services, Faq, CallToAction, Footer, HireAgentsForm }

// Main component that combines all sections
export default function LandingPage({ showHeader = true, showFooter = true }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      {showHeader && <Header />}
      <div className="container pt-4">
        <Hero />
        <UseCases />
        <Services />
        <Faq />
        <CallToAction />
      </div>
      {showFooter && <Footer />}
    </main>
  )
}
