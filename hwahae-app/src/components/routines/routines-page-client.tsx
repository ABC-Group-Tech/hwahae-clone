"use client"

import { useState } from "react"
import { ArrowLeft, Search, Eye } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"

const categories = ["전체", "스킨케어", "메이크업", "클렌징", "바디케어"]
const skinTypes = ["건성", "지성", "복합성", "민감성", "여드름"]

const curators = [
  {
    id: 1,
    name: "뷰티마스터123",
    skinType: "복합성",
    concerns: ["민감성", "모공"],
    followers: 12345,
    views: 45678,
    verified: true,
    bgColor: "bg-gradient-to-br from-pink-200 to-purple-200",
  },
  {
    id: 2,
    name: "스킨케어러버",
    skinType: "건성",
    concerns: ["보습", "주름"],
    followers: 8901,
    views: 32145,
    verified: true,
    bgColor: "bg-gradient-to-br from-blue-200 to-cyan-200",
  },
  {
    id: 3,
    name: "글로우업퀸",
    skinType: "지성",
    concerns: ["미백", "트러블"],
    followers: 5678,
    views: 18234,
    verified: false,
    bgColor: "bg-gradient-to-br from-orange-200 to-yellow-200",
  },
  {
    id: 4,
    name: "데일리뷰티",
    skinType: "민감성",
    concerns: ["진정", "보습"],
    followers: 3456,
    views: 12890,
    verified: true,
    bgColor: "bg-gradient-to-br from-green-200 to-teal-200",
  },
  {
    id: 5,
    name: "피부과학자",
    skinType: "여드름",
    concerns: ["트러블", "모공"],
    followers: 9876,
    views: 56789,
    verified: true,
    bgColor: "bg-gradient-to-br from-rose-200 to-pink-200",
  },
  {
    id: 6,
    name: "클린뷰티",
    skinType: "복합성",
    concerns: ["안티에이징", "탄력"],
    followers: 4567,
    views: 23456,
    verified: false,
    bgColor: "bg-gradient-to-br from-violet-200 to-purple-200",
  },
  {
    id: 7,
    name: "메이크업아티스트",
    skinType: "건성",
    concerns: ["커버력", "지속력"],
    followers: 15678,
    views: 78901,
    verified: true,
    bgColor: "bg-gradient-to-br from-amber-200 to-orange-200",
  },
  {
    id: 8,
    name: "자연주의뷰티",
    skinType: "민감성",
    concerns: ["진정", "자연유래"],
    followers: 6789,
    views: 34567,
    verified: true,
    bgColor: "bg-gradient-to-br from-emerald-200 to-green-200",
  },
]

export default function RoutinesPageClient() {
  const [activeCategory, setActiveCategory] = useState("전체")
  const [activeSkinType, setActiveSkinType] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white min-h-screen shadow-[0_0_20px_rgba(0,0,0,0.1)] relative">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 h-14">
            <Link href="/" className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <h1 className="text-lg font-bold">뷰티 루틴</h1>
            <button className="p-2 -mr-2">
              <Search className="w-6 h-6 text-[#727171]" />
            </button>
          </div>
        </header>

        {/* Category Filter Tabs */}
        <div className="px-4 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category ? "bg-[#f39800] text-white" : "bg-[#f5f5f5] text-[#727171]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skin Type Filter */}
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {skinTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveSkinType(activeSkinType === type ? null : type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                  activeSkinType === type ? "border-[#f39800] text-[#f39800]" : "border-[#e5e5e5] text-[#727171]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Curator Cards Grid */}
        <div className="px-4 pb-6">
          <div className="grid grid-cols-2 gap-3">
            {curators.map((curator) => (
              <Link key={curator.id} href={`/curator/${curator.id}`} className="block group">
                <div className={`relative aspect-[3/4] rounded-xl overflow-hidden ${curator.bgColor}`}>
                  {/* Placeholder image area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/50 flex items-center justify-center">
                      <span className="text-xs text-gray-500">프로필</span>
                    </div>
                  </div>

                  {/* View count */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 rounded-full px-2 py-1">
                    <Eye className="w-3 h-3 text-white" />
                    <span className="text-xs text-white">{curator.views.toLocaleString()}</span>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    {/* Curator profile */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-[8px] text-gray-500">IMG</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-white text-sm font-medium">{curator.name}</span>
                        {curator.verified && (
                          <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Skin type tags */}
                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] text-white">{curator.skinType}</span>
                      {curator.concerns.slice(0, 2).map((concern) => (
                        <span key={concern} className="px-2 py-0.5 bg-white/20 rounded text-[10px] text-white">
                          {concern}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          <button className="w-full mt-6 py-3 border border-[#e5e5e5] rounded-lg text-sm text-[#727171] font-medium">
            더보기
          </button>
        </div>

        {/* Footer */}
        <Footer />

        {/* Scroll to Top */}
        <ScrollToTopButton />
      </div>
    </div>
  )
}
