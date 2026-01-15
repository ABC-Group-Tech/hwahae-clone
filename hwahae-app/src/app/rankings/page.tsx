import { Suspense } from "react"
import RankingsPageClient from "@/components/rankings/rankings-page-client"

export default function RankingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RankingsPageClient />
    </Suspense>
  )
}
