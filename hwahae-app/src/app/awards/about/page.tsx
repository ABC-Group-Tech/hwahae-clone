import { Suspense } from "react"
import AwardsAboutPageClient from "@/components/awards/awards-about-page-client"

export const metadata = {
  title: "화해 어워드",
  description: "화해 어워드를 소개합니다",
}

export default function AwardsAboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AwardsAboutPageClient />
    </Suspense>
  )
}
