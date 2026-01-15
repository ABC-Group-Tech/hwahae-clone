"use client"

import { useState } from "react"
import { X, ChevronRight } from "lucide-react"

export default function AppDownloadBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="sticky top-0 z-50 h-11 bg-[#f39800] flex items-center justify-between px-4">
      <div className="flex items-center gap-1 text-white text-sm font-medium">
        <span>ABCPharm 앱에서 더 편리하게</span>
        <ChevronRight className="w-4 h-4" />
      </div>
      <button onClick={() => setIsVisible(false)} className="text-white p-1" aria-label="닫기">
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
