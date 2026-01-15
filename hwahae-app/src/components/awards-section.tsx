"use client"

import { ChevronRight, Trophy, Award, Star, Sparkles, Leaf, Gem, TrendingUp } from "lucide-react"
import Link from "next/link"

const awards = [
  { id: 195, label: "명예의 전당", icon: Trophy, bgColor: "bg-[#FFF8E1]", iconColor: "text-[#FFC107]", href: "/awards/195", badge: null },
  { id: 196, label: "뷰티 어워드", icon: Award, bgColor: "bg-[#FCE4EC]", iconColor: "text-[#E91E63]", href: "/awards/196", badge: null },
  { id: 197, label: "베스트 신제품", icon: Star, bgColor: "bg-[#E3F2FD]", iconColor: "text-[#2196F3]", href: "/awards/197", badge: "하반기" },
  { id: 198, label: "효능/효과", icon: Sparkles, bgColor: "bg-[#F3E5F5]", iconColor: "text-[#9C27B0]", href: "/awards/198", badge: "하반기" },
  { id: 231, label: "비건", icon: Leaf, bgColor: "bg-[#E8F5E9]", iconColor: "text-[#4CAF50]", href: "/awards/231", badge: "하반기" },
  { id: 232, label: "넥스트 뷰티", icon: Gem, bgColor: "bg-[#FBE9E7]", iconColor: "text-[#FF5722]", href: "/awards/232", badge: "하반기" },
  { id: 253, label: "라이징 트렌드", icon: TrendingUp, bgColor: "bg-[#FFF3E0]", iconColor: "text-[#FF9800]", href: "/awards/253", badge: "하반기" },
  { id: 116, label: "베스트 신제품", icon: Star, bgColor: "bg-[#E3F2FD]", iconColor: "text-[#2196F3]", href: "/awards/116", badge: "상반기" },
  { id: 117, label: "효능/효과", icon: Sparkles, bgColor: "bg-[#F3E5F5]", iconColor: "text-[#9C27B0]", href: "/awards/117", badge: "상반기" },
  { id: 152, label: "비건", icon: Leaf, bgColor: "bg-[#E8F5E9]", iconColor: "text-[#4CAF50]", href: "/awards/152", badge: "상반기" },
]

export default function AwardsSection() {
  return (
    <section className="mt-8">
      <Link href="/awards" className="flex items-center justify-between px-5 mb-2">
        <h2 className="text-base font-bold text-[#1a1a1a]">1,000만의 선택, ABCPharm 어워드</h2>
        <ChevronRight className="w-5 h-5 text-[#727171]" />
      </Link>

      <div className="flex overflow-x-scroll px-5 pb-12 scrollbar-hide">
        {awards.map((award, index) => {
          const IconComponent = award.icon
          return (
            <div
              key={award.id}
              className={`flex-shrink-0 relative w-[134px] h-[134px] bg-white rounded-2xl shadow-[0_2px_8px_0_rgba(0,0,0,0.08)] ${
                index === 0 ? "" : "ml-4"
              }`}
            >
              <Link href={award.href} className="flex flex-col w-full h-full justify-between pt-2 pl-4 pb-4">
                {/* Icon */}
                <div className="relative w-[60px] h-[60px]">
                  <div className={`w-full h-full rounded-xl ${award.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-8 h-8 ${award.iconColor}`} />
                  </div>
                </div>

                {/* Label with optional badge */}
                <div className="flex flex-col items-start">
                  {award.badge && (
                    <span className="inline-block rounded-[4px] h-4 px-1 text-[10px] font-medium leading-4 bg-[#FFF3E6] text-[#f39800] mb-0.5">
                      {award.badge}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-[#1a1a1a] whitespace-pre-line overflow-y-hidden line-clamp-1 px-0.5">
                    {award.label}
                  </span>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
