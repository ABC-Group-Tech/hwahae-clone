"use client"

import { Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProductDetailHeader() {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <Image src="/logo2.png" alt="ABCPharm" width={28} height={28} />
          <h1 className="text-2xl tracking-tight text-[#727171] leading-none">
            <span className="font-extrabold">ABC</span>
            <span className="font-light">Pharm</span>
          </h1>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <Link href="/search" aria-label="검색">
            <Search className="w-5 h-5 text-[#727171]" />
          </Link>
          <Link href="/cart" aria-label="장바구니">
            <ShoppingCart className="w-5 h-5 text-[#727171]" />
          </Link>
        </div>
      </div>
    </div>
  )
}
