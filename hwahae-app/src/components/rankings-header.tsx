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

      {/* Main Tab Navigation */}
      <div className="overflow-x-auto scrollbar-hide bg-white">
        <div className="flex [&>*]:flex-shrink-0 border-b border-gray-300 gap-6 px-5">
          {mainTabs.map((tab, index) => (
            <div key={tab}>
              <Link
                href={`/rankings?tab=${tab}`}
                className={`relative flex flex-col items-center text-base h-[44px] ${
                  activeMainTab === tab ? "text-[#1a1a1a] font-semibold" : "text-[#727171]"
                }`}
              >
                <span className={`relative grow leading-[42px] ${
                  activeMainTab === tab ? "border-b-2 border-gray-900" : ""
                }`}>
                  {tab}
                </span>
              </Link>
            </div>
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
        <div className="bg-white w-full max-w-[600px] py-2.5 px-[0px] z-30 border-b border-[#E5E5E5]">
          <div className="relative flex items-center overflow-x-auto scrollbar-hide gap-2 [&>*]:flex-shrink-0 min-w-full !mx-[0] [&>label:first-child]:pl-5 [&>label:last-child]:pr-20 z-30">
            {subFilters[activeMainTab].map((filter) => (
              <label key={filter} className="inline-flex items-center text-base text-[#1a1a1a]" htmlFor={`filter-${filter}`}>
                <input className="hidden" id={`filter-${filter}`} type="checkbox" checked={activeSubFilter === filter} readOnly />
                <span className={`inline-flex items-center rounded-lg cursor-pointer h-8 !px-[0] ${
                  activeSubFilter === filter
                    ? "bg-gray-900 text-white font-semibold"
                    : "border border-[#E5E5E5] bg-white text-[#727171]"
                }`}>
                  <Link className="px-2.5 leading-8" href={`/rankings?tab=${activeMainTab}&filter=${filter}`}>
                    <span className="relative grow">{filter}</span>
                  </Link>
                </span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-b border-[#E5E5E5]" />
      )}
    </div>
  )
}
