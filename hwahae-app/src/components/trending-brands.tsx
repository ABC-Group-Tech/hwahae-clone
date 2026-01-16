"use client"

import Link from "next/link"
import { ChevronRight, Star } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const brands = [
  {
    id: 1,
    name: "토리든",
    themeId: 3264,
    logoUrl: "",
    products: [
      {
        id: 54413,
        name: "다이브인 저분자 히알루론산 세럼",
        imageUrl: "",
        rating: 4.6,
        reviewCount: 74028,
      },
      {
        id: 69574,
        name: "다이브인 저분자 히알루론산 토너",
        imageUrl: "",
        rating: 4.7,
        reviewCount: 31363,
      },
      {
        id: 69344,
        name: "다이브인 저분자 히알루론산 수딩 크림",
        imageUrl: "",
        rating: 4.67,
        reviewCount: 23531,
      },
    ],
  },
  {
    id: 2,
    name: "에스네이처",
    themeId: 1237,
    logoUrl: "",
    products: [
      {
        id: 26143,
        name: "아쿠아 오아시스 토너",
        imageUrl: "",
        rating: 4.74,
        reviewCount: 23528,
      },
      {
        id: 45194,
        name: "아쿠아 스쿠알란 수분크림",
        imageUrl: "",
        rating: 4.57,
        reviewCount: 37662,
      },
      {
        id: 73817,
        name: "아쿠아 라이스 클렌징 밀크",
        imageUrl: "",
        rating: 4.61,
        reviewCount: 1502,
      },
    ],
  },
  {
    id: 3,
    name: "아누아",
    themeId: 7890,
    logoUrl: "",
    products: [
      {
        id: 69360,
        name: "PDRN 히알루론산 캡슐 100 세럼",
        imageUrl: "",
        rating: 4.61,
        reviewCount: 9578,
      },
      {
        id: 70767,
        name: "PDRN 히알루론산 100 수분 크림",
        imageUrl: "",
        rating: 4.65,
        reviewCount: 3539,
      },
      {
        id: 35620,
        name: "어성초 77 수딩 토너",
        imageUrl: "",
        rating: 4.5,
        reviewCount: 1694,
      },
    ],
  },
]

export default function TrendingBrands() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        const maxScroll = scrollWidth - clientWidth
        const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
        setScrollProgress(progress)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="mt-[60px]">
      {/* Section Header */}
      <Link href="/rankings?english_name=brand&theme_id=3264" className="block">
        <div className="px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold leading-normal">요즘 뜨는 브랜드</h2>
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </Link>

      {/* Horizontal Scrollable Brand List */}
      <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide [&>*]:shrink-0">
        <div className="flex flex-col flex-wrap px-5">
          <ol className="flex flex-row">
            {brands.map((brand, index) => (
              <li key={brand.id}>
                {/* Brand Header */}
                <div className="flex items-center w-[320px] py-2">
                  <div className="flex items-center text-2xl shrink-0 w-[30px] flex-col mr-1 leading-[15px] h-10 justify-center">
                    <div>{index + 1}</div>
                  </div>
                  <span className="ml-1 isolate">
                    <div className="relative w-[32px] pt-[32px] bg-gray-200 rounded-full overflow-hidden">
                      {brand.logoUrl ? (
                        <img
                          className="absolute left-0 top-0 h-full w-full object-contain"
                          width="32"
                          height="32"
                          alt={brand.name}
                          src={brand.logoUrl}
                        />
                      ) : (
                        <div className="absolute left-0 top-0 h-full w-full flex items-center justify-center">
                          <span className="text-gray-400 text-[8px]">Logo</span>
                        </div>
                      )}
                    </div>
                  </span>
                  <div className="ml-2">
                    <span className="text-base font-semibold">{brand.name}</span>
                  </div>
                </div>

                {/* Brand Products */}
                <ul>
                  {brand.products.map((product) => (
                    <li key={product.id} className="bg-white w-[320px]">
                      <Link className="flex items-center" href="/products/sample">
                        <div className="flex-shrink-0">
                          <div className="relative overflow-hidden rounded-lg bg-gray-200 w-[96px] pt-[96px]">
                            {product.imageUrl ? (
                              <img
                                className="absolute left-0 top-0 h-full w-full scale-[0.8] object-contain"
                                width="96"
                                height="96"
                                alt="thumbnail"
                                src={product.imageUrl}
                              />
                            ) : (
                              <div className="absolute left-0 top-0 h-full w-full flex items-center justify-center">
                                <span className="text-gray-400 text-[10px]">이미지</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1 ml-3">
                          <div>
                            <div
                              className="leading-normal space-x-0.5 block"
                              style={{
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                              }}
                            >
                              <span className="text-sm text-gray-500">{brand.name}</span>
                              <span className="text-sm text-gray-900">{product.name}</span>
                            </div>
                            <div className="flex items-center space-x-0.5">
                              <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                              <span className="text-xs text-gray-600">{product.rating}</span>
                              <span className="text-xs text-gray-400 before:content-['('] after:content-[')']">
                                {product.reviewCount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Pagination Indicator */}
      <div className="flex justify-center py-2">
        <div className="h-[4px] w-[32px] rounded bg-gray-200 relative">
          <div
            className="absolute h-[4px] w-[15px] rounded bg-gray-800 transition-all duration-200"
            style={{ left: `${(scrollProgress / 100) * (32 - 15)}px` }}
          ></div>
        </div>
      </div>

      {/* View All Button */}
      <div className="px-5 mt-4">
        <Link
          className="inline-flex justify-center items-center appearance-none px-4 h-[44px] rounded-lg border border-gray-300 bg-white text-base font-semibold w-full"
          href="/rankings?english_name=brand&theme_id=3264"
        >
          브랜드 전체보기
          <ChevronRight className="w-6 h-6" />
        </Link>
      </div>
    </section>
  )
}
