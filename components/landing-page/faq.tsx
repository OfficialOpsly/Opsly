"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 1,
    q: "How long does it take to deploy an agent?",
    a: "Your first agent is live within 48 hours once we have system access.",
  },
  {
    id: 2,
    q: "Can I train an agent on my proprietary data?",
    a: "Yes, we fine-tune on your docs, knowledge base or CRM transcripts.",
  },
  {
    id: 3,
    q: "What if the agent goes off-script?",
    a: "24/7 monitoring & free retraining or rollback if it misbehaves.",
  },
  {
    id: 4,
    q: "Do I need a credit card to try?",
    a: "No. Book a 15-min call and we’ll spin up a sandbox agent for free.",
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
          Have questions about our services? Find answers to the most common questions and learn how our AI agents can help your business.
        </p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b pb-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors transform hover:scale-105 transition"
                aria-expanded={openItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openItem === faq.id ? "rotate-180 text-[#7A7FEE]" : ""}`}
                />
              </button>
              {openItem === faq.id && (
                <div id={`faq-answer-${faq.id}`} className="mt-2 text-gray-700 dark:text-gray-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
