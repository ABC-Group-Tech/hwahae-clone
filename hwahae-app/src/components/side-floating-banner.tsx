"use client"

import Image from "next/image"

export default function SideFloatingBanner() {
  return (
    <div className="max-md:hidden fixed flex flex-col items-center w-[183px] right-1/2 translate-x-1/2 bottom-[100px] mr-[480px] text-center">
      {/* Logo */}
      <Image src="/logo2.png" alt="ABCPharm" width={60} height={60} />

      <span className="text-lg font-bold mt-2 text-gray-900">새로운 뷰티의 발견</span>

      <span className="text-sm mt-2 text-gray-600">
        지금, ABCPharm 앱에서
        <br />
        리뷰 확인부터 무료 체험 신청,
        <br />
        포인트 혜택까지 받아보세요!
      </span>

      {/* QR Code Box */}
      <div className="flex items-center justify-center mt-5 w-[120px] h-[120px] rounded-2xl bg-white shadow-md">
        <Image src="/hwahae-qr.png" alt="화해 QR 코드" width={88} height={88} className="rounded" />
      </div>
    </div>
  )
}
