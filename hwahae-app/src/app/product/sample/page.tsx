import { Suspense } from "react"
import ProductDetailPageClient from "@/components/product-detail/product-detail-page-client"

export const metadata = {
  title: "웰라쥬 리얼 히알루로닉 수딩 크림 | ABCPharm",
  description:
    "웰라쥬 리얼 히알루로닉 수딩 크림 상품의 정보 및 후기/리뷰, 성분 그리고 가격, 랭킹을 확인하고 구매해 보세요",
}

export default function ProductSamplePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailPageClient />
    </Suspense>
  )
}
