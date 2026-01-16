"use client"

import { useState, useRef, useEffect } from "react"
import { Star, ChevronRight } from "lucide-react"
import Link from "next/link"

const ageGroups = ["10대", "20대", "30대", "40대 이상"]

const products = [
  {
    id: 54413,
    brand: "토리든",
    name: "다이브인 저분자 히알루론산 세럼",
    imageUrl: "",
    rating: 4.6,
    reviews: 74028,
  },
  {
    id: 70740,
    brand: "에스트라",
    name: "아토베리어365 크림",
    imageUrl: "",
    rating: 4.67,
    reviews: 13281,
  },
  {
    id: 69360,
    brand: "아누아",
    name: "PDRN 히알루론산 캡슐 100 세럼",
    imageUrl: "",
    rating: 4.61,
    reviews: 9578,
  },
  {
    id: 67703,
    brand: "비플레인",
    name: "녹두 약산성 클렌징폼",
    imageUrl: "",
    rating: 4.62,
    reviews: 44719,
  },
  {
    id: 26143,
    brand: "에스네이처",
    name: "아쿠아 오아시스 토너",
    imageUrl: "",
    rating: 4.74,
    reviews: 23528,
  },
  {
    id: 66749,
    brand: "린제이",
    name: "모델링마스크 컵팩 [쿨티트리]",
    imageUrl: "",
    rating: 4.74,
    reviews: 21371,
  },
  {
    id: 64587,
    brand: "메디힐",
    name: "마데카소사이드 에센셜 마스크 [흔적리페어]",
    imageUrl: "",
    rating: 4.73,
    reviews: 5308,
  },
  {
    id: 69574,
    brand: "토리든",
    name: "다이브인 저분자 히알루론산 토너",
    imageUrl: "",
    rating: 4.7,
    reviews: 31363,
  },
  {
    id: 45194,
    brand: "에스네이처",
    name: "아쿠아 스쿠알란 수분크림",
    imageUrl: "",
    rating: 4.57,
    reviews: 37662,
  },
]

// Rank Medal SVG Components
function GoldMedal() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="37" fill="none" viewBox="0 0 30 36" className="mb-2">
      <path
        fill="#FA0"
        d="m23.34 10.75-8 2.94c-.22.08-.47.08-.69 0l-7.99-2.94c-.39-.14-.66-.52-.66-.94V4.75c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v5.06c0 .42-.26.79-.66.94"
      />
      <path
        fill="#FFCD28"
        d="M15 32.25c6.351 0 11.5-5.149 11.5-11.5S21.351 9.25 15 9.25 3.5 14.399 3.5 20.75s5.149 11.5 11.5 11.5"
      />
      <path
        fill="#FF961E"
        d="m15.34 13.68 6.3-2.31a11.464 11.464 0 0 0-13.28 0l6.3 2.31c.22.08.47.08.69 0z"
      />
      <path fill="#fff" d="M14.945 16.75H16.5v9h-1.893v-7.104l-2.107.911v-1.746l2.445-1.05z" />
    </svg>
  )
}

function SilverMedal() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="37" fill="none" viewBox="0 0 30 36" className="mb-2">
      <path
        fill="#999"
        d="m23.34 10.75-8 2.94c-.22.08-.47.08-.69 0l-7.99-2.94c-.39-.14-.66-.52-.66-.94V4.75c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v5.06c0 .42-.26.79-.66.94"
      />
      <path
        fill="#C4C4C4"
        d="M15 32.25c6.351 0 11.5-5.149 11.5-11.5S21.351 9.25 15 9.25 3.5 14.399 3.5 20.75s5.149 11.5 11.5 11.5"
      />
      <path fill="#AAA" d="m15.34 13.68 6.3-2.31a11.464 11.464 0 0 0-13.28 0l6.3 2.31c.22.08.47.08.69 0z" />
      <path
        fill="#fff"
        d="M14.9 22.69h3.3v1.62h-5.98v-1.07l3.17-3.31c.7-.73.91-1.15.91-1.61 0-.56-.47-1-1.17-1-.79 0-1.24.54-1.24 1.09h-1.72c.11-1.64 1.28-2.65 2.96-2.65s2.88.88 2.88 2.49c0 .88-.33 1.56-1.26 2.51l-1.85 1.92z"
      />
    </svg>
  )
}

function BronzeMedal() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="37" fill="none" viewBox="0 0 30 36" className="mb-2">
      <path
        fill="#B96928"
        d="m23.34 10.75-8 2.94c-.22.08-.47.08-.69 0l-7.99-2.94c-.39-.14-.66-.52-.66-.94V4.75c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v5.06c0 .42-.26.79-.66.94"
      />
      <path
        fill="#BF9A67"
        d="M15 32.25c6.351 0 11.5-5.149 11.5-11.5S21.351 9.25 15 9.25 3.5 14.399 3.5 20.75s5.149 11.5 11.5 11.5"
      />
      <path
        fill="#A86127"
        d="m15.34 13.67 6.3-2.305a11.481 11.481 0 0 0-13.28 0l6.3 2.305c.22.08.47.08.69 0z"
      />
      <path
        fill="#fff"
        d="M18.25 21.92c0 1.44-1.14 2.53-3 2.53-1.7 0-3.01-1-3.09-2.74h1.71c.05.77.55 1.24 1.38 1.24.7 0 1.28-.43 1.28-1.12 0-.69-.59-1.12-1.28-1.12h-.79v-1.44h.73c.64 0 1.1-.42 1.1-1.01 0-.59-.47-1.01-1.1-1.01-.8 0-1.15.5-1.16 1.06h-1.71c.02-1.64 1.4-2.55 2.89-2.55 1.61 0 2.81.97 2.81 2.39 0 .84-.46 1.43-1.14 1.78.86.36 1.38 1.07 1.38 1.99z"
      />
    </svg>
  )
}

function ProductCard({ product, rank }: { product: (typeof products)[0]; rank: number }) {
  return (
    <li className="bg-white w-[320px]">
      <Link className="flex items-center" href="/products/sample">
        <div className="flex-shrink-0 space-y-1">
          <div className="flex items-center text-2xl shrink-0 w-[30px] flex-col mr-1 leading-[15px] h-[72px] justify-center">
            {rank === 1 ? <GoldMedal /> : rank === 2 ? <SilverMedal /> : rank === 3 ? <BronzeMedal /> : <div>{rank}</div>}
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="relative overflow-hidden rounded-lg bg-gray-200 w-[80px] pt-[80px]">
            {product.imageUrl ? (
              <img
                className="absolute left-0 top-0 h-full w-full scale-[0.8] object-contain"
                width="80"
                height="80"
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
              <span className="text-sm text-gray-500">{product.brand}</span>
              <span className="text-sm text-gray-900">{product.name}</span>
            </div>
            <div className="flex items-center space-x-0.5">
              <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
              <span className="text-xs text-gray-600">{product.rating}</span>
              <span className="text-xs text-gray-400 before:content-['('] after:content-[')']">
                {product.reviews.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default function AgeGroupRecommendations() {
  const [activeAgeGroup, setActiveAgeGroup] = useState("10대")
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
      <Link href="/rankings?tab=연령대별" className="block">
        <div className="px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold leading-normal">나이대별 추천</h2>
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </Link>

      {/* Age Group Filter */}
      <div className="overflow-x-auto mt-2 scrollbar-hide">
        <div className="flex items-center px-5 h-[52px] gap-x-2 [&>*]:shrink-0">
          {ageGroups.map((group) => (
            <label key={group} className="inline-flex items-center text-sm text-gray-900" htmlFor={`age-${group}`}>
              <input
                className="hidden"
                id={`age-${group}`}
                type="checkbox"
                checked={activeAgeGroup === group}
                onChange={() => setActiveAgeGroup(group)}
              />
              <span
                className={`inline-flex items-center rounded-lg cursor-pointer h-8 px-2.5 ${
                  activeAgeGroup === group
                    ? "bg-gray-900 border border-gray-900"
                    : "border border-gray-300 bg-white"
                }`}
              >
                <h3
                  className={`text-base font-semibold ${
                    activeAgeGroup === group ? "text-white" : "text-gray-600"
                  }`}
                >
                  {group}
                </h3>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex overflow-x-auto scrollbar-hide [&>*]:shrink-0" ref={scrollContainerRef}>
        <ol className="flex flex-col flex-wrap h-[258px] px-5 mt-4 space-x-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} rank={index + 1} />
          ))}
        </ol>
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
          href={`/rankings?tab=연령대별&filter=${activeAgeGroup}`}
        >
          {activeAgeGroup} 전체보기 <ChevronRight className="w-6 h-6" />
        </Link>
      </div>
    </section>
  )
}
