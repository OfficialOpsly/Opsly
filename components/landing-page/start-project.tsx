"use client"

import { useEffect } from "react"
import Script from "next/script"
import { useTheme } from "next-themes"

export default function ContactForm() {
  const { resolvedTheme } = useTheme()

  // Function to load Tally embeds
  const loadTallyEmbeds = () => {
    if (typeof window !== "undefined" && window.Tally) {
      window.Tally.loadEmbeds()
    }
  }

  // Load Tally embeds when component mounts or theme changes
  useEffect(() => {
    loadTallyEmbeds()

    // Add a class to the iframe's parent element based on the current theme
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const iframe = document.querySelector("iframe[data-tally-src]")
          if (iframe) {
            // Set a data attribute on the iframe that can be used in CSS
            iframe.setAttribute("data-theme", resolvedTheme || "light")

            // Try to access the iframe content if possible
            try {
              const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
              if (iframeDoc && iframeDoc.documentElement) {
                iframeDoc.documentElement.setAttribute("data-theme", resolvedTheme || "light")
              }
            } catch (e) {
              console.log("Cannot access iframe content due to same-origin policy")
            }
          }
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [resolvedTheme])

  return (
    <div className="container mx-auto py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-10 text-center">
          <h2 className="text-black dark:text-white text-4xl md:text-6xl font-medium">
            Ready to Start <br />
            Your Next <span className="text-[#7A7FEE]">Project</span>?
          </h2>
          <p className="mt-6 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Answer some quick questions about your project and then schedule a call with your project manager.
          </p>
        </div>

        <div className="form-container max-w-xl mx-auto p-6 rounded-3xl bg-[#272829] shadow-md relative overflow-hidden">
          {/* Add the noise texture effect for consistency with other dark cards */}
          <div className="absolute inset-0 bg-[url('/noise-texture.png')] bg-repeat opacity-40 mix-blend-overlay pointer-events-none"></div>
          {/* Tally Script */}
          <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" onLoad={loadTallyEmbeds} />

          {/* Tally Form Embed */}
          <iframe
            data-tally-src={`https://tally.so/embed/w2E6e9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&theme=${
              resolvedTheme || "light"
            }`}
            loading="lazy"
            width="100%"
            height="500"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Contact Form"
            className="mx-auto rounded-lg bg-[#272829]"
          ></iframe>
          <style jsx>{`
            iframe {
              color-scheme: dark;
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}
