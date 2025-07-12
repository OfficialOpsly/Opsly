import Header from "./header"
import Hero from "./hero"
import Projects from "./projects"
import Services from "./services"
import Faq from "./faq"
import CallToAction from "./call-to-action"
import Footer from "./footer"
import ContactFormButton from "./contact-form-button"
import StartProject from "./start-project"
import type { LandingPageProps } from "./types"

// Export individual components for flexible usage
export { Header, Hero, Projects, Services, Faq, CallToAction, Footer, ContactFormButton, StartProject }

// Main component that combines all sections
export default function LandingPage({ showHeader = true, showFooter = true }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      {showHeader && <Header />}
      <div className="container pt-4">
        <Hero />
        <Projects />
        <Services />
        <Faq />
        <CallToAction />
      </div>
      {showFooter && <Footer />}
    </main>
  )
}
