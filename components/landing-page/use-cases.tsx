"use client"

import Link from "next/link"

export default function UseCases() {
  // TODO: Update this section with content from Opsly_OLD repository
  // – UseCases (Law firms …) as an industries section (grid or scroll).
  const useCases = [
    {
      title: "Law Firms",
      description: "Automate legal research and document analysis.",
    },
    {
      title: "Healthcare",
      description: "Streamline patient scheduling and medical billing.",
    },
    {
      title: "E-commerce",
      description: "Provide 24/7 customer support and personalized recommendations.",
    },
  ]

  return (
    <section id="use-cases" className="my-20">
      <h2 className="text-black dark:text-white mb-6">
        Trusted by companies in
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">every industry</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        Our AI agents are versatile and can be trained to handle a wide range of tasks across different sectors.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
            className="card overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-black dark:text-white">{useCase.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 mb-4">{useCase.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/agents" className="btn-primary">
          View All Agents
        </Link>
      </div>
    </section>
  )
}
