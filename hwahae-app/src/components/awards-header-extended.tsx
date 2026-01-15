"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const tabs = [
  { name: "홈", href: "/" },
  { name: "랭킹", href: "/rankings" },
  { name: "어워드", href: "/awards" },
]

const awardTabs = [
  { id: "hall-of-fame", name: "명예의 전당", href: "/awards/hall-of-fame" },
  { id: "beauty-awards", name: "뷰티 어워드", href: "/awards/beauty" },
  { id: "best-new", name: "베스트 신제품", href: "/awards/best-new" },
  { id: "efficacy", name: "효능/효과", href: "/awards/efficacy" },
  { id: "vegan", name: "비건", href: "/awards/vegan" },
  { id: "next-beauty", name: "넥스트 뷰티", href: "/awards/next-beauty" },
]

const years = ["2025", "2024", "2023", "2022"]

const SCROLL_THRESHOLD = 60 // 로고 영역 숨김 임계값

interface AwardsHeaderExtendedProps {
  activeTab?: string
  activeAwardTab?: string
  selectedYear?: string
  onYearChange?: (year: string) => void
}

export default function AwardsHeaderExtended({
  activeTab = "어워드",
  activeAwardTab = "",
  selectedYear = "2025",
  onYearChange,
}: AwardsHeaderExtendedProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD)
    lastScrollY.current = currentScrollY
    ticking.current = false
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState)
        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [updateScrollState])

  return (
    <div className="sticky top-0 z-50 bg-white">
      {/* Logo and Icons - Hidden when scrolled */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isScrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
        )}
      >
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
            <Link href="/cart" aria-label="장바구니">
              <ShoppingCart className="w-5 h-5 text-[#727171]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Always visible */}
      <nav className="px-5 py-[13px] flex items-center gap-6 border-b border-[#E8E8E8] bg-white transition-all duration-300 ease-in-out overflow-hidden max-h-[60px] opacity-100">
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

      {/* Award Categories Tab Navigation */}
      <div className="overflow-x-auto scrollbar-hide bg-white">
        <div className="flex [&>*]:flex-shrink-0 border-b border-gray-300 gap-6 px-5">
          {awardTabs.map((tab) => (
            <div key={tab.id}>
              <Link
                href={tab.href}
                className={`relative flex flex-col items-center text-base h-[44px] ${
                  activeAwardTab === tab.id ? "text-[#1a1a1a] font-semibold" : "text-[#727171]"
                }`}
              >
                <span
                  className={`relative grow leading-[42px] ${
                    activeAwardTab === tab.id ? "border-b-2 border-gray-900" : ""
                  }`}
                >
                  {tab.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Year Selector */}
      {!activeAwardTab && (
        <div className="bg-white border-b border-[#E5E5E5] px-4 py-3">
          <div className="flex gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => onYearChange?.(year)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedYear === year
                    ? "bg-[#f39800] text-white"
                    : "border border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
