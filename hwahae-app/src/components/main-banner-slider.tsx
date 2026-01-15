"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"

const banners = [
  {
    id: 1,
    label: "Banner Image 1",
    image: "",
  },
  {
    id: 2,
    label: "Banner Image 2",
    image: "",
  },
  {
    id: 3,
    label: "Banner Image 3",
    image: "",
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

  const handleBannerClick = useCallback((bannerId: number) => {
    if (hasDragged) {
      setHasDragged(false)
      return
    }
    window.location.href = `/event/${bannerId}`
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
              className="min-w-full aspect-[3/2] bg-gray-200 flex items-center justify-center relative"
              onClick={() => handleBannerClick(banner.id)}
            >
              {banner.image ? (
                <Image
                  src={banner.image}
                  alt={banner.label}
                  fill
                  className="object-cover pointer-events-none"
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
