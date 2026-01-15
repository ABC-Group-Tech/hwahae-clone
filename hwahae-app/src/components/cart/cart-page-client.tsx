"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Info, X, Minus, Plus, ShoppingBag } from "lucide-react"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"

interface CartItem {
  id: string
  sellerId: string
  sellerName: string
  name: string
  price: number
  originalPrice: number
  discountPercent: number
  quantity: number
  isOutOfStock: boolean
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    sellerId: "ybk",
    sellerName: "YBK",
    name: "YBK포어 풀 커버 데일리 썬스크린 [SPF50+/PA++++]",
    price: 35000,
    originalPrice: 70000,
    discountPercent: 50,
    quantity: 1,
    isOutOfStock: true,
  },
  {
    id: "2",
    sellerId: "torriden",
    sellerName: "토리든",
    name: "다이브인 저분자 히알루론산 세럼",
    price: 19600,
    originalPrice: 28000,
    discountPercent: 30,
    quantity: 2,
    isOutOfStock: false,
  },
]

export default function CartPageClient() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  // Group items by seller
  const groupedItems = cartItems.reduce(
    (acc, item) => {
      if (!acc[item.sellerId]) {
        acc[item.sellerId] = {
          sellerName: item.sellerName,
          items: [],
        }
      }
      acc[item.sellerId].items.push(item)
      return acc
    },
    {} as Record<string, { sellerName: string; items: CartItem[] }>,
  )

  const isAllSelected = cartItems.length > 0 && selectedItems.size === cartItems.length

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(cartItems.map((item) => item.id)))
    }
  }

  const toggleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId)
    } else {
      newSelected.add(itemId)
    }
    setSelectedItems(newSelected)
  }

  const deleteItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
    const newSelected = new Set(selectedItems)
    newSelected.delete(itemId)
    setSelectedItems(newSelected)
  }

  const deleteSelectedItems = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.has(item.id)))
    setSelectedItems(new Set())
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  // Calculate totals for selected items only
  const selectedCartItems = cartItems.filter((item) => selectedItems.has(item.id) && !item.isOutOfStock)
  const totalProductAmount = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = 0 // Free shipping
  const totalPayment = totalProductAmount + shippingFee

  const formatPrice = (price: number) => {
    return price.toLocaleString("ko-KR") + "원"
  }

  // Calculate per-seller totals
  const getSellerTotals = (sellerId: string) => {
    const sellerItems = groupedItems[sellerId].items.filter((item) => selectedItems.has(item.id) && !item.isOutOfStock)
    const productAmount = sellerItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { productAmount, shippingFee: 0 }
  }

  const isEmpty = cartItems.length === 0

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="max-w-[600px] mx-auto bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] min-h-screen relative">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
          <div className="flex items-center justify-center h-14 px-4 relative">
            <Link href="/" className="absolute left-4 flex items-center gap-1.5">
              <Image src="/logo2.png" alt="ABCPharm" width={24} height={24} />
              <span className="text-lg tracking-tight text-[#727171] leading-none">
                <span className="font-extrabold">ABC</span>
                <span className="font-light">Pharm</span>
              </span>
            </Link>
            <h1 className="text-base font-semibold">장바구니</h1>
          </div>
        </header>

        {isEmpty ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-[150px] h-[150px] bg-gray-200 rounded-lg flex items-center justify-center mb-6">
              <ShoppingBag className="w-16 h-16 text-gray-400" />
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-2">장바구니가 비어있어요</p>
            <p className="text-sm text-gray-500 mb-6">관심있는 상품을 담아보세요</p>
            <Link href="/" className="px-8 py-3 bg-[#f39800] text-white font-semibold rounded-lg">
              쇼핑하러 가기
            </Link>
          </div>
        ) : (
          <>
            {/* Info Banner */}
            <div className="bg-[#E0F7FA] px-4 py-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#00ACC1] shrink-0" />
              <p className="text-sm text-gray-700">
                장바구니에 담은 상품은 최대 <span className="font-bold">30일</span>간 저장돼요
              </p>
            </div>

            {/* Cart Actions Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <button onClick={toggleSelectAll} className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    isAllSelected ? "bg-[#f39800] border-[#f39800]" : "border-gray-300"
                  }`}
                >
                  {isAllSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">상품 전체 선택</span>
              </button>
              <button
                onClick={deleteSelectedItems}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600"
                disabled={selectedItems.size === 0}
              >
                선택 삭제
              </button>
            </div>

            {/* Cart Items Grouped by Seller */}
            <div className="divide-y divide-gray-100">
              {Object.entries(groupedItems).map(([sellerId, group]) => {
                const sellerTotals = getSellerTotals(sellerId)
                return (
                  <div key={sellerId}>
                    {/* Seller Header */}
                    <div className="bg-[#F9F9F9] px-4 py-2.5">
                      <span className="text-sm font-semibold text-gray-800">{group.sellerName} 공식몰</span>
                    </div>

                    {/* Items */}
                    {group.items.map((item) => (
                      <div key={item.id} className="px-4 py-4 border-b border-gray-50">
                        <div className="flex gap-3">
                          {/* Checkbox */}
                          <button onClick={() => toggleSelectItem(item.id)} className="shrink-0 mt-1">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                selectedItems.has(item.id) ? "bg-[#f39800] border-[#f39800]" : "border-gray-300"
                              }`}
                            >
                              {selectedItems.has(item.id) && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                          </button>

                          {/* Product Image */}
                          <Link href={`/product/${item.id}`} className="relative shrink-0">
                            <div className="w-[60px] h-[60px] bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-[10px] text-gray-400">이미지</span>
                            </div>
                            {item.isOutOfStock && (
                              <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                                <span className="text-white text-[10px] font-medium">일시품절</span>
                              </div>
                            )}
                          </Link>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={`/product/${item.id}`}
                                className="text-sm text-gray-900 line-clamp-2 hover:underline"
                              >
                                {item.name}
                              </Link>
                              <button onClick={() => deleteItem(item.id)} className="shrink-0 p-1">
                                <X className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>

                            {/* Quantity & Price Row */}
                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity Selector */}
                              <div className="flex items-center border border-gray-200 rounded">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-7 h-7 flex items-center justify-center"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-3 h-3 text-gray-500" />
                                </button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-7 h-7 flex items-center justify-center"
                                >
                                  <Plus className="w-3 h-3 text-gray-500" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-[#f39800]">{item.discountPercent}%</span>
                                <span className="text-sm font-bold text-gray-900">{formatPrice(item.price)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Per-Seller Summary */}
                    <div className="bg-[#FAFAFA] px-4 py-3 space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">상품금액</span>
                        <span className="text-gray-900">
                          {sellerTotals.productAmount > 0 ? formatPrice(sellerTotals.productAmount) : "0원"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">배송비</span>
                        <span className="text-gray-900">무료</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Final Payment Section */}
            <div className="px-4 py-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">최종 결제 금액</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">총 상품 금액</span>
                    <span className="text-gray-900">{formatPrice(totalProductAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">배송비</span>
                    <span className="text-gray-900">무료</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">결제 예상 금액</span>
                    <span className="text-lg font-bold text-gray-900">{formatPrice(totalPayment)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="px-4 pb-6">
              {selectedCartItems.length === 0 ? (
                <button disabled className="w-full py-4 bg-[#CCCCCC] text-white font-semibold rounded-lg">
                  주문할 상품을 선택해주세요
                </button>
              ) : (
                <button className="w-full py-4 bg-[#f39800] text-white font-semibold rounded-lg">
                  {selectedCartItems.length}개 상품 주문하기
                </button>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <Footer />

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>

      {/* Side Floating Banner (Desktop Only) */}
    </div>
  )
}
