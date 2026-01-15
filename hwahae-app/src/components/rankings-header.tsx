"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useSearchParams, useRouter } from "next/navigation"
import CategorySelector from "@/components/category-selector"

const tabs = [
  { name: "홈", href: "/" },
  { name: "랭킹", href: "/rankings" },
  { name: "어워드", href: "/awards" },
]

const mainTabs = ["급상승", "카테고리별", "피부별", "연령대별", "브랜드"]

const subFilters: Record<string, string[]> = {
  급상승: [],
  카테고리별: [],
  피부별: ["건성", "지성", "중성", "복합성", "민감성", "여드름", "아토피"],
  연령대별: ["10대", "20대", "30대", "40대 이상"],
  브랜드: [],
}

const SCROLL_THRESHOLD = 60 // 로고 영역 숨김 임계값

interface RankingsHeaderProps {
  activeTab?: string
}

export default function RankingsHeader({ activeTab = "랭킹" }: RankingsHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const activeMainTab = searchParams.get("tab") || "급상승"
  const activeSubFilter = searchParams.get("filter") || (subFilters[activeMainTab]?.[0] ?? "")
  const selectedCategory = searchParams.get("category") || "all"
  const selectedSubCategory = searchParams.get("subcategory") || "all"

  const handleCategorySelect = (categoryId: string, subCategoryId: string) => {
    router.push(`/rankings?tab=${activeMainTab}&category=${categoryId}&subcategory=${subCategoryId}`)
  }

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

      {/* Main Tab Navigation */}
      <div className="px-4 py-3 overflow-x-auto scrollbar-hide bg-white">
        <div className="flex gap-2">
          {mainTabs.map((tab) => (
            <Link
              key={tab}
              href={`/rankings?tab=${tab}`}
              className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                activeMainTab === tab ? "bg-[#f39800] text-white" : "border border-[#E5E5E5] text-[#727171]"
              }`}
            >
              {tab}
            </Link>
          ))}
        </div>
      </div>

      {/* Sub Filters / Category Selector */}
      {activeMainTab === "급상승" || activeMainTab === "카테고리별" ? (
        <div className="px-4 pb-3 pt-0 bg-white border-b border-[#E5E5E5]">
          <CategorySelector
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
            onSelect={handleCategorySelect}
          />
        </div>
      ) : activeMainTab !== "브랜드" && subFilters[activeMainTab]?.length > 0 ? (
        <div className="px-4 pb-3 pt-0 overflow-x-auto scrollbar-hide bg-white border-b border-[#E5E5E5]">
          <div className="flex gap-2">
            {subFilters[activeMainTab].map((filter) => (
              <Link
                key={filter}
                href={`/rankings?tab=${activeMainTab}&filter=${filter}`}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                  activeSubFilter === filter ? "bg-[#f39800] text-white" : "bg-[#F5F5F5] text-[#727171]"
                }`}
              >
                {filter}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-b border-[#E5E5E5]" />
      )}
    </div>
  )
}
