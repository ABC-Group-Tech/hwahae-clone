"use client"

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { useState } from "react"
import ProductDetailHeader from "@/components/product-detail-header"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"

export default function GoodsDetailPageClient() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showCartModal, setShowCartModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"goods_info" | "review_ingredients">("review_ingredients")
  const [isGoodsInfoExpanded, setIsGoodsInfoExpanded] = useState(false)

  const images = [
    "https://img.hwahae.co.kr/commerce/goods/20251118_105008_%5Bonly%ED%99%94%ED%95%B4%5D%20%EB%8B%A4%EC%9D%B4%EB%B8%8C%EC%9D%B8%20%EC%A0%80%EB%B6%84%EC%9E%90%20%ED%9E%88%EC%95%8C%EB%A3%A8%EB%A1%A0%EC%82%B0%20%EC%84%B8%EB%9F%BC%20100ml%20%EA%B8%B0%ED%9A%8D%20(%2B%EC%88%98%EB%94%A9%ED%81%AC%EB%A6%BC%2050ml).png",
    "/images/placeholder-product.png",
    "/images/placeholder-product.png",
  ]

  const handleAddToCart = () => {
    setShowCartModal(true)
  }

  const handleCloseModal = () => {
    setShowCartModal(false)
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <ProductDetailHeader />

        {/* pb-20: 하단 고정 버튼 공간 확보 (80px) */}
        <main className="pb-20">
          {/* 첫 구매 배너 */}
          <Link className="flex w-full items-center px-5 py-4 bg-purple-50" href="/deal-event/989">
            <span className="flex flex-shrink-0 w-[42px] h-[42px] object-cover">
              <Image src="/images/250313_icon_144x144.png" alt="coupon" width={42} height={42} />
            </span>
            <div className="flex flex-col flex-grow ml-3 text-left">
              <em className="text-sm line-clamp-1 text-purple-500 break-all block">아직도 화해 첫 구매 안 했다면?</em>
              <p className="text-base font-semibold line-clamp-2 text-purple-500 break-all">3만 원 상당 혜택 받아가세요!</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="flex flex-shrink-0 ml-3 text-purple-500">
              <path fill="currentColor" d="M8.26 4.192a.808.808 0 0 1 1.107.057l6.166 6.583a1.695 1.695 0 0 1 0 2.336l-6.166 6.583a.808.808 0 0 1-1.106.057.728.728 0 0 1-.06-1.059l6.165-6.582a.242.242 0 0 0 0-.334L8.2 5.251a.728.728 0 0 1 .06-1.06Z" />
            </svg>
          </Link>

          {/* 상품 이미지 슬라이더 */}
          <div className="pb-4">
            <div className="relative">
              <div className="relative pb-[100%]">
                <div className="absolute w-[94%] h-[94%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative w-full h-full">
                    <Image
                      src={images[currentImageIndex]}
                      alt="상품 이미지"
                      fill
                      className="object-contain"
                      sizes="600px"
                      priority
                    />
                  </div>
                </div>
              </div>
              {/* 슬라이드 인디케이터 */}
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${currentImageIndex === index ? "bg-gray-800" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>

      {/* 상품 정보 */}
      <div className="mt-6">
        <div className="px-5">
          <div className="flex items-center">
            <span className="inline-block w-8 h-8 rounded-full border border-gray-300 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="https://img.hwahae.co.kr/brands/3264/3264_20230405140512.png"
                  alt="토리든"
                  fill
                  className="object-contain"
                />
              </div>
            </span>
            <span className="text-sm text-gray-500 ml-2">
              <Link href="/search?q=토리든">토리든</Link>
            </span>
          </div>
          <div className="mt-2">
            <span className="text-lg font-medium text-gray-900">
              [only화해] 다이브인 저분자 히알루론산 세럼 100ml 기획 (+수딩크림 50ml)
            </span>
          </div>

          {/* 평점 */}
          <button type="button" className="block mt-4">
            <div className="flex items-center space-x-0.5">
              <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
              <span className="text-sm text-gray-600 font-bold">4.60</span>
              <span className="text-xs text-gray-400 before:content-['('] after:content-[')']">74,042</span>
            </div>
          </button>

          {/* 판매 옵션 보기 */}
          <Link
            className="flex justify-between mt-4 p-2 pr-4 bg-white items-center rounded-lg border border-gray-900"
            href="54413/relation-goods"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex flex-grow items-center">
              <span className="flex flex-shrink-0">
                <div className="relative w-[52px] h-[52px]">
                  <Image src={images[0]} alt="상품" fill className="object-contain" />
                </div>
              </span>
              <div className="flex flex-col flex-grow ml-2">
                <span className="text-xs text-gray-500">판매 중인 상품 옵션보기</span>
                <span className="text-sm flex mt-0.5 text-gray-900">
                  <span className="line-clamp-1">
                    [only화해] 다이브인 저분자 히알루론산 세럼 100ml 기획 (+수딩크림 50ml)&nbsp;
                  </span>
                  <span className="shrink-0">외 1개</span>
                </span>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="shrink-0 ml-2">
              <path
                fill="currentColor"
                d="M14.721 9c1.02 0 1.628 1.028 1.062 1.795l-2.72 3.69c-.506.686-1.62.686-2.125 0l-2.721-3.69C7.65 10.028 8.259 9 9.279 9z"
              />
            </svg>
          </Link>

          {/* 가격 정보 */}
          <div className="pb-3">
            <div className="flex mt-4 justify-between">
              <span className="text-sm text-gray-900">화해쇼핑 판매가</span>
              <div className="flex justify-end flex-wrap ml-2.5">
                <span className="inline-block rounded h-5 px-1 text-xs leading-5 bg-purple-50 text-purple-600 shrink-0 ml-1 first-of-type:ml-0">
                  only화해
                </span>
                <span className="inline-block rounded h-5 px-1 text-xs leading-5 bg-purple-50 text-purple-600 shrink-0 ml-1 first-of-type:ml-0">
                  무료배송
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <em className="text-2xl text-red-600">38%</em>
              <span className="flex items-center space-x-0.5 text-gray-900">
                <span className="text-2xl font-semibold">26,900</span>
                <span className="text-lg">원</span>
              </span>
            </div>
          </div>
        </div>

        {/* 쿠폰 정보 */}
        <div className="px-4 border-gray-900 border rounded-lg mx-5">
          <div className="pt-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-900">
                상품에 적용 가능한 <em className="text-base font-semibold text-gray-900">쿠폰</em>이 있어요!
              </p>
              <Link
                href="54413/coupon-download"
                rel="noreferrer noopener"
                target="_blank"
                className="inline-flex justify-center items-center px-4 h-11 rounded-lg text-base font-semibold bg-[#f39800] text-white ml-1 shrink-0"
              >
                쿠폰 다운
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="ml-0.5">
                  <path
                    fill="currentColor"
                    d="M8.26 4.192a.808.808 0 0 1 1.107.057l6.166 6.583a1.695 1.695 0 0 1 0 2.336l-6.166 6.583a.808.808 0 0 1-1.106.057.728.728 0 0 1-.06-1.059l6.165-6.582a.242.242 0 0 0 0-.334L8.2 5.251a.728.728 0 0 1 .06-1.06Z"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex text-sm text-gray-900 mt-2">
              <span className="flex-shrink-0 w-[110px]">최대 할인 쿠폰 다운 시</span>
              <span className="text-[#f39800] font-semibold">24,900원</span>
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="border-t border-gray-200 py-3 mt-3">
            <div className="flex text-sm">
              <span className="text-sm flex-shrink-0 w-[60px] text-gray-600">배송비</span>
              <span className="text-[#f39800]">무료배송</span>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="sticky top-14 z-20 flex w-full bg-white border-b border-gray-300 mt-4">
          <button
            onClick={() => setActiveTab("goods_info")}
            className={`relative grow h-11 ${
              activeTab === "goods_info"
                ? "text-base font-semibold text-gray-900"
                : "text-base text-gray-500"
            }`}
          >
            <span
              className={`inline-block leading-[42px] text-center ${
                activeTab === "goods_info" ? "border-b-2 border-gray-900" : ""
              }`}
            >
              상품정보
            </span>
          </button>
          <button
            onClick={() => setActiveTab("review_ingredients")}
            className={`relative grow h-11 ${
              activeTab === "review_ingredients"
                ? "text-base font-semibold text-gray-900"
                : "text-base text-gray-500"
            }`}
          >
            <span
              className={`inline-block leading-[42px] text-center ${
                activeTab === "review_ingredients" ? "border-b-2 border-gray-900" : ""
              }`}
            >
              리뷰/성분
            </span>
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        {activeTab === "goods_info" && (
          <div>
            <div>
              <img
                alt=""
                src="https://img.hwahae.co.kr/commerce/notice/20251024/20251024154656611_%ED%99%94%ED%95%B4%EC%83%81%EB%8B%A8%EB%B0%B0%EB%84%88.jpg"
                className="w-full h-auto"
              />
            </div>
            <div className={`relative pb-[100px] ${isGoodsInfoExpanded ? 'h-auto' : 'h-[600px] overflow-hidden'}`}>
              <div>
                <img
                  alt=""
                  src="https://img.hwahae.co.kr/commerce/goods/20251130_230548_only%ED%99%94%ED%95%B4_%EC%83%81%EC%84%B8intro%20720px.png"
                  className="w-full h-auto"
                />
                <img
                  alt=""
                  src="https://img.hwahae.co.kr/commerce/goods/20240220_095832_%EB%B0%B0%EB%84%88%20%EC%B5%9C%EC%83%81%EB%8B%A8.png"
                  className="w-full h-auto"
                />
                <img
                  alt=""
                  src="https://img.hwahae.co.kr/commerce/goods/20240419_105220_%ED%99%94%ED%95%B4%20%EC%83%81%EB%8B%A8%EA%B3%B5%EC%A7%80(%EB%8B%A4%EC%9D%B4%EB%B8%8C%EC%9D%B8%20%EC%84%B8%EB%9F%BC).jpg"
                  className="w-full h-auto"
                />
                <img
                  alt=""
                  src="https://img.hwahae.co.kr/commerce/goods/20230705_104459_%ED%99%94%ED%95%B4%20%EB%8B%A4%EC%9D%B4%EB%B8%8C%EC%9D%B8%20%EC%84%B8%EB%9F%BC%20%EB%8C%80%EC%9A%A9%EB%9F%89%20%EA%B8%B0%ED%9A%8D%EC%84%B8%ED%8A%B8_%EC%83%81%EB%8B%A8%EB%B0%B0%EB%84%88.jpg"
                  className="w-full h-auto"
                />
                <img
                  alt=""
                  src="https://img.hwahae.co.kr/commerce/goods/20230802_132717_01.jpg"
                  className="w-full h-auto"
                />
                <img
                  alt=""
                  src="https://img.hwahae.co.kr/commerce/goods/20231026_101125_%EC%84%B8%EB%9F%BC_%ED%99%94%ED%95%B4_02.jpg"
                  className="w-full h-auto"
                />
                <img
                  alt=""
                  src="https://img.hwahae.co.kr/commerce/goods/20240419_105643_20230802_132722_03.jpg"
                  className="w-full h-auto"
                />
                <img
                  alt=""
                  src="https://img.hwahae.co.kr/commerce/goods/20240419_105647_17_%ED%99%94%ED%95%B4%20%EC%88%98%EC%A0%95_0415_%EA%B0%80%EB%A1%9C720.jpg"
                  className="w-full h-auto"
                />
              </div>
              <div className="pt-3 px-5 pb-4 flex space-x-2 [&>*]:flex [&>*]:flex-[1] block absolute bottom-[0px] left-[0px] w-full bg-white">
                <div className="absolute top-[-24px] left-[0px] w-full max-w-[600px] mx-auto h-[24px] bg-gradient-to-t from-white via-50% to-100%"></div>
                <button
                  onClick={() => setIsGoodsInfoExpanded(!isGoodsInfoExpanded)}
                  className="inline-flex justify-center items-center appearance-none px-[18px] h-[48px] rounded-lg text-base font-semibold border border-[#f39800] bg-white text-[#f39800] w-full !ml-[0px]"
                  type="button"
                >
                  {isGoodsInfoExpanded ? '상품소개 접기' : '상품소개 더보기'}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className={`ml-2 ${isGoodsInfoExpanded ? 'transform rotate-180' : ''}`}
                  >
                    <path
                      fill="currentColor"
                      d="M4.192 8.26A.728.728 0 0 1 5.25 8.2l6.582 6.166a.242.242 0 0 0 .334 0L18.749 8.2a.728.728 0 0 1 1.06.06.808.808 0 0 1-.058 1.107l-6.583 6.166a1.695 1.695 0 0 1-2.336 0L4.249 9.367a.808.808 0 0 1-.057-1.106Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 구분선 */}
            <hr className="bg-gray-200 h-8" />

            {/* 링크 섹션 */}
            <div className="py-6">
              <div className="flex justify-between px-5 py-3" role="listitem">
                <span className="text-base font-semibold text-gray-900">상품정보 제공고시</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  color="#999"
                >
                  <path
                    fill="currentColor"
                    d="M8.26 4.192a.808.808 0 0 1 1.107.057l6.166 6.583a1.695 1.695 0 0 1 0 2.336l-6.166 6.583a.808.808 0 0 1-1.106.057.728.728 0 0 1-.06-1.059l6.165-6.582a.242.242 0 0 0 0-.334L8.2 5.251a.728.728 0 0 1 .06-1.06Z"
                  />
                </svg>
              </div>
              <div className="flex justify-between px-5 py-3" role="listitem">
                <span className="text-base font-semibold text-gray-900">배송/교환/반품안내</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  color="#999"
                >
                  <path
                    fill="currentColor"
                    d="M8.26 4.192a.808.808 0 0 1 1.107.057l6.166 6.583a1.695 1.695 0 0 1 0 2.336l-6.166 6.583a.808.808 0 0 1-1.106.057.728.728 0 0 1-.06-1.059l6.165-6.582a.242.242 0 0 0 0-.334L8.2 5.251a.728.728 0 0 1 .06-1.06Z"
                  />
                </svg>
              </div>
              <div className="flex justify-between px-5 py-3" role="listitem">
                <span className="text-base font-semibold text-gray-900">판매자 정보</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  color="#999"
                >
                  <path
                    fill="currentColor"
                    d="M8.26 4.192a.808.808 0 0 1 1.107.057l6.166 6.583a1.695 1.695 0 0 1 0 2.336l-6.166 6.583a.808.808 0 0 1-1.106.057.728.728 0 0 1-.06-1.059l6.165-6.582a.242.242 0 0 0 0-.334L8.2 5.251a.728.728 0 0 1 .06-1.06Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* 리뷰/성분 정보 */}
        {activeTab === "review_ingredients" && (
          <>
            {/* AI가 분석한 리뷰 */}
            <section>
              <div className="px-5 mt-12">
                <h2 className="text-2xl font-semibold leading-normal">
                  <strong className="text-2xl text-[#f39800]">AI</strong>가 분석한 리뷰
                </h2>
              </div>
              <div className="flex justify-between px-5 my-6">
                <div className="grow mr-6 w-1/2">
                  <div className="flex gap-x-1.5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
                        fill="#f39800"
                      />
                      <path
                        d="M7 7c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm8 0c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm-.184 5.745a.5.5 0 0 1-.632.316 6.498 6.498 0 0 0-8.368 0 .5.5 0 1 1-.316-.948 7.498 7.498 0 0 1 9.632 0 .5.5 0 0 1 .316.632z"
                        fill="#f39800"
                      />
                    </svg>
                    <span className="text-lg font-semibold text-[#f39800]">좋아요</span>
                  </div>
                  <ul className="mt-4 [&>li]:mt-2 [&>li:first-child]:mt-0">
                    {[
                      { text: "속건조에효과있는", count: "9,199" },
                      { text: "가벼운", count: "6,617" },
                      { text: "트러블안생기는", count: "5,443" },
                      { text: "산뜻한", count: "2,928" },
                      { text: "유분없는", count: "2,790" },
                      { text: "뒤집어지지않는", count: "1,011" },
                      { text: "밀림없는", count: "968" },
                    ].map((item, index) => (
                      <li key={index} className="flex justify-between gap-x-2">
                        <span className="text-sm text-gray-900 line-clamp-1">{item.text}</span>
                        <span className="text-sm text-gray-500">{item.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-px bg-gray-300"></div>
                <div className="grow ml-6 w-1/2">
                  <div className="flex gap-x-1.5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
                        fill="#9E9E9E"
                      />
                      <path
                        d="M7 7c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm8 0c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm.816 7.255a.5.5 0 0 1-.632-.316 6.498 6.498 0 0 0-8.368 0 .5.5 0 1 1-.316-.948 7.498 7.498 0 0 1 9.632 0 .5.5 0 0 1-.316.632z"
                        fill="#9E9E9E"
                      />
                    </svg>
                    <span className="text-lg font-semibold text-gray-600">아쉬워요</span>
                  </div>
                  <ul className="mt-4 [&>li]:mt-2 [&>li:first-child]:mt-0">
                    {[
                      { text: "알러지반응오는", count: "1,269" },
                      { text: "흘러내리는", count: "1,090" },
                      { text: "지속력안좋은", count: "499" },
                      { text: "유수분밸런스가맞지않는", count: "357" },
                      { text: "미끌거리는", count: "349" },
                      { text: "잘굳는", count: "297" },
                      { text: "가려운", count: "274" },
                    ].map((item, index) => (
                      <li key={index} className="flex justify-between gap-x-2">
                        <span className="text-sm text-gray-900 line-clamp-1">{item.text}</span>
                        <span className="text-sm text-gray-500">{item.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 구분선 */}
            <hr className="bg-gray-200 h-2" />

            {/* 리뷰 섹션 */}
            <section>
              <div className="px-5 mt-12">
                <h2 className="text-2xl font-semibold leading-normal">
                  리뷰 <strong className="text-2xl text-[#f39800]">74,042</strong>
                </h2>
              </div>
              <div className="flex justify-between px-5 my-6">
                <div className="grow flex justify-center items-center mr-6">
                  <div>
                    <div className="text-center">
                      <span className="text-5xl text-gray-900">4.60</span>
                    </div>
                    <div className="relative mt-2">
                      <div className="flex gap-x-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-5 h-5 text-orange-400 fill-orange-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow">
                  {[
                    { stars: 5, count: 55841, percentage: 75 },
                    { stars: 4, count: 13851, percentage: 19 },
                    { stars: 3, count: 2961, percentage: 4 },
                    { stars: 2, count: 741, percentage: 1 },
                    { stars: 1, count: 648, percentage: 1 },
                  ].map((item) => (
                    <div key={item.stars} className="flex items-center gap-x-2 mb-1.5">
                      <span className="text-xs text-gray-600 w-3">{item.stars}</span>
                      <Star className="w-3 h-3 text-gray-400 fill-gray-400" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-400 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-12 text-right">{item.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 전체 리뷰보기 버튼 */}
              <div className="px-5 pb-6">
                <button className="inline-flex justify-center items-center appearance-none px-4 h-11 rounded-lg text-base font-semibold bg-[#f39800] text-white w-full">
                  <span>전체 리뷰보기</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="ml-2"
                  >
                    <path
                      fill="currentColor"
                      d="M8.26 4.192a.808.808 0 0 1 1.107.057l6.166 6.583a1.695 1.695 0 0 1 0 2.336l-6.166 6.583a.808.808 0 0 1-1.106.057.728.728 0 0 1-.06-1.059l6.165-6.582a.242.242 0 0 0 0-.334L8.2 5.251a.728.728 0 0 1 .06-1.06Z"
                    />
                  </svg>
                </button>
              </div>
            </section>

            {/* 구분선 */}
            <hr className="bg-gray-200 h-2" />

            {/* 성분 섹션 */}
            <div className="px-5">
              <div className="py-6">
                <h2 className="text-2xl font-semibold leading-normal">성분</h2>
              </div>

              {/* 성분 구성 */}
              <div className="py-6 border-b border-gray-300">
                <div className="py-2">
                  <h3 className="text-base font-semibold text-gray-900">성분 구성</h3>
                </div>
                <div className="flex mt-4 gap-x-2 overflow-x-auto">
                  <div className="flex flex-col items-center w-[120px] px-3 py-4 border border-gray-200 rounded-lg shrink-0">
                    <span className="text-sm text-gray-900 mb-1">전체 성분</span>
                    <span className="text-lg font-semibold text-[#f39800]">33</span>
                  </div>
                  <div className="flex flex-col items-center w-[120px] px-3 py-4 border border-gray-200 rounded-lg shrink-0">
                    <div className="flex gap-x-2 items-center mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path fill="#FFD700" d="M4.883 10.375 2.785 8.484c-.598-.543-.189-1.538.617-1.494l2.816.145a.856.856 0 0 0 .9-.902l-.144-2.817c-.044-.807.95-1.223 1.493-.618l1.89 2.093a.855.855 0 0 0 1.272 0l1.902-2.106c.541-.599 1.537-.189 1.492.618l-.144 2.818c-.026.51.39.926.9.901l2.816-.145c.806-.044 1.222.952.617 1.494l-2.091 1.891a.857.857 0 0 0 0 1.273l2.091 1.891c.599.542.19 1.538-.617 1.494l-2.816-.145a.857.857 0 0 0-.9.902l.145 2.817c.044.807-.952 1.223-1.493.618l-1.89-2.093a.855.855 0 0 0-1.272 0l-1.89 2.093c-.542.599-1.537.189-1.493-.618l.145-2.818a.857.857 0 0 0-.9-.9l-2.816.144c-.806.044-1.222-.952-.617-1.494l2.09-1.89a.857.857 0 0 0 0-1.274z" />
                      </svg>
                      <span className="text-xs text-gray-600">주의성분</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">Free</span>
                  </div>
                  <div className="flex flex-col items-center w-[120px] px-3 py-4 border border-gray-200 rounded-lg shrink-0">
                    <div className="flex gap-x-2 items-center mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path fill="#AAA" d="M17 21.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9" />
                        <path fill="#fff" d="M16.5 17.538c0 .253.227.462.5.462s.5-.21.5-.462v-3.077c0-.252-.227-.461-.5-.461s-.5.21-.5.461zm1 1.962a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                      </svg>
                      <span className="text-xs text-gray-600">알레르기</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">Free</span>
                  </div>
                </div>
              </div>

              {/* 전체 성분 */}
              <div className="py-6 border-b border-gray-300">
                <div className="py-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    전체 성분 <span className="text-[#f39800]">33</span>
                  </h3>
                </div>
                <div className="flex flex-nowrap overflow-auto space-x-2 mt-4">
                  <div className="shrink-0 px-3 py-2 text-gray-600 rounded-full space-x-2 bg-gray-100">
                    <span className="text-sm">전체 성분</span>
                    <span className="text-base font-semibold">33</span>
                  </div>
                  <div className="shrink-0 flex items-center px-3 py-2 space-x-2 text-gray-600 rounded-full bg-gray-100">
                    <span className="text-xs rounded-full px-1 py-0.5 text-white bg-[#34D399]">1-2</span>
                    <span className="text-sm">낮은 위험</span>
                    <span className="text-base font-semibold">30</span>
                  </div>
                  <div className="shrink-0 flex items-center px-3 py-2 space-x-2 text-gray-600 rounded-full bg-gray-100">
                    <span className="text-xs rounded-full px-1 py-0.5 text-white bg-yellow-600">3-6</span>
                    <span className="text-sm">중간 위험</span>
                    <span className="text-base font-semibold">3</span>
                  </div>
                  <div className="shrink-0 flex items-center px-3 py-2 space-x-2 text-gray-600 rounded-full bg-gray-100">
                    <span className="text-xs rounded-full px-1 py-0.5 text-white bg-red-600">7-10</span>
                    <span className="text-sm">높은 위험</span>
                    <span className="text-base font-semibold">Free</span>
                  </div>
                </div>
                <div className="flex flex-row-reverse mt-4 h-3 rounded-lg bg-gray-600">
                  <div className="relative h-3 rounded-lg ml-[-4px] z-[1] bg-yellow-600" style={{ width: 'calc(9% + 4px)' }}></div>
                  <div className="relative h-3 rounded-lg bg-[#34D399]" style={{ width: 'calc(91%)' }}></div>
                </div>
              </div>

              {/* 목적별 성분 */}
              <div className="py-6 border-b border-gray-300">
                <div className="py-2">
                  <h3 className="text-base font-semibold text-gray-900">목적별 성분</h3>
                  <p className="text-gray-600 mt-2">
                    <span className="text-lg">
                      <span className="text-[#f39800]">피부 보습, 피부 보호</span> 등 도움을 주는 성분이 있어요
                    </span>
                  </p>
                </div>
                <div className="my-4">
                  <div className="flex overflow-x-auto gap-x-2">
                    {[
                      { count: 27, label: "피부 보습" },
                      { count: 3, label: "피부 보호" },
                      { count: 1, label: "수렴 진정" },
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center gap-y-2.5 w-[60px] h-[139px]">
                        <div>
                          <span className="text-base font-semibold text-gray-900">{item.count}</span>
                        </div>
                        <div className="flex items-end overflow-hidden w-8 h-[60px] rounded-lg bg-gray-100">
                          <div className="w-8 rounded-b-lg bg-[#f39800]" style={{ height: `${(item.count / 27) * 100}%` }} />
                        </div>
                        <div className="text-center">
                          <span className="text-xs text-gray-600 leading-tight whitespace-pre-wrap">{item.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="py-4 bg-gray-100 rounded-lg">
                  <p className="text-xs text-gray-500 px-5">
                    목적별 성분 정보는 포함된 성분의 배합목적에 관한 정보로서, 완제품인 화장품의 기능성 효능ㆍ효과에 관한 정보가 아니며, 해당 성분의 포함 사실만으로 관련 기능이 보장되지 않습니다.
                  </p>
                </div>
              </div>

              {/* 피부 타입별 성분 */}
              <div className="py-6">
                <div className="py-2">
                  <h3 className="text-base font-semibold text-gray-900">피부 타입별 성분</h3>
                </div>
                <div className="flex gap-x-2 mt-4">
                  <div className="flex items-center gap-x-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#34D399]"></div>
                    <span className="text-xs text-gray-500">좋아요</span>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                    <span className="text-xs text-gray-500">아쉬워요</span>
                  </div>
                </div>
                <div className="my-4">
                  {[
                    { type: "지성 피부", good: 1, bad: 0 },
                    { type: "건성 피부", good: 4, bad: 0 },
                    { type: "민감성 피부", good: 1, bad: 0 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-x-6 py-2">
                      <span className="text-sm w-[72px] text-gray-600">{item.type}</span>
                      <div className="flex flex-col gap-x-4">
                        <div className="flex items-center gap-x-1">
                          <div className="h-3 rounded-lg bg-[#34D399]" style={{ width: `${item.good * 12}px` }}></div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" className="mr-0.5 text-[#34D399]">
                              <path fill="currentColor" d="M5.751 10h-3a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75m11.08 12h-8.08c-.41 0-.75-.34-.75-.75V10.46c0-.3.09-.59.26-.84l4.62-6.85c.3-.48.83-.77 1.39-.77 1.06 0 1.84 1 1.59 2.03l-1.76 5.64c-.05.16.07.32.24.32h4.14c1.18 0 2.27.59 2.93 1.57.6.9.75 2.03.41 3.07l-1.65 4.96a3.516 3.516 0 0 1-3.34 2.41" />
                            </svg>
                            <span className="text-xs text-[#34D399]">{item.good}</span>
                          </div>
                        </div>
                        {item.bad > 0 && (
                          <div className="flex items-center gap-x-1">
                            <div className="h-3 rounded-lg bg-red-600" style={{ width: `${item.bad * 4}px` }}></div>
                            <div className="flex items-center">
                              <span className="text-xs text-red-600">{item.bad}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="pt-3 pb-4 bg-gray-100 rounded-lg">
                  <li className="flex items-start gap-x-2 mt-1 px-5">
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">구매 전에 제조판매업자가 표기한 전성분 표를 한 번 더 확인하시길 권장드립니다.</span>
                  </li>
                  <li className="flex items-start gap-x-2 mt-1 px-5">
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">화해 정보를 허가없이 상업적으로 활용할 경우, 법적 조치를 받을 수 있습니다.</span>
                  </li>
                  <li className="flex items-start gap-x-2 mt-1 px-5">
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">성분별 해당 제품 내 배합 비율은 브랜드사에서 제공한 정보로 모든 책임은 브랜드사에 있습니다.</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

        {/* Footer */}
        <div className="pb-10">
          <Footer />
        </div>
        </main>

        {/* 장바구니 버튼 */}
        <div className="fixed bottom-0 left-0 w-full z-20 bg-transparent">
          <div className="max-w-[600px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
            <div className="flex gap-x-2 p-4 bg-white">
              <button
                onClick={handleAddToCart}
                className="inline-flex justify-center items-center px-5 h-13 rounded-lg text-base font-semibold border border-[#f39800] bg-white text-[#f39800]"
              >
                장바구니 담기
              </button>
              <button className="inline-flex justify-center items-center px-5 h-13 rounded-lg text-base font-semibold bg-[#f39800] text-white flex-grow">
                바로 구매
              </button>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTopButton />

        {/* 장바구니 담기 모달 */}
        {showCartModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseModal}>
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
              <p className="text-lg font-semibold whitespace-pre-line">상품이 장바구니에 담겼습니다.</p>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm font-semibold"
                >
                  쇼핑 계속하기
                </button>
                <Link
                  href="/cart"
                  className="flex-1 px-4 py-3 bg-[#f39800] text-white rounded-lg text-sm font-semibold text-center"
                >
                  장바구니 가기
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
