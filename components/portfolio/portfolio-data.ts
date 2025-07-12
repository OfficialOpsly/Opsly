export interface PortfolioItem {
  id: number
  type: "image" | "video" | "text"
  title: string
  subtitle?: string
  content?: string
  image?: string
  link?: string
  size?: "normal" | "large"
  categories: string[]
  label?: string
  author?: string
  date?: string
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    type: "image",
    title: "Structur",
    subtitle: "Construction Management Platform",
    image: "/projects/structur.png",
    link: "/portfolio/structur",
    size: "normal",
    categories: ["web", "bubble"],
  },
  {
    id: 2,
    type: "text",
    title:
      "We're a digital-forward agency focused on delivering unsurpassed designs & known for innovative use of technology.",
    size: "large",
    categories: ["all"],
    label: "ABOUT US",
  },
  {
    id: 3,
    type: "image",
    title: "Vibrant",
    subtitle: "AI-powered Design Tool",
    image: "/projects/vibrant.png",
    link: "/portfolio/vibrant",
    size: "normal",
    categories: ["web", "ai"],
  },
  {
    id: 4,
    type: "text",
    title: "Year of Upheaval for Apartments in Brooklyn",
    content:
      "He who searches for meaning here will be sorely disappointed. These words are here to provide the reader with a basic impression of how actual text will appear in this final.",
    size: "normal",
    categories: ["all"],
    label: "ARTICLE",
    author: "Admin",
    date: "September 14, 2023",
  },
  {
    id: 5,
    type: "image",
    title: "Flightpath",
    subtitle: "Career Development Platform",
    image: "/projects/flightpath.png",
    link: "/portfolio/flightpath",
    size: "normal",
    categories: ["web", "bubble"],
  },
  {
    id: 6,
    type: "video",
    title: "Agency Reel of 2023",
    subtitle: "Our best work from the past year",
    image: "/agency-projects-thumbnail.png",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    size: "normal",
    categories: ["design"],
    label: "VIDEO",
  },
  {
    id: 7,
    type: "image",
    title: "BMW Admin Dashboard",
    subtitle: "Fleet Management System",
    image: "/data-dashboard.png",
    link: "/portfolio/bmw-dashboard",
    size: "large",
    categories: ["web", "design"],
  },
  {
    id: 8,
    type: "text",
    title: "Looking for an Apprenticeship this Summer?",
    content:
      "This is not meant to be read. It may sound intriguing but is merely filler to demonstrate the look and feel of finished text. He who searches for meaning here will be sorely disappointed.",
    size: "normal",
    categories: ["all"],
    label: "ARTICLE",
    author: "Admin",
    date: "September 12, 2023",
  },
  {
    id: 9,
    type: "image",
    title: "Our Office in NY",
    subtitle: "Where the magic happens",
    image: "/modern-office.png",
    link: "/contact",
    size: "normal",
    categories: ["all"],
  },
  {
    id: 10,
    type: "text",
    title: "GQ Magazine: What's New in 2023",
    content:
      "This is not meant to be read. He who searches for meaning here will be sorely disappointed. These words are here to provide the reader with a basic impression of how actual text will appear in its final.",
    size: "normal",
    categories: ["all"],
    label: "ARTICLE",
    author: "Admin",
    date: "September 13, 2023",
  },
  {
    id: 11,
    type: "image",
    title: "Wireless. Magical. AirPods.",
    subtitle: "E-commerce Product Page",
    image: "/placeholder.svg?height=600&width=800&query=airpods with iphone on dark background",
    link: "/portfolio/apple-ecommerce",
    size: "normal",
    categories: ["web", "design"],
  },
  {
    id: 12,
    type: "text",
    title: "Looking for Inspiration?",
    content:
      "He who searches for meaning here will be sorely disappointed. These words are here to provide the reader with a basic impression of how actual text will appear in its final.",
    size: "normal",
    categories: ["all"],
    label: "RESOURCE",
    author: "Admin",
    date: "September 14, 2023",
  },
  {
    id: 13,
    type: "image",
    title: "The iPhone 7",
    subtitle: "Product Launch Campaign",
    image: "/placeholder.svg?height=600&width=800&query=iphone 7 being held in hand",
    link: "/portfolio/iphone-campaign",
    size: "normal",
    categories: ["design"],
  },
  {
    id: 14,
    type: "image",
    title: "'Just do it' Concept",
    subtitle: "Nike Campaign",
    image: "/placeholder.svg?height=600&width=800&query=runner with nike shoes on track",
    link: "/portfolio/nike-campaign",
    size: "normal",
    categories: ["design"],
  },
  {
    id: 15,
    type: "text",
    title: "Follow us on Facebook",
    content: "Stay updated with our latest projects and news.",
    size: "normal",
    categories: ["all"],
    label: "FACEBOOK",
    link: "https://facebook.com",
  },
]
