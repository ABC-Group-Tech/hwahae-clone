"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import RankingsHeader from "@/components/rankings-header"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"
import Link from "next/link"
import { Star } from "lucide-react"
import { categories, attributeTags } from "@/lib/categories"

const brands = [
  {
    id: 1,
    name: "토리든",
    products: [
      { id: 1, name: "다이브인 저분자 히알루론산 세럼", rating: 4.72, reviews: 89234 },
      { id: 2, name: "다이브인 토너", rating: 4.68, reviews: 56789 },
      { id: 3, name: "다이브인 크림", rating: 4.65, reviews: 45678 },
    ],
  },
  {
    id: 2,
    name: "에스네이처",
    products: [
      { id: 4, name: "아쿠아 오아시스 토너", rating: 4.65, reviews: 45678 },
      { id: 5, name: "아쿠아 오아시스 세럼", rating: 4.62, reviews: 38765 },
      { id: 6, name: "아쿠아 오아시스 크림", rating: 4.58, reviews: 32145 },
    ],
  },
  {
    id: 3,
    name: "아누아",
    products: [
      { id: 7, name: "녹두 약산성 클렌징폼", rating: 4.58, reviews: 32145 },
      { id: 8, name: "어성초 77 토너", rating: 4.55, reviews: 28976 },
      { id: 9, name: "녹두 모공 세럼", rating: 4.52, reviews: 25432 },
    ],
  },
  {
    id: 4,
    name: "비플레인",
    products: [
      { id: 10, name: "PDRN 히알루론산 캡슐 100 세럼", rating: 4.8, reviews: 28976 },
      { id: 11, name: "캐롯 카로틴 카밍 워터 패드", rating: 4.52, reviews: 23456 },
      { id: 12, name: "그린 플로럴 토너 패드", rating: 4.48, reviews: 21234 },
    ],
  },
  {
    id: 5,
    name: "라운드랩",
    products: [
      { id: 13, name: "1025 독도 토너", rating: 4.68, reviews: 67890 },
      { id: 14, name: "자작나무 수분 선크림", rating: 4.65, reviews: 54321 },
      { id: 15, name: "1025 독도 클렌저", rating: 4.62, reviews: 48765 },
    ],
  },
]

const dummyProducts = [
  {
    id: 1,
    brand: "YBK",
    name: "포어 풀 커버 데일리 썬스크린 [SPF50+/PA++++]",
    rating: 4.4,
    reviews: 769,
    rankChange: 2,
    isABCExclusive: false,
  },
  {
    id: 2,
    brand: "웰라쥬",
    name: "리얼 히알루로닉 수딩 크림",
    rating: 4.64,
    reviews: 329,
    rankChange: -1,
    isABCExclusive: true,
  },
  {
    id: 3,
    brand: "토리든",
    name: "다이브인 저분자 히알루론산 세럼",
    rating: 4.6,
    reviews: 73989,
    rankChange: 0,
    isABCExclusive: false,
  },
  {
    id: 4,
    brand: "프리메이",
    name: "진정한 수분세럼",
    rating: 4.69,
    reviews: 451,
    rankChange: 5,
    isABCExclusive: true,
  },
  {
    id: 5,
    brand: "션리",
    name: "다시마 앰플 클렌징폼",
    rating: 4.56,
    reviews: 4885,
    rankChange: -2,
    isABCExclusive: false,
  },
  {
    id: 6,
    brand: "토브",
    name: "콜라겐 모이스처 크림-클렌저",
    rating: 4.55,
    reviews: 469,
    rankChange: 1,
    isABCExclusive: false,
  },
  {
    id: 7,
    brand: "에스트라",
    name: "아토베리어365 크림",
    rating: 4.67,
    reviews: 13270,
    rankChange: 3,
    isABCExclusive: true,
  },
  {
    id: 8,
    brand: "잇츠스킨",
    name: "닥터세이버스 비피다 실키 세럼",
    rating: 4.69,
    reviews: 16,
    rankChange: -3,
    isABCExclusive: false,
  },
  {
    id: 9,
    brand: "셀라듀",
    name: "포어프리 율무앰플",
    rating: 4.22,
    reviews: 107,
    rankChange: 4,
    isABCExclusive: false,
  },
  {
    id: 10,
    brand: "에스네이처",
    name: "아쿠아 오아시스 토너",
    rating: 4.74,
    reviews: 23525,
    rankChange: 0,
    isABCExclusive: true,
  },
  {
    id: 11,
    brand: "에스네이처",
    name: "아쿠아 스쿠알란 수분크림",
    rating: 4.57,
    reviews: 37641,
    rankChange: 2,
    isABCExclusive: false,
  },
  {
    id: 12,
    brand: "스킨푸드",
    name: "포테이토 마데카소사이드 수딩패드",
    rating: 4.34,
    reviews: 1594,
    rankChange: -1,
    isABCExclusive: true,
  },
  {
    id: 13,
    brand: "라비엘",
    name: "아세로라 잡티 기미 케어 크림",
    rating: 4.64,
    reviews: 47,
    rankChange: 1,
    isABCExclusive: false,
  },
  {
    id: 14,
    brand: "아누아",
    name: "PDRN 히알루론산 캡슐 100 세럼",
    rating: 4.61,
    reviews: 9565,
    rankChange: -2,
    isABCExclusive: true,
  },
  {
    id: 15,
    brand: "메디필",
    name: "멜라논 X 크림",
    rating: 4.43,
    reviews: 14,
    rankChange: 3,
    isABCExclusive: false,
  },
  {
    id: 16,
    brand: "스킨웨이비",
    name: "뽀얀 모공 펩타노산 단백질 세럼",
    rating: 4.52,
    reviews: 138,
    rankChange: 0,
    isABCExclusive: false,
  },
  {
    id: 17,
    brand: "비플레인",
    name: "녹두 약산성 클렌징폼",
    rating: 4.62,
    reviews: 44710,
    rankChange: 2,
    isABCExclusive: true,
  },
  {
    id: 18,
    brand: "토리든",
    name: "다이브인 저분자 히알루론산 토너",
    rating: 4.7,
    reviews: 31343,
    rankChange: -1,
    isABCExclusive: false,
  },
  {
    id: 19,
    brand: "잇츠스킨",
    name: "파워10 감초줄렌 이펙터",
    rating: 4.58,
    reviews: 3065,
    rankChange: 4,
    isABCExclusive: false,
  },
  {
    id: 20,
    brand: "메디필",
    name: "그린 시카 콜라겐 클리어 2.0",
    rating: 4.49,
    reviews: 612,
    rankChange: 1,
    isABCExclusive: true,
  },
  {
    id: 21,
    brand: "라운드랩",
    name: "1025 독도 토너",
    rating: 4.68,
    reviews: 89234,
    rankChange: -2,
    isABCExclusive: false,
  },
  {
    id: 22,
    brand: "코스알엑스",
    name: "저분자 히알루론산 앰플",
    rating: 4.65,
    reviews: 42300,
    rankChange: 0,
    isABCExclusive: true,
  },
  {
    id: 23,
    brand: "닥터지",
    name: "레드 블레미쉬 클리어 수딩 크림",
    rating: 4.55,
    reviews: 38900,
    rankChange: 3,
    isABCExclusive: false,
  },
  {
    id: 24,
    brand: "클리오",
    name: "킬 커버 파운웨어 쿠션",
    rating: 4.6,
    reviews: 55600,
    rankChange: -1,
    isABCExclusive: true,
  },
  {
    id: 25,
    brand: "이니스프리",
    name: "그린티 씨드 세럼",
    rating: 4.42,
    reviews: 67800,
    rankChange: 2,
    isABCExclusive: false,
  },
  {
    id: 26,
    brand: "라네즈",
    name: "워터 슬리핑 마스크",
    rating: 4.58,
    reviews: 81200,
    rankChange: 1,
    isABCExclusive: true,
  },
  {
    id: 27,
    brand: "에뛰드",
    name: "선프라이즈 마일드 아쿠아 선크림",
    rating: 4.51,
    reviews: 46700,
    rankChange: -2,
    isABCExclusive: false,
  },
  {
    id: 28,
    brand: "비플레인",
    name: "그린 플로럴 모공 토너",
    rating: 4.46,
    reviews: 34200,
    rankChange: 0,
    isABCExclusive: true,
  },
  {
    id: 29,
    brand: "메디힐",
    name: "티트리 케어 솔루션 앰플 마스크",
    rating: 4.63,
    reviews: 49500,
    rankChange: 3,
    isABCExclusive: false,
  },
  {
    id: 30,
    brand: "아누아",
    name: "녹두 pH 밸런싱 클렌징 오일",
    rating: 4.54,
    reviews: 27800,
    rankChange: -1,
    isABCExclusive: true,
  },
]

export default function RankingsPageClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeMainTab = searchParams.get("tab") || "급상승"
  const selectedCategory = searchParams.get("category") || "all"
  const selectedSubCategory = searchParams.get("subcategory") || "all"
  const selectedAttribute = searchParams.get("attribute") || "전체"

  const [displayCount, setDisplayCount] = useState(10)
  const loaderRef = useRef<HTMLDivElement>(null)

  const currentCategory = categories.find((c) => c.id === selectedCategory)

  // Reset display count when tab changes
  useEffect(() => {
    setDisplayCount(10)
  }, [activeMainTab, selectedCategory, selectedSubCategory, selectedAttribute])

  // Infinite scroll effect
  useEffect(() => {
    if (activeMainTab === "브랜드") return // 브랜드 탭은 무한 스크롤 제외

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < 30) {
          setDisplayCount((prev) => Math.min(prev + 10, 30))
        }
      },
      { threshold: 0.1 }
    )

    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [displayCount, activeMainTab])

  const handleSubCategorySelect = (subCategoryId: string) => {
    router.push(
      `/rankings?tab=${activeMainTab}&category=${selectedCategory}&subcategory=${subCategoryId}&attribute=${selectedAttribute}`
    )
  }

  const handleAttributeSelect = (attribute: string) => {
    router.push(
      `/rankings?tab=${activeMainTab}&category=${selectedCategory}&subcategory=${selectedSubCategory}&attribute=${attribute}`
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto max-w-[600px] bg-white min-h-screen shadow-[0_0_20px_rgba(0,0,0,0.1)] relative">
        <RankingsHeader activeTab="랭킹" />

        <main className="pb-20">
          {/* Category Filters (for 급상승 and 카테고리별 tabs) */}
          {(activeMainTab === "급상승" || activeMainTab === "카테고리별") &&
            selectedCategory !== "all" &&
            currentCategory && (
              <div className="px-4 py-3 space-y-3 border-b border-[#F5F5F5]">
                {/* Sub Category Pills */}
                {currentCategory.subCategories.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {currentCategory.subCategories.map((subCat) => (
                      <button
                        key={subCat.id}
                        onClick={() => handleSubCategorySelect(subCat.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                          selectedSubCategory === subCat.id ? "bg-[#1a1a1a] text-white" : "bg-[#F5F5F5] text-[#727171]"
                        }`}
                      >
                        {subCat.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Attribute Tags (only when subcategory is not '전체') */}
                {selectedSubCategory !== "all" && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {attributeTags.map((attr) => (
                      <button
                        key={attr}
                        onClick={() => handleAttributeSelect(attr)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                          selectedAttribute === attr ? "bg-[#1a1a1a] text-white" : "bg-white text-[#727171] border border-[#E5E5E5]"
                        }`}
                      >
                        {attr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

          {/* Update Date */}
          <div className="px-4 py-3 text-right">
            <span className="text-xs text-[#727171]">2026.01.14 업데이트</span>
          </div>

          {/* Brand Rankings (only for 브랜드 tab) */}
          {activeMainTab === "브랜드" ? (
            <div className="divide-y-8 divide-[#F5F5F5]">
              {brands.map((brand, index) => (
                <div key={brand.id} className="px-4 py-6">
                  <div className="flex items-center gap-3 mb-4">
                    {/* Brand Rank */}
                    <span className="text-lg font-bold text-[#f39800]">{index + 1}</span>

                    {/* Brand Logo Placeholder */}
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-[#727171] text-[6px]">Logo</span>
                    </div>

                    {/* Brand Name */}
                    <span className="font-medium text-[#1a1a1a]">{brand.name}</span>
                  </div>

                  {/* Brand Products */}
                  <div className="space-y-4">
                    {brand.products.map((product) => (
                      <Link key={product.id} href="/product/sample" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FAFAFA] transition-colors shadow-sm">
                        {/* Product Image */}
                        <div className="w-[72px] h-[72px] bg-gray-200 rounded-lg shrink-0 flex items-center justify-center">
                          <span className="text-gray-400 text-[10px]">이미지</span>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#1a1a1a] font-medium line-clamp-2 mb-1.5">{product.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-[#1a1a1a] font-medium">{product.rating.toFixed(2)}</span>
                            <span className="text-xs text-[#727171]">({product.reviews.toLocaleString()})</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Product Rankings (other tabs) */
            <>
              <div className="px-4 space-y-3 py-3">
                {dummyProducts.slice(0, displayCount).map((product, index) => (
                  <Link
                    href="/product/sample"
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FAFAFA] transition-colors shadow-sm"
                  >
                    {/* Rank Number */}
                    <div className="w-8 flex flex-col items-center shrink-0">
                      <span className="text-lg font-bold text-[#1a1a1a]">{index + 1}</span>
                      {/* Rank Change Indicator */}
                      {product.rankChange > 0 && (
                        <span className="text-[10px] text-[#FF4444] font-medium">▲{product.rankChange}</span>
                      )}
                      {product.rankChange < 0 && (
                        <span className="text-[10px] text-[#4444FF] font-medium">▼{Math.abs(product.rankChange)}</span>
                      )}
                      {product.rankChange === 0 && <span className="text-[10px] text-[#727171] font-medium">-</span>}
                    </div>

                    {/* Product Image Placeholder */}
                    <div className="w-[72px] h-[72px] bg-gray-200 rounded-lg shrink-0 flex items-center justify-center">
                      <span className="text-[10px] text-gray-400">이미지</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#9CA3AF]">{product.brand}</p>
                      <p className="text-sm text-[#1a1a1a] font-medium line-clamp-2 mt-0.5">{product.name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
                        <span className="text-xs text-[#1a1a1a] font-medium">{product.rating.toFixed(2)}</span>
                        <span className="text-xs text-[#727171]">({product.reviews.toLocaleString()})</span>
                      </div>
                      {product.isABCExclusive && (
                        <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-medium text-[#f39800] border border-[#f39800] rounded">
                          only ABCPharm
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Infinite Scroll Loader */}
              {displayCount < 30 && displayCount < dummyProducts.length && (
                <div ref={loaderRef} className="py-4 flex justify-center">
                  <div className="w-6 h-6 border-2 border-[#f39800] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </>
          )}
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  )
}
