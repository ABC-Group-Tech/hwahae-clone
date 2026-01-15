"use client"

import { useState } from "react"

const tabs = ["홈", "랭킹", "어워드"]

export default function NavigationTabs() {
  const [activeTab, setActiveTab] = useState("홈")

  return (
    <nav className="flex border-b border-[#e5e5e5]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-3 text-sm font-bold relative ${
            activeTab === tab ? "text-[#1a1a1a]" : "text-[#727171]"
          }`}
        >
          {tab}
          {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f39800]" />}
        </button>
      ))}
    </nav>
  )
}
