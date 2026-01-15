"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function ProductBottomBar() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] bg-white border-t border-border px-4 py-3 z-50">
      <div className="flex items-center gap-3">
        <Link
          href="/cart"
          className="flex-1 py-3 border border-border rounded-lg flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5 text-[#727171]" />
          <span className="text-sm font-medium text-[#727171]">장바구니</span>
        </Link>
        <button className="flex-1 py-3 bg-[#f39800] text-white font-bold rounded-lg">바로구매</button>
      </div>
    </div>
  )
}
