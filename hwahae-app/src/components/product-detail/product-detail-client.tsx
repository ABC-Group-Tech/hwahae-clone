"use client"

import { useState } from "react"
import ProductHeader from "./product-header"
import ProductImageGallery from "./product-image-gallery"
import ProductInfo from "./product-info"
import ProductTabs from "./product-tabs"
import ProductBottomBar from "./product-bottom-bar"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"

export default function ProductDetailClient() {
  const [activeTab, setActiveTab] = useState("info")

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="mx-auto max-w-[600px] bg-white min-h-screen shadow-[0_0_20px_rgba(0,0,0,0.1)] relative">
        <ProductHeader />
        <ProductImageGallery />
        <ProductInfo />
        <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="pb-20">
          <Footer />
        </div>
        <ProductBottomBar />
        <ScrollToTopButton />
      </div>
    </div>
  )
}
