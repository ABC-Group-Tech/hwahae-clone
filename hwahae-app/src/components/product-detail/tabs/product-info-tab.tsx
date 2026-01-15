"use client"

export default function ProductInfoTab() {
  return (
    <div className="px-4 py-5">
      {/* Product Description */}
      <section className="mb-8">
        <p className="text-sm text-foreground leading-relaxed">
          피부 깊숙이 수분을 전달하는 저분자 히알루론산 세럼입니다. 끈적임 없이 빠르게 흡수되어 촉촉한 피부를
          만들어줍니다. 민감한 피부도 안심하고 사용할 수 있는 저자극 포뮬러입니다.
        </p>
      </section>

      {/* Ingredient Safety */}
      <section className="mb-8">
        <h3 className="text-base font-bold text-foreground mb-4">성분 안전도</h3>
        <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-sm text-foreground">1-2등급 (안전)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <span className="text-sm text-foreground">3-6등급 (보통)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-sm text-foreground">7-10등급 (주의)</span>
          </div>
        </div>
        <p className="text-xs text-[#727171] mt-2">*EWG 등급 기준</p>
      </section>

      {/* How to Use */}
      <section className="mb-8">
        <h3 className="text-base font-bold text-foreground mb-4">사용법</h3>
        <ol className="space-y-3 text-sm text-foreground">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-[#f39800] text-white rounded-full flex items-center justify-center text-xs font-bold">
              1
            </span>
            <span>세안 후 토너로 피부결을 정돈합니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-[#f39800] text-white rounded-full flex items-center justify-center text-xs font-bold">
              2
            </span>
            <span>적당량을 덜어 얼굴 전체에 부드럽게 펴 바릅니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-[#f39800] text-white rounded-full flex items-center justify-center text-xs font-bold">
              3
            </span>
            <span>가볍게 두드려 흡수시킵니다.</span>
          </li>
        </ol>
      </section>

      {/* Cautions */}
      <section>
        <h3 className="text-base font-bold text-foreground mb-4">주의사항</h3>
        <ul className="space-y-2 text-sm text-[#727171]">
          <li>
            • 화장품 사용 시 또는 사용 후 직사광선에 의하여 사용부위가 붉은 반점, 부어오름 또는 가려움증 등의 이상
            증상이나 부작용이 있는 경우 전문의 등과 상담하십시오.
          </li>
          <li>• 상처가 있는 부위 등에는 사용을 자제하십시오.</li>
          <li>• 어린이의 손이 닿지 않는 곳에 보관하십시오.</li>
        </ul>
      </section>
    </div>
  )
}
