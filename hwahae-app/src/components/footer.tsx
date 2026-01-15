"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, Youtube, Instagram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const [isBusinessInfoOpen, setIsBusinessInfoOpen] = useState(false)

  const businessInfo = [
    { label: "상호명", value: "(주)ABCPharm" },
    { label: "대표자", value: "홍길동" },
    { label: "주소", value: "서울시 강남구 테헤란로 123, 10층 (역삼동, ABC빌딩)" },
    { label: "고객센터", value: "1234-5678" },
    { label: "고객센터 운영시간", value: "평일 09:30~18:00 (점심 12:30~13:30)" },
    { label: "사업자등록번호", value: "123-45-67890" },
    { label: "전자우편", value: "cs@abcpharm.co.kr" },
    { label: "입점문의", value: "business@abcpharm.co.kr" },
    { label: "통신판매업신고", value: "제 2024-서울강남-0001 호" },
  ]

  return (
    <footer className="bg-white py-12 px-6">
      {/* Header Section - Logo and Business Info Button */}
      <div className="flex flex-row items-center justify-center gap-3 mb-5">
        <div className="flex items-center gap-1.5">
          <Image src="/logo2.png" alt="ABCPharm" width={24} height={24} />
          <span className="text-lg tracking-tight text-[#727171] leading-none">
            <span className="font-extrabold">ABC</span>
            <span className="font-light">Pharm</span>
          </span>
        </div>
        <button
          onClick={() => setIsBusinessInfoOpen(!isBusinessInfoOpen)}
          className="flex items-center gap-1 text-xs text-gray-600"
        >
          사업자 정보
          {isBusinessInfoOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Company Information Table */}
      {isBusinessInfoOpen && (
        <div className="mb-6 space-y-3 bg-[#F7F7F7] p-4 rounded-lg">
          {businessInfo.map((item, index) => (
            <div key={index} className="flex gap-4">
              <span className="text-sm font-medium text-gray-600 min-w-[120px] shrink-0">{item.label}</span>
              <span className="text-sm text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Link Groups */}
      <div className="flex flex-col items-center mt-3 gap-2">
        <div className="flex items-center gap-0 text-xs text-gray-600">
          <button className="hover:underline">사업자정보확인</button>
          <span className="mx-2">·</span>
          <Link href="/terms" className="hover:underline">
            이용약관
          </Link>
          <span className="mx-2">·</span>
          <button className="hover:underline font-medium">개인정보 처리방침</button>
        </div>
        <div className="flex items-center gap-0 text-xs text-gray-600">
          <button className="hover:underline">1:1 문의</button>
          <span className="mx-2">·</span>
          <button className="hover:underline">ABCPharm 비즈니스</button>
          <span className="mx-2">·</span>
          <button className="hover:underline">광고/제휴문의</button>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mt-5 mb-5">
        <button aria-label="YouTube" className="w-9 h-9 rounded-full bg-[#D1D5DB] flex items-center justify-center">
          <Youtube className="w-5 h-5 text-gray-700" />
        </button>
        <button aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#D1D5DB] flex items-center justify-center">
          <Instagram className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Legal Notice */}
      <p className="text-xs text-gray-600 text-center mt-5 mb-5 leading-relaxed px-2">
        (주)ABCPharm는 결제정보의 중개서비스 또는 통신판매중개시스템의 제공자로서, 통신판매의 당사자가 아니며 제공
        정보의 오류로 인해 발생하는 모든 손해 및 상품의 주문, 배송 및 환불 등과 관련한 의무와 책임은 각 판매자에게
        있습니다.
      </p>

      {/* Copyright */}
      <p className="text-xs text-gray-600 text-center mt-5 mb-5">© ABCPharm Inc. All Rights Reserved.</p>

      {/* Login Link */}
      <div className="flex justify-center mt-5">
        <Link href="/auth/login" className="px-2 py-1.5 border border-gray-400 rounded text-xs text-gray-700 hover:bg-gray-50">
          로그인
        </Link>
      </div>
    </footer>
  )
}
