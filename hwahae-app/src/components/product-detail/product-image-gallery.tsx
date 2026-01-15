"use client"

import type React from "react"

import { useState, useRef } from "react"

const images = [1, 2, 3, 4, 5]

export default function ProductImageGallery() {
  const [currentImage, setCurrentImage] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1)
    } else if (direction === "right" && currentImage > 0) {
      setCurrentImage(currentImage - 1)
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
    <div className="bg-white">
      {/* Main Image with swipe */}
      <div
        className="relative aspect-square bg-gray-200 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
        <span className="text-gray-500 text-sm">제품 이미지 {currentImage + 1}</span>
      </div>

      <div className="flex justify-center gap-2 py-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentImage === index ? "bg-[#f39800]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
