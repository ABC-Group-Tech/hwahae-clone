"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const tabs = [
  { name: "홈", href: "/" },
  { name: "랭킹", href: "/rankings" },
  { name: "어워드", href: "/awards" },
]

interface AwardsHeaderProps {
  activeTab?: string
}

export default function AwardsHeader({ activeTab = "어워드" }: AwardsHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white">
      {/* Logo and Search Icon */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <Image src="/logo2.png" alt="ABCPharm" width={28} height={28} />
          <h1 className="text-2xl tracking-tight text-[#727171] leading-none">
            <span className="font-extrabold">ABC</span>
            <span className="font-light">Pharm</span>
          </h1>
        </Link>

        {/* Search Icon */}
        <Link href="/search" aria-label="검색">
          <Search className="w-5 h-5 text-[#727171]" />
        </Link>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex border-b border-[#e5e5e5] bg-white">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            prefetch={false}
            className={`flex-1 py-3 text-sm font-bold relative text-center ${
              activeTab === tab.name ? "text-[#1a1a1a]" : "text-[#727171]"
            }`}
          >
            {tab.name}
            {activeTab === tab.name && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f39800]" />}
          </Link>
        ))}
      </nav>
    </div>
  )
}
