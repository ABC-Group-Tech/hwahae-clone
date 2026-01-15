"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, ShoppingCart, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LanguageSelector from "@/components/language-selector"
import { cn } from "@/lib/utils"

const tabs = [
  { name: "홈", href: "/" },
  { name: "랭킹", href: "/rankings" },
  { name: "어워드", href: "/awards" },
]

// 히스테리시스 임계값: 위로 스크롤할 때와 아래로 스크롤할 때 다른 값 적용
const SCROLL_THRESHOLD_DOWN = 80 // 아래로 스크롤 시 compact로 전환
const SCROLL_THRESHOLD_UP = 30 // 위로 스크롤 시 expanded로 전환

interface StickyHeaderProps {
  activeTab?: string
}

export default function StickyHeader({ activeTab = "홈" }: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY
    const scrollingDown = currentScrollY > lastScrollY.current

    if (scrollingDown) {
      // 아래로 스크롤: 임계값 이상이면 compact 모드
      if (currentScrollY > SCROLL_THRESHOLD_DOWN) {
        setIsScrolled(true)
      }
    } else {
      // 위로 스크롤: 임계값 이하면 expanded 모드
      if (currentScrollY < SCROLL_THRESHOLD_UP) {
        setIsScrolled(false)
      }
    }

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
    <div className="sticky top-0 z-50">
      {/* App Download Banner */}
      {isBannerVisible && (
        <div className="h-11 bg-[#f39800] flex items-center justify-between px-4">
          <div className="flex items-center gap-1 text-white text-sm font-medium">
            <span>ABCPharm 앱에서 더 편리하게</span>
            <ChevronRight className="w-4 h-4" />
          </div>
          <button onClick={() => setIsBannerVisible(false)} className="text-white p-1" aria-label="닫기">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className={cn(
        "bg-white shadow-sm transition-all duration-300 ease-in-out",
        isScrolled ? "py-2" : "py-3"
      )}>
        {isScrolled ? (
          <div className="flex items-center gap-3 px-4">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image src="/logo2.png" alt="ABCPharm" width={28} height={28} />
            </Link>

            {/* Compact Search Bar */}
            <Link href="/search" className="flex-1">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#727171]" />
                <div className="w-full h-10 pl-4 pr-11 rounded-3xl border border-[#e5e5e5] bg-[#f5f5f5] text-sm text-[#727171] flex items-center">
                  궁금한 제품을 검색해 보세요
                </div>
              </div>
            </Link>

            {/* Right Icons - 고정 너비 유지 */}
            <div className="flex items-center gap-3 shrink-0">
              <LanguageSelector showLabel={false} />
              <Link href="/cart" aria-label="장바구니">
                <ShoppingCart className="w-5 h-5 text-[#727171]" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-4">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-1.5">
                <Image src="/logo2.png" alt="ABCPharm" width={28} height={28} />
                <h1 className="text-2xl tracking-tight text-[#727171] leading-none">
                  <span className="font-extrabold">ABC</span>
                  <span className="font-light">Pharm</span>
                </h1>
              </Link>

              {/* Right Icons - 동일한 간격 유지 */}
              <div className="flex items-center gap-3 shrink-0">
                <LanguageSelector showLabel={true} />
                <Link href="/cart" aria-label="장바구니">
                  <ShoppingCart className="w-5 h-5 text-[#727171]" />
                </Link>
              </div>
            </div>

            {/* Full Search Bar */}
            <div className="px-4 pt-3">
              <Link href="/search" className="block">
                <div className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#727171]" />
                  <div className="w-full h-12 pl-4 pr-11 rounded-3xl border border-[#e5e5e5] bg-[#f5f5f5] text-sm text-[#727171] flex items-center">
                    궁금한 제품을 검색해 보세요
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </header>

      {/* Navigation Tabs - animated visibility */}
      <nav
        className={cn(
          "flex border-b border-[#e5e5e5] bg-white transition-all duration-300 ease-in-out overflow-hidden",
          isScrolled ? "max-h-0 opacity-0 border-transparent" : "max-h-12 opacity-100"
        )}
      >
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
