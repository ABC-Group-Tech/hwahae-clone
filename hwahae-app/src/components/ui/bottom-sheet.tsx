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
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const startY = useRef(0)
  const lastY = useRef(0)
  const startTime = useRef(0)
  const lastTime = useRef(0)
  const velocity = useRef(0)
  const sheetRef = useRef<HTMLDivElement>(null)

  // 열림/닫힘 처리
  useEffect(() => {
    if (isOpen) {
      // 열기: 먼저 visible 상태로 만들고, 다음 프레임에서 애니메이션 시작
      setIsVisible(true)
      setIsClosing(false)
      setDragY(0)
      document.body.style.overflow = "hidden"
      // 다음 프레임에서 애니메이션 시작
      requestAnimationFrame(() => {
        setIsAnimating(true)
      })
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // 닫힘 애니메이션 핸들러
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
      onClose()
    }, 300) // 애니메이션 시간
  }, [onClose])

  // Rubber band 효과 - 위로 드래그할 때 저항
  const applyRubberBand = (deltaY: number): number => {
    if (deltaY < 0) {
      const resistance = 0.4
      const maxStretch = 50
      const stretch = Math.abs(deltaY) * resistance
      return -Math.min(stretch, maxStretch)
    }
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

    if (deltaTime > 0) {
      const instantVelocity = (clientY - lastY.current) / deltaTime
      velocity.current = velocity.current * 0.5 + instantVelocity * 0.5
    }

    lastY.current = clientY
    lastTime.current = now

    const transformedY = applyRubberBand(deltaY)
    setDragY(transformedY)
  }, [isDragging])

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return

    setIsDragging(false)

    const shouldClose = dragY > 50 || (dragY > 20 && velocity.current > 0.3)

    if (shouldClose) {
      handleClose()
    } else {
      setDragY(0)
    }
  }, [isDragging, dragY, handleClose])

  // 전역 마우스 이벤트
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

  // 렌더링하지 않음
  if (!isVisible) return null

  // 오버레이 투명도 계산
  const overlayOpacity = isClosing ? 0 : isAnimating ? Math.max(0, 1 - dragY / 300) : 0

  // 바텀시트 위치 계산
  const getTransform = () => {
    if (isClosing) {
      return "translate3d(0, 100%, 0)"
    }
    if (!isAnimating) {
      return "translate3d(0, 100%, 0)"
    }
    return `translate3d(0, ${dragY}px, 0)`
  }

  return (
    <div className="fixed inset-0 z-[102]">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black max-w-[600px] mx-auto"
        onClick={handleClose}
        style={{
          pointerEvents: "auto",
          opacity: overlayOpacity * 0.4,
          transition: isDragging ? "none" : "opacity 0.3s ease-out",
        }}
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-0 max-w-[600px] mx-auto pointer-events-none flex items-end">
        <div
          ref={sheetRef}
          className="relative w-full rounded-t-2xl bg-white pointer-events-auto"
          style={{
            maxHeight: "90vh",
            transform: getTransform(),
            transition: isDragging
              ? "none"
              : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
            willChange: "transform",
          }}
        >
          {/* 위로 당길 때 아래 빈 공간 방지용 흰색 영역 */}
          <div className="absolute left-0 right-0 -bottom-[100px] h-[100px] bg-white" />

          {/* Drag Handle Area */}
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
    </div>
  )
}
