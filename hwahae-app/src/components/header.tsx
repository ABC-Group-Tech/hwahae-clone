"use client"

import { Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LanguageSelector from "@/components/language-selector"

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <Image src="/logo2.png" alt="ABCPharm" width={28} height={28} />
          <span className="text-2xl tracking-tight text-[#727171] leading-none">
            <span className="font-extrabold">ABC</span>
            <span className="font-light">Pharm</span>
          </span>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button className="relative" aria-label="장바구니">
            <ShoppingCart className="w-5 h-5 text-[#727171]" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3">
        <Link href="/search" className="block">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#727171]" />
            <div className="w-full h-10 pl-4 pr-11 rounded-3xl border border-[#e5e5e5] bg-[#f5f5f5] text-sm text-[#727171] flex items-center">
              궁금한 제품을 검색해 보세요
            </div>
          </div>
        </Link>
      </div>
    </header>
  )
}
