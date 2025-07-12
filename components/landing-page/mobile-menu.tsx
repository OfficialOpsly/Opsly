"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, ExternalLink, X } from "lucide-react"
import { useTheme } from "next-themes"
import { resourcesDropdownData } from "./nav-data"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && resolvedTheme === "dark"

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const toggleDropdown = (dropdown: string) => {
    setExpandedDropdown(expandedDropdown === dropdown ? null : dropdown)
  }

  if (!isOpen) return null

  // Determine which logo to show based on theme
  const logoSrc = isDarkMode ? "/logo-light.png" : "/logo-dark.png"

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 md:hidden" style={{ display: isOpen ? "block" : "none" }}>
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-[#111111] shadow-xl overflow-y-auto"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111111]">
          <Link href="/" className="flex items-center" onClick={onClose}>
            {mounted ? (
              <Image
                src={logoSrc || "/placeholder.svg"}
                alt="Automatic Logo"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            ) : (
              <div className="h-8 w-[150px]" />
            )}
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                className={`flex items-center py-3 px-4 rounded-lg text-base ${
                  pathname === "/"
                    ? "bg-[#7A7FEE]/10 text-[#7A7FEE]"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={onClose}
              >
                Home
              </Link>
            </li>

            {/* Resources Dropdown */}
            <li className="border-b border-gray-200 dark:border-gray-800 pb-1">
              <button
                onClick={() => toggleDropdown("resources")}
                className={`flex items-center justify-between w-full py-3 px-4 rounded-lg text-base ${
                  pathname.startsWith("/resources")
                    ? "bg-[#7A7FEE]/10 text-[#7A7FEE]"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>Resources</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${expandedDropdown === "resources" ? "rotate-180" : ""}`}
                />
              </button>

              {expandedDropdown === "resources" && (
                <div className="pt-2 pb-3 px-4">
                  {resourcesDropdownData.map((column, colIndex) => (
                    <div key={colIndex} className="mb-4">
                      {column.map((item, itemIndex) =>
                        item.external ? (
                          <a
                            key={`${colIndex}-${itemIndex}`}
                            href={item.href}
                            className="flex items-center gap-3 py-3 group"
                            onClick={onClose}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${
                                item.color || "bg-gray-100 dark:bg-gray-800"
                              }`}
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
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-gray-400" />
                              </div>
                              {item.description && (
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                              )}
                            </div>
                          </a>
                        ) : (
                          <Link
                            key={`${colIndex}-${itemIndex}`}
                            href={item.href}
                            className="flex items-center gap-3 py-3 group"
                            onClick={onClose}
                          >
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center ${
                                item.color || "bg-gray-100 dark:bg-gray-800"
                              }`}
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
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h3>
                              {item.description && (
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                              )}
                            </div>
                          </Link>
                        ),
                      )}
                    </div>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link
                href="/portfolio"
                className={`flex items-center py-3 px-4 rounded-lg text-base ${
                  pathname === "/portfolio"
                    ? "bg-[#7A7FEE]/10 text-[#7A7FEE]"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={onClose}
              >
                Portfolio
              </Link>
            </li>

            <li>
              <Link
                href="/start"
                className={`flex items-center py-3 px-4 rounded-lg text-base ${
                  pathname === "/start"
                    ? "bg-[#7A7FEE]/10 text-[#7A7FEE]"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={onClose}
              >
                Start Project
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 mt-4 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/contact"
            className="flex items-center justify-center w-full py-3 px-4 bg-[#7A7FEE] text-white rounded-lg text-base font-medium hover:bg-opacity-90 transition-colors"
            onClick={onClose}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
