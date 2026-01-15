"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Share2, Calendar, ChevronDown, ChevronUp, Truck, Gift, Tag } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"

const eventBanners = [1, 2, 3]

const eventProducts = [
  {
    id: 1,
    brand: "토리든",
    name: "다이브인 저분자 히알루론산 세럼",
    originalPrice: 28000,
    eventPrice: 19600,
    discount: 30,
    badge: "특가",
    soldOut: false,
  },
  {
    id: 2,
    brand: "에스트라",
    name: "아토베리어365 크림",
    originalPrice: 32000,
    eventPrice: 22400,
    discount: 30,
    badge: "한정수량",
    soldOut: true,
  },
  {
    id: 3,
    brand: "라운드랩",
    name: "1025 독도 토너",
    originalPrice: 22000,
    eventPrice: 15400,
    discount: 30,
    badge: "50% OFF",
    soldOut: false,
  },
  {
    id: 4,
    brand: "닥터지",
    name: "레드 블레미쉬 클리어 수딩 크림",
    originalPrice: 25000,
    eventPrice: 17500,
    discount: 30,
    badge: null,
    soldOut: false,
  },
  {
    id: 5,
    brand: "이니스프리",
    name: "그린티 씨드 세럼",
    originalPrice: 36000,
    eventPrice: 25200,
    discount: 30,
    badge: "특가",
    soldOut: false,
  },
  {
    id: 6,
    brand: "스킨푸드",
    name: "로얄허니 프로폴리스 인리치 에센스",
    originalPrice: 30000,
    eventPrice: 21000,
    discount: 30,
    badge: null,
    soldOut: true,
  },
]

const relatedEvents = [
  { id: 2, title: "신년 특가 세일", period: "2024.01.01 ~ 2024.01.31" },
  { id: 3, title: "봄맞이 스킨케어 할인전", period: "2024.02.20 ~ 2024.03.20" },
  { id: 4, title: "회원 감사 이벤트", period: "2024.01.10 ~ 2024.02.10" },
]

const eventTerms = [
  "본 이벤트는 재고 소진 시 조기 종료될 수 있습니다.",
  "할인 금액은 다른 쿠폰과 중복 적용되지 않습니다.",
  "이벤트 상품은 교환/환불이 제한될 수 있습니다.",
  "일부 상품은 1인당 구매 수량이 제한될 수 있습니다.",
  "이벤트 기간 및 내용은 사정에 따라 변경될 수 있습니다.",
]

export default function EventDetailClient() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && currentBanner < eventBanners.length - 1) {
      setCurrentBanner(currentBanner + 1)
    } else if (direction === "right" && currentBanner > 0) {
      setCurrentBanner(currentBanner - 1)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    const diff = startX.current - e.clientX
    if (Math.abs(diff) > 50) {
      handleSwipe(diff > 0 ? "left" : "right")
    }
  }

  const handleMouseLeave = () => {
    isDragging.current = false
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] relative">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 h-14">
            <Link href="/" className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <button className="p-2 -mr-2">
              <Share2 className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </header>

        {/* Event Banner Carousel */}
        <div
          className="relative aspect-[16/9] bg-gray-200 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onTouchStart={(e) => {
            const touchStartX = e.touches[0].clientX
            const handleTouchEnd = (endEvent: TouchEvent) => {
              const touchEndX = endEvent.changedTouches[0].clientX
              const diff = touchStartX - touchEndX
              if (Math.abs(diff) > 50) {
                handleSwipe(diff > 0 ? "left" : "right")
              }
              document.removeEventListener("touchend", handleTouchEnd)
            }
            document.addEventListener("touchend", handleTouchEnd)
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-gray-500 text-sm">이벤트 배너 {currentBanner + 1}</span>
        </div>

        {/* Banner Indicators */}
        <div className="flex justify-center gap-2 py-3">
          {eventBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentBanner === index ? "bg-[#f39800]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Event Info Section */}
        <div className="px-4 py-4">
          {/* Period Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>2024.01.15 ~ 2024.02.15</span>
            </div>
            <span className="px-2 py-0.5 text-xs font-medium text-white bg-green-500 rounded">진행중</span>
          </div>

          {/* Event Title */}
          <h1 className="text-xl font-bold text-gray-900 mb-2">겨울맞이 보습템 대전</h1>

          {/* Event Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            건조한 겨울, 촉촉한 피부를 위한 특별 할인 이벤트! 인기 보습 제품을 최대 50% 할인된 가격으로 만나보세요.
          </p>
        </div>

        {/* Event Benefits Section */}
        <div className="px-4 py-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900 mb-3">이벤트 혜택</h2>
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Truck className="w-5 h-5 text-[#f39800]" />
              <span className="text-sm text-gray-700">무료배송</span>
            </div>
            <div className="flex-1 flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Tag className="w-5 h-5 text-[#f39800]" />
              <span className="text-sm text-gray-700">추가할인</span>
            </div>
            <div className="flex-1 flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Gift className="w-5 h-5 text-[#f39800]" />
              <span className="text-sm text-gray-700">사은품</span>
            </div>
          </div>
        </div>

        {/* Event Products Section */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">이벤트 상품</h2>
            <span className="text-sm text-gray-500">{eventProducts.length}개 상품</span>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-3">
            {eventProducts.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className={`relative ${product.soldOut ? "opacity-70" : ""}`}
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-200 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                  <span className="text-gray-500 text-xs">제품 이미지</span>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded">
                      {product.badge}
                    </div>
                  )}

                  {/* Sold Out Overlay */}
                  {product.soldOut && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">품절</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">{product.brand}</p>
                  <p className="text-sm text-gray-900 line-clamp-2 mb-1">{product.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[#f39800]">{product.discount}%</span>
                    <span className="text-sm font-bold text-gray-900">{product.eventPrice.toLocaleString()}원</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Event Terms Section */}
        <div className="px-4 py-4 border-t border-gray-100">
          <button
            onClick={() => setIsTermsOpen(!isTermsOpen)}
            className="flex items-center justify-between w-full py-2"
          >
            <h2 className="text-base font-bold text-gray-900">유의사항</h2>
            {isTermsOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {isTermsOpen && (
            <div className="mt-2 space-y-2">
              {eventTerms.map((term, index) => (
                <div key={index} className="flex gap-2 text-sm text-gray-600">
                  <span className="shrink-0">{index + 1}.</span>
                  <span>{term}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Events Section */}
        <div className="px-4 py-4 border-t border-gray-100">
          <h2 className="text-base font-bold text-gray-900 mb-3">다른 이벤트</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {relatedEvents.map((event) => (
              <Link href={`/event/${event.id}`} key={event.id} className="flex-shrink-0 w-[200px]">
                <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">이벤트 썸네일</span>
                </div>
                <p className="text-sm font-medium text-gray-900 line-clamp-1">{event.title}</p>
                <p className="text-xs text-gray-500">{event.period}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </div>
  )
}
