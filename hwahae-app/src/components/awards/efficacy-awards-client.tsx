"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Share2, Star, Sparkles } from "lucide-react"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"

const skinConcerns = [
  { id: "whitening", name: "미백" },
  { id: "wrinkle", name: "주름개선" },
  { id: "pore", name: "모공케어" },
  { id: "exfoliation", name: "각질케어" },
  { id: "soothing", name: "진정" },
  { id: "hydration", name: "보습" },
  { id: "elasticity", name: "탄력" },
  { id: "trouble", name: "트러블케어" },
]

const productsByConcern: Record<
  string,
  Array<{
    id: number
    rank: number
    brand: string
    name: string
    rating: number
    reviews: number
    isExclusive: boolean
  }>
> = {
  whitening: [
    {
      id: 101,
      rank: 1,
      brand: "토리든",
      name: "다이브인 브라이트닝 세럼",
      rating: 4.82,
      reviews: 8765,
      isExclusive: true,
    },
    {
      id: 102,
      rank: 2,
      brand: "에스네이처",
      name: "비타민 나이아신아마이드 세럼",
      rating: 4.76,
      reviews: 6543,
      isExclusive: false,
    },
    {
      id: 103,
      rank: 3,
      brand: "코스알엑스",
      name: "더 비타민C 23 세럼",
      rating: 4.71,
      reviews: 9876,
      isExclusive: false,
    },
    { id: 104, rank: 4, brand: "달바", name: "화이트 트러플 세럼", rating: 4.65, reviews: 4321, isExclusive: true },
    {
      id: 105,
      rank: 5,
      brand: "메디힐",
      name: "비타 라이트빔 에센셜 마스크",
      rating: 4.59,
      reviews: 5678,
      isExclusive: false,
    },
  ],
  wrinkle: [
    {
      id: 106,
      rank: 1,
      brand: "에스트라",
      name: "리제덤 365 리페어 세럼",
      rating: 4.79,
      reviews: 7654,
      isExclusive: false,
    },
    {
      id: 107,
      rank: 2,
      brand: "비플레인",
      name: "레티놀 A-1 컨센트레이트",
      rating: 4.73,
      reviews: 5432,
      isExclusive: true,
    },
    {
      id: 108,
      rank: 3,
      brand: "토리든",
      name: "셀마이드 리페어 크림",
      rating: 4.68,
      reviews: 4321,
      isExclusive: false,
    },
  ],
  pore: [
    {
      id: 109,
      rank: 1,
      brand: "비플레인",
      name: "녹두 모공 클렌징 폼",
      rating: 4.81,
      reviews: 8901,
      isExclusive: false,
    },
    {
      id: 110,
      rank: 2,
      brand: "코스알엑스",
      name: "BHA 블랙헤드 파워 리퀴드",
      rating: 4.75,
      reviews: 12345,
      isExclusive: false,
    },
    {
      id: 111,
      rank: 3,
      brand: "아누아",
      name: "어성초 모공 수렴 토너",
      rating: 4.69,
      reviews: 6789,
      isExclusive: true,
    },
  ],
  exfoliation: [
    {
      id: 112,
      rank: 1,
      brand: "코스알엑스",
      name: "AHA/BHA 클래리파잉 트리트먼트 토너",
      rating: 4.77,
      reviews: 9012,
      isExclusive: false,
    },
    {
      id: 113,
      rank: 2,
      brand: "토리든",
      name: "밸런스풀 시카 필링 젤",
      rating: 4.71,
      reviews: 5678,
      isExclusive: true,
    },
  ],
  soothing: [
    {
      id: 114,
      rank: 1,
      brand: "아누아",
      name: "어성초 77 수딩 토너",
      rating: 4.85,
      reviews: 15234,
      isExclusive: false,
    },
    {
      id: 115,
      rank: 2,
      brand: "에스트라",
      name: "아토베리어365 크림",
      rating: 4.78,
      reviews: 8765,
      isExclusive: false,
    },
    { id: 116, rank: 3, brand: "비플레인", name: "시카풀 카밍 앰플", rating: 4.72, reviews: 6543, isExclusive: true },
    { id: 117, rank: 4, brand: "토리든", name: "병풀 시카 진정 크림", rating: 4.67, reviews: 5432, isExclusive: false },
  ],
  hydration: [
    {
      id: 118,
      rank: 1,
      brand: "토리든",
      name: "다이브인 저분자 히알루론산 세럼",
      rating: 4.88,
      reviews: 18765,
      isExclusive: false,
    },
    {
      id: 119,
      rank: 2,
      brand: "에스네이처",
      name: "아쿠아 오아시스 하이드레이팅 토너",
      rating: 4.79,
      reviews: 9876,
      isExclusive: true,
    },
    {
      id: 120,
      rank: 3,
      brand: "메디힐",
      name: "N.M.F 인텐시브 하이드레이팅 세럼",
      rating: 4.74,
      reviews: 7654,
      isExclusive: false,
    },
  ],
  elasticity: [
    {
      id: 121,
      rank: 1,
      brand: "달바",
      name: "화이트 트러플 퍼스트 스프레이 세럼",
      rating: 4.76,
      reviews: 6543,
      isExclusive: false,
    },
    {
      id: 122,
      rank: 2,
      brand: "에스트라",
      name: "리제덤 365 리프팅 크림",
      rating: 4.71,
      reviews: 4321,
      isExclusive: true,
    },
  ],
  trouble: [
    {
      id: 123,
      rank: 1,
      brand: "코스알엑스",
      name: "AC 컬렉션 카밍 폼 클렌저",
      rating: 4.74,
      reviews: 8765,
      isExclusive: false,
    },
    {
      id: 124,
      rank: 2,
      brand: "비플레인",
      name: "티트리 시카 수딩 토너",
      rating: 4.69,
      reviews: 5678,
      isExclusive: true,
    },
    {
      id: 125,
      rank: 3,
      brand: "아누아",
      name: "어성초 포어 컨트롤 클렌징 오일",
      rating: 4.63,
      reviews: 4567,
      isExclusive: false,
    },
  ],
}

export default function EfficacyAwardsClient() {
  const [activeConcern, setActiveConcern] = useState("whitening")

  const products = productsByConcern[activeConcern] || []
  const concernName = skinConcerns.find((c) => c.id === activeConcern)?.name || ""

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between h-14 px-4">
            <Link href="/awards" className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <h1 className="font-bold text-lg">효능/효과 어워드</h1>
            <button className="p-2 -mr-2">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </header>

        <main className="pb-8">
          {/* Period Badge */}
          <div className="px-4 py-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              2024 하반기
            </span>
          </div>

          {/* Skin Concern Tabs */}
          <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
            <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2">
              {skinConcerns.map((concern) => (
                <button
                  key={concern.id}
                  onClick={() => setActiveConcern(concern.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeConcern === concern.id ? "bg-[#f39800] text-white" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {concern.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Rankings */}
          <div className="px-4 py-4">
            <h2 className="font-bold text-lg mb-1">{concernName} 부문</h2>
            <p className="text-sm text-gray-500 mb-4">피부 고민에 맞는 최고의 제품</p>

            <div className="space-y-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/sample`}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                >
                  {/* Rank with Efficacy Icon */}
                  <div className="flex flex-col items-center gap-1 shrink-0 w-10">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className={`text-lg font-bold ${product.rank <= 3 ? "text-[#f39800]" : "text-gray-400"}`}>
                      {product.rank}
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg shrink-0 flex items-center justify-center text-[10px] text-gray-400">
                    이미지
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">{product.brand}</p>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</p>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-medium rounded">
                        {concernName} {product.rank}위
                      </span>
                      {product.isExclusive && (
                        <span className="px-2 py-0.5 bg-[#f39800] text-white text-[10px] font-medium rounded">
                          only ABCPharm
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-[#f39800] text-[#f39800]" />
                      <span className="text-sm font-medium text-[#f39800]">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
                    </div>
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
