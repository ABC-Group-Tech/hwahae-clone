"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, ShoppingCart, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import LanguageSelector from "@/components/language-selector"
import { cn } from "@/lib/utils"

const tabs = [
  { name: "홈", href: "/" },
  { name: "랭킹", href: "/rankings?english_name=trending&theme_id=5102" },
  { name: "어워드", href: "/awards" },
]

// 스크롤 임계값
const SCROLL_THRESHOLD_DOWN = 120 // 느린 스크롤: 아래로 120px 넘으면 compact
const SCROLL_THRESHOLD_UP = 80 // 느린 스크롤: 위로 80px 아래면 expanded

// 디바이스별 빠른 스크롤 감지 임계값
const VELOCITY_THRESHOLD_MOBILE = 15 // 모바일/터치: 큰 스와이프 감지
const VELOCITY_THRESHOLD_DESKTOP = 3 // 데스크톱/트랙패드: 작은 델타값 감지

const FAST_SCROLL_DOWN = 40 // 빠른 스크롤: 40px만 넘으면 compact
const FAST_SCROLL_UP = 70 // 빠른 스크롤: 70px 아래면 expanded

export default function StickyHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(true)
  const lastScrollY = useRef(0)
  const lastTimestamp = useRef(Date.now())
  const ticking = useRef(false)

  // 터치 디바이스 감지
  const isTouchDevice = useRef(false)
  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }, [])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href.split("?")[0])
  }

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY
    const scrollDelta = currentScrollY - lastScrollY.current
    const scrollingDown = scrollDelta > 0
    const scrollVelocity = Math.abs(scrollDelta)

    // 디바이스별 속도 임계값 적용
    const velocityThreshold = isTouchDevice.current
      ? VELOCITY_THRESHOLD_MOBILE
      : VELOCITY_THRESHOLD_DESKTOP

    // 빠른 스크롤 감지: 속도가 임계값을 넘으면 더 낮은 지점에서 전환
    const isFastScroll = scrollVelocity > velocityThreshold

    if (scrollingDown) {
      // 아래로 스크롤
      const threshold = isFastScroll ? FAST_SCROLL_DOWN : SCROLL_THRESHOLD_DOWN
      if (currentScrollY > threshold) {
        setIsScrolled(true)
      }
    } else {
      // 위로 스크롤
      const threshold = isFastScroll ? FAST_SCROLL_UP : SCROLL_THRESHOLD_UP
      if (currentScrollY < threshold) {
        setIsScrolled(false)
      }
    }

    lastScrollY.current = currentScrollY
    lastTimestamp.current = Date.now()
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
        "bg-white shadow-sm transition-all duration-200 ease-in-out",
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
          "px-5 py-[13px] flex items-center gap-6 border-b border-[#E8E8E8] bg-white transition-all duration-200 ease-in-out overflow-hidden",
          isScrolled ? "max-h-0 opacity-0 border-transparent" : "max-h-[60px] opacity-100"
        )}
      >
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            prefetch={false}
            className={`text-base ${
              isActive(tab.href) ? "text-[#1a1a1a] font-semibold" : "text-[#727171]"
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
