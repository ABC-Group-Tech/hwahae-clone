"use client"

import AwardsHeaderExtended from "@/components/awards-header-extended"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"
import Image from "next/image"

const aboutImages = [
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929536831.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929544239.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929518857.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929535678.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929566756.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929531218.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929523767.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929544277.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929573259.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929554504.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929554763.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929570040.jpg",
  "https://img.hwahae.co.kr/award_v2/115/banner_content/20251119_085929539388.jpg",
]

export default function AwardsAboutPageClient() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <AwardsHeaderExtended />

        <main>
          {aboutImages.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt="Introducing Hwahae award"
                className="w-full h-auto"
              />
            </div>
          ))}
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  )
}
