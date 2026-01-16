"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import ProductDetailHeader from "@/components/product-detail-header"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"
import BottomSheet from "@/components/ui/bottom-sheet"

export default function ProductDetailPageClient() {
  const [isRankingSheetOpen, setIsRankingSheetOpen] = useState(false)
  const [isWrinkleSheetOpen, setIsWrinkleSheetOpen] = useState(false)
  const [isWhiteningSheetOpen, setIsWhiteningSheetOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <ProductDetailHeader />

        {/* pb-20: 하단 고정 버튼 공간 확보 (80px) */}
        <main className="pb-20">
          {/* 첫 구매 혜택 배너 */}
          <Link
            href="/events/sample"
            className="flex items-center w-full px-5 py-4 bg-[#F9F3FF]"
          >
            <span className="flex flex-shrink-0 w-[42px] h-[42px] object-cover">
              <img src="https://www.hwahae.co.kr/images/250313_icon_144x144.png" alt="coupon" />
            </span>
            <div className="flex flex-col flex-grow ml-3 text-left">
              <em className="text-sm line-clamp-1 text-[#9333EA] break-all block">
                아직도 화해 첫 구매 안 했다면?
              </em>
              <p className="text-base line-clamp-2 text-[#9333EA] break-all font-semibold">
                3만 원 상당 혜택 받아가세요!
              </p>
            </div>
            <ChevronRight className="flex flex-shrink-0 ml-3 w-5 h-5 text-[#9333EA]" />
          </Link>

          {/* 제품 이미지 */}
          <div className="relative overflow-hidden rounded-lg bg-white w-full pt-[100%]">
            <img
              className="absolute left-0 top-0 h-full w-full scale-[0.8] object-contain"
              alt="제품 이미지"
              src="https://img.hwahae.co.kr/products/2177164/2177164_20260113144525.jpg?size=600x600&fit=inside"
            />
          </div>

          <div className="h-4"></div>

          {/* 제품 정보 */}
          <div className="my-6">
            <div className="flex items-center px-5">
              <span className="border border-[#e5e5e5] rounded-full overflow-hidden">
                <div className="relative w-8 pt-8">
                  <img
                    className="absolute left-0 top-0 h-full w-full object-contain"
                    alt="웰라쥬"
                    src="https://img.hwahae.co.kr/brands/1872/1872_20250825143159.png?size=32x32"
                  />
                </div>
              </span>
              <span className="text-sm text-[#727171] ml-2">
                <Link href="/search?q=웰라쥬">웰라쥬</Link>
              </span>
            </div>
            <div className="mt-2 px-5">
              <span className="text-lg font-semibold text-[#1a1a1a]">리얼 히알루로닉 수딩 크림</span>
            </div>
            <button type="button" className="block mt-4 px-5">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-[#f39800]"
                >
                  <path
                    fill="currentColor"
                    d="M17.712 21.992c-.12 0-.25-.03-.36-.09l-5.347-2.958-5.347 2.959a.75.75 0 0 1-.79-.04.761.761 0 0 1-.31-.74l1.03-6.328-4.378-4.478c-.2-.2-.26-.5-.17-.76.09-.27.32-.46.6-.5l5.997-.92L11.315 2.4c.25-.53 1.11-.53 1.36 0l2.688 5.738 5.997.92c.28.04.51.24.6.5.09.269.02.559-.17.759l-4.358 4.478 1.03 6.328a.76.76 0 0 1-.74.88z"
                  ></path>
                </svg>
                <span className="text-sm text-[#727171] font-bold">4.61</span>
                <span className="text-sm text-[#727171]">(375)</span>
              </div>
            </button>
            <div className="px-5 mt-6">
              <div className="flex">
                <span className="text-sm w-[60px] text-[#727171]">정가</span>
                <span className="text-sm text-[#1a1a1a]">28,000원 / 80ml</span>
              </div>
              <div className="flex mt-4">
                <span className="text-sm flex-shrink-0 w-[60px] text-[#727171]">랭킹</span>
                <button
                  type="button"
                  className="flex flex-1 justify-between items-start"
                  onClick={() => setIsRankingSheetOpen(true)}
                >
                  <span className="text-sm text-[#1a1a1a] text-left">크림 ・ 수분 7위</span>
                  <ChevronRight className="flex-shrink-0 ml-4 w-5 h-5 text-[#727171]" />
                </button>
              </div>
            </div>
          </div>

          <hr className="h-2 bg-[#f5f5f5]" />

          {/* AI 분석 리뷰 섹션 */}
          <section>
            <div className="px-5 mt-12">
              <h2 className="text-lg leading-normal font-bold">
                <strong className="text-[#00D9A5]">AI</strong>가 분석한 리뷰
              </h2>
            </div>
            <div className="flex justify-between px-5 my-6">
              <div className="grow mr-6 w-1/2">
                <div className="flex gap-x-[6px]">
                  <img src="https://www.hwahae.co.kr/svgs/good.svg" alt="타이틀 아이콘" />
                  <span className="text-base font-bold text-[#00D9A5]">좋아요</span>
                </div>
                <ul className="mt-4 [&>li]:mt-2 [&>li:first-child]:mt-0">
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">수분있는</span>
                    <span className="text-sm text-[#727171]">171</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">흡수잘되는</span>
                    <span className="text-sm text-[#727171]">139</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">가벼운</span>
                    <span className="text-sm text-[#727171]">117</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">끈적하지않은</span>
                    <span className="text-sm text-[#727171]">62</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">산뜻한</span>
                    <span className="text-sm text-[#727171]">56</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">속건조에효과있는</span>
                    <span className="text-sm text-[#727171]">48</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">리치하지않은</span>
                    <span className="text-sm text-[#727171]">38</span>
                  </li>
                </ul>
              </div>
              <div className="w-px bg-[#e5e5e5]"></div>
              <div className="grow ml-6 w-1/2">
                <div className="flex gap-x-[6px]">
                  <img src="https://www.hwahae.co.kr/svgs/bad.svg" alt="타이틀 아이콘" />
                  <span className="text-base font-bold text-[#727171]">아쉬워요</span>
                </div>
                <ul className="mt-4 [&>li]:mt-2 [&>li:first-child]:mt-0">
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">유수분밸런스가맞지않는</span>
                    <span className="text-sm text-[#727171]">13</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">지속력안좋은</span>
                    <span className="text-sm text-[#727171]">3</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">잘굳는</span>
                    <span className="text-sm text-[#727171]">2</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">때처럼나오는</span>
                    <span className="text-sm text-[#727171]">2</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">향지속잘되지않는</span>
                    <span className="text-sm text-[#727171]">1</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">피지안없어지는</span>
                    <span className="text-sm text-[#727171]">1</span>
                  </li>
                  <li className="flex justify-between gap-x-2">
                    <span className="text-sm text-[#1a1a1a] line-clamp-1">모공관리안되는</span>
                    <span className="text-sm text-[#727171]">1</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 리뷰 섹션 */}
          <section>
            <hr className="h-2 bg-[#f5f5f5]" />
            <div className="px-5 mt-12">
              <h2 className="text-lg leading-normal font-bold">
                리뷰 <strong className="text-[#00D9A5]">375</strong>
              </h2>
            </div>
            <div className="flex justify-between px-5 my-6">
              {/* 별점 평균 */}
              <div className="grow flex justify-center items-center mr-6">
                <div>
                  <div className="text-center">
                    <span className="text-5xl font-bold text-[#1a1a1a]">4.61</span>
                  </div>
                  <div className="relative mt-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          viewBox="0 0 24 24"
                          className={i < 4 ? "text-[#f59e0b]" : "text-[#e5e5e5]"}
                        >
                          <path
                            fill="currentColor"
                            d="M17.712 21.992c-.12 0-.25-.03-.36-.09l-5.347-2.958-5.347 2.959a.75.75 0 0 1-.79-.04.761.761 0 0 1-.31-.74l1.03-6.328-4.378-4.478c-.2-.2-.26-.5-.17-.76.09-.27.32-.46.6-.5l5.997-.92L11.315 2.4c.25-.53 1.11-.53 1.36 0l2.688 5.738 5.997.92c.28.04.51.24.6.5.09.269.02.559-.17.759l-4.358 4.478 1.03 6.328a.76.76 0 0 1-.74.88z"
                          ></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-px bg-[#e5e5e5]"></div>
              {/* 별점 분포 */}
              <div className="grow flex justify-center items-center ml-6">
                <div className="flex gap-x-2 h-24">
                  <div className="flex flex-col items-center justify-end w-5">
                    <span className="inline-block rounded px-1 h-4 text-[8px] font-bold leading-4 bg-[#f59e0b] text-white">
                      252
                    </span>
                    <div className="flex items-end w-1 h-[50px] mt-1 rounded-full bg-[#f5f5f5]">
                      <div className="w-1 rounded-full bg-[#f59e0b]" style={{ height: "67%" }}></div>
                    </div>
                    <span className="text-sm mt-2 text-[#f59e0b]">5점</span>
                  </div>
                  <div className="flex flex-col items-center justify-end w-5">
                    <div className="flex items-end w-1 h-[50px] mt-1 rounded-full bg-[#f5f5f5]">
                      <div className="w-1 rounded-full bg-[#727171] opacity-50" style={{ height: "28%" }}></div>
                    </div>
                    <span className="text-sm mt-2 text-[#727171]">4점</span>
                  </div>
                  <div className="flex flex-col items-center justify-end w-5">
                    <div className="flex items-end w-1 h-[50px] mt-1 rounded-full bg-[#f5f5f5]">
                      <div className="w-1 rounded-full bg-[#727171] opacity-50" style={{ height: "4%" }}></div>
                    </div>
                    <span className="text-sm mt-2 text-[#727171]">3점</span>
                  </div>
                  <div className="flex flex-col items-center justify-end w-5">
                    <div className="flex items-end w-1 h-[50px] mt-1 rounded-full bg-[#f5f5f5]">
                      <div className="w-1 rounded-full bg-[#727171] opacity-50" style={{ height: "1%" }}></div>
                    </div>
                    <span className="text-sm mt-2 text-[#727171]">2점</span>
                  </div>
                  <div className="flex flex-col items-center justify-end w-5">
                    <div className="flex items-end w-1 h-[50px] mt-1 rounded-full bg-[#f5f5f5]">
                      <div className="w-1 rounded-full bg-[#727171] opacity-50" style={{ height: "0%" }}></div>
                    </div>
                    <span className="text-sm mt-2 text-[#727171]">1점</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 리뷰 목록 (샘플 2개만) */}
            <ul className="px-5 [&>li]:border-b [&>li]:border-[#e5e5e5] [&>li:last-child]:border-0">
              <li className="py-6">
                <div className="flex items-center">
                  <img src="https://www.hwahae.co.kr/svgs/user.svg" alt="기본 유저 프로필 이미지" className="w-10 h-10 rounded-full object-cover object-center" />
                  <div className="ml-2">
                    <div>
                      <span className="text-base font-semibold text-[#1a1a1a]">푸뽕</span>
                      <span className="text-sm ml-2 text-[#727171]">20대/수부지/민감성/여드름</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-0.5">
                        {[...Array(2)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="text-[#f59e0b]"
                          >
                            <path
                              fill="currentColor"
                              d="M17.712 21.992c-.12 0-.25-.03-.36-.09l-5.347-2.958-5.347 2.959a.75.75 0 0 1-.79-.04.761.761 0 0 1-.31-.74l1.03-6.328-4.378-4.478c-.2-.2-.26-.5-.17-.76.09-.27.32-.46.6-.5l5.997-.92L11.315 2.4c.25-.53 1.11-.53 1.36 0l2.688 5.738 5.997.92c.28.04.51.24.6.5.09.269.02.559-.17.759l-4.358 4.478 1.03 6.328a.76.76 0 0 1-.74.88z"
                            ></path>
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm ml-2 text-[#9ca3af]">2026.01.14</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-x-2 mt-6">
                  <img src="https://www.hwahae.co.kr/svgs/good.svg" alt="good" />
                  <span className="text-sm text-[#1a1a1a] line-clamp-3">
                    수분에 충실한 크림. 하지만 겨울에는 보습이 부족함. 여름에 사용하기 좋을 것 같음.
                  </span>
                </div>
                <div className="flex items-start gap-x-2 mt-4">
                  <img src="https://www.hwahae.co.kr/svgs/bad.svg" alt="bad" />
                  <span className="text-sm text-[#1a1a1a] line-clamp-3">
                    큰 장점을 모르겠는 무난한 수딩크림이라 아쉬움.
                  </span>
                </div>
              </li>
              <li className="py-6">
                <div className="flex items-center">
                  <img src="https://www.hwahae.co.kr/svgs/user.svg" alt="기본 유저 프로필 이미지" className="w-10 h-10 rounded-full object-cover object-center" />
                  <div className="ml-2">
                    <div>
                      <span className="text-base font-semibold text-[#1a1a1a]">tkaclf60</span>
                      <span className="text-sm ml-2 text-[#727171]">20대/복합성/민감성/아토피/여드름</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="text-[#f59e0b]"
                          >
                            <path
                              fill="currentColor"
                              d="M17.712 21.992c-.12 0-.25-.03-.36-.09l-5.347-2.958-5.347 2.959a.75.75 0 0 1-.79-.04.761.761 0 0 1-.31-.74l1.03-6.328-4.378-4.478c-.2-.2-.26-.5-.17-.76.09-.27.32-.46.6-.5l5.997-.92L11.315 2.4c.25-.53 1.11-.53 1.36 0l2.688 5.738 5.997.92c.28.04.51.24.6.5.09.269.02.559-.17.759l-4.358 4.478 1.03 6.328a.76.76 0 0 1-.74.88z"
                            ></path>
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm ml-2 text-[#9ca3af]">2026.01.14</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-x-2 mt-6">
                  <img src="https://www.hwahae.co.kr/svgs/good.svg" alt="good" />
                  <span className="text-sm text-[#1a1a1a] line-clamp-3">
                    엄청 건조한 수부지에도 촉촉함이 오래 유지됨. 겨울에도 사용 가능. 여름엔 더 유용할 것 같음.
                  </span>
                </div>
                <div className="flex items-start gap-x-2 mt-4">
                  <img src="https://www.hwahae.co.kr/svgs/bad.svg" alt="bad" />
                  <span className="text-sm text-[#1a1a1a] line-clamp-3">
                    아쉬운 점은 없었음. 가볍고 자극없고 촉촉함.
                  </span>
                </div>
              </li>
            </ul>

            <button className="flex items-center justify-center appearance-none px-20 h-13 rounded-lg text-base bg-white hover:bg-gray-50 active:bg-gray-50 text-[#1a1a1a] border border-[#e5e5e5] w-full mx-5 my-6 max-w-[calc(100%-40px)]">
              <span>전체 리뷰보기</span>
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </section>

          {/* 성분 섹션 */}
          <section>
            <hr className="h-2 bg-[#e5e5e5]" />
            <div className="px-5 mt-12">
              <h2 className="text-lg leading-normal font-bold">성분</h2>
            </div>
            <div className="px-5">
              {/* 성분 구성 */}
              <div className="py-6 border-b border-[#e5e5e5]">
                <div className="py-2">
                  <h3 className="text-base text-[#1a1a1a]">성분 구성</h3>
                </div>
                <div className="flex flex-nowrap overflow-auto space-x-2 overflow-x-scroll scrollbar-hide pr-5 mt-4">
                  <div className="shrink-0 px-3 py-2 text-[#727171] rounded-full space-x-2 bg-[#f5f5f5]">
                    <span className="text-sm">전체 성분</span>
                    <span className="text-sm font-semibold">53</span>
                  </div>
                  <div className="shrink-0 flex items-center px-3 py-2 space-x-2 text-[#727171] rounded-full bg-[#f5f5f5]">
                    <span className="text-xs rounded-full px-1 py-0.5 text-white bg-[#00D9A5]">1-2</span>
                    <span className="text-sm">낮은 위험</span>
                    <span className="text-sm font-semibold">53</span>
                  </div>
                  <div className="shrink-0 flex items-center px-3 py-2 space-x-2 text-[#727171] rounded-full bg-[#f5f5f5]">
                    <span className="text-xs rounded-full px-1 py-0.5 text-white bg-yellow-600">3-6</span>
                    <span className="text-sm">중간 위험</span>
                    <span className="text-sm font-semibold">Free</span>
                  </div>
                  <div className="shrink-0 flex items-center px-3 py-2 space-x-2 text-[#727171] rounded-full bg-[#f5f5f5]">
                    <span className="text-xs rounded-full px-1 py-0.5 text-white bg-red-600">7-10</span>
                    <span className="text-sm">높은 위험</span>
                    <span className="text-sm font-semibold">Free</span>
                  </div>
                  <div className="shrink-0 flex items-center px-3 py-2 space-x-2 text-[#727171] rounded-full bg-[#f5f5f5]">
                    <span className="rounded-full w-[22px] h-[22px] bg-gray-600"></span>
                    <span className="text-sm">등급 미정</span>
                    <span className="text-sm font-semibold">Free</span>
                  </div>
                </div>
                <div className="flex flex-row-reverse mt-4 h-3 rounded bg-gray-600">
                  <div className="relative h-3 rounded bg-[#00D9A5]" style={{ width: "100%" }}></div>
                </div>
              </div>

              {/* 전체 성분 */}
              <div className="py-6 border-b border-[#e5e5e5]">
                <div className="py-2">
                  <h3 className="text-base text-[#1a1a1a]">
                    전체 성분 <span className="text-[#00D9A5]">53</span>
                  </h3>
                </div>
                <div className="mt-4">
                  <div>
                    <button type="button" className="flex justify-between items-center py-2 w-full cursor-default">
                      <span className="text-sm text-[#727171] flex gap-x-2 items-center text-left">
                        <span className="flex-shrink-0 w-6 h-6">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path
                              fill="#D8D8D8"
                              d="M10.001 22c-4.993 0-8.12-5.64-5.623-10.152l.013-.02 5.324-9.66a.323.323 0 0 1 .566 0l5.331 9.66.013.02C18.115 16.366 14.995 22 10.001 22"
                            ></path>
                            <path fill="#AAA" d="M16 22a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9"></path>
                            <path
                              fill="#fff"
                              d="M15.5 18.038c0 .253.227.462.5.462s.5-.21.5-.462v-3.077c0-.252-.227-.461-.5-.461s-.5.21-.5.461zm1 1.962a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
                            ></path>
                          </svg>
                        </span>
                        20가지 주의성분
                      </span>
                      <p className="flex align-center">
                        <span className="text-sm font-semibold text-[#1a1a1a]">Free</span>
                      </p>
                    </button>
                  </div>
                  <div>
                    <button type="button" className="flex justify-between items-center py-2 w-full cursor-default">
                      <span className="text-sm text-[#727171] flex gap-x-2 items-center text-left">
                        <span className="flex-shrink-0 w-6 h-6">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path
                              fill="#E8E8E8"
                              d="M4.883 10.375 2.785 8.484c-.598-.543-.189-1.538.617-1.494l2.816.145a.856.856 0 0 0 .9-.902l-.144-2.817c-.044-.807.95-1.223 1.493-.618l1.89 2.093a.855.855 0 0 0 1.272 0l1.902-2.106c.541-.599 1.537-.189 1.492.618l-.144 2.818c-.026.51.39.926.9.901l2.816-.145c.806-.044 1.222.952.617 1.494l-2.091 1.891a.857.857 0 0 0 0 1.273l2.091 1.891c.599.542.19 1.538-.617 1.494l-2.816-.145a.857.857 0 0 0-.9.902l.145 2.817c.044.807-.952 1.223-1.493.618l-1.89-2.093a.855.855 0 0 0-1.272 0l-1.89 2.093c-.542.599-1.537.189-1.493-.618l.145-2.818a.857.857 0 0 0-.9-.9l-2.816.144c-.806.044-1.222-.952-.617-1.494l2.09-1.89a.857.857 0 0 0 0-1.274z"
                            ></path>
                            <path
                              fill="#C4C4C4"
                              d="M11 8.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.25 3.502a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M10.502 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
                            ></path>
                            <path fill="#AAA" d="M17 21.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9"></path>
                            <path
                              fill="#fff"
                              d="M16.5 17.538c0 .253.227.462.5.462s.5-.21.5-.462v-3.077c0-.252-.227-.461-.5-.461s-.5.21-.5.461zm1 1.962a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
                            ></path>
                          </svg>
                        </span>
                        알레르기 주의성분
                      </span>
                      <p className="flex align-center">
                        <span className="text-sm font-semibold text-[#1a1a1a]">Free</span>
                      </p>
                    </button>
                  </div>
                  <button
                    className="flex justify-between items-center py-2 w-full"
                    type="button"
                    onClick={() => setIsWrinkleSheetOpen(true)}
                  >
                    <span className="text-sm text-[#727171] flex gap-x-2 items-center text-left">
                      <span className="flex-shrink-0 w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path
                            fill="#FFDC41"
                            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18"
                          ></path>
                          <path fill="#FFBE14" d="M12 5.5A6.504 6.504 0 0 0 5.5 12c0 3.587 2.913 6.5 6.5 6.5s6.5-2.913 6.5-6.5H12z"></path>
                          <path
                            fill="#fff"
                            d="m19.652 12.516-.742-1.247-.742-1.247c-.033-.06-.127-.06-.16 0l-.742 1.247-.742 1.247a.092.092 0 0 0 .08.137h1.056c-.334 2.86-2.82 5.087-5.835 5.087-3.242 0-5.876-2.573-5.876-5.74 0-3.167 2.634-5.74 5.876-5.74a.47.47 0 0 0 .474-.463.471.471 0 0 0-.474-.463C8.06 5.333 5 8.323 5 12s3.061 6.667 6.825 6.667c3.536 0 6.457-2.645 6.79-6.014h.957c.073 0 .12-.078.08-.137"
                          ></path>
                        </svg>
                      </span>
                      주름 개선에 도움되는 기능성 성분
                    </span>
                    <p className="flex align-center">
                      <span className="text-sm font-semibold text-[#1a1a1a]">1</span>
                      <ChevronRight className="w-6 h-6" />
                    </p>
                  </button>
                  <button
                    className="flex justify-between items-center py-2 w-full"
                    type="button"
                    onClick={() => setIsWhiteningSheetOpen(true)}
                  >
                    <span className="text-sm text-[#727171] flex gap-x-2 items-center text-left">
                      <span className="flex-shrink-0 w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path
                            fill="#FFDC41"
                            d="M19.5 9.563c0-4.468-3.845-8.029-8.378-7.513-3.354.385-6.094 3.086-6.55 6.462a7.57 7.57 0 0 0 3.244 7.32c.893.606 1.459 1.582 1.459 2.668h5.453c0-1.086.58-2.07 1.473-2.674A7.559 7.559 0 0 0 19.5 9.57z"
                          ></path>
                          <path fill="#FFCD28" d="M12 15a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"></path>
                          <path
                            fill="#FA0"
                            d="M14.348 11.126a.512.512 0 0 0-.74 0L12 12.799l-1.607-1.673a.512.512 0 0 0-.741 0 .565.565 0 0 0 0 .771l1.824 1.899v5.172h1.048v-5.172l1.824-1.899a.565.565 0 0 0 0-.771"
                          ></path>
                          <path
                            fill="#FF961E"
                            d="M9.278 18.5h5.45v2.8c0 .385-.307.7-.681.7H9.959a.693.693 0 0 1-.681-.7z"
                          ></path>
                        </svg>
                      </span>
                      피부 미백에 도움되는 기능성 성분
                    </span>
                    <p className="flex align-center">
                      <span className="text-sm font-semibold text-[#1a1a1a]">1</span>
                      <ChevronRight className="w-6 h-6" />
                    </p>
                  </button>
                </div>
              </div>

              {/* 목적별 성분 */}
              <div className="py-6 border-b border-[#e5e5e5]">
                <div className="py-2">
                  <h3 className="text-base text-[#1a1a1a]">목적별 성분</h3>
                  <p className="text-[#727171] mt-2">
                    <span className="text-lg">
                      <span className="text-[#00D9A5]">피부 보습, 피부 보호</span> 등 도움을 주는 성분이 있어요
                    </span>
                  </p>
                </div>
                <div className="my-4">
                  <div className="flex overflow-x-auto scrollbar-hide">
                    <div className="flex gap-x-2">
                      <div className="flex flex-col items-center gap-y-2.5 w-[60px] h-[139px]">
                        <div>
                          <span className="text-sm font-semibold text-[#1a1a1a]">28</span>
                        </div>
                        <div className="flex items-end overflow-hidden w-8 h-[60px] rounded-lg bg-[#e5e5e5]">
                          <div className="w-8 rounded-b-lg bg-[#00D9A5]" style={{ height: "100%" }}></div>
                        </div>
                        <span className="text-xs text-[#727171] text-center">피부 보습</span>
                      </div>
                      <div className="flex flex-col items-center gap-y-2.5 w-[60px] h-[139px]">
                        <div>
                          <span className="text-sm font-semibold text-[#1a1a1a]">7</span>
                        </div>
                        <div className="flex items-end overflow-hidden w-8 h-[60px] rounded-lg bg-[#e5e5e5]">
                          <div className="w-8 rounded-b-lg bg-[#00D9A5]" style={{ height: "100%" }}></div>
                        </div>
                        <span className="text-xs text-[#727171] text-center">피부 보호</span>
                      </div>
                      <div className="flex flex-col items-center gap-y-2.5 w-[60px] h-[139px]">
                        <div>
                          <span className="text-sm font-semibold text-[#1a1a1a]">2</span>
                        </div>
                        <div className="flex items-end overflow-hidden w-8 h-[60px] rounded-lg bg-[#e5e5e5]">
                          <div className="w-8 rounded-b-lg bg-[#00D9A5]" style={{ height: "40%" }}></div>
                        </div>
                        <span className="text-xs text-[#727171] text-center">수분 증발 차단</span>
                      </div>
                      <div className="flex flex-col items-center gap-y-2.5 w-[60px] h-[139px]">
                        <div>
                          <span className="text-sm font-semibold text-[#1a1a1a]">1</span>
                        </div>
                        <div className="flex items-end overflow-hidden w-8 h-[60px] rounded-lg bg-[#e5e5e5]">
                          <div className="w-8 rounded-b-lg bg-[#00D9A5]" style={{ height: "20%" }}></div>
                        </div>
                        <span className="text-xs text-[#727171] text-center">피부 미백</span>
                      </div>
                      <div className="flex flex-col items-center gap-y-2.5 w-[60px] h-[139px]">
                        <div>
                          <span className="text-sm font-semibold text-[#1a1a1a]">1</span>
                        </div>
                        <div className="flex items-end overflow-hidden w-8 h-[60px] rounded-lg bg-[#e5e5e5]">
                          <div className="w-8 rounded-b-lg bg-[#00D9A5]" style={{ height: "20%" }}></div>
                        </div>
                        <span className="text-xs text-[#727171] text-center">주름 개선</span>
                      </div>
                      <div className="flex flex-col items-center gap-y-2.5 w-[60px] h-[139px]">
                        <div>
                          <span className="text-sm font-semibold text-gray-600">0</span>
                        </div>
                        <div className="flex items-end overflow-hidden w-8 h-[60px] rounded-lg bg-[#e5e5e5]"></div>
                        <span className="text-xs text-[#727171] text-center">수렴 진정</span>
                      </div>
                      <div className="flex flex-col items-center gap-y-2.5 w-[60px] h-[139px]">
                        <div>
                          <span className="text-sm font-semibold text-gray-600">0</span>
                        </div>
                        <div className="flex items-end overflow-hidden w-8 h-[60px] rounded-lg bg-[#e5e5e5]"></div>
                        <span className="text-xs text-[#727171] text-center">각질 제거</span>
                      </div>
                      <div className="flex flex-col items-center gap-y-2.5 w-[60px] h-[139px]">
                        <div>
                          <span className="text-sm font-semibold text-gray-600">0</span>
                        </div>
                        <div className="flex items-end overflow-hidden w-8 h-[60px] rounded-lg bg-[#e5e5e5]"></div>
                        <span className="text-xs text-[#727171] text-center">여드름 완화</span>
                      </div>
                      <div className="flex flex-col items-center gap-y-2.5 w-[60px] h-[139px]">
                        <div>
                          <span className="text-sm font-semibold text-gray-600">0</span>
                        </div>
                        <div className="flex items-end overflow-hidden w-8 h-[60px] rounded-lg bg-[#e5e5e5]"></div>
                        <span className="text-xs text-[#727171] text-center">자외선 차단</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center py-2">
                    <div className="h-1 w-8 rounded bg-gray-300">
                      <div className="relative h-1 w-[17px]">
                        <div className="absolute h-1 w-[15px] rounded bg-gray-800" style={{ left: "0%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4 bg-[#f5f5f5] rounded-lg">
                  <p className="text-xs text-[#9ca3af]">
                    목적별 성분 정보는 포함된 성분의 배합목적에 관한 정보로서, 완제품인 화장품의 기능성 효능ㆍ효과에 관한 정보가
                    아니며, 해당 성분의 포함 사실만으로 관련 기능이 보장되지 않습니다.
                  </p>
                </div>
              </div>

              {/* 피부 타입별 성분 */}
              <div className="py-6">
                <div className="py-2">
                  <h3 className="text-base text-[#1a1a1a]">피부 타입별 성분</h3>
                </div>
                <div className="flex gap-x-2">
                  <div className="flex items-center gap-x-1">
                    <div className="w-10 h-10 rounded-full bg-[#00D9A5]"></div>
                    <span className="text-xs text-[#9ca3af]">좋아요</span>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <div className="w-10 h-10 rounded-full bg-red-600"></div>
                    <span className="text-xs text-[#9ca3af]">아쉬워요</span>
                  </div>
                </div>
                <div className="my-4">
                  <div className="flex items-center gap-x-6 py-2">
                    <span className="text-sm w-[72px] text-[#727171]">지성 피부</span>
                    <div className="flex flex-col gap-x-4">
                      <div className="flex items-center gap-x-1">
                        <div className="h-3 rounded bg-[#00D9A5]" style={{ width: "12px" }}></div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="mr-0.5 text-[#00D9A5]"
                          >
                            <path
                              fill="currentColor"
                              d="M5.751 10h-3a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75m11.08 12h-8.08c-.41 0-.75-.34-.75-.75V10.46c0-.3.09-.59.26-.84l4.62-6.85c.3-.48.83-.77 1.39-.77 1.06 0 1.84 1 1.59 2.03l-1.76 5.64c-.05.16.07.32.24.32h4.14c1.18 0 2.27.59 2.93 1.57.6.9.75 2.03.41 3.07l-1.65 4.96a3.516 3.516 0 0 1-3.34 2.41"
                            ></path>
                          </svg>
                          <span className="text-xs text-[#00D9A5]">1</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <div className="h-3 rounded bg-red-600" style={{ width: "4px" }}></div>
                        <div className="flex items-center">
                          <span className="text-xs text-red-600">0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-6 py-2">
                    <span className="text-sm w-[72px] text-[#727171]">건성 피부</span>
                    <div className="flex flex-col gap-x-4">
                      <div className="flex items-center gap-x-1">
                        <div className="h-3 rounded bg-[#00D9A5]" style={{ width: "60px" }}></div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="mr-0.5 text-[#00D9A5]"
                          >
                            <path
                              fill="currentColor"
                              d="M5.751 10h-3a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75m11.08 12h-8.08c-.41 0-.75-.34-.75-.75V10.46c0-.3.09-.59.26-.84l4.62-6.85c.3-.48.83-.77 1.39-.77 1.06 0 1.84 1 1.59 2.03l-1.76 5.64c-.05.16.07.32.24.32h4.14c1.18 0 2.27.59 2.93 1.57.6.9.75 2.03.41 3.07l-1.65 4.96a3.516 3.516 0 0 1-3.34 2.41"
                            ></path>
                          </svg>
                          <span className="text-xs text-[#00D9A5]">5</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <div className="h-3 rounded bg-red-600" style={{ width: "4px" }}></div>
                        <div className="flex items-center">
                          <span className="text-xs text-red-600">0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-6 py-2">
                    <span className="text-sm w-[72px] text-[#727171]">민감성 피부</span>
                    <div className="flex flex-col gap-x-4">
                      <div className="flex items-center gap-x-1">
                        <div className="h-3 rounded bg-[#00D9A5]" style={{ width: "12px" }}></div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="mr-0.5 text-[#00D9A5]"
                          >
                            <path
                              fill="currentColor"
                              d="M5.751 10h-3a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75m11.08 12h-8.08c-.41 0-.75-.34-.75-.75V10.46c0-.3.09-.59.26-.84l4.62-6.85c.3-.48.83-.77 1.39-.77 1.06 0 1.84 1 1.59 2.03l-1.76 5.64c-.05.16.07.32.24.32h4.14c1.18 0 2.27.59 2.93 1.57.6.9.75 2.03.41 3.07l-1.65 4.96a3.516 3.516 0 0 1-3.34 2.41"
                            ></path>
                          </svg>
                          <span className="text-xs text-[#00D9A5]">1</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <div className="h-3 rounded bg-red-600" style={{ width: "12px" }}></div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="mr-0.5 text-red-600"
                          >
                            <path
                              fill="currentColor"
                              d="M18.25 14h3a.75.75 0 0 0 .75-.75V2.75a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v10.5c0 .414.335.75.75.75M7.17 2h8.08c.41 0 .75.34.75.75v10.79c0 .3-.09.59-.26.84l-4.63 6.85c-.3.48-.82.77-1.39.77-1.06 0-1.84-1-1.59-2.03l1.76-5.64a.247.247 0 0 0-.24-.32H5.52c-1.18 0-2.27-.59-2.93-1.57-.6-.91-.75-2.04-.41-3.07l1.65-4.96A3.516 3.516 0 0 1 7.17 2"
                            ></path>
                          </svg>
                          <span className="text-xs text-red-600">1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="pt-3 px-5 pb-4 bg-[#f5f5f5] rounded-lg">
                  <li className="flex items-start gap-x-2 mt-1">
                    <span className="text-xs text-[#9ca3af]">•</span>
                    <span className="text-xs text-[#9ca3af]">
                      구매 전에 제조판매업자가 표기한 전성분 표를 한 번 더 확인하시길 권장드립니다.
                    </span>
                  </li>
                  <li className="flex items-start gap-x-2 mt-1">
                    <span className="text-xs text-[#9ca3af]">•</span>
                    <span className="text-xs text-[#9ca3af]">
                      화해 정보를 허가없이 상업적으로 활용할 경우, 법적 조치를 받을 수 있습니다.
                    </span>
                  </li>
                  <li className="flex items-start gap-x-2 mt-1">
                    <span className="text-xs text-[#9ca3af]">•</span>
                    <span className="text-xs text-[#9ca3af]">
                      성분별 해당 제품 내 배합 비율은 브랜드사에서 제공한 정보로 모든 책임은 브랜드사에 있습니다.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </main>

        <div className="pb-10">
          <Footer />
        </div>

        <ScrollToTopButton />

        {/* 하단 고정 "화해 앱에서 보기" 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-[600px] mx-auto pt-3 px-5 pb-4 flex space-x-2 [&>*]:flex [&>*]:flex-1">
            <button
              className="inline-flex justify-center items-center appearance-none px-5 h-[52px] rounded-lg text-base font-semibold bg-[#00D9A5] hover:bg-[#00C995] active:bg-[#00C995] text-white disabled:bg-gray-300 disabled:hover:bg-gray-300"
              type="button"
              onClick={() => {
                // 앱 다운로드 또는 딥링크
                window.location.href = "https://hwahae.onelink.me/8Yb2"
              }}
            >
              화해 앱에서 보기
            </button>
          </div>
        </div>

        {/* 랭킹/수상 정보 바텀시트 */}
        <BottomSheet isOpen={isRankingSheetOpen} onClose={() => setIsRankingSheetOpen(false)} title="랭킹/수상 정보">
          <div className="flex">
            <span className="text-sm flex-shrink-0 w-[60px] text-[#727171]">랭킹</span>
            <div className="ml-4" role="list">
              <span className="text-sm block mt-3 first:mt-0 text-[#1a1a1a]" role="listitem">
                크림 ・ 수분 7위
              </span>
              <span className="text-sm block mt-3 first:mt-0 text-[#1a1a1a]" role="listitem">
                크림 16위
              </span>
            </div>
          </div>
        </BottomSheet>

        {/* 주름 개선 기능성 성분 바텀시트 */}
        <BottomSheet isOpen={isWrinkleSheetOpen} onClose={() => setIsWrinkleSheetOpen(false)} title="">
          <div className="flex justify-between items-center gap-2 -mt-4">
            <span className="flex items-center gap-2 text-base font-bold text-[#1a1a1a]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="#FFDC41" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18"></path>
                <path fill="#FFBE14" d="M12 5.5A6.504 6.504 0 0 0 5.5 12c0 3.587 2.913 6.5 6.5 6.5s6.5-2.913 6.5-6.5H12z"></path>
                <path fill="#fff" d="m19.652 12.516-.742-1.247-.742-1.247c-.033-.06-.127-.06-.16 0l-.742 1.247-.742 1.247a.092.092 0 0 0 .08.137h1.056c-.334 2.86-2.82 5.087-5.835 5.087-3.242 0-5.876-2.573-5.876-5.74 0-3.167 2.634-5.74 5.876-5.74a.47.47 0 0 0 .474-.463.471.471 0 0 0-.474-.463C8.06 5.333 5 8.323 5 12s3.061 6.667 6.825 6.667c3.536 0 6.457-2.645 6.79-6.014h.957c.073 0 .12-.078.08-.137"></path>
              </svg>
              주름 개선에 도움되는 기능성 성분
            </span>
            <span className="text-base font-bold text-[#1a1a1a]">1</span>
          </div>
          <p className="text-sm text-[#727171] mt-5">
            해당 성분명은 대한민국 식품의약품안전처(MFDS)의 규정 및 가이드라인에 따른 표기에요
          </p>
          <ul className="flex flex-col bg-[#f5f5f5] rounded-lg mt-4">
            <li className="px-4 py-3.5 flex items-center gap-2.5">
              <span className="rounded-full text-white flex items-center justify-center w-6 h-6 text-xs bg-[#00D9A5]">1</span>
              <span className="text-sm text-[#1a1a1a]">아데노신</span>
            </li>
          </ul>
        </BottomSheet>

        {/* 피부 미백 기능성 성분 바텀시트 */}
        <BottomSheet isOpen={isWhiteningSheetOpen} onClose={() => setIsWhiteningSheetOpen(false)} title="">
          <div className="flex justify-between items-center gap-2 -mt-4">
            <span className="flex items-center gap-2 text-base font-bold text-[#1a1a1a]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="#FFDC41" d="M19.5 9.563c0-4.468-3.845-8.029-8.378-7.513-3.354.385-6.094 3.086-6.55 6.462a7.57 7.57 0 0 0 3.244 7.32c.893.606 1.459 1.582 1.459 2.668h5.453c0-1.086.58-2.07 1.473-2.674A7.559 7.559 0 0 0 19.5 9.57z"></path>
                <path fill="#FFCD28" d="M12 15a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"></path>
                <path fill="#FA0" d="M14.348 11.126a.512.512 0 0 0-.74 0L12 12.799l-1.607-1.673a.512.512 0 0 0-.741 0 .565.565 0 0 0 0 .771l1.824 1.899v5.172h1.048v-5.172l1.824-1.899a.565.565 0 0 0 0-.771"></path>
                <path fill="#FF961E" d="M9.278 18.5h5.45v2.8c0 .385-.307.7-.681.7H9.959a.693.693 0 0 1-.681-.7z"></path>
              </svg>
              피부 미백에 도움되는 기능성 성분
            </span>
            <span className="text-base font-bold text-[#1a1a1a]">1</span>
          </div>
          <p className="text-sm text-[#727171] mt-5">
            해당 성분명은 대한민국 식품의약품안전처(MFDS)의 규정 및 가이드라인에 따른 표기에요
          </p>
          <ul className="flex flex-col bg-[#f5f5f5] rounded-lg mt-4">
            <li className="px-4 py-3.5 flex items-center gap-2.5">
              <span className="rounded-full text-white flex items-center justify-center w-6 h-6 text-xs bg-[#00D9A5]">1</span>
              <span className="text-sm text-[#1a1a1a]">나이아신아마이드</span>
            </li>
          </ul>
        </BottomSheet>
      </div>
    </div>
  )
}
