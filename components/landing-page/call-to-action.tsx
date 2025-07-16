import Link from "next/link"

export default function CallToAction() {
  return (
    <section id="contact" className="card my-20 relative overflow-hidden shadow-md text-center">
      <div className="p-8 md:p-10 lg:p-12">
        <h2 className="text-black dark:text-white mb-6">
          Ready to build your
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">custom AI workforce?</span>
        </h2>
        <p className="my-6 text-sm md:text-base max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Don't see the right agent for the job? Our team can help you design, build, and deploy AI agents tailored to
          your specific business needs. Let's discuss your perfect solution.
        </p>
        <div>
          <Link href="/hire-agents" className="btn-primary">
            Request a Demo
          </Link>
        </div>
      </div>
    </section>
  )
}
