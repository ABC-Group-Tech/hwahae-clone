"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Star, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const products = [
  { id: 1, brand: "토리든", name: "다이브인 저분자 히알루론산 세럼", rating: 4.72, reviews: 89234, change: 5, image: "" },
  { id: 2, brand: "웰라쥬", name: "리얼 히알루로닉 수딩 크림", rating: 4.65, reviews: 45678, change: 12, image: "" },
  { id: 3, brand: "YBK", name: "포어 풀 커버 데일리 썬스크린", rating: 4.58, reviews: 32145, change: -3, image: "" },
]

export default function TrendingRankings() {
  const [currentDate, setCurrentDate] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const now = new Date()
    setCurrentDate(`${now.getMonth() + 1}월 ${now.getDate()}일`)
  }, [])

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true)
    setHasDragged(false)
    setStartX(clientX)
  }, [])

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return
      const diff = clientX - startX
      if (Math.abs(diff) > 5) {
        setHasDragged(true)
      }
      setTranslateX(diff)
    },
    [isDragging, startX]
  )

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 50
    if (translateX < -threshold) {
      // 다음 슬라이드 (마지막이면 첫번째로)
      setCurrentSlide((prev) => (prev + 1) % products.length)
    } else if (translateX > threshold) {
      // 이전 슬라이드 (첫번째면 마지막으로)
      setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)
    }
    setTranslateX(0)
  }, [isDragging, translateX])

  const handleProductClick = useCallback(
    (productId: number) => {
      if (hasDragged) {
        setHasDragged(false)
        return
      }
      window.location.href = "/product/sample"
    },
    [hasDragged]
  )

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDragStart(e.clientX)
  }
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX)
  const handleMouseUp = () => handleDragEnd()
  const handleMouseLeave = () => handleDragEnd()

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX)
  const handleTouchEnd = () => handleDragEnd()

  // Auto slide
  useEffect(() => {
    if (isDragging) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length)
    }, 3000) // 3초마다 자동 슬라이드
    return () => clearInterval(timer)
  }, [isDragging])

  return (
    <section className="py-4">
      <Link href="/rankings?tab=급상승" className="px-4 mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#1a1a1a]">
          {currentDate} <span className="text-[#f39800]">급상승</span> 랭킹
        </h2>
        <ChevronRight className="w-5 h-5 text-[#727171]" />
      </Link>

      <div className="px-4">
        <div
          ref={sliderRef}
          className="relative overflow-hidden rounded-xl cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex ${isDragging ? "" : "transition-transform duration-500 ease-in-out"}`}
            style={{ transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))` }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="min-w-full aspect-[16/9] bg-gray-200 relative flex items-center justify-center"
                onClick={() => handleProductClick(product.id)}
              >
                {/* Product Image */}
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 600px) 100vw, 600px"
                    priority={index < 3}
                  />
                ) : (
                  <span className="text-[#727171] text-sm">Product Image {index + 1}</span>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Rank Badge */}
                <div className="absolute top-3 left-3 w-8 h-8 bg-[#f39800] text-white text-sm font-bold rounded-lg flex items-center justify-center">
                  {index + 1}
                </div>

                {/* Rank Change */}
                <div className="absolute top-3 right-3">
                  {product.change > 0 ? (
                    <span className="text-sm font-bold text-red-400 bg-white/90 px-2 py-1 rounded">
                      ▲{product.change}
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-blue-400 bg-white/90 px-2 py-1 rounded">
                      ▼{Math.abs(product.change)}
                    </span>
                  )}
                </div>

                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xs text-white/80 mb-1">{product.brand}</p>
                  <p className="text-sm font-medium line-clamp-2 leading-tight mb-2">{product.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">
                      {product.rating.toFixed(2)} ({product.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicator */}
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {currentSlide + 1}/{products.length}
          </div>
        </div>
      </div>
    </section>
  )
}
