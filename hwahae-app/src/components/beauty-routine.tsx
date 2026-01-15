"use client"

import { BadgeCheck, ChevronRight } from "lucide-react"
import Link from "next/link"

const routines = [
  {
    id: 1,
    curator: "뷰티에디터 민지",
    tags: ["복합성", "민감성", "미백"],
  },
  {
    id: 2,
    curator: "스킨케어 전문가 수현",
    tags: ["지성", "여드름", "진정"],
  },
  {
    id: 3,
    curator: "더마 코치 윤아",
    tags: ["건성", "보습", "안티에이징"],
  },
  {
    id: 4,
    curator: "뷰티 크리에이터 하나",
    tags: ["중성", "톤업", "광채"],
  },
]

export default function BeautyRoutine() {
  return (
    <section className="py-4">
      <Link href="/routines" className="px-4 mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-[#1a1a1a]">제품 더 잘 쓰는 루틴</h2>
        <ChevronRight className="w-5 h-5 text-[#727171]" />
      </Link>

      {/* Routine Cards */}
      <div className="flex gap-3 overflow-x-auto px-4 scrollbar-hide">
        {routines.map((routine) => (
          <Link
            key={routine.id}
            href={`/routines/${routine.id}`}
            className="min-w-[200px] h-[160px] bg-gray-300 rounded-xl p-4 flex flex-col justify-end relative overflow-hidden flex-shrink-0"
          >
            {/* Profile */}
            <div className="absolute top-3 right-3 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-[6px] text-[#727171]">Profile</span>
            </div>

            {/* Curator Info */}
            <div className="flex items-center gap-1 mb-2">
              <span className="text-sm font-medium text-white">{routine.curator}</span>
              <BadgeCheck className="w-4 h-4 text-[#f39800]" />
            </div>

            {/* Tags */}
            <div className="flex gap-1 flex-wrap">
              {routine.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="px-4 mt-4">
        <Link
          href="/routines"
          className="block w-full py-3 text-sm text-[#727171] border border-[#e5e5e5] rounded-lg bg-white text-center"
        >
          뷰티 루틴 더보기 {">"}
        </Link>
      </div>
    </section>
  )
}
