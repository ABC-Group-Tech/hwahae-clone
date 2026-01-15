"use client"

import { useState, useEffect } from "react"

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-[80px] left-[0] w-full pointer-events-none z-30">
      <div className="flex justify-end max-w-[600px] mx-auto">
        <button
          onClick={scrollToTop}
          className="flex justify-center items-center w-[38px] h-[38px] border border-gray-300 rounded-[50%] z-[100] mr-4 mb-[10px] bg-white/60 pointer-events-auto"
          aria-label="페이지 상단으로 이동"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            className="text-black"
          >
            <path
              fill="currentColor"
              d="m11.25 5.087-6 5.378a.75.75 0 0 1-1-1.116l6.582-5.902a1.75 1.75 0 0 1 2.336 0l6.583 5.902a.75.75 0 0 1-1.002 1.116L12.75 5.087V20.27A.74.74 0 0 1 12 21a.74.74 0 0 1-.75-.73z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
