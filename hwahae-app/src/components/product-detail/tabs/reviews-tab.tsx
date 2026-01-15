"use client"

import { useState } from "react"
import { Star, ThumbsUp } from "lucide-react"

const skinTypes = ["전체", "건성", "지성", "복합성", "민감성"]
const sortOptions = ["최신순", "추천순", "평점 높은순", "평점 낮은순"]

const reviews = [
  {
    id: 1,
    username: "뷰티러버",
    skinTypes: ["복합성", "민감성"],
    rating: 5,
    text: "촉촉하고 흡수가 빨라요! 민감한 피부에도 자극 없이 사용할 수 있어요. 여름에도 끈적임 없이 사용하기 좋아요.",
    helpfulCount: 234,
    date: "2024.01.15",
    hasPhoto: true,
  },
  {
    id: 2,
    username: "스킨케어덕후",
    skinTypes: ["건성"],
    rating: 5,
    text: "가성비 최고! 이 가격에 이 퀄리티는 정말 좋습니다. 재구매 의사 100%입니다.",
    helpfulCount: 156,
    date: "2024.01.12",
    hasPhoto: false,
  },
  {
    id: 3,
    username: "피부고민해결",
    skinTypes: ["지성"],
    rating: 4,
    text: "지성 피부인데 사용감이 가벼워서 좋아요. 다만 보습력이 조금 부족한 느낌?",
    helpfulCount: 89,
    date: "2024.01.10",
    hasPhoto: true,
  },
]

const ratingDistribution = [
  { stars: 5, percentage: 72 },
  { stars: 4, percentage: 18 },
  { stars: 3, percentage: 6 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 2 },
]

export default function ReviewsTab() {
  const [selectedSkinType, setSelectedSkinType] = useState("전체")
  const [selectedSort, setSelectedSort] = useState("추천순")
  const [photoOnly, setPhotoOnly] = useState(false)

  return (
    <div className="py-5">
      {/* Review Summary */}
      <div className="px-4 mb-6">
        <div className="flex gap-6 p-4 bg-gray-50 rounded-lg">
          {/* Average Rating */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-3xl font-bold text-foreground">4.6</span>
            </div>
            <span className="text-xs text-[#727171]">89,234개 리뷰</span>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-1">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-2">
                <span className="text-xs text-[#727171] w-8">{item.stars}점</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#f39800] rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
                <span className="text-xs text-[#727171] w-8">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 mb-4">
        {/* Skin Type Filter */}
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {skinTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedSkinType(type)}
              className={`flex-shrink-0 px-3 py-1.5 text-xs rounded-full border transition-colors ${
                selectedSkinType === type ? "bg-[#f39800] text-white border-[#f39800]" : "border-border text-[#727171]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Photo Filter & Sort */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setPhotoOnly(!photoOnly)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
              photoOnly ? "bg-[#f39800] text-white border-[#f39800]" : "border-border text-[#727171]"
            }`}
          >
            포토 리뷰만
          </button>

          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="text-xs text-[#727171] border-none bg-transparent focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Review List */}
      <div className="divide-y divide-border">
        {reviews.map((review) => (
          <div key={review.id} className="px-4 py-4">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">프로필</span>
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">{review.username}</div>
                <div className="flex gap-1 mt-0.5">
                  {review.skinTypes.map((type) => (
                    <span key={type} className="text-[10px] text-[#727171] bg-gray-100 px-1.5 py-0.5 rounded">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-sm text-foreground leading-relaxed mb-3">{review.text}</p>

            {/* Photo Thumbnails */}
            {review.hasPhoto && (
              <div className="flex gap-2 mb-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-[10px]">사진 {i}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Helpful & Date */}
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-1 text-xs text-[#727171]">
                <ThumbsUp className="w-4 h-4" />
                도움이 돼요 ({review.helpfulCount})
              </button>
              <span className="text-xs text-[#727171]">{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
