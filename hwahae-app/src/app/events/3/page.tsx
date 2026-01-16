"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"
import EventHeader from "@/components/event-header"

/**
 * 화해배송 이벤트 페이지 (/events/3)
 *
 * 구조:
 * - EventHeader (Sticky)
 * - 히어로 배너
 * - 컴포넌트 이미지 섹션
 * - Sticky 앵커 네비게이션 (탭 + 옵션: 브랜드 필터)
 * - 앵커 섹션들 (상품 그리드)
 * - Footer
 * - ScrollToTopButton
 */

// ========================================
// 설정: 앵커 탭 (플레이스홀더)
// ========================================
const anchorTabs = [
  { id: "popular-search", label: "인기 검색어" },
  { id: "best-brand", label: "베스트 브랜드" },
]

// ========================================
// 설정: 브랜드 필터 (옵션)
// ========================================
const showBrandFilter = false // true로 변경하면 브랜드 필터 표시
const brandFilters = [
  { id: "torriden", label: "토리든", anchor: "brand-torriden" },
  { id: "esnature", label: "에스네이처", anchor: "brand-esnature" },
  { id: "anua", label: "아누아", anchor: "brand-anua" },
  { id: "aetra", label: "에스트라", anchor: "brand-aetra" },
  { id: "beplain", label: "비플레인", anchor: "brand-beplain" },
  { id: "mediheal", label: "메디힐", anchor: "brand-mediheal" },
  { id: "wellage", label: "웰라쥬", anchor: "brand-wellage" },
  { id: "roundlab", label: "라운드랩", anchor: "brand-roundlab" },
]

// ========================================
// 상품 데이터
// ========================================
const sampleProducts = [
  {
    id: 73732,
    thumbnail:
      "https://img.hwahae.co.kr/commerce/goods/20251118_104428_%5Bonly%ED%99%94%ED%95%B4%5D%20%EC%B4%88%EC%A0%80%EB%B6%84%EC%9E%90%20%ED%9E%88%EC%95%84%EB%A3%A8%EB%A1%A0%EC%82%B0%20%ED%86%A0%EB%84%88%20%EA%B8%B0%ED%9A%8D(300ml%20%EB%B3%B8%ED%92%88%2B200ml%20%EB%A6%AC%ED%95%84%2B%EB%AF%B8%EC%8A%A4%ED%8A%B8%ED%8E%8C%ED%94%84).png",
    badge: "only화해",
    brand: "토리든",
    name: "[only화해] 초저분자 히아루론산 토너 기획(300ml 본품+200ml 리필+미스트펌프)",
    rating: 4.8,
    reviewCount: 12453,
    originalPrice: 42000,
    discountRate: 38,
    salePrice: 26040,
    shippingCost: "free",
    storeCount: 1,
  },
  {
    id: 73733,
    thumbnail:
      "https://img.hwahae.co.kr/commerce/goods/20260108_162119_%23fin_%ED%94%84%EB%A6%AC%EB%A9%94%EC%9D%B4%20%EC%88%98%EB%B6%84%ED%81%AC%EB%A6%BC.png",
    badge: undefined,
    brand: "프리메이",
    name: "프리메이 수분크림",
    rating: 4.6,
    reviewCount: 8234,
    originalPrice: 35000,
    discountRate: 25,
    salePrice: 26250,
    shippingCost: "free",
    storeCount: 3,
  },
  {
    id: 73734,
    thumbnail:
      "https://img.hwahae.co.kr/commerce/goods/20251118_105912_%5Bonly%ED%99%94%ED%95%B4%5D%20%EC%96%B4%EC%84%B1%EC%B4%88%2087%20%EC%95%BD%EC%82%B0%EC%84%B1%20%EB%94%A5%20%ED%81%B4%EB%A0%8C%EC%A7%95%EC%9B%8C%ED%84%B0%20%EA%B8%B0%ED%9A%8D(500ml%2B100ml%2B%EA%B1%B0%ED%92%88%EC%9A%A9%EA%B8%B0).png",
    badge: "only화해",
    brand: "아누아",
    name: "[only화해] 어성초 87 약산성 딥 클렌징워터 기획(500ml+100ml+거품용기)",
    rating: 4.9,
    reviewCount: 15678,
    originalPrice: 28000,
    discountRate: 32,
    salePrice: 19040,
    shippingCost: "free",
    storeCount: 1,
  },
  {
    id: 73735,
    thumbnail:
      "https://img.hwahae.co.kr/commerce/goods/20251118_113229_%5Bonly%ED%99%94%ED%95%B4%5D%20%EC%98%AC%EB%A6%AC%EB%B8%8C%20%EC%8B%9C%EC%B9%B4%20%EC%B9%B4%EB%B0%8D%20%EC%95%B0%ED%94%8C%20%EB%A7%88%EC%8A%A4%ED%81%AC%2020%EB%A7%A4%20%EA%B8%B0%ED%9A%8D%20(%2B%ED%95%91%ED%81%AC%20%EB%A7%88%EC%8A%A4%ED%81%AC%202%EB%A7%A4%20%EC%A6%9D%EC%A0%95)%20(1).png",
    badge: "only화해",
    brand: "메디힐",
    name: "[only화해] 올리브 시카 카밍 앰플 마스크 20매 기획 (+핑크 마스크 2매 증정)",
    rating: 4.7,
    reviewCount: 9876,
    originalPrice: 38000,
    discountRate: 40,
    salePrice: 22800,
    shippingCost: "free",
    storeCount: 1,
  },
  {
    id: 73736,
    thumbnail:
      "https://img.hwahae.co.kr/commerce/goods/20251118_111525_%5Bonly%ED%99%94%ED%95%B4%5D%20%EB%85%B9%EB%91%90%20%EC%95%BD%EC%82%B0%EC%84%B1%20%ED%81%B4%EB%A0%8C%EC%A7%95%ED%8F%BC%20200ml%20%EA%B8%B0%ED%9A%8D(120ml%2B80ml%2B%EC%88%98%EB%94%A9%ED%81%AC%EB%A6%BC20ml)%20(1).png",
    badge: "only화해",
    brand: "라운드랩",
    name: "[only화해] 녹두 약산성 클렌징폼 200ml 기획(120ml+80ml+수딩크림20ml)",
    rating: 4.8,
    reviewCount: 11234,
    originalPrice: 32000,
    discountRate: 35,
    salePrice: 20800,
    shippingCost: "free",
    storeCount: 1,
  },
  {
    id: 73737,
    thumbnail:
      "https://img.hwahae.co.kr/commerce/goods/20251118_113037_%5Bonly%ED%99%94%ED%95%B4%5D%20%ED%8A%B8%EB%A6%AC%ED%94%8C%20%EC%9D%B4%ED%8E%99%ED%8A%B8%20%EC%8B%9C%EB%84%88%EC%A7%80%20%EC%84%B8%EB%9F%BC%20%EA%B8%B0%ED%9A%8D(50ml%2B%ED%81%AC%EB%A6%BC30ml%2B%EB%A7%88%EC%8A%A4%ED%81%AC%202%EB%A7%A4%20%EC%A6%9D%EC%A0%95)%20(1).png",
    badge: "only화해",
    brand: "에스네이처",
    name: "[only화해] 트리플 이펙트 시너지 세럼 기획(50ml+크림30ml+마스크 2매 증정)",
    rating: 4.6,
    reviewCount: 7890,
    originalPrice: 45000,
    discountRate: 33,
    salePrice: 30150,
    shippingCost: "free",
    storeCount: 1,
  },
]

export default function Event3Page() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  // 앵커 스크롤 함수
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 56 // EventHeader 높이
      const tabHeight = 44 // 탭 네비게이션 높이
      const brandFilterHeight = showBrandFilter ? 52 : 0
      const offset = headerHeight + tabHeight + brandFilterHeight

      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const handleTabClick = (index: number, tabId: string) => {
    setActiveTab(index)
    scrollToSection(tabId)
  }

  const handleFilterClick = (filter: { id: string; label: string; anchor: string }) => {
    const isSelected = selectedFilters.includes(filter.id)
    if (isSelected) {
      setSelectedFilters((prev) => prev.filter((f) => f !== filter.id))
    } else {
      setSelectedFilters((prev) => [...prev, filter.id])
      scrollToSection(filter.anchor)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <main className="max-w-[600px] mx-auto my-[0] bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] relative">
        {/* Header */}
        <EventHeader />

        {/* Main Content Container */}
        <div className="pb-16">
          {/* 히어로 배너 섹션 */}
          <section>
            <div className="flex flex-col">
              <div className="relative">
                <picture className="m-0 p-0">
                  <source
                    srcSet="https://img.hwahae.co.kr/commerce/deal_events/banners/20251204/20251204155857027_bdbd0b19-2eec-4321-969c-a53b3fdbaf4d.png?format=webp"
                    type="image/webp"
                  />
                  <img
                    className="w-full h-auto align-top pointer-events-none touch-action-none transition-opacity duration-75 opacity-100"
                    loading="eager"
                    width={1080}
                    height={1266}
                    src="https://img.hwahae.co.kr/commerce/deal_events/banners/20251204/20251204155857027_bdbd0b19-2eec-4321-969c-a53b3fdbaf4d.png"
                    alt="화해배송 이벤트 배너"
                    style={{ clipPath: "inherit" }}
                  />
                </picture>
              </div>
            </div>
          </section>

          {/* 컴포넌트 이미지 섹션 */}
          <section className="mt-4">
            <div className="flex flex-col space-y-4">
              {/* GIF 애니메이션 */}
              <div className="relative">
                <picture className="m-0 p-0">
                  <source
                    srcSet="https://img.hwahae.co.kr/commerce/deal_events/components/20251001/20251001211118761_0b74a3e6-0293-4393-8035-f09a51461e45.gif?format=webp"
                    type="image/webp"
                  />
                  <img
                    className="w-full h-auto align-top pointer-events-none touch-action-none transition-opacity duration-75 opacity-100"
                    loading="lazy"
                    width={1080}
                    height={400}
                    src="https://img.hwahae.co.kr/commerce/deal_events/components/20251001/20251001211118761_0b74a3e6-0293-4393-8035-f09a51461e45.gif"
                    alt="이벤트 컴포넌트"
                    style={{ clipPath: "inherit" }}
                  />
                </picture>
              </div>

              {/* 추가 컴포넌트 이미지 */}
              <div className="relative">
                <picture className="m-0 p-0">
                  <source
                    srcSet="https://img.hwahae.co.kr/commerce/deal_events/components/20251013/20251013091246385_f8549ee2-f664-4028-81d2-83dde0cda057.png?format=webp"
                    type="image/webp"
                  />
                  <img
                    className="w-full h-auto align-top pointer-events-none touch-action-none transition-opacity duration-75 opacity-100"
                    loading="lazy"
                    width={1080}
                    height={400}
                    src="https://img.hwahae.co.kr/commerce/deal_events/components/20251013/20251013091246385_f8549ee2-f664-4028-81d2-83dde0cda057.png"
                    alt="이벤트 컴포넌트"
                    style={{ clipPath: "inherit" }}
                  />
                </picture>
              </div>

              <div className="relative">
                <picture className="m-0 p-0">
                  <source
                    srcSet="https://img.hwahae.co.kr/commerce/deal_events/components/20251110/20251110092814094_109cd616-29c7-4ad4-a304-839c5ee9432b.png?format=webp"
                    type="image/webp"
                  />
                  <img
                    className="w-full h-auto align-top pointer-events-none touch-action-none transition-opacity duration-75 opacity-100"
                    loading="lazy"
                    width={1080}
                    height={400}
                    src="https://img.hwahae.co.kr/commerce/deal_events/components/20251110/20251110092814094_109cd616-29c7-4ad4-a304-839c5ee9432b.png"
                    alt="이벤트 컴포넌트"
                    style={{ clipPath: "inherit" }}
                  />
                </picture>
              </div>
            </div>
          </section>

          {/* ========================================
              Sticky 앵커 네비게이션
              ======================================== */}
          <div className="anchor-section relative">
            <div className="sticky top-[56px] z-[29] bg-white mt-16" data-deal-anchor-sticky="1">
              {/* 탭 네비게이션 */}
              <div className="hidden-scrollbar flex overflow-x-auto [&>div]:flex-shrink-0">
                <div className="flex relative min-w-full flex-nowrap">
                  <div className="flex relative items-center" style={{ height: "44px" }}>
                    {anchorTabs.map((tab, index) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(index, tab.id)}
                        className={`relative flex flex-col space-y-0.5 items-center h-[44px] px-5 ${
                          activeTab === index
                            ? "text-subtitle-large text-gray-900 border-b-2 border-gray-900"
                            : "text-body-large text-gray-500 border-b-2 border-transparent"
                        }`}
                        type="button"
                      >
                        <span className="h-[7px]"></span>
                        <span className="relative grow">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 브랜드 필터 (옵션) */}
              {showBrandFilter && (
                <div
                  className="flex items-center px-5 py-2.5 box-content space-x-2 overflow-auto"
                  style={{ height: "52px" }}
                >
                  {brandFilters.map((filter) => {
                    const isSelected = selectedFilters.includes(filter.id)
                    return (
                      <label
                        key={filter.id}
                        className="inline-flex items-center text-body-medium text-gray-900"
                      >
                        <input className="hidden" type="checkbox" checked={isSelected} readOnly />
                        <span
                          onClick={() => handleFilterClick(filter)}
                          className={`inline-flex items-center rounded-lg cursor-pointer border h-8 px-2.5 text-sm ${
                            isSelected
                              ? "border-gray-900 bg-gray-900 text-white"
                              : "border-gray-300 bg-white text-gray-600"
                          }`}
                        >
                          {filter.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
              )}

              <hr className="bg-gray-300 h-[1px] absolute bottom-[0] left-[0] w-full"></hr>
            </div>

            {/* ========================================
                앵커 섹션 1: 인기 검색어
                ======================================== */}
            <section id="popular-search" className="pb-8 pt-4">
              <h2 className="text-xl font-bold px-5 mb-4">인기 검색어</h2>
              <ul className="flex -mt-4 px-5 flex-wrap">
                {sampleProducts.slice(0, 3).map((product, index) => (
                  <li key={product.id} className={`w-[calc(50%-8px)] mt-4 ${index % 2 === 1 ? "ml-4" : ""}`}>
                    <Link href={`/goods/${product.id}`} className="block">
                      {/* 썸네일 */}
                      <div className="relative overflow-hidden rounded-lg bg-white outline outline-1 outline-gray-300 w-full pt-[100%]">
                        <picture className="absolute left-0 top-0 h-full w-full">
                          <img
                            className="h-full w-full object-cover touch-action-none pointer-events-none transition-opacity duration-75 opacity-100"
                            width="1"
                            height="1"
                            alt={product.name}
                            src={product.thumbnail}
                            style={{ clipPath: "inherit" }}
                          />
                        </picture>
                      </div>

                      {/* 상품 정보 */}
                      <div className="mt-2">
                        {/* only화해 뱃지 */}
                        {product.badge && (
                          <div className="flex flex-wrap mt-1">
                            <span className="inline-block rounded-full font-bold h-4 px-1 text-[11px] leading-4 bg-red-400 text-white">
                              {product.badge}
                            </span>
                          </div>
                        )}

                        {/* 브랜드 + 제품명 */}
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
                          <span className="text-sm text-red-500 after:content-['%']">
                            {product.discountRate}
                          </span>
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

            {/* ========================================
                앵커 섹션 2: 베스트 브랜드
                ======================================== */}
            <section id="best-brand" className="pb-8 pt-4">
              <h2 className="text-xl font-bold px-5 mb-4">베스트 브랜드</h2>
              <ul className="flex -mt-4 px-5 flex-wrap">
                {sampleProducts.slice(3, 6).map((product, index) => (
                  <li key={product.id} className={`w-[calc(50%-8px)] mt-4 ${index % 2 === 1 ? "ml-4" : ""}`}>
                    <Link href={`/goods/${product.id}`} className="block">
                      {/* 썸네일 */}
                      <div className="relative overflow-hidden rounded-lg bg-white outline outline-1 outline-gray-300 w-full pt-[100%]">
                        <picture className="absolute left-0 top-0 h-full w-full">
                          <img
                            className="h-full w-full object-cover touch-action-none pointer-events-none transition-opacity duration-75 opacity-100"
                            width="1"
                            height="1"
                            alt={product.name}
                            src={product.thumbnail}
                            style={{ clipPath: "inherit" }}
                          />
                        </picture>
                      </div>

                      {/* 상품 정보 */}
                      <div className="mt-2">
                        {product.badge && (
                          <div className="flex flex-wrap mt-1">
                            <span className="inline-block rounded-full font-bold h-4 px-1 text-[11px] leading-4 bg-red-400 text-white">
                              {product.badge}
                            </span>
                          </div>
                        )}

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

                        <div className="mt-1">
                          <div className="inline-flex text-xs text-red-500 space-x-1 flex-wrap">
                            <span className="text-gray-500 text-xs line-through">
                              {product.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500">원</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-red-500 after:content-['%']">
                            {product.discountRate}
                          </span>
                          <span className="text-gray-900 text-base font-semibold">
                            {product.salePrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-900">원</span>
                        </div>

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
        </div>

        {/* Footer */}
        <Footer />

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </main>
    </div>
  )
}
