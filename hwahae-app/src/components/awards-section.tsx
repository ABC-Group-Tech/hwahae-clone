"use client"

import { ChevronRight, Trophy, Award, Star, Sparkles, Leaf, Gem } from "lucide-react"
import Link from "next/link"

const awards = [
  { id: 1, label: "명예의\n전당", icon: Trophy, bgColor: "bg-[#FFF8E1]", iconColor: "text-[#FFC107]", href: "/awards/hall-of-fame" },
  { id: 2, label: "뷰티\n어워드", icon: Award, bgColor: "bg-[#FCE4EC]", iconColor: "text-[#E91E63]", href: "/awards/beauty" },
  { id: 3, label: "베스트\n신제품", icon: Star, bgColor: "bg-[#E3F2FD]", iconColor: "text-[#2196F3]", href: "/awards/best-new" },
  { id: 4, label: "효능\n효과", icon: Sparkles, bgColor: "bg-[#F3E5F5]", iconColor: "text-[#9C27B0]", href: "/awards/efficacy" },
  { id: 5, label: "비건\n어워드", icon: Leaf, bgColor: "bg-[#E8F5E9]", iconColor: "text-[#4CAF50]", href: "/awards/vegan" },
  { id: 6, label: "넥스트\n뷰티", icon: Gem, bgColor: "bg-[#FBE9E7]", iconColor: "text-[#FF5722]", href: "/awards/next-beauty" },
]

export default function AwardsSection() {
  return (
    <section className="py-4">
      <Link href="/awards" className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-base font-bold text-[#1a1a1a]">1,000만의 선택, ABCPharm 어워드</h2>
        <ChevronRight className="w-5 h-5 text-[#727171]" />
      </Link>

      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide pb-1">
        {awards.map((award) => {
          const IconComponent = award.icon
          return (
            <Link key={award.id} href={award.href} className="flex flex-col items-center gap-2 min-w-[80px]">
              {/* Icon Container with shadow */}
              <div className={`w-16 h-16 rounded-xl ${award.bgColor} flex items-center justify-center shadow-sm`}>
                <IconComponent className={`w-7 h-7 ${award.iconColor}`} />
              </div>
              <span className="text-[11px] text-[#1a1a1a] text-center leading-tight whitespace-pre-wrap font-medium">
                {award.label}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
