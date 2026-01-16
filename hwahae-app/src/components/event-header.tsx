import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart } from "lucide-react"

/**
 * 이벤트 페이지 헤더
 * Sticky 헤더 (top-[0], z-30)
 * 로고 + 검색 + 장바구니 아이콘
 */
export default function EventHeader() {
  return (
    <header className="sticky top-[0] z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 ml-0.5">
          <Image src="/logo2.png" alt="ABCPharm" width={29} height={29} />
          <span className="text-lg tracking-tight text-[#727171] leading-none">
            <span className="font-extrabold">ABC</span>
            <span className="font-light">Pharm</span>
          </span>
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <Link href="/search" className="p-1.5" aria-label="검색">
            <Search className="w-5 h-5 text-gray-700" />
          </Link>
          <Link href="/cart" className="p-1.5" aria-label="장바구니">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </Link>
        </div>
      </div>
    </header>
  )
}
