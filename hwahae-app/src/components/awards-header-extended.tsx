"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const tabs = [
  { name: "홈", href: "/" },
  { name: "랭킹", href: "/rankings" },
  { name: "어워드", href: "/awards" },
]

interface AwardsHeaderExtendedProps {
  activeTab?: string
}

export default function AwardsHeaderExtended({
  activeTab = "어워드",
}: AwardsHeaderExtendedProps) {
  return (
    <div className="sticky top-0 z-50 bg-white">
      {/* Logo and Icons - Always visible */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <Image src="/logo2.png" alt="ABCPharm" width={28} height={28} />
          <h1 className="text-2xl tracking-tight text-[#727171] leading-none">
            <span className="font-extrabold">ABC</span>
            <span className="font-light">Pharm</span>
          </h1>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <Link href="/search" aria-label="검색">
            <Search className="w-5 h-5 text-[#727171]" />
          </Link>
        </div>
      </div>

      {/* Navigation Tabs - Always visible */}
      <nav className="px-5 py-[13px] flex items-center gap-6 border-b border-[#E8E8E8] bg-white">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={`text-base ${
              activeTab === tab.name ? "text-[#1a1a1a] font-semibold" : "text-[#727171]"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
