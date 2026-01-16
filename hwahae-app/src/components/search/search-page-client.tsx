"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Search, X, ChevronRight, Grid, List, Star, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

// Dummy data
const popularSearchTerms = [
  { term: "토리든 세럼", trend: "up" },
  { term: "선크림", trend: "up" },
  { term: "클렌징폼", trend: "down" },
  { term: "아누아 패드", trend: "new" },
  { term: "비타민C", trend: "up" },
  { term: "시카크림", trend: "down" },
  { term: "레티놀", trend: "new" },
  { term: "토너패드", trend: "up" },
  { term: "마스크팩", trend: "down" },
  { term: "립밤", trend: "up" },
]

const initialRecentSearches = ["히알루론산", "민감성 토너", "여드름 세럼", "선크림 추천"]

const purchaseRankings = [
  { id: 1, brand: "토리든", name: "다이브인 저분자 히알루론산 세럼", price: 18900, originalPrice: 23000 },
  { id: 2, brand: "아누아", name: "어성초 77 토너 패드", price: 19800, originalPrice: null },
  { id: 3, brand: "라운드랩", name: "자작나무 수분 선크림", price: 16900, originalPrice: 21000 },
  { id: 4, brand: "코스알엑스", name: "어드밴스드 스네일 92 올인원 크림", price: 15200, originalPrice: null },
  { id: 5, brand: "닥터지", name: "레드 블레미쉬 클리어 수딩 크림", price: 22500, originalPrice: 28000 },
]

const searchResults = [
  {
    id: 1,
    brand: "토리든",
    name: "다이브인 저분자 히알루론산 세럼",
    rating: 4.6,
    reviews: 12453,
    price: 18900,
    originalPrice: 23000,
  },
  {
    id: 2,
    brand: "토리든",
    name: "다이브인 세럼 스킨 부스터",
    rating: 4.5,
    reviews: 8234,
    price: 21900,
    originalPrice: null,
  },
  {
    id: 3,
    brand: "토리든",
    name: "다이브인 저분자 히알루론산 토너",
    rating: 4.4,
    reviews: 9876,
    price: 16900,
    originalPrice: 20000,
  },
  {
    id: 4,
    brand: "토리든",
    name: "발란스풀 시카 미셀라 클렌징 워터",
    rating: 4.3,
    reviews: 5432,
    price: 14900,
    originalPrice: null,
  },
  {
    id: 5,
    brand: "토리든",
    name: "다이브인 저분자 히알루론산 수분크림",
    rating: 4.5,
    reviews: 7654,
    price: 24900,
    originalPrice: 29000,
  },
  {
    id: 6,
    brand: "토리든",
    name: "솔리드인 세라마이드 립밤",
    rating: 4.2,
    reviews: 3210,
    price: 9900,
    originalPrice: null,
  },
]

const brandResults = [
  { id: 1, name: "토리든", productCount: 47 },
  { id: 2, name: "토리든 랩", productCount: 12 },
]

type Tab = "전체" | "제품" | "브랜드" | "성분"
type SortOption = "관련순" | "리뷰순" | "평점순" | "가격 낮은순" | "가격 높은순"
type ViewMode = "grid" | "list"

export default function SearchPageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState(initialRecentSearches)
  const [activeTab, setActiveTab] = useState<Tab>("전체")
  const [sortOption, setSortOption] = useState<SortOption>("관련순")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setIsSearching(true)
      if (!recentSearches.includes(query)) {
        setRecentSearches((prev) => [query, ...prev].slice(0, 10))
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearching(false)
    inputRef.current?.focus()
  }

  const removeRecentSearch = (term: string) => {
    setRecentSearches((prev) => prev.filter((t) => t !== term))
  }

  const clearAllRecentSearches = () => {
    setRecentSearches([])
  }

  const handlePopularTermClick = (term: string) => {
    setSearchQuery(term)
    handleSearch(term)
  }

  const tabs: Tab[] = ["전체", "제품", "브랜드", "성분"]
  const sortOptions: SortOption[] = ["관련순", "리뷰순", "평점순", "가격 낮은순", "가격 높은순"]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Search Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link href="/" className="p-1 -ml-1">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </Link>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="궁금한 제품을 검색해 보세요"
              className="w-full h-11 pl-4 pr-11 rounded-3xl bg-[#F5F5F5] text-sm placeholder:text-[#727171] focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-[#727171] rounded-full"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            ) : (
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#727171]" />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {!isSearching ? (
          /* Default State */
          <div className="px-4 py-4">
            {/* Recent Searches */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-foreground">최근 검색어</h2>
                {recentSearches.length > 0 && (
                  <button onClick={clearAllRecentSearches} className="text-sm text-[#727171]">
                    전체 삭제
                  </button>
                )}
              </div>
              {recentSearches.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <div key={term} className="flex items-center gap-1 px-3 py-1.5 bg-[#F5F5F5] rounded-full">
                      <button onClick={() => handlePopularTermClick(term)} className="text-sm text-foreground">
                        {term}
                      </button>
                      <button onClick={() => removeRecentSearch(term)} className="p-0.5">
                        <X className="w-3.5 h-3.5 text-[#727171]" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#727171]">최근 검색어가 없습니다</p>
              )}
            </section>

            {/* Popular Searches */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-foreground">인기 검색어</h2>
                <span className="text-xs text-[#727171]">00:00 기준</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {popularSearchTerms.map((item, index) => (
                  <button
                    key={item.term}
                    onClick={() => handlePopularTermClick(item.term)}
                    className="flex items-center gap-2 text-left"
                  >
                    <span className={`w-5 text-sm font-bold ${index < 3 ? "text-[#f39800]" : "text-[#727171]"}`}>
                      {index + 1}
                    </span>
                    <span className="text-sm text-foreground truncate flex-1">{item.term}</span>
                    {item.trend === "up" && <TrendingUp className="w-3 h-3 text-red-500" />}
                    {item.trend === "down" && <TrendingDown className="w-3 h-3 text-blue-500" />}
                    {item.trend === "new" && (
                      <span className="text-[10px] font-bold text-[#f39800] bg-[#fff5e6] px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Real-time Purchase Rankings */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-foreground">실시간 구매 랭킹</h2>
                <Link href="/rankings" className="flex items-center text-sm text-[#727171]">
                  더보기 <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {purchaseRankings.map((product, index) => (
                  <Link key={product.id} href={`/products/sample`} className="flex items-center gap-3">
                    <span className={`w-5 text-sm font-bold ${index < 3 ? "text-[#f39800]" : "text-[#727171]"}`}>
                      {index + 1}
                    </span>
                    <div className="w-[50px] h-[50px] bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-gray-400">IMG</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#727171]">{product.brand}</p>
                      <p className="text-sm text-foreground truncate">{product.name}</p>
                      <div className="flex items-center gap-2">
                        {product.originalPrice && (
                          <span className="text-xs text-[#727171] line-through">
                            {product.originalPrice.toLocaleString()}원
                          </span>
                        )}
                        <span
                          className={`text-sm font-bold ${
                            product.originalPrice ? "text-[#f39800]" : "text-foreground"
                          }`}
                        >
                          {product.price.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* Search Results State */
          <div>
            {/* Results Header */}
            <div className="px-4 py-3 border-b border-[#E5E5E5]">
              <p className="text-sm text-[#727171]">
                <span className="font-bold text-foreground">"{searchQuery}"</span> 검색 결과{" "}
                <span className="text-[#f39800]">{searchResults.length + brandResults.length}개</span>
              </p>
            </div>

            {/* Tab Filters */}
            <div className="flex border-b border-[#E5E5E5]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-medium relative ${
                    activeTab === tab ? "text-foreground" : "text-[#727171]"
                  }`}
                >
                  {tab}
                  {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f39800]" />}
                </button>
              ))}
            </div>

            {/* Sort & View Options */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-1 text-sm text-[#727171]"
                >
                  {sortOption}
                  <ChevronRight className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-90" : ""}`} />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-[#E5E5E5] rounded-lg shadow-lg z-10">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortOption(option)
                          setShowSortDropdown(false)
                        }}
                        className={`block w-full px-4 py-2 text-sm text-left hover:bg-[#F5F5F5] ${
                          sortOption === option ? "text-[#f39800] font-medium" : "text-foreground"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded ${viewMode === "grid" ? "bg-[#F5F5F5]" : ""}`}
                >
                  <Grid className={`w-5 h-5 ${viewMode === "grid" ? "text-foreground" : "text-[#727171]"}`} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded ${viewMode === "list" ? "bg-[#F5F5F5]" : ""}`}
                >
                  <List className={`w-5 h-5 ${viewMode === "list" ? "text-foreground" : "text-[#727171]"}`} />
                </button>
              </div>
            </div>

            {/* Brand Results (if on 전체 or 브랜드 tab) */}
            {(activeTab === "전체" || activeTab === "브랜드") && brandResults.length > 0 && (
              <div className="px-4 mb-4">
                <h3 className="text-sm font-bold text-foreground mb-3">브랜드</h3>
                <div className="space-y-2">
                  {brandResults.map((brand) => (
                    <Link
                      key={brand.id}
                      href="#"
                      className="flex items-center gap-3 p-3 bg-[#F5F5F5] rounded-lg"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-[10px] text-gray-400">LOGO</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{brand.name}</p>
                        <p className="text-xs text-[#727171]">{brand.productCount}개 제품</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#727171]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Product Results */}
            {(activeTab === "전체" || activeTab === "제품") && (
              <div className="px-4">
                {activeTab === "전체" && brandResults.length > 0 && (
                  <h3 className="text-sm font-bold text-foreground mb-3">제품</h3>
                )}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 gap-3">
                    {searchResults.map((product) => (
                      <Link key={product.id} href={`/products/sample`} className="block">
                        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                          <span className="text-xs text-gray-400">IMAGE</span>
                        </div>
                        <p className="text-xs text-[#727171] mb-0.5">{product.brand}</p>
                        <p className="text-sm text-foreground line-clamp-2 mb-1">{product.name}</p>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-3 h-3 fill-[#f39800] text-[#f39800]" />
                          <span className="text-xs font-medium text-foreground">{product.rating}</span>
                          <span className="text-xs text-[#727171]">({product.reviews.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {product.originalPrice && (
                            <span className="text-xs text-[#727171] line-through">
                              {product.originalPrice.toLocaleString()}원
                            </span>
                          )}
                          <span
                            className={`text-sm font-bold ${
                              product.originalPrice ? "text-[#f39800]" : "text-foreground"
                            }`}
                          >
                            {product.price.toLocaleString()}원
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map((product) => (
                      <Link key={product.id} href={`/products/sample`} className="flex gap-3">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-xs text-gray-400">IMAGE</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#727171] mb-0.5">{product.brand}</p>
                          <p className="text-sm text-foreground line-clamp-2 mb-1">{product.name}</p>
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-3 h-3 fill-[#f39800] text-[#f39800]" />
                            <span className="text-xs font-medium text-foreground">{product.rating}</span>
                            <span className="text-xs text-[#727171]">({product.reviews.toLocaleString()})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {product.originalPrice && (
                              <span className="text-xs text-[#727171] line-through">
                                {product.originalPrice.toLocaleString()}원
                              </span>
                            )}
                            <span
                              className={`text-sm font-bold ${
                                product.originalPrice ? "text-[#f39800]" : "text-foreground"
                              }`}
                            >
                              {product.price.toLocaleString()}원
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* No Results State (placeholder - would show when results are empty) */}
            {searchResults.length === 0 && brandResults.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-[#727171]" />
                </div>
                <p className="text-base font-medium text-foreground mb-1">검색 결과가 없습니다</p>
                <p className="text-sm text-[#727171]">다른 검색어를 입력해 보세요</p>
              </div>
            )}

            {/* Bottom padding */}
            <div className="h-8" />
          </div>
        )}
      </main>
    </div>
  )
}
