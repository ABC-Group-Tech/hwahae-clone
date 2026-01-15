"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

const brands = [
  {
    id: 1,
    name: "토리든",
    products: [
      { id: 1, name: "다이브인 저분자 히알루론산 세럼" },
      { id: 2, name: "다이브인 토너" },
      { id: 3, name: "다이브인 크림" },
    ],
  },
  {
    id: 2,
    name: "에스네이처",
    products: [
      { id: 4, name: "아쿠아 오아시스 토너" },
      { id: 5, name: "아쿠아 오아시스 세럼" },
      { id: 6, name: "아쿠아 오아시스 크림" },
    ],
  },
  {
    id: 3,
    name: "아누아",
    products: [
      { id: 7, name: "녹두 약산성 클렌징폼" },
      { id: 8, name: "어성초 토너" },
      { id: 9, name: "녹두 모공 세럼" },
    ],
  },
]

export default function TrendingBrands() {
  return (
    <section className="py-4">
      <Link href="/rankings?tab=브랜드" className="px-4 mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#1a1a1a]">요즘 뜨는 브랜드</h2>
        <ChevronRight className="w-5 h-5 text-[#727171]" />
      </Link>

      {/* Brand List */}
      <div className="space-y-6">
        {brands.map((brand, index) => (
          <div key={brand.id} className="px-4">
            <div className="flex items-center gap-3 mb-3">
              {/* Brand Rank */}
              <span className="text-lg font-bold text-[#f39800]">{index + 1}</span>

              {/* Brand Logo Placeholder */}
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-[#727171] text-[6px]">Logo</span>
              </div>

              {/* Brand Name */}
              <span className="font-medium text-[#1a1a1a]">{brand.name}</span>
            </div>

            {/* Brand Products */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {brand.products.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="min-w-[100px] flex-shrink-0">
                  <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-1">
                    <span className="text-[#727171] text-[8px]">Product</span>
                  </div>
                  <p className="text-xs text-[#727171] line-clamp-2">{product.name}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="px-4 mt-4">
        <Link
          href="/rankings?tab=브랜드"
          className="block w-full py-3 text-sm text-[#727171] border border-[#e5e5e5] rounded-lg bg-white text-center"
        >
          브랜드 전체보기 {">"}
        </Link>
      </div>
    </section>
  )
}
