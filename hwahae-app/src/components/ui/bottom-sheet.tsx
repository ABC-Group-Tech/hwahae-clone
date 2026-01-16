"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[102]">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 max-w-[600px] mx-auto"
        onClick={onClose}
        style={{ pointerEvents: "auto" }}
      />

      {/* Bottom Sheet */}
      <div className="fixed inset-0 max-w-[600px] mx-auto pointer-events-none flex items-end">
        <div
          className="relative w-full rounded-t-2xl bg-white pointer-events-auto animate-slide-up"
          style={{ maxHeight: "90vh" }}
        >
          {/* Drag Handle */}
          <div className="flex flex-col flex-shrink-0 items-center justify-center touch-none cursor-grab">
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
