"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { name: "홈", href: "/" },
  { name: "랭킹", href: "/rankings" },
  { name: "어워드", href: "/awards" },
]

export default function NavigationTabs() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="flex border-b border-[#e5e5e5] bg-white">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={`flex-1 py-3 text-sm font-bold relative text-center ${
            isActive(tab.href) ? "text-[#1a1a1a]" : "text-[#727171]"
          }`}
        >
          {tab.name}
          {isActive(tab.href) && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f39800]"></span>
          )}
        </Link>
      ))}
    </nav>
  )
}
