"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { HelpCircle, MessageCircle } from "lucide-react"

export default function LoginPageClient() {
  const [isLoading, setIsLoading] = useState(false)

  const handleKakaoLogin = () => {
    setIsLoading(true)
    // Kakao OAuth redirect
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleNaverLogin = () => {
    // Naver OAuth redirect
  }

  const handleGoogleLogin = () => {
    // Google OAuth redirect
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto min-h-screen bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-1.5">
            <Image src="/logo2.png" alt="ABCPharm" width={28} height={28} />
            <span className="text-xl tracking-tight text-[#727171] leading-none">
              <span className="font-extrabold">ABC</span>
              <span className="font-light">Pharm</span>
            </span>
          </Link>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="도움말"
          >
            <HelpCircle className="w-5 h-5 text-[#727171]" />
          </button>
        </header>

        {/* Main Content */}
        <main className="px-6 pt-16 pb-10">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">기초부터 이너뷰티까지</h1>
            <p className="text-xl font-semibold text-[#1a1a1a]">새로운 뷰티의 발견</p>
          </div>

          {/* Promotional Banner */}
          <div className="bg-[#F7F7F7] rounded-lg py-3 px-4 mb-8 text-center">
            <p className="text-sm text-[#1a1a1a]">
              ⚡️ 3초만에 로그인하고 <span className="underline font-medium">할인가로 구매하기</span>
            </p>
          </div>

          {/* Kakao Login Button */}
          <button
            onClick={handleKakaoLogin}
            disabled={isLoading}
            className="w-full h-[52px] bg-[#FEE500] rounded-lg flex items-center justify-center gap-2 mb-4 hover:bg-[#F5DC00] transition-colors disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#3C1E1E] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <MessageCircle className="w-5 h-5 text-[#3C1E1E]" />
                <span className="text-[#3C1E1E] font-medium">카카오로 시작하기</span>
              </>
            )}
          </button>

          {/* Secondary Social Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {/* Naver Button */}
            <button
              onClick={handleNaverLogin}
              className="w-12 h-12 bg-[#03C75A] rounded-lg flex items-center justify-center hover:bg-[#02B350] transition-colors"
              aria-label="네이버로 로그인"
            >
              <span className="text-white font-bold text-lg">N</span>
            </button>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="구글로 로그인"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
          </div>

          {/* Email Options */}
          <div className="flex justify-center items-center gap-3 text-sm text-[#727171]">
            <Link href="/auth/signup" className="hover:underline">
              이메일 회원가입
            </Link>
            <span>|</span>
            <Link href="/auth/signin/email" className="hover:underline">
              이메일 로그인
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
