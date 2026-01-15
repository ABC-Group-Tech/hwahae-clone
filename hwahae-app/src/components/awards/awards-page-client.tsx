"use client"

import { useState } from "react"
import Link from "next/link"
import { Trophy, Award, Star, Sparkles, Leaf, TrendingUp, ChevronRight } from "lucide-react"
import StickyHeader from "@/components/sticky-header"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"

const years = ["2025", "2024", "2023", "2022"]

const awardCategories = [
  {
    id: "hall-of-fame",
    title: "명예의 전당",
    subtitle: "영원히 기억될 최고의 제품",
    icon: Trophy,
    bgColor: "bg-gradient-to-br from-amber-100 to-amber-50",
    href: "/awards/hall-of-fame",
  },
  {
    id: "beauty-awards",
    title: "뷰티 어워드",
    subtitle: "올해의 뷰티 트렌드를 이끈 제품",
    icon: Award,
    bgColor: "bg-gradient-to-br from-pink-100 to-pink-50",
    href: "/awards/beauty",
  },
  {
    id: "best-new",
    title: "하반기 베스트 신제품",
    subtitle: "새롭게 주목받은 신제품",
    icon: Star,
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
    href: "/awards/best-new",
  },
  {
    id: "efficacy",
    title: "하반기 효능/효과",
    subtitle: "피부 고민별 최고의 제품",
    icon: Sparkles,
    bgColor: "bg-gradient-to-br from-purple-100 to-purple-50",
    href: "/awards/efficacy",
  },
  {
    id: "vegan",
    title: "하반기 비건",
    subtitle: "자연을 생각한 클린 뷰티",
    icon: Leaf,
    bgColor: "bg-gradient-to-br from-green-100 to-green-50",
    href: "/awards/vegan",
  },
  {
    id: "next-beauty",
    title: "하반기 넥스트 뷰티",
    subtitle: "미래를 이끌 뷰티 트렌드",
    icon: TrendingUp,
    bgColor: "bg-gradient-to-br from-cyan-100 to-cyan-50",
    href: "/awards/next-beauty",
  },
]

export default function AwardsPageClient() {
  const [selectedYear, setSelectedYear] = useState("2025")

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <StickyHeader />

        <main className="pb-8">
          {/* Year Selector */}
          <div className="px-4 py-4">
            <div className="flex gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedYear === year
                      ? "bg-[#f39800] text-white"
                      : "border border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="px-4 pb-6">
            <h2 className="text-2xl font-bold text-gray-900">ABCPharm 어워드 {selectedYear}</h2>
            <p className="text-sm text-gray-500 mt-1">고객이 선택한 최고의 제품을 만나보세요</p>
          </div>

          {/* Award Category Cards Grid */}
          <div className="px-4 grid grid-cols-2 gap-3">
            {awardCategories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className={`${category.bgColor} rounded-xl p-4 flex flex-col justify-between min-h-[140px] transition-transform active:scale-[0.98]`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">{category.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{category.subtitle}</p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Featured Banner */}
          <div className="px-4 mt-6">
            <div className="bg-gray-200 rounded-xl h-32 flex items-center justify-center text-gray-500 text-sm">
              어워드 프로모션 배너
            </div>
          </div>
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  )
}
