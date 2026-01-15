"use client"

import { useState, useRef } from "react"
import { X, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function TermsPageClient() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const section1Ref = useRef<HTMLDivElement>(null)
  const section2Ref = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "section1" && section1Ref.current) {
      section1Ref.current.scrollIntoView({ behavior: "smooth" })
      setActiveSection("section1")
    } else if (sectionId === "section2" && section2Ref.current) {
      section2Ref.current.scrollIntoView({ behavior: "smooth" })
      setActiveSection("section2")
    }
  }

  const tableOfContents = [
    { id: "section1", title: "ABCPharm 이용약관" },
    { id: "section2", title: "ABCPharm 위치기반서비스 이용약관" },
  ]

  return (
    <div className="min-h-screen bg-[#F7F7F7]">

      <div className="max-w-[600px] mx-auto bg-white min-h-screen shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5]">
          <div className="flex items-center justify-between px-4 h-14">
            <Link href="/" className="p-2 -ml-2">
              <X className="w-6 h-6 text-foreground" />
            </Link>
            <h1 className="text-lg font-bold">이용약관</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Table of Contents */}
        <div className="px-4 py-6 border-b border-[#E5E5E5]">
          <h2 className="text-center text-sm font-medium text-gray-500 mb-4">{"< 목차 >"}</h2>
          <div className="space-y-3">
            {tableOfContents.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  activeSection === item.id
                    ? "border-[#f39800] bg-orange-50"
                    : "border-[#E5E5E5] hover:border-[#f39800]"
                }`}
              >
                <span className="text-sm text-gray-800">
                  {index + 1}. {item.title}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Terms Content */}
        <div className="px-4 py-6">
          {/* Section 1: ABCPharm 이용약관 */}
          <div ref={section1Ref} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">1. ABCPharm 이용약관</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">환영합니다!</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm 서비스를 이용해 주셔서 감사합니다. ABCPharm는 화장품의 성분을 분석하여 제품의 안전성, 기능성,
                  피부타입 관련 정보를 제공하고, 여러분이 직접 리뷰를 남기고 또 다른 사용자의 리뷰를 본 후 원하는 제품을
                  바로 구매까지 하실 수 있도록 지원하고 있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">
                  화장품, 피부 건강과 뷰티 라이프에 관한 다양한 서비스로 여러분을 찾아갑니다.
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  ABCPharm가 제공하는 서비스에 대해 안내드립니다:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>각종 브랜드의 화장품 전성분을 공신력 있는 기관 및 출처를 기반으로 분석한 결과</li>
                  <li>화장품 제조 시 배합되는 성분들의 개별 정보를 검색을 통해 알아볼 수 있는 서비스</li>
                  <li>화장품 리뷰 작성 및 조회 서비스</li>
                  <li>뷰티, 건강에 관한 각종 콘텐츠 및 정보</li>
                  <li>화장품 마켓 플레이스로서 정보의 중개서비스 또는 통신판매중개시스템 서비스</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">ABCPharm 계정을 이용하실 수 있습니다.</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm 서비스를 이용하기 위해서는 ABCPharm 계정이 필요합니다. ABCPharm 계정은 회원가입 시 생성되며,
                  이메일 또는 소셜 로그인을 통해 간편하게 가입하실 수 있습니다. 계정을 통해 리뷰 작성, 찜하기, 구매 등
                  다양한 서비스를 이용하실 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">이것만은 꼭 주의해서 이용해 주세요!</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  ABCPharm 서비스 이용 시 다음 사항을 주의해 주세요:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>타인의 권리를 침해하거나 불법적인 행위를 하지 마세요.</li>
                  <li>허위 정보를 등록하거나 타인을 사칭하지 마세요.</li>
                  <li>서비스의 정상적인 운영을 방해하지 마세요.</li>
                  <li>다른 사용자에게 불쾌감을 주는 콘텐츠를 게시하지 마세요.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">
                  여러분의 소중한 개인정보를 튼튼하게 보호합니다.
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm는 여러분의 개인정보를 소중히 여기며, 관련 법령에 따라 안전하게 보호합니다. 개인정보 처리에
                  관한 자세한 내용은 개인정보 처리방침을 확인해 주세요.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">
                  예기치 못한 사정으로 때로는 중단될 수도 있습니다.
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm는 안정적인 서비스 제공을 위해 최선을 다하고 있으나, 시스템 점검, 장애, 천재지변 등의 사유로
                  서비스가 일시 중단될 수 있습니다. 이 경우 사전 공지를 원칙으로 하나, 긴급한 경우 사후 공지할 수
                  있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">ABCPharm가 모든 것을 보증하는 것은 아닙니다.</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm는 정보 제공 플랫폼으로서, 사용자가 등록한 리뷰나 판매자가 제공한 정보의 정확성을 완벽하게
                  보증하지 않습니다. 제품 구매 시에는 공식 정보를 추가로 확인하시기 바랍니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">
                  ABCPharm는 리뷰 정보를 사용 및 관리할 수 있습니다.
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  여러분이 작성한 리뷰는 ABCPharm 서비스 내에서 다른 사용자에게 공유되며, 서비스 개선 및 마케팅 목적으로
                  활용될 수 있습니다. 부적절한 리뷰는 사전 통지 없이 삭제될 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">
                  ABCPharm는 정보를 사용, 제공하거나 광고를 게재할 수 있습니다.
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm는 서비스 운영을 위해 광고를 게재할 수 있으며, 여러분의 서비스 이용 정보를 바탕으로 맞춤형
                  광고를 제공할 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">
                  ABCPharm는 여러분과 화장품 판매자 간 거래의 장을 만들어 주는 중개자입니다.
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm는 통신판매중개자로서 여러분과 판매자 간 거래를 중개합니다. 상품의 주문, 배송, 환불 등에 관한
                  책임은 각 판매자에게 있으며, ABCPharm는 거래 당사자가 아닙니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">ABCPharm는 포인트를 지급할 수 있습니다.</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm는 리뷰 작성, 이벤트 참여 등의 활동에 대해 포인트를 지급할 수 있습니다. 포인트는 상품 구매 시
                  현금처럼 사용할 수 있으며, 유효기간이 있을 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">ABCPharm는 쿠폰을 발급할 수 있습니다.</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm는 다양한 이벤트 및 프로모션을 통해 할인 쿠폰을 발급할 수 있습니다. 쿠폰은 발급 조건과 사용
                  조건에 따라 사용이 제한될 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">ABCPharm의 잘못은 ABCPharm가 책임집니다.</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm의 고의 또는 과실로 인해 여러분에게 손해가 발생한 경우, ABCPharm는 관련 법령에 따라 책임을
                  부담합니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">약관을 수정할 수도 있습니다.</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ABCPharm는 필요한 경우 본 약관을 수정할 수 있습니다. 약관이 변경되는 경우 시행일 7일 전부터 서비스
                  내에서 공지합니다. 변경된 약관에 동의하지 않으시면 서비스 이용을 중단하실 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">덧붙여서...</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  본 약관은 대한민국 법률에 따라 해석되며, ABCPharm 서비스와 관련된 분쟁은 서울중앙지방법원을 관할
                  법원으로 합니다.
                </p>
              </div>
            </div>

            {/* Effective Date */}
            <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
              <p className="text-sm text-gray-600">공고일자 : 2024년 01월 15일</p>
              <p className="text-sm text-gray-600">시행일자 : 2024년 01월 22일</p>
              <button className="mt-4 px-4 py-2 border border-gray-400 rounded text-sm text-gray-700 hover:bg-gray-50">
                이전 이용 약관 보기
              </button>
            </div>
          </div>

          {/* Section 2: 위치기반서비스 이용약관 */}
          <div ref={section2Ref} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">2. ABCPharm 위치기반서비스 이용약관</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">제1조 (목적)</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  본 약관은 (주)ABCPharm(이하 "회사"라 합니다)가 제공하는 위치기반서비스에 관하여 회사와
                  개인위치정보주체 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">제2조 (이용약관의 효력 및 변경)</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ① 본 약관은 서비스를 신청한 고객 또는 개인위치정보주체가 본 약관에 동의하고 회사가 정한 소정의 절차에
                  따라 서비스의 이용자로 등록함으로써 효력이 발생합니다.
                  <br />
                  <br />② 회사는 법률이나 서비스의 변경사항을 반영하기 위한 목적 등으로 약관을 수정할 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">제3조 (서비스의 내용)</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  회사가 제공하는 위치기반서비스는 아래와 같습니다:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>위치정보를 활용한 주변 매장 검색</li>
                  <li>위치기반 맞춤형 서비스 및 광고 제공</li>
                  <li>위치정보를 활용한 이벤트 참여 기능</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">제4조 (서비스 이용요금)</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  회사가 제공하는 위치기반서비스는 무료입니다. 단, 무선 서비스 이용 시 발생하는 데이터 통신료는
                  별도이며, 이용자가 가입한 각 이동통신사의 정책에 따릅니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">제5조 (개인위치정보의 이용 또는 제공)</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  회사는 개인위치정보를 이용하여 서비스를 제공하고자 하는 경우에는 미리 이용약관에 명시한 후
                  개인위치정보주체의 동의를 얻어야 합니다. 회사는 개인위치정보를 개인위치정보주체가 지정하는 제3자에게
                  제공하는 경우에는 개인위치정보를 수집한 당해 통신 단말장치로 매회 개인위치정보주체에게 제공받는 자,
                  제공일시 및 제공목적을 즉시 통보합니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">제6조 (개인위치정보주체의 권리 및 행사방법)</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  ① 개인위치정보주체는 개인위치정보의 이용·제공 목적, 제공받는 자의 범위 및 위치기반서비스의 일부에
                  대하여 동의를 유보할 수 있습니다.
                  <br />
                  <br />② 개인위치정보주체는 언제든지 개인위치정보의 이용·제공에 대한 동의의 전부 또는 일부를 철회할 수
                  있습니다.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">제7조 (손해배상)</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  회사가 위치정보의 보호 및 이용 등에 관한 법률 제15조 내지 제26조의 규정을 위반한 행위로
                  개인위치정보주체에게 손해를 입힌 경우, 개인위치정보주체는 회사에 대하여 손해배상을 청구할 수 있습니다.
                </p>
              </div>
            </div>

            {/* Effective Date */}
            <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
              <p className="text-sm text-gray-600">공고일자 : 2024년 01월 15일</p>
              <p className="text-sm text-gray-600">시행일자 : 2024년 01월 22일</p>
              <button className="mt-4 px-4 py-2 border border-gray-400 rounded text-sm text-gray-700 hover:bg-gray-50">
                이전 이용 약관 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
