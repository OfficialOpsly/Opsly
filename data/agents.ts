export interface AgentCard {
  id: string
  name: string
  category: "Customer Support" | "Sales" | "Email" | "Custom"
  tagline: string // short first-person intro
  intro: string // 25–40 char quick joke
  description: string // 1–2 sentences
  heroImage: string // e.g. "/agents/email.png"
}
export const agents: AgentCard[] = [
  {
    id: "email-agent",
    name: "Ellie the Email Agent",
    category: "Email",
    tagline: "“I triage 500 emails before lunch.”",
    intro: "If you CC me, I’ll CC-ya later 😄",
    description: "Ellie classifies, drafts and schedules emails with perfect tone-matching and CRM sync.",
    heroImage: "/agents/email.png",
  },
  {
    id: "booking-agent",
    name: "Cal the Calendar Agent",
    category: "Customer Support",
    tagline: "“Meetings booked, humans hooked.”",
    intro: "I don’t get jet-lag, only jet-set.",
    description: "Cal answers calls & chats, checks availability and drops confirmed slots into Google Calendar.",
    heroImage: "/agents/booking.png",
  },
  {
    id: "sales-agent",
    name: "Sal the Sales Agent",
    category: "Sales",
    tagline: "“Closing deals while you sleep.”",
    intro: "My favourite drink? Conversion.",
    description: "Sal cold-calls leads, handles objections and pushes prospects into HubSpot or Salesforce.",
    heroImage: "/agents/sales.png",
  },
  // add more as needed
] 