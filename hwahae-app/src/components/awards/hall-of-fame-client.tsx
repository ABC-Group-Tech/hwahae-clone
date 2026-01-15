"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, Share2, Star } from "lucide-react"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"

const categories = [
  { id: "skincare", name: "스킨케어" },
  { id: "base", name: "베이스메이크업" },
  { id: "color", name: "색조메이크업" },
  { id: "cleansing", name: "클렌징" },
  { id: "mask", name: "마스크/팩" },
  { id: "body", name: "바디케어" },
  { id: "sun", name: "선케어" },
  { id: "hair", name: "헤어" },
]

const winnersByCategory: Record<
  string,
  Array<{
    id: number
    rank: number
    brand: string
    name: string
    rating: number
    reviews: number
  }>
> = {
  skincare: [
    { id: 1, rank: 1, brand: "토리든", name: "다이브인 저분자 히알루론산 세럼", rating: 4.85, reviews: 12453 },
    { id: 2, rank: 2, brand: "에스네이처", name: "아쿠아 오아시스 하이드레이팅 토너", rating: 4.72, reviews: 8921 },
    { id: 3, rank: 3, brand: "아누아", name: "어성초 77 수딩 토너", rating: 4.68, reviews: 15234 },
    { id: 4, rank: 4, brand: "비플레인", name: "시카풀 카밍 앰플", rating: 4.61, reviews: 6782 },
    { id: 5, rank: 5, brand: "코스알엑스", name: "어드밴스드 스네일 96 뮤신 파워 에센스", rating: 4.58, reviews: 9123 },
  ],
  base: [
    { id: 6, rank: 1, brand: "에스트라", name: "아토베리어365 크림", rating: 4.78, reviews: 5432 },
    { id: 7, rank: 2, brand: "메디힐", name: "N.M.F 인텐시브 하이드레이팅 세럼", rating: 4.65, reviews: 7891 },
    { id: 8, rank: 3, brand: "달바", name: "화이트 트러플 퍼스트 스프레이 세럼", rating: 4.59, reviews: 4567 },
  ],
  color: [
    { id: 9, rank: 1, brand: "토리든", name: "다이브인 마스크", rating: 4.82, reviews: 3456 },
    { id: 10, rank: 2, brand: "아누아", name: "도화 수분 톤업 크림", rating: 4.71, reviews: 2345 },
  ],
  cleansing: [
    { id: 11, rank: 1, brand: "비플레인", name: "녹두 모공 클렌징 폼", rating: 4.76, reviews: 6789 },
    { id: 12, rank: 2, brand: "코스알엑스", name: "저자극 굿모닝 젤 클렌저", rating: 4.69, reviews: 8901 },
    { id: 13, rank: 3, brand: "토리든", name: "다이브인 클렌징 워터", rating: 4.63, reviews: 4321 },
  ],
  mask: [
    { id: 14, rank: 1, brand: "메디힐", name: "N.M.F 아쿠아링 앰플 마스크", rating: 4.81, reviews: 11234 },
    { id: 15, rank: 2, brand: "달바", name: "워터풀 모이스처 수딩 마스크", rating: 4.74, reviews: 5678 },
  ],
  body: [{ id: 16, rank: 1, brand: "에스트라", name: "아토베리어 바디 로션", rating: 4.67, reviews: 3456 }],
  sun: [
    { id: 17, rank: 1, brand: "토리든", name: "다이브인 워터리 선크림", rating: 4.79, reviews: 9876 },
    { id: 18, rank: 2, brand: "아누아", name: "어성초 수딩 선크림", rating: 4.72, reviews: 7654 },
  ],
  hair: [{ id: 19, rank: 1, brand: "비플레인", name: "스칼프 포커싱 샴푸", rating: 4.65, reviews: 2345 }],
}

const getRankBadgeColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-b from-amber-400 to-amber-500 text-white"
    case 2:
      return "bg-gradient-to-b from-gray-300 to-gray-400 text-white"
    case 3:
      return "bg-gradient-to-b from-amber-600 to-amber-700 text-white"
    default:
      return "bg-gray-200 text-gray-600"
  }
}

export default function HallOfFameClient() {
  const [activeCategory, setActiveCategory] = useState("skincare")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const winners = winnersByCategory[activeCategory] || []

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between h-14 px-4">
            <Link href="/awards" className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <h1 className="font-bold text-lg">명예의 전당</h1>
            <button className="p-2 -mr-2">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </header>

        <main className="pb-8">
          {/* Banner */}
          <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-500 text-sm">
            명예의 전당 메인 배너
          </div>

          {/* Category Tabs */}
          <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
            <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category.id
                      ? "bg-[#f39800] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Winners List */}
          <div className="px-4 py-4">
            <h2 className="font-bold text-lg mb-4">
              {categories.find((c) => c.id === activeCategory)?.name} 명예의 전당
            </h2>

            <div className="space-y-3">
              {winners.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                >
                  {/* Rank Badge */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${getRankBadgeColor(
                      product.rank,
                    )}`}
                  >
                    {product.rank}
                  </div>

                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0 flex items-center justify-center text-[10px] text-gray-400">
                    이미지
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-[#f39800] text-[#f39800]" />
                      <span className="text-sm font-medium text-[#f39800]">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
                    </div>
                    {product.rank <= 3 && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded">
                        명예의 전당
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  )
}
