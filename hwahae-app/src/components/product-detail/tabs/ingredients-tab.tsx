"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

const ingredients = [
  { name: "정제수", nameEn: "Water", grade: 1, color: "bg-green-500" },
  { name: "히알루론산", nameEn: "Hyaluronic Acid", grade: 1, color: "bg-green-500" },
  { name: "글리세린", nameEn: "Glycerin", grade: 2, color: "bg-green-500" },
  { name: "부틸렌글라이콜", nameEn: "Butylene Glycol", grade: 3, color: "bg-yellow-500" },
  { name: "나이아신아마이드", nameEn: "Niacinamide", grade: 1, color: "bg-green-500" },
  { name: "판테놀", nameEn: "Panthenol", grade: 1, color: "bg-green-500" },
  { name: "알란토인", nameEn: "Allantoin", grade: 1, color: "bg-green-500" },
  { name: "카보머", nameEn: "Carbomer", grade: 2, color: "bg-green-500" },
]

export default function IngredientsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const filteredIngredients = ingredients.filter(
    (ing) => ing.name.includes(searchTerm) || ing.nameEn.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="px-4 py-5">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#727171]" />
        <input
          type="text"
          placeholder="성분 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-[#f39800]"
        />
      </div>

      {/* Ingredient List */}
      <div className="space-y-0">
        {filteredIngredients.map((ingredient, index) => (
          <div key={index} className="border-b border-border">
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${ingredient.color}`} />
                <div className="text-left">
                  <span className="text-sm text-foreground">{ingredient.name}</span>
                  <span className="text-xs text-[#727171] ml-2">{ingredient.nameEn}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#727171]">EWG {ingredient.grade}등급</span>
                {expandedIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-[#727171]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#727171]" />
                )}
              </div>
            </button>
            {expandedIndex === index && (
              <div className="pb-4 text-sm text-[#727171]">
                <p>피부 보습 및 진정에 도움을 주는 성분입니다.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
