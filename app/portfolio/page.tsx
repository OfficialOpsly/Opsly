import PortfolioPage from "@/components/portfolio/portfolio-page"
import { fetchPortfolioData } from "@/utils/csv-parser"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio | Automatic",
  description:
    "Explore our latest projects and case studies. From AI-driven automation to custom marketplaces, our work helps businesses scale smarter.",
}

export default async function Portfolio() {
  const portfolioData = await fetchPortfolioData()

  return <PortfolioPage initialData={portfolioData} />
}
