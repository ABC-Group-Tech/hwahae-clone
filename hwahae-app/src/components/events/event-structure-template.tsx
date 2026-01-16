"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"
import SideFloatingBanner from "@/components/side-floating-banner"
import EventHeader from "@/components/event-header"

/**
 * ABC Pharm 스타일 이벤트 페이지 템플릿
 *
 * 구조:
 * - EventHeader (Sticky top-[0])
 * - 히어로 배너 (1개 이상, WebP 지원)
 * - Sticky 네비게이션 (top-[56px]) - 탭 + 브랜드 필터
 * - 상품 그리드 (2컬럼 또는 가로 스크롤)
 * - Footer
 * - SideFloatingBanner (Desktop QR)
 * - ScrollToTopButton
 */

// 샘플 데이터
const tabs = ["인기 검색어", "베스트", "신상품", "특가"]
const brandFilters = ["토리든", "에스네이처", "아누아", "에스트라", "비플레인", "메디힐", "웰라쥬", "라운드랩"]

const sampleProducts = Array.from({ length: 8 }, (_, i) => ({
  id: 73732 + i,
  thumbnail: `https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Product+${i + 1}`,
  badge: i % 3 === 0 ? "onlyABC Pharm" : undefined,
  brand: ["닥터오라클", "이니스프리", "코스알엑스", "이즈앤트리", "프리메이", "비플레인", "아누아", "메디힐"][i],
  name: `[onlyABC Pharm] 레티놀 앰플 30ml 기획 세트 (앰플30ml+크림10mlx2EA+팩 5매) ${i + 1}`,
  rating: 4.5 + (i * 0.1),
  reviewCount: 1000 + (i * 500),
  originalPrice: 30000 + (i * 5000),
  discountRate: 30 + (i * 5),
  salePrice: 20000 + (i * 3000),
  shippingCost: "free",
  storeCount: 1 + i,
}))

export default function EventStructureTemplate() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const handleFilterClick = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <main className="max-w-[600px] mx-auto my-[0] bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] relative">
        {/* Header */}
        <EventHeader />

        {/* Main Content Container */}
        <div className="pb-16">
          {/* 히어로 배너 섹션 */}
          <div>
            <div className="flex flex-col">
              <div className="">
                <div className="relative">
                  <picture className="m-0 p-0">
                    <source
                      srcSet="https://via.placeholder.com/1080x1266/4A90E2/FFFFFF?text=Event+Banner+1"
                      type="image/webp"
                    />
                    <img
                      className="w-full h-auto align-top pointer-events-none touch-action-none transition-opacity duration-75 opacity-100"
                      loading="eager"
                      width={1080}
                      height={1266}
                      src="https://via.placeholder.com/1080x1266/4A90E2/FFFFFF?text=Event+Banner+1"
                      alt="이벤트 배너"
                      style={{ clipPath: "inherit" }}
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky 네비게이션 */}
          <div className="anchor-section relative">
            <div className="sticky top-[56px] z-[29] bg-white mt-4" data-deal-anchor-sticky="1">
              {/* 탭 네비게이션 */}
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex relative min-w-full flex-nowrap">
                  <div className="flex relative items-center" style={{ height: "44px" }}>
                    {tabs.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`relative flex flex-col space-y-0.5 items-center h-[44px] px-5 ${
                          activeTab === index
                            ? "text-subtitle-large text-gray-900 border-b-2 border-gray-900"
                            : "text-body-large text-gray-500 border-b-2 border-transparent"
                        }`}
                        type="button"
                      >
                        <span className="h-[7px]"></span>
                        <span className="relative grow">{tab}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 브랜드 필터 */}
              <div className="flex items-center px-5 py-2.5 box-content space-x-2 h-8 overflow-auto scrollbar-hide">
                {brandFilters.map((filter) => {
                  const isSelected = selectedFilters.includes(filter)
                  return (
                    <label key={filter} className="inline-flex items-center text-sm text-gray-900">
                      <span
                        onClick={() => handleFilterClick(filter)}
                        className={`inline-flex items-center rounded-lg cursor-pointer border h-8 pl-2.5 pr-2.5 text-sm ${
                          isSelected
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300 bg-white text-gray-600"
                        }`}
                      >
                        {filter}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 상품 그리드 (2컬럼) */}
          <section className="pb-8">
            <ul className="flex -mt-4 px-5 flex-wrap">
              {sampleProducts.map((product, index) => (
                <li
                  key={product.id}
                  className={`w-[calc(50%-8px)] mt-4 ${index % 2 === 1 ? "ml-4" : ""}`}
                >
                  <Link href={`/goods/sample`} className="block">
                    {/* 썸네일 */}
                    <div className="relative overflow-hidden rounded-lg bg-white outline outline-1 outline-gray-300 w-full pt-[100%]">
                      <picture className="absolute left-0 top-0 h-full w-full">
                        <img
                          className="h-full w-full object-cover touch-action-none pointer-events-none transition-opacity duration-75 opacity-100"
                          width="1"
                          height="1"
                          alt="썸네일 이미지"
                          src={product.thumbnail}
                          style={{ clipPath: "inherit" }}
                        />
                      </picture>
                    </div>

                    {/* 상품 정보 */}
                    <div className="mt-2">
                      {/* onlyABC Pharm 뱃지 */}
                      {product.badge && (
                        <div className="flex flex-wrap mt-1">
                          <span className="inline-block rounded-full font-bold h-4 px-1 text-[11px] leading-4 bg-red-400 text-white">
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {/* 브랜드 + 제품명 (2줄 말줄임) */}
                      <div
                        className="leading-normal text-ellipsis space-x-1 mt-2"
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

                      {/* 평점 + 리뷰수 */}
                      <div className="flex items-center space-x-1 mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="text-orange-400"
                        >
                          <path
                            fill="currentColor"
                            d="M17.712 21.992c-.12 0-.25-.03-.36-.09l-5.347-2.958-5.347 2.959a.75.75 0 0 1-.79-.04.761.761 0 0 1-.31-.74l1.03-6.328-4.378-4.478c-.2-.2-.26-.5-.17-.76.09-.27.32-.46.6-.5l5.997-.92L11.315 2.4c.25-.53 1.11-.53 1.36 0l2.688 5.738 5.997.92c.28.04.51.24.6.5.09.269.02.559-.17.759l-4.358 4.478 1.03 6.328a.76.76 0 0 1-.74.88z"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">{product.rating.toFixed(2)}</span>
                        <span className="text-xs text-gray-500 before:content-['('] after:content-[')']">
                          {product.reviewCount.toLocaleString()}
                        </span>
                      </div>

                      {/* 가격 */}
                      <div className="mt-1">
                        <div className="inline-flex text-xs text-red-500 space-x-1 flex-wrap">
                          <span className="text-gray-500 text-xs line-through">
                            {product.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">원</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-red-500 after:content-['%']">{product.discountRate}</span>
                        <span className="text-gray-900 text-base font-semibold">
                          {product.salePrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-900">원</span>
                      </div>

                      {/* 배송비 + 판매처 */}
                      <div className="mt-1 text-xs text-gray-500">
                        <span className="text-xs text-gray-900">
                          {product.shippingCost === "free" ? "무료배송" : `${product.shippingCost}원`}
                        </span>
                      </div>
                      <div className="text-xs text-gray-900">
                        <span className="text-[11px] text-gray-900">{product.storeCount}</span>
                        <span className="text-xs text-gray-600">개 쇼핑몰</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer */}
        <Footer />

        {/* Side Floating Banner (Desktop QR) */}
        <SideFloatingBanner />

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </main>
    </div>
  )
}
