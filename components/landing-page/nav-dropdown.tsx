"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ExternalLink } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export interface SubNavItem {
  title: string
  description?: string
  href: string
  icon?: React.ComponentType<{ className?: string }> | string
  color?: string
  external?: boolean
}

export interface NavDropdownProps {
  trigger: string
  columns?: number
  items: SubNavItem[][]
  className?: string
  align?: "center" | "start" | "end"
}

export default function NavDropdown({
  trigger,
  columns = 1, // Default to 1 column now
  items,
  className = "",
  align = "start", // Changed default to start for alignment below parent
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownWidth, setDropdownWidth] = useState(0)
  const [xOffset, setXOffset] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const { resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && dropdownRef.current && triggerRef.current) {
      // Set width for a single column
      const width = 320 // Fixed width for single column
      setDropdownWidth(width)

      // Get viewport width
      const viewportWidth = window.innerWidth

      // Get trigger button position
      const triggerRect = triggerRef.current.getBoundingClientRect()

      // For start alignment, position at the left edge of the trigger
      const idealLeft = triggerRect.left

      // Adjust if it would go off screen
      const minLeft = 16 // 1rem margin from left edge
      const maxLeft = viewportWidth - width - 16 // 1rem margin from right edge

      const adjustedLeft = Math.max(minLeft, Math.min(idealLeft, maxLeft))

      // Calculate offset from trigger left position
      const offset = adjustedLeft - triggerRect.left
      setXOffset(offset)
    }
  }, [isOpen, columns, dropdownRef, triggerRef, align])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown when pressing escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        // Recalculate position on resize
        if (dropdownRef.current && triggerRef.current) {
          const width = 320 // Fixed width for single column
          setDropdownWidth(width)

          const viewportWidth = window.innerWidth
          const triggerRect = triggerRef.current.getBoundingClientRect()

          // For start alignment, position at the left edge of the trigger
          const idealLeft = triggerRect.left

          const minLeft = 16
          const maxLeft = viewportWidth - width - 16

          const adjustedLeft = Math.max(minLeft, Math.min(idealLeft, maxLeft))
          const offset = adjustedLeft - triggerRect.left
          setXOffset(offset)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isOpen, align])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        className={`flex items-center gap-1 transition-colors ${
          isOpen
            ? "text-[#7A7FEE] dark:text-[#7A7FEE]"
            : "text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE]"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-[#7A7FEE]" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 mt-2 p-6 rounded-xl shadow-lg 
              ${isDarkMode ? "bg-[#272829] border border-gray-700" : "bg-white border border-gray-100"}`}
            style={{
              width: `${dropdownWidth}px`,
              maxWidth: "calc(100vw - 2rem)",
              transform: `translateX(${xOffset}px)`,
              left: "0", // Align to the left edge of the parent
            }}
            onMouseLeave={closeDropdown}
          >
            {items.map((column, colIndex) => (
              <div key={colIndex} className="space-y-6">
                {column.map((item, itemIndex) => (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 * itemIndex }}
                    key={`${colIndex}-${itemIndex}`}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-3 group"
                        onClick={closeDropdown}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${
                            item.color || "bg-gray-100 dark:bg-gray-800"
                          } shadow-sm group-hover:shadow-md transition-all duration-200`}
                        >
                          {typeof item.icon === "string" ? (
                            <Image
                              src={item.icon || "/placeholder.svg"}
                              alt=""
                              width={24}
                              height={24}
                              className="w-6 h-6 object-contain"
                            />
                          ) : item.icon ? (
                            <item.icon className="w-5 h-5 text-white" />
                          ) : null}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE] transition-colors duration-200">
                              {item.title}
                            </h3>
                            <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-gray-400 group-hover:text-[#7A7FEE]" />
                          </div>
                          {item.description && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                          )}
                        </div>
                      </a>
                    ) : (
                      <Link href={item.href} className="flex items-start gap-3 group" onClick={closeDropdown}>
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${
                            item.color || "bg-gray-100 dark:bg-gray-800"
                          } shadow-sm group-hover:shadow-md transition-all duration-200`}
                        >
                          {typeof item.icon === "string" ? (
                            <Image
                              src={item.icon || "/placeholder.svg"}
                              alt=""
                              width={24}
                              height={24}
                              className="w-6 h-6 object-contain"
                            />
                          ) : item.icon ? (
                            <item.icon className="w-5 h-5 text-white" />
                          ) : null}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#7A7FEE] dark:group-hover:text-[#7A7FEE] transition-colors duration-200">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                          )}
                        </div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
