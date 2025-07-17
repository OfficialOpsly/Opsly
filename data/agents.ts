export interface AgentCard {
  id: string
  name: string
  category: "Customer Support" | "Sales" | "Email" | "Finance" | "Custom"
  tagline: string // short first-person intro
  intro: string // 25–40 char quick joke
  description: string // 1–2 sentences
  heroImage: string // e.g. "/agents/email.png"
}
export const agents: AgentCard[] = [
  {
    id: "customer-service-agent",
    name: "Cimo the Customer Service Agent",
    category: "Customer Support",
    tagline: "Meetings booked, humans hooked.",
    intro: "Front desk vibes, backend skills",
    description: "Cimo is on the line with customers 24/7, logging requests, checking availability and booking meeting directly into your Google calander. Always accurate, always on time.",
    heroImage: "/customer-service-agent.png"
  },
  {
    id: "sales-agent",
    name: "Sal the Sales Agent",
    category: "Sales",
    tagline: "“Closing deals while you sleep.”",
    intro: "My favourite drink? Conversion.",
    description: "Sal cold-calls leads, handles objections and pushes prospects into HubSpot or Salesforce.",
    heroImage: "/sales-agent.png",
  },
  {
    id: "email-agent",
    name: "Ellie the Email Agent",
    category: "Email",
    tagline: "“I triage 500 emails before lunch.”",
    intro: "If you CC me, I’ll CC-ya later 😄",
    description: "Ellie classifies, drafts and schedules emails with perfect tone-matching and CRM sync.",
    heroImage: "/email-agent.png",
  },
  {
    id: "recruiter-agent",
    name: "Rhea the Recruiter Agent",
    category: "Customer Support",
    tagline: "“I screen resumes like Netflix.”",
    intro: "I find talent before HR wakes up.",
    description: "Rhea pre-screens applicants, books interviews, and updates hiring pipelines so your team doesn't have to.",
    heroImage: "/recruiter-agent.png",
  },
  {
    id: "finance-agent",
    name: "Finny the Finance Agent",
    category: "Finance",
    tagline: "“I budget like a boss.”",
    intro: "Money talks. I listen.",
    description: "Finny checks transactions, flags issues, and offers budgeting tips or investment nudges. Your wallet’s BFF.",
    heroImage: "/finance-agent.png",
  },
  {
    id: "faq-agent",
    name: "Sandra the FAQ Agent",
    category: "Customer Support",
    tagline: "“I answer before they ask.”",
    intro: "I never say 'I'll get back to you on that.'",
    description: "Sandra answers top customer questions 24/7, from return policies to business hours—no human wait time.",
    heroImage: "/faq-agent.png",
  },
  {
    id: "followup-agent",
    name: "Faye the Follow-Up Agent",
    category: "Sales",
    tagline: "“No lead left behind.”",
    intro: "I chase leads so you don’t have to.",
    description: "Faye follows up on quotes, abandoned carts, or stale leads—nudging them toward conversion gently but persistently.",
    heroImage: "/followup-agent.png",
  },
  {
    id: "concierge-agent",
    name: "Connie the Concierge Agent",
    category: "Customer Support",
    tagline: "“Requests handled with flair.”",
    intro: "Front desk vibes, backend skills.",
    description: "Connie fields customer calls, logs requests, and coordinates services—like a hotel concierge, but scalable.",
    heroImage: "/concierge-agent.png",
  }
]