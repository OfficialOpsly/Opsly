"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "What can I expect when we work together?",
    answer:
      "We start with a discovery call to understand your needs, then provide a detailed proposal with timeline and cost estimates. Once approved, we begin development with regular updates and feedback sessions.",
  },
  {
    id: 2,
    question: "How long do projects take to build?",
    answer:
      "Project timelines vary based on complexity. Simple websites might take 2-4 weeks, while complex platforms can take 3-6 months. We provide detailed timelines during the proposal phase.",
  },
  {
    id: 3,
    question: "What tools do you use to build?",
    answer:
      "We use modern frameworks like React, Next.js, and Node.js, along with AI tools and cloud services. Our stack is tailored to each project's specific requirements.",
  },
  {
    id: 4,
    question: "How much does a typical project cost?",
    answer:
      "Project costs vary widely based on requirements. Simple websites start around $5,000, while complex platforms can range from $25,000 to $100,000+. We provide detailed quotes after our discovery process.",
  },
  {
    id: 5,
    question: "How do you manage payments?",
    answer:
      "We typically work with a 50% upfront deposit and the remaining 50% upon project completion. For larger projects, we may establish milestone-based payment schedules.",
  },
  {
    id: 6,
    question: "Can you manage my app's technical support with users?",
    answer:
      "Yes, we offer ongoing technical support and maintenance packages. These can include user support, bug fixes, feature updates, and performance monitoring.",
  },
]

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section id="faq" className="my-20">
      <div className="card p-8 md:p-10 shadow-lg">
        <h2 className="text-black dark:text-white mb-6">
          Frequently Asked
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Questions</span>
        </h2>
        <p className="mb-8 max-w-2xl text-gray-700 dark:text-gray-300">
          Have questions about our services? Find answers to the most common questions and learn how our team can
          enhance your creative process.
        </p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b pb-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                aria-expanded={openItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openItem === faq.id ? "rotate-180 text-[#7A7FEE]" : ""}`}
                />
              </button>
              {openItem === faq.id && (
                <div id={`faq-answer-${faq.id}`} className="mt-2 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
