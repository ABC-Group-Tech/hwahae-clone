"use client"

import { useState } from "react"
import { ArrowLeft, Share2, MoreVertical, Star, ChevronRight, Eye } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"

const curatorData = {
  id: 1,
  name: "뷰티마스터123",
  skinType: "복합성",
  concerns: ["민감성", "모공", "미백"],
  followers: 12345,
  reviews: 234,
  products: 156,
  avgRating: 4.2,
  verified: true,
}

const collections = [
  { id: 1, title: "겨울철 보습 루틴", count: 8 },
  { id: 2, title: "민감성 피부 추천템", count: 12 },
  { id: 3, title: "아침 스킨케어", count: 5 },
  { id: 4, title: "여름 자외선 케어", count: 7 },
]

const reviews = [
  {
    id: 1,
    brand: "라네즈",
    product: "워터뱅크 블루 히알루로닉 크림",
    rating: 5,
    content: "정말 촉촉하고 피부에 잘 흡수됩니다. 민감한 피부에도 자극 없이 사용할 수 있어요. 강력 추천합니다!",
    date: "2024.01.15",
    helpful: 123,
  },
  {
    id: 2,
    brand: "이니스프리",
    product: "그린티 씨드 세럼",
    rating: 4,
    content: "가볍고 산뜻한 사용감이 좋아요. 보습력도 괜찮고 피부 결이 정돈되는 느낌입니다.",
    date: "2024.01.10",
    helpful: 89,
  },
  {
    id: 3,
    brand: "에스티로더",
    product: "어드밴스드 나이트 리페어",
    rating: 5,
    content: "역시 명성에 걸맞은 제품입니다. 다음날 아침 피부가 확실히 달라지는 걸 느낄 수 있어요.",
    date: "2024.01.05",
    helpful: 256,
  },
]

const routines = [
  { id: 1, title: "모닝 루틴", bgColor: "bg-gradient-to-br from-yellow-200 to-orange-200", views: 12345 },
  { id: 2, title: "나이트 루틴", bgColor: "bg-gradient-to-br from-indigo-200 to-purple-200", views: 9876 },
  { id: 3, title: "주말 스페셜 케어", bgColor: "bg-gradient-to-br from-pink-200 to-rose-200", views: 5678 },
]

export default function CuratorProfileClient() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [reviewTab, setReviewTab] = useState<"전체" | "포토리뷰">("전체")

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white min-h-screen shadow-[0_0_20px_rgba(0,0,0,0.1)] relative">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 h-14">
            <Link href="/routines" className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </Link>
            <div className="flex items-center gap-1">
              <button className="p-2">
                <Share2 className="w-6 h-6 text-[#727171]" />
              </button>
              <button className="p-2 -mr-2">
                <MoreVertical className="w-6 h-6 text-[#727171]" />
              </button>
            </div>
          </div>
        </header>

        {/* Curator Header Section */}
        <div className="px-4 py-6 border-b border-[#e5e5e5]">
          <div className="flex items-start gap-4">
            {/* Profile Image */}
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <span className="text-xs text-gray-500">프로필</span>
            </div>

            <div className="flex-1">
              {/* Name and verified badge */}
              <div className="flex items-center gap-1 mb-2">
                <h1 className="text-lg font-bold">{curatorData.name}</h1>
                {curatorData.verified && (
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                )}
              </div>

              {/* Skin info tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                <span className="px-2 py-1 bg-[#f5f5f5] rounded text-xs text-[#727171]">{curatorData.skinType}</span>
                {curatorData.concerns.map((concern) => (
                  <span key={concern} className="px-2 py-1 bg-[#f5f5f5] rounded text-xs text-[#727171]">
                    {concern}
                  </span>
                ))}
              </div>

              {/* Follower count */}
              <p className="text-sm text-[#727171] mb-3">{curatorData.followers.toLocaleString()}명 팔로워</p>

              {/* Follow button */}
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  isFollowing ? "bg-[#f39800] text-white" : "border border-[#f39800] text-[#f39800]"
                }`}
              >
                {isFollowing ? "팔로잉" : "팔로우"}
              </button>
            </div>
          </div>
        </div>

        {/* Curator Stats Section */}
        <div className="flex justify-around py-4 border-b border-[#e5e5e5]">
          <div className="text-center">
            <p className="text-lg font-bold">{curatorData.reviews}</p>
            <p className="text-xs text-[#727171]">리뷰</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{curatorData.products}</p>
            <p className="text-xs text-[#727171]">제품</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{curatorData.avgRating}</p>
            <p className="text-xs text-[#727171]">평균 별점</p>
          </div>
        </div>

        {/* Collections Section */}
        <div className="py-6 border-b border-[#e5e5e5]">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-base font-bold">컬렉션 {collections.length}</h2>
            <button className="flex items-center text-sm text-[#727171]">
              전체보기
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="px-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3">
              {collections.map((collection) => (
                <div key={collection.id} className="shrink-0">
                  <div className="w-[120px] h-[120px] rounded-xl bg-gray-200 flex items-center justify-center mb-2">
                    <span className="text-xs text-gray-500">컬렉션</span>
                  </div>
                  <p className="text-sm font-medium line-clamp-1">{collection.title}</p>
                  <p className="text-xs text-[#727171]">{collection.count}개 제품</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="py-6 border-b border-[#e5e5e5]">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-base font-bold">리뷰 {curatorData.reviews}</h2>
          </div>

          {/* Review Tabs */}
          <div className="flex gap-2 px-4 mb-4">
            {(["전체", "포토리뷰"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setReviewTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  reviewTab === tab ? "bg-[#1a1a1a] text-white" : "bg-[#f5f5f5] text-[#727171]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Review List */}
          <div className="px-4 space-y-4">
            {reviews.map((review) => (
              <Link
                key={review.id}
                href={`/product/${review.id}`}
                className="flex gap-3 py-3 border-b border-[#f5f5f5] last:border-0"
              >
                {/* Product thumbnail */}
                <div className="w-[60px] h-[60px] rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                  <span className="text-[8px] text-gray-500">제품</span>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Product info */}
                  <p className="text-xs text-[#727171]">{review.brand}</p>
                  <p className="text-sm font-medium mb-1 line-clamp-1">{review.product}</p>

                  {/* Star rating */}
                  <div className="flex items-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.rating ? "fill-[#f39800] text-[#f39800]" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review excerpt */}
                  <p className="text-xs text-[#727171] line-clamp-2 mb-1">{review.content}</p>

                  {/* Date and helpful */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#b0b0b0]">{review.date}</span>
                    <span className="text-xs text-[#727171]">도움이 돼요 ({review.helpful})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Routine Posts Section */}
        <div className="py-6">
          <div className="flex items-center justify-between px-4 mb-4">
            <h2 className="text-base font-bold">루틴</h2>
          </div>

          <div className="px-4 grid grid-cols-2 gap-3">
            {routines.map((routine) => (
              <div key={routine.id} className="group">
                <div className={`relative aspect-[3/4] rounded-xl overflow-hidden ${routine.bgColor}`}>
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-gray-600">{routine.title}</span>
                  </div>

                  {/* View count */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 rounded-full px-2 py-1">
                    <Eye className="w-3 h-3 text-white" />
                    <span className="text-xs text-white">{routine.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Scroll to Top */}
        <ScrollToTopButton />
      </div>
    </div>
  )
}
