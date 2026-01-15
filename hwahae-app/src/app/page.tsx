import MainBannerSlider from "@/components/main-banner-slider"
import AwardsSection from "@/components/awards-section"
import TrendingRankings from "@/components/trending-rankings"
import CategoryRankings from "@/components/category-rankings"
import SkinTypeRankings from "@/components/skin-type-rankings"
import AgeGroupRecommendations from "@/components/age-group-recommendations"
import TrendingBrands from "@/components/trending-brands"
import BeautyRoutine from "@/components/beauty-routine"
import Footer from "@/components/footer"
import StickyHeader from "@/components/sticky-header"
import ScrollToTopButton from "@/components/scroll-to-top-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto max-w-[600px] bg-white min-h-screen shadow-[0_0_20px_rgba(0,0,0,0.1)] relative">
        <StickyHeader />

        <main className="pb-20">
          <MainBannerSlider />
          <AwardsSection />
          <TrendingRankings />
          <CategoryRankings />
          <SkinTypeRankings />
          <AgeGroupRecommendations />
          <TrendingBrands />
          <BeautyRoutine />
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  )
}
