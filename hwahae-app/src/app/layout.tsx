import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import SideFloatingBanner from "@/components/side-floating-banner"
import "./globals.css"

export const metadata: Metadata = {
  title: "ABCPharm - 화장품 리뷰 플랫폼",
  description: "1,000만 사용자가 선택한 화장품 리뷰 플랫폼",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#f39800",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <SideFloatingBanner />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
