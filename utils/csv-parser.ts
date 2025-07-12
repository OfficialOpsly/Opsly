export interface PortfolioItem {
  slug: string
  title: string
  logo: string
  mainImage: string
  shortDescription: string
  projectUrl: string
  content: string
  sortOrder: string
  categories?: string[] // We'll add this for filtering
}

// Add a check for client-side environment at the top of the fetchPortfolioData function

export async function fetchPortfolioData(): Promise<PortfolioItem[]> {
  // Use a cache to avoid refetching the data multiple times
  if (typeof window !== "undefined" && (window as any).__portfolioCache) {
    return (window as any).__portfolioCache
  }

  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Portfolio%20-%20Framer-mvxI3JjsEZ2djSYSXPImlcckorStlA.csv",
      // Add cache: 'no-store' for server components to always fetch fresh data
      typeof window === "undefined" ? { cache: "no-store" } : undefined,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status}`)
    }

    const csvText = await response.text()
    const parsedData = parseCSV(csvText)

    // Cache the data on the client side
    if (typeof window !== "undefined") {
      ;(window as any).__portfolioCache = parsedData
    }

    return parsedData
  } catch (error) {
    console.error("Error fetching portfolio data:", error)
    return []
  }
}

function parseCSV(csvText: string): PortfolioItem[] {
  // Split the CSV into lines
  const lines = csvText.split("\n")

  // Extract headers (first line)
  const headers = lines[0].split(",").map((header) => header.trim().replace(/^"/, "").replace(/"$/, ""))

  // Map CSV columns to our interface properties
  const columnMap: Record<string, keyof PortfolioItem> = {
    Slug: "slug",
    Title: "title",
    Logo: "logo",
    "Main Image": "mainImage",
    "Short Description": "shortDescription",
    "Project URL": "projectUrl",
    Content: "content",
    "Sort Order": "sortOrder",
  }

  // Parse the data rows
  const items: PortfolioItem[] = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue // Skip empty lines

    // Handle CSV values that might contain commas within quotes
    const values: string[] = []
    let currentValue = ""
    let insideQuotes = false

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j]

      if (char === '"') {
        insideQuotes = !insideQuotes
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim().replace(/^"/, "").replace(/"$/, ""))
        currentValue = ""
      } else {
        currentValue += char
      }
    }

    // Add the last value
    values.push(currentValue.trim().replace(/^"/, "").replace(/"$/, ""))

    // Create the portfolio item
    const item: Partial<PortfolioItem> = {}

    // Map values to properties
    headers.forEach((header, index) => {
      const key = columnMap[header]
      if (key && index < values.length) {
        item[key] = values[index]
      }
    })

    // Add categories based on content or title for filtering
    item.categories = inferCategories(item as PortfolioItem)

    items.push(item as PortfolioItem)
  }

  // Sort by sortOrder
  return items.sort((a, b) => {
    return new Date(b.sortOrder).getTime() - new Date(a.sortOrder).getTime()
  })
}

function inferCategories(item: PortfolioItem): string[] {
  const categories: string[] = ["all"]

  // Add categories based on content keywords
  const contentLower = (item.content || "").toLowerCase()
  const titleLower = (item.title || "").toLowerCase()
  const descriptionLower = (item.shortDescription || "").toLowerCase()

  if (
    contentLower.includes("web3") ||
    contentLower.includes("blockchain") ||
    titleLower.includes("web3") ||
    descriptionLower.includes("web3") ||
    contentLower.includes("crypto") ||
    titleLower.includes("crypto")
  ) {
    categories.push("web3")
  }

  if (
    contentLower.includes("bubble") ||
    contentLower.includes("no-code") ||
    contentLower.includes("nocode") ||
    contentLower.includes("no code")
  ) {
    categories.push("bubble")
  }

  if (
    contentLower.includes("ai") ||
    contentLower.includes("artificial intelligence") ||
    titleLower.includes("ai") ||
    descriptionLower.includes("ai")
  ) {
    categories.push("ai")
  }

  if (
    contentLower.includes("mobile") ||
    contentLower.includes("ios") ||
    contentLower.includes("android") ||
    titleLower.includes("app")
  ) {
    categories.push("mobile")
  }

  if (
    contentLower.includes("design") ||
    contentLower.includes("ui") ||
    contentLower.includes("ux") ||
    contentLower.includes("interface")
  ) {
    categories.push("design")
  }

  // Default to "web" if no specific category is found
  if (categories.length === 1) {
    categories.push("web")
  }

  return categories
}
