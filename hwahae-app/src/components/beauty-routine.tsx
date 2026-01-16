"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface BeautyRoutine {
  id: number
  curatorName: string
  curatorId: number
  backgroundImage: string
  profileImage?: string
  skinConcerns: string
}

const routines: BeautyRoutine[] = [
  {
    id: 1,
    curatorName: "카사의 스킨케어",
    curatorId: 1423,
    backgroundImage: "",
    profileImage: "",
    skinConcerns: "복합성/여름쿨톤/민감성/미백/잡티/속건조/주름/탄력/모공/홍조/가려움/비듬/각질",
  },
  {
    id: 2,
    curatorName: "라라서우",
    curatorId: 1546,
    backgroundImage: "",
    profileImage: "",
    skinConcerns: "수부지/여름쿨톤/민감성/여드름/피지/블랙헤드/속건조/모공/손상모/열감두피/지성두피",
  },
  {
    id: 3,
    curatorName: "유희의 뷰티샵",
    curatorId: 1421,
    backgroundImage: "",
    profileImage: "",
    skinConcerns: "복합성/봄웜톤/민감성/미백/잡티/피지/블랙헤드/속건조/주름/탄력/모공",
  },
  {
    id: 4,
    curatorName: "연쭈마켓",
    curatorId: 1409,
    backgroundImage: "",
    skinConcerns: "건성/겨울쿨톤/민감성/여드름/미백/잡티/피지/블랙헤드/다크서클/속건조/주름/탄력/모공/각질/탈모",
  },
  {
    id: 5,
    curatorName: "자민의 겨울",
    curatorId: 1449,
    backgroundImage: "",
    skinConcerns: "건성/겨울쿨톤/미백/잡티/속건조/모공",
  },
]

export default function BeautyRoutine() {
  return (
    <section className="mt-[60px]">
      {/* Section Header */}
      <Link href="/beauty-routines" className="block px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold leading-normal text-[#1a1a1a]">제품 더 잘 쓰는 루틴</h2>
          <ChevronRight className="w-6 h-6 text-[#1a1a1a]" />
        </div>
      </Link>

      {/* Routine Cards - Horizontal Scroll */}
      <div className="overflow-x-auto mt-4 scrollbar-hide">
        <ul className="flex pl-5 gap-3">
          {routines.map((routine) => (
            <li key={routine.id} className="flex-shrink-0 last:pr-5">
              <Link
                href={`/curators/${routine.curatorId}?tab_index=1`}
                className="block w-[200px] h-[300px] rounded-lg overflow-hidden relative"
              >
                {/* Background Image */}
                <div
                  className="flex-shrink-0 rounded-lg p-3 h-[300px] flex flex-col justify-end focus:outline-none focus-visible:outline-none bg-gray-200"
                  style={
                    routine.backgroundImage
                      ? {
                          backgroundImage: `url("${routine.backgroundImage}")`,
                          backgroundPosition: "center center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }
                      : {}
                  }
                >
                  {!routine.backgroundImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">이미지</span>
                    </div>
                  )}
                </div>

                {/* Bottom Gradient Overlay with Content */}
                <div
                  className="absolute left-0 w-[200px] h-[127px] flex flex-col justify-end p-3"
                  style={{
                    bottom: "-0.01px",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                    background: "linear-gradient(0deg, rgb(61, 61, 61) 0.34%, rgba(61, 61, 61, 0) 99.66%)",
                  }}
                >
                  <div className="flex flex-col gap-2 text-white">
                    {/* Curator Name */}
                    <div className="flex items-center gap-0.5">
                      <span className="text-base font-medium line-clamp-1">{routine.curatorName}</span>
                      <ChevronRight className="w-5 h-5 flex-shrink-0" />
                    </div>

                    {/* Profile and Skin Concerns */}
                    <div className="flex items-center gap-1 h-[38px]">
                      {/* Profile Image - Default Icon */}
                      <div className="relative flex-shrink-0 w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="w-4 h-4 text-gray-300"
                        >
                          <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M11.64 0c-.92 0-1.7 2.32-2.14 5.78 1 .74 3.06 2.4 5.08 4.44 3.4-3.58 5.68-6.36 5.34-6.7-.32-.32-2.72 1.68-5.9 4.74C13.7 3.46 12.76 0 11.64 0m5.7 13.2c-.68-.82-1.44-1.66-2.28-2.5 5.14.02 8.92.46 8.92 1.1.02.54-2.7 1.08-6.64 1.4m-2.9 4.74c2.88 2.1 5.18 3.12 5.88 2.4.94-.98-1.5-4.88-5.54-9.02.02 2.74-.18 5.34-.34 6.62M6.36 10.4c2.58-.24 5.18-.32 7.12-.34C8.8 5.56 4.02 2.58 2.92 3.68c-.78.78.7 3.5 3.44 6.72M3.04 20.66c-.36-.36 2.14-3.36 5.76-7.14-5.06-.02-8.8-.46-8.8-1.1 0-.86 6.82-1.68 14.12-1.72-4.56 4.76-10.54 10.5-11.08 9.96m6.26-4.2c1-.92 3.82-3.76 4.84-4.84.08 6.06-.98 12.38-2.52 12.38-1.04 0-1.94-3.12-2.32-7.54"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      {/* Skin Concerns */}
                      <span className="text-xs line-clamp-2">{routine.skinConcerns}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* View All Button */}
      <div className="px-5 mt-5">
        <Link
          href="/beauty-routines"
          className="inline-flex justify-center items-center appearance-none px-4 h-[44px] rounded-lg text-base border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-50 text-gray-850 w-full"
        >
          뷰티 루틴 더보기
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}
