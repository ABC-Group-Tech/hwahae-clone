"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Share2, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function ProductHeader() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${hasScrolled ? "shadow-sm" : ""}`}>
      <div className="flex items-center justify-between px-4 h-14">
        <Link href="/" className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-2">
            <Share2 className="w-6 h-6 text-foreground" />
          </button>
          <Link href="/cart" className="p-2 -mr-2">
            <ShoppingCart className="w-6 h-6 text-foreground" />
          </Link>
        </div>
      </div>
    </header>
  )
}
