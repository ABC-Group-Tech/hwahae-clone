"use client"

import ProductInfoTab from "./tabs/product-info-tab"
import IngredientsTab from "./tabs/ingredients-tab"
import ReviewsTab from "./tabs/reviews-tab"
import QnaTab from "./tabs/qna-tab"

interface ProductTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const tabs = [
  { id: "info", label: "제품정보" },
  { id: "ingredients", label: "성분" },
  { id: "reviews", label: "리뷰" },
  { id: "qna", label: "Q&A" },
]

export default function ProductTabs({ activeTab, setActiveTab }: ProductTabsProps) {
  return (
    <div className="bg-white">
      {/* Tab Navigation */}
      <div className="sticky top-14 z-40 bg-white border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium relative ${
                activeTab === tab.id ? "text-foreground" : "text-[#727171]"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f39800]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pb-24">
        {activeTab === "info" && <ProductInfoTab />}
        {activeTab === "ingredients" && <IngredientsTab />}
        {activeTab === "reviews" && <ReviewsTab />}
        {activeTab === "qna" && <QnaTab />}
      </div>
    </div>
  )
}
