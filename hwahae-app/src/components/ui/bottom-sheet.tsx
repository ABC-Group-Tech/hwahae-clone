"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [isClosing, setIsClosing] = useState(false)
  const startY = useRef(0)
  const lastY = useRef(0)
  const startTime = useRef(0)
  const lastTime = useRef(0)
  const velocity = useRef(0)
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setIsClosing(false)
      setDragY(0)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Rubber band 효과 - 위로 드래그할 때 저항
  const applyRubberBand = (deltaY: number): number => {
    if (deltaY < 0) {
      // 위로 드래그: 강한 저항 (iOS 스타일 rubber band)
      const resistance = 0.4
      const maxStretch = 50
      const stretch = Math.abs(deltaY) * resistance
      return -Math.min(stretch, maxStretch)
    }
    // 아래로 드래그: 1:1 반응
    return deltaY
  }

  const handleDragStart = useCallback((clientY: number) => {
    setIsDragging(true)
    startY.current = clientY
    lastY.current = clientY
    startTime.current = Date.now()
    lastTime.current = Date.now()
    velocity.current = 0
  }, [])

  const handleDragMove = useCallback((clientY: number) => {
    if (!isDragging) return

    const now = Date.now()
    const deltaTime = now - lastTime.current
    const deltaY = clientY - startY.current

    // 속도 계산 (최근 움직임 기준)
    if (deltaTime > 0) {
      const instantVelocity = (clientY - lastY.current) / deltaTime
      // 이동 평균으로 부드러운 속도 계산
      velocity.current = velocity.current * 0.5 + instantVelocity * 0.5
    }

    lastY.current = clientY
    lastTime.current = now

    // Rubber band 효과 적용
    const transformedY = applyRubberBand(deltaY)
    setDragY(transformedY)
  }, [isDragging])

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)

    // 닫기 조건
    // 1. 50px 이상 아래로 드래그
    // 2. 아래 방향 속도가 0.3 px/ms 이상
    const shouldClose = dragY > 50 || (dragY > 20 && velocity.current > 0.3)

    if (shouldClose) {
      setIsClosing(true)
      setTimeout(() => {
        onClose()
      }, 250)
    } else {
      // 부드럽게 원위치로
      setDragY(0)
    }
  }, [isDragging, dragY, onClose])

  // 전역 마우스 이벤트 (핸들 밖에서도 드래그 지속)
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY)
    }

    const handleMouseUp = () => {
      handleDragEnd()
    }

    const handleTouchMove = (e: TouchEvent) => {
      handleDragMove(e.touches[0].clientY)
    }

    const handleTouchEnd = () => {
      handleDragEnd()
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, handleDragMove, handleDragEnd])

  if (!isOpen) return null

  // 드래그 거리에 따른 오버레이 투명도 계산
  const overlayOpacity = isClosing ? 0 : Math.max(0, 1 - dragY / 300)

  return (
    <div className="fixed inset-0 z-[102]">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black max-w-[600px] mx-auto"
        onClick={onClose}
        style={{
          pointerEvents: "auto",
          opacity: overlayOpacity * 0.4,
          transition: isDragging ? "none" : "opacity 0.25s ease-out",
        }}
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-0 max-w-[600px] mx-auto pointer-events-none flex items-end">
        <div
          ref={sheetRef}
          className="relative w-full rounded-t-2xl bg-white pointer-events-auto"
          style={{
            maxHeight: "90vh",
            transform: isClosing
              ? `translate3d(0, 100%, 0)`
              : `translate3d(0, ${dragY}px, 0)`,
            transition: isDragging
              ? "none"
              : "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform",
          }}
        >
          {/* 위로 당길 때 아래 빈 공간 방지용 흰색 영역 */}
          <div className="absolute left-0 right-0 -bottom-[100px] h-[100px] bg-white" />
          {/* Drag Handle Area - 더 넓은 터치 영역 */}
          <div
            className="flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onMouseDown={(e) => {
              e.preventDefault()
              handleDragStart(e.clientY)
            }}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
            style={{ touchAction: "none" }}
          >
            <div className="pt-3 pb-4 px-20">
              <div className="h-1 w-10 rounded-full bg-gray-400" />
            </div>
          </div>

          {/* Content */}
          <div
            className="overflow-y-auto overscroll-contain"
            style={{ maxHeight: "calc(90vh - 60px)" }}
          >
            <div className="px-5 pb-8">
              <strong className="text-lg font-bold text-[#1a1a1a] block">{title}</strong>
              <div className="mt-4">{children}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 열릴 때 애니메이션 (CSS-in-JS 대신 인라인) */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translate3d(0, 100%, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  )
}
