import { CircleDot, Layers, Rocket } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Discovery",
    description: "Share your project details and help us see your vision.",
    icon: CircleDot,
    color: "bg-[#7A7FEE]",
  },
  {
    id: 2,
    title: "Build",
    description: "We craft scalable, reliable solutions using the best tools for the job.",
    icon: Layers,
    color: "bg-[#7A7FEE]",
  },
  {
    id: 3,
    title: "Launch + Iterate",
    description: "Seamlessly integrate, optimize, and expand as your business evolves.",
    icon: Rocket,
    color: "bg-[#7A7FEE]",
  },
]

export default function Services() {
  return (
    <section id="services" className="my-20">
      <h2 className="text-black dark:text-white mb-6">
        Unleash Your
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Business</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        We build custom platforms and AI-powered tools to simplify your operations and help you scale. Our process makes
        it easy to bring your ideas to life.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="card p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className={`${service.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm`}>
              <service.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{service.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
