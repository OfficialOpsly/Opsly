import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="hero" className="card my-8 relative overflow-hidden shadow-md">
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start md:items-stretch">
        {/* Text content - takes full width on mobile */}
        <div className="w-full md:w-3/5 z-10">
          <h1 className="text-black dark:text-white">
            Hire AI Agents as
            <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Your Next Virtual</span>
            Assistant
          </h1>
          <p className="my-6 text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
            Opsly’s on‑demand AI agents handle your repetitive work, email triage, appointment booking and lead
            follow‑up, so you can focus on growth.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/agents" className="btn-primary">
              Browse Agents
            </Link>
            <Link href="/hire-agents" className="btn-secondary text-black dark:text-white">
              Request a Demo
            </Link>
          </div>
        </div>

        {/* Image on the right */}
        <div className="hidden w-full md:w-2/5 mt-8 md:mt-0 md:flex md:items-center md:justify-center">
          <Image
            src="/purple-circle-wave-static.png"
            alt="AI Agents"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}
