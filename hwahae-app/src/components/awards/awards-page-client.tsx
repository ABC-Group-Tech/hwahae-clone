"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"
import AwardsHeaderExtended from "@/components/awards-header-extended"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"
import Image from "next/image"

const awardCategories = [
  {
    id: 195,
    name: "명예의 전당",
    description: "역대 ABCPharm 어워드에서\n가장 사랑받은 제품",
    icon: "https://img.hwahae.co.kr/award_v2/195/icon/20251113_144224567871.png",
    href: "/awards/hall-of-fame",
    badge: null,
  },
  {
    id: 196,
    name: "뷰티 어워드",
    description: "천 만의 선택을 받은\n뷰티 제품",
    icon: "https://img.hwahae.co.kr/award_v2/196/icon/20251113_144312777081.png",
    href: "/awards/beauty",
    badge: null,
  },
  {
    id: 197,
    name: "베스트 신제품",
    description: "하반기에 뜨거운\n관심을 얻은 루키 제품",
    icon: "https://img.hwahae.co.kr/award_v2/197/icon/20251113_144434788530.png",
    href: "/awards/best-new",
    badge: "하반기",
  },
  {
    id: 198,
    name: "효능/효과",
    description: "피부 고민 해결을 위한\n필수 제품",
    icon: "https://img.hwahae.co.kr/award_v2/198/icon/20251113_144540561392.png",
    href: "/awards/efficacy",
    badge: "하반기",
  },
  {
    id: 231,
    name: "비건",
    description: "지속 가능한 삶을\n만드는 비건 제품",
    icon: "https://img.hwahae.co.kr/award_v2/231/icon/20251113_150738249500.png",
    href: "/awards/vegan",
    badge: "하반기",
  },
  {
    id: 232,
    name: "넥스트 뷰티",
    description: "신생 브랜드의 제품 중\n아직 발견되지 않은 우수 제품",
    icon: "https://img.hwahae.co.kr/award_v2/232/icon/20251113_150849816589.png",
    href: "/awards/next-beauty",
    badge: "하반기",
  },
  {
    id: 253,
    name: "라이징 트렌드",
    description: "빠르게 주목받은\n인기 급상승 랭킹 제품",
    icon: "https://img.hwahae.co.kr/award_v2/253/icon/20251113_151713474046.png",
    href: "/awards/rising-trend",
    badge: "하반기",
  },
  {
    id: 116,
    name: "베스트 신제품",
    description: "상반기에 뜨거운\n관심을 얻은 루키 제품",
    icon: "https://img.hwahae.co.kr/award_v2/116/icon/20250519_154634699292.png",
    href: "/awards/best-new-first",
    badge: "상반기",
  },
  {
    id: 117,
    name: "효능/효과",
    description: "피부 고민 해결을 위한\n필수 제품",
    icon: "https://img.hwahae.co.kr/award_v2/117/icon/20250519_194046168184.png",
    href: "/awards/efficacy-first",
    badge: "상반기",
  },
  {
    id: 152,
    name: "비건",
    description: "지속 가능한 삶을\n만드는 비건 제품",
    icon: "https://img.hwahae.co.kr/award_v2/152/icon/20250519_212026522554.png",
    href: "/awards/vegan-first",
    badge: "상반기",
  },
  {
    id: 153,
    name: "넥스트 뷰티",
    description: "신생 브랜드의 제품 중\n아직 발견되지 않은 우수 제품",
    icon: "https://img.hwahae.co.kr/award_v2/153/icon/20250519_150126050064.png",
    href: "/awards/next-beauty-first",
    badge: "상반기",
  },
  {
    id: 176,
    name: "라이징 트렌드",
    description: "빠르게 주목받은\n인기 급상승 랭킹 제품",
    icon: "https://img.hwahae.co.kr/award_v2/176/icon/20250519_212651774970.png",
    href: "/awards/rising-trend-first",
    badge: "상반기",
  },
]

export default function AwardsPageClient() {
  const [selectedYear, setSelectedYear] = useState("2025")

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <AwardsHeaderExtended />

        <main className="pb-8">
          {/* Hero Section with Video and Background Images */}
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-full">
              {/* Video Background */}
              <h2>
                <video
                  src="https://img.hwahae.co.kr/award_v2/115/main_video/20251119_085928362607.mp4"
                  width="100%"
                  autoPlay
                  playsInline
                  loop
                  muted
                  className="w-full"
                />
              </h2>

              {/* Background Image - Middle */}
              <picture className="m-0 p-0">
                <source
                  srcSet="https://img.hwahae.co.kr/award_v2/115/background/20251119_085928230833.png?format=webp 1x, https://img.hwahae.co.kr/award_v2/115/background/20251119_085928230833.png?format=webp 2x"
                  type="image/webp"
                />
                <img
                  className="touch-action-none pointer-events-none h-auto w-full align-top transition-opacity duration-75 opacity-100"
                  alt="2025's banner home middle image"
                  src="https://img.hwahae.co.kr/award_v2/115/background/20251119_085928230833.png"
                  style={{ clipPath: "inherit" }}
                />
              </picture>

              {/* Background Image - Bottom - Temporarily hidden */}
              {/* <picture className="m-0 p-0">
                <img
                  className="touch-action-none pointer-events-none h-auto w-full align-top transition-opacity duration-75 opacity-100"
                  alt="2025's banner home bottom image"
                  src="/images/award-home-bottom-bg-image.webp"
                  style={{ clipPath: "inherit" }}
                />
              </picture> */}
            </div>

            {/* Content Section */}
            <section className="flex flex-col px-[24px] pt-[77%] relative z-[1]">
              {/* Year Selector */}
              <div className="flex">
                <div
                  role="button"
                  className="flex items-center justify-center gap-4 cursor-pointer"
                  tabIndex={0}
                >
                  <span className="text-[42px] font-[600] leading-[42px]">{selectedYear}</span>
                  <ChevronDown className="w-6 h-6" />
                </div>
              </div>

              {/* Award Categories Grid */}
              <ul className="grid grid-cols-2 gap-x-2.5 gap-y-3 justify-center pt-5">
                {awardCategories.map((award) => (
                  <li key={award.id}>
                    <Link
                      className="flex flex-col relative bg-white bg-opacity-60 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] p-4 rounded-2xl h-full"
                      href={award.href}
                    >
                      {/* Icon */}
                      <div className="flex justify-center">
                        <div className="relative">
                          <picture className="m-0 p-0">
                            <img
                              className="touch-action-none pointer-events-none align-top transition-opacity duration-75 opacity-100 w-[60px] h-[60px]"
                              alt={`${award.name} award icon`}
                              src={award.icon}
                              style={{ clipPath: "inherit" }}
                            />
                          </picture>
                        </div>
                      </div>

                      {/* Title and Description */}
                      <div className="flex flex-col gap-1 justify-center items-center mt-2">
                        <span className="flex flex-col text-gray-900 font-pretendard text-base font-bold leading-6 text-center">
                          {award.badge && (
                            <span className="inline-block rounded-[4px] h-4 px-1 text-[11px] font-medium leading-4 bg-[#FFF4E6] text-[#f39800] w-fit mx-auto mb-1">
                              {award.badge}
                            </span>
                          )}
                          <span className="text-base leading-6 font-bold">{award.name}</span>
                        </span>
                        <div className="text-gray-600 leading-[18px] text-[13px] font-normal text-center whitespace-pre-line">
                          {award.description}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Bottom Button */}
              <div className="mt-5">
                <Link
                  className="inline-flex justify-center items-center appearance-none px-20 h-[52px] rounded-lg text-base bg-[#f39800] hover:bg-[#e08900] active:bg-[#e08900] text-white w-full"
                  href="/awards/about"
                >
                  ABCPharm 어워드를 소개합니다
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </section>
          </div>
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  )
}
