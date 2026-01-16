"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"

const banners = [
  {
    id: 1,
    label: "Banner Image 1",
    image: "https://img.hwahae.co.kr/commerce/deal_events/exposures/20251001/20251001210907470_e9d5a551-40e2-4f9d-905d-e17195658b4a.png",
  },
  {
    id: 2,
    label: "Banner Image 2",
    image: "https://img.hwahae.co.kr/commerce/deal_events/exposures/20250805/20250805102322299_4c10429d-4dae-419e-93ad-9a5bf8968167.png",
  },
  {
    id: 3,
    label: "Banner Image 3",
    image: "https://img.hwahae.co.kr/commerce/deal_events/exposures/20251104/20251104173724303_ab53f5fc-c462-48de-8cc5-3d69a19a8bd2.png",
  },
]

export default function MainBannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true)
    setHasDragged(false)
    setStartX(clientX)
  }, [])

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    if (Math.abs(diff) > 5) {
      setHasDragged(true)
    }
    setTranslateX(diff)
  }, [isDragging, startX])

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 50
    if (translateX < -threshold) {
      // 다음 슬라이드 (마지막이면 첫번째로)
      setCurrentSlide(prev => (prev + 1) % banners.length)
    } else if (translateX > threshold) {
      // 이전 슬라이드 (첫번째면 마지막으로)
      setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length)
    }
    setTranslateX(0)
  }, [isDragging, translateX])

  const handleBannerClick = useCallback(() => {
    if (hasDragged) {
      setHasDragged(false)
      return
    }
    window.location.href = `/events/sample`
  }, [hasDragged])

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

  useEffect(() => {
    if (isDragging) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [isDragging])

  return (
    <section className="px-4 py-4">
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
          className={`flex ${isDragging ? '' : 'transition-transform duration-500 ease-in-out'}`}
          style={{ transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="min-w-full aspect-[3/2] bg-white flex items-center justify-center relative"
              onClick={handleBannerClick}
            >
              {banner.image ? (
                <Image
                  src={banner.image}
                  alt={banner.label}
                  fill
                  className="object-contain pointer-events-none"
                  unoptimized
                  draggable={false}
                />
              ) : (
                <span className="text-[#727171] text-sm">{banner.label}</span>
              )}
            </div>
          ))}
        </div>

        {/* Slide Indicator */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          {currentSlide + 1}/{banners.length}
        </div>
      </div>
    </section>
  )
}
