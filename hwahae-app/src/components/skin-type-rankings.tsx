"use client"

import { useState, useRef } from "react"
import { Star, ChevronRight } from "lucide-react"
import Link from "next/link"

const skinTypes = ["건성", "지성", "중성", "복합성", "민감성", "여드름", "아토피"]

const products = [
  { id: 1, brand: "토리든", name: "다이브인 저분자 히알루론산 세럼", rating: 4.72, reviews: 89234, change: 5 },
  { id: 2, brand: "에스네이처", name: "아쿠아 오아시스 토너", rating: 4.65, reviews: 45678, change: 12 },
  { id: 3, brand: "아누아", name: "녹두 약산성 클렌징폼", rating: 4.58, reviews: 32145, change: -3 },
  { id: 4, brand: "비플레인", name: "PDRN 히알루론산 캡슐 100 세럼", rating: 4.8, reviews: 28976, change: 8 },
  { id: 5, brand: "에스트라", name: "아토베리어365 크림", rating: 4.6, reviews: 73977, change: -2 },
  { id: 6, brand: "메디힐", name: "마데카소사이드 에센셜 마스크", rating: 4.45, reviews: 56432, change: 15 },
  { id: 7, brand: "라운드랩", name: "1025 독도 토너", rating: 4.68, reviews: 67890, change: 3 },
  { id: 8, brand: "웰라쥬", name: "캐롯 카로틴 카밍 워터 패드", rating: 4.52, reviews: 23456, change: 20 },
  { id: 9, brand: "스킨푸드", name: "캐롯 카로틴 카밍 워터 패드", rating: 4.35, reviews: 12345, change: -5 },
]

function ProductCard({ product, rank }: { product: (typeof products)[0]; rank: number }) {
  return (
    <Link href={`/product/${product.id}`} className="flex items-center gap-3 w-[280px] h-[80px]">
      {/* Rank Badge */}
      <div className="flex flex-col items-center w-10">
        {rank <= 3 ? (
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              rank === 1 ? "bg-[#FFD700]" : rank === 2 ? "bg-[#C0C0C0]" : "bg-[#CD7F32]"
            }`}
          >
            <span className="text-white font-bold text-lg">{rank}</span>
          </div>
        ) : (
          <span className="text-gray-700 font-semibold text-lg">{rank}</span>
        )}
        {/* Rank change */}
        {product.change !== 0 && (
          <span className={`text-[11px] mt-0.5 ${product.change > 0 ? "text-red-500" : "text-blue-500"}`}>
            {product.change > 0 ? `▲${product.change}` : `▼${Math.abs(product.change)}`}
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="w-[60px] h-[60px] bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
        <span className="text-gray-400 text-[10px]">Image</span>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] leading-tight line-clamp-2">
          <span className="text-gray-500">{product.brand} </span>
          <span className="text-black font-medium">{product.name}</span>
        </p>
        <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {product.rating.toFixed(2)} ({product.reviews.toLocaleString()})
        </p>
      </div>
    </Link>
  )
}

export default function SkinTypeRankings() {
  const [activeSkinType, setActiveSkinType] = useState("건성")
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Split products into columns (3 per column)
  const columns = []
  for (let i = 0; i < products.length; i += 3) {
    columns.push(products.slice(i, i + 3))
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
      setScrollProgress(progress)
    }
  }

  return (
    <section className="py-4 bg-white">
      <Link href="/rankings?tab=피부별" className="px-4 mb-3 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#1a1a1a]">내 피부에 꼭 맞는 제품 랭킹</h2>
        <ChevronRight className="w-5 h-5 text-[#727171]" />
      </Link>

      {/* Skin Type Tabs */}
      <div className="flex gap-2 overflow-x-auto px-4 mb-4 scrollbar-hide">
        {skinTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveSkinType(type)}
            className={`px-4 py-2 rounded-2xl text-sm whitespace-nowrap transition-colors ${
              activeSkinType === type
                ? "bg-[#f39800] text-white font-medium"
                : "bg-transparent text-[#727171] border border-[#e5e5e5]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto scrollbar-hide px-4" ref={scrollContainerRef} onScroll={handleScroll}>
        <div className="flex gap-4 w-max">
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-3 w-[280px]">
              {column.map((product, rowIdx) => (
                <ProductCard key={product.id} product={product} rank={colIdx * 3 + rowIdx + 1} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 px-4">
        <div className="w-16 h-1 bg-[#E5E5E5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#374151] rounded-full transition-all duration-300"
            style={{ width: `${Math.max(10, scrollProgress)}%` }}
          />
        </div>
      </div>

      {/* View All Link */}
      <div className="px-4 mt-4">
        <Link
          href={`/rankings?tab=피부별&filter=${activeSkinType}`}
          className="block w-full py-3 text-sm text-[#727171] border border-[#e5e5e5] rounded-lg bg-white text-center"
        >
          {activeSkinType} 전체보기 {">"}
        </Link>
      </div>
    </section>
  )
}
