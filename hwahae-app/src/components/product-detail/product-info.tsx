"use client"

import { Star, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ProductInfo() {
  return (
    <div className="px-4 py-5 bg-white border-b border-border">
      {/* Brand */}
      <Link href="/brand/torriden" className="flex items-center gap-1 text-[#727171] text-sm mb-2">
        토리든
        <ChevronRight className="w-4 h-4" />
      </Link>

      {/* Product Name */}
      <h1 className="text-lg font-bold text-foreground leading-tight mb-3 line-clamp-2">
        다이브인 저분자 히알루론산 세럼 50ml
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        <span className="font-bold text-foreground">4.72</span>
        <Link href="#reviews" className="text-[#727171] text-sm underline">
          (89,234개 리뷰)
        </Link>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[#727171] text-sm line-through">28,000원</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#f39800] font-bold text-lg">30%</span>
          <span className="text-foreground font-bold text-xl">19,600원</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2">
        <span className="px-2 py-1 text-xs border border-[#f39800] text-[#f39800] rounded">only ABCPharm</span>
        <span className="px-2 py-1 text-xs border border-[#727171] text-[#727171] rounded">무료배송</span>
      </div>
    </div>
  )
}
