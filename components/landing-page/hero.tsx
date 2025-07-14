import Image from "next/image"
import ContactFormButton from "./contact-form-button"
import CallWidget from "../CallWidget"

export default function Hero() {
  return (
    <section id="hero" className="card my-8 relative overflow-hidden shadow-md">
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start md:items-stretch">
        {/* Text content - takes full width on mobile */}
        <div className="w-full md:w-3/5 z-10">
          <h1 className="text-black dark:text-white">
            Your AI-first
            <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Development</span>
            Partner
          </h1>
          <p className="my-6 text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
            We build high-quality, scalable platforms—client portals, marketplaces, AI automations, and SaaS—using the
            best tools for the job, no shortcuts.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <ContactFormButton />
            <a href="#services" className="btn-secondary text-black dark:text-white">
              Learn more
            </a>
          </div>
        </div>

        {/* CallWidget replaces the image on the right, centered vertically */}
        <div className="hidden md:flex md:w-2/5 md:items-center md:justify-center">
          <CallWidget />
        </div>
      </div>
    </section>
  )
}
