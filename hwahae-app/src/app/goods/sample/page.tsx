import { Suspense } from "react"
import GoodsDetailPageClient from "@/components/goods-detail/goods-detail-page-client"

export const metadata = {
  title: "[only화해] 다이브인 저분자 히알루론산 세럼 100ml 기획 | ABCPharm",
  description:
    "토리든 다이브인 저분자 히알루론산 세럼 100ml 기획 상품의 정보 및 후기/리뷰, 성분 그리고 가격을 확인하고 구매해 보세요",
}

export default function GoodsSamplePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoodsDetailPageClient />
    </Suspense>
  )
}
