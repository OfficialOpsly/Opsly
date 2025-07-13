import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  agent: z.string().min(1, "Please select an agent"),
  details: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid request body", errors: parsed.error.errors },
        { status: 400 },
      )
    }

    const { name, company, email, phone, agent, details } = parsed.data

    // TODO: Replace with your actual SMTP credentials from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.example.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || "user@example.com",
        pass: process.env.SMTP_PASS || "password",
      },
    })

    const mailOptions = {
      from: `"Opsly" <${process.env.SMTP_USER || 'noreply@opsly.ca'}>`,
      to: "hello@opsly.ca",
      subject: "New Demo Request",
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Agent of Interest:</strong> ${agent}</p>
        ${details ? `<p><strong>Extra Details:</strong><br/>${details}</p>` : ""}
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Error sending email" }, { status: 500 })
  }
} 