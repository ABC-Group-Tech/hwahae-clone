"use client"

import { useEffect, useRef, useState } from "react"

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
  const currentY = useRef(0)
  const startTime = useRef(0)

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

  const handleDragStart = (clientY: number) => {
    setIsDragging(true)
    startY.current = clientY
    currentY.current = clientY
    startTime.current = Date.now()
  }

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return

    currentY.current = clientY
    const deltaY = clientY - startY.current

    // 아래로만 드래그 가능 (양수 값만)
    if (deltaY > 0) {
      setDragY(deltaY)
    }
  }

  const handleDragEnd = () => {
    if (!isDragging) return

    setIsDragging(false)

    // 드래그 속도(velocity) 계산
    const deltaTime = Date.now() - startTime.current
    const velocity = dragY / deltaTime // px/ms

    // 조건 1: 50px 이상 드래그 (기존 100px에서 50px로 완화)
    // 조건 2: 빠르게 스와이프 (0.5 px/ms 이상)
    const shouldClose = dragY > 50 || velocity > 0.5

    if (shouldClose) {
      setIsClosing(true)
      setTimeout(() => {
        onClose()
      }, 300) // 애니메이션 시간과 동일
    } else {
      // 원위치로 돌아가기
      setDragY(0)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[102]">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 max-w-[600px] mx-auto transition-opacity duration-300"
        onClick={onClose}
        style={{
          pointerEvents: "auto",
          opacity: isClosing ? 0 : 1,
        }}
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-0 max-w-[600px] mx-auto pointer-events-none flex items-end">
        <div
          className={`relative w-full rounded-t-2xl bg-white pointer-events-auto ${!isDragging && !isClosing ? "transition-transform duration-300" : ""} ${!isClosing && dragY === 0 ? "animate-slide-up" : ""}`}
          style={{
            maxHeight: "90vh",
            transform: isClosing ? `translate3d(0, 100%, 0)` : `translate3d(0, ${dragY}px, 0)`,
          }}
        >
          {/* Drag Handle */}
          <div
            className="flex flex-col flex-shrink-0 items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onMouseDown={(e) => handleDragStart(e.clientY)}
            onMouseMove={(e) => handleDragMove(e.clientY)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
            onTouchEnd={handleDragEnd}
          >
            <div className="pt-3 pb-4">
              <div className="h-1 w-10 rounded-full bg-gray-400" />
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-scroll" style={{ maxHeight: "calc(90vh - 60px)" }}>
            <div className="px-5 pb-6">
              <strong className="text-lg font-bold text-[#1a1a1a] block">{title}</strong>
              <div className="mt-4">{children}</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translate3d(0, 100%, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
