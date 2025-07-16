import { CircleDot, Layers, Rocket } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Law Firms",
    description: "Automate legal research and document analysis.",
  },
  {
    id: 2,
    title: "Healthcare",
    description: "Streamline patient scheduling and medical billing.",
  },
  {
    id: 3,
    title: "E-commerce",
    description: "Provide 24/7 customer support and personalized recommendations.",
  },
]

export default function Services() {
  return (
    <section id="services" className="my-20">
      <div className="text-center md:text-left">
        <h2 className="text-black dark:text-white mb-6">
          Trusted by companies in
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">every industry</span>
        </h2>
        <p className="mb-12 max-w-2xl mx-auto md:mx-0 text-gray-700 dark:text-gray-300">
          Our AI agents are versatile and can be trained to handle a wide range of tasks across different sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="card p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{service.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
