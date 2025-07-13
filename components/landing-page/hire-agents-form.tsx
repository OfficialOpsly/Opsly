"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { agents } from "@/data/agents"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const hireAgentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  agent: z.string().min(1, "Please select an agent"),
  details: z.string().optional(),
})

type HireAgentFormValues = z.infer<typeof hireAgentSchema>

export default function HireAgentsForm() {
  const form = useForm<HireAgentFormValues>({
    resolver: zodResolver(hireAgentSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      agent: "",
      details: "",
    },
  })

  async function onSubmit(values: HireAgentFormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      toast.success("Your request has been sent successfully!")
      form.reset()
    } catch (error) {
      toast.error("Failed to send your request. Please try again later.")
    }
  }

  return (
    <div className="container mx-auto py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-10 text-center">
          <h2 className="text-black dark:text-white text-4xl md:text-6xl font-medium">
            Ready to Hire an <span className="text-[#7A7FEE]">Agent</span>?
          </h2>
          <p className="mt-6 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Fill out the form below to request a demo and we'll be in touch shortly.
          </p>
        </div>

        <div className="form-container max-w-xl mx-auto p-6 rounded-3xl bg-white dark:bg-[#272829] shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise-texture.png')] bg-repeat opacity-10 dark:opacity-40 mix-blend-overlay pointer-events-none"></div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Your name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Work email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Phone (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Which agent are you interested in?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an agent" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agents.map((agent) => (
                          <SelectItem key={agent.id} value={agent.name}>
                            {agent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Extra details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us more about your needs..." className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#7A7FEE] hover:bg-opacity-90" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : "Request demo"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
