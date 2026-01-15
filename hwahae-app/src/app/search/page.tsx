import { Suspense } from "react"
import SearchPageClient from "@/components/search/search-page-client"

export const metadata = {
  title: "검색 - ABCPharm",
  description: "ABCPharm에서 화장품을 검색해 보세요",
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto max-w-[600px] min-h-screen bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <Suspense fallback={null}>
          <SearchPageClient />
        </Suspense>
      </div>
    </div>
  )
}
