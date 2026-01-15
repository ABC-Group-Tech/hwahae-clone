"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { categories } from "@/lib/categories"

interface CategorySelectorProps {
  selectedCategory: string
  selectedSubCategory: string
  onSelect: (categoryId: string, subCategoryId: string) => void
}

export default function CategorySelector({
  selectedCategory,
  selectedSubCategory,
  onSelect,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(selectedCategory)

  const currentCategory = categories.find((c) => c.id === selectedCategory)
  const displayText = currentCategory?.id === "all" ? "카테고리 전체" : currentCategory?.name || "카테고리 전체"

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "all") {
      onSelect("all", "all")
      setOpen(false)
    } else {
      setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
    }
  }

  const handleSubCategoryClick = (categoryId: string, subCategoryId: string) => {
    onSelect(categoryId, subCategoryId)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="px-4 py-2 text-sm font-medium bg-[#1a1a1a] text-white rounded-full flex items-center gap-1">
          {displayText}
          <ChevronDown className="w-4 h-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl bg-white px-0 pb-6 max-h-[80vh] overflow-y-auto [&>button]:hidden max-w-[600px] mx-auto left-0 right-0">
        {/* Handle bar */}
        <div className="flex justify-center pt-2 pb-1 sticky top-0 bg-white z-10">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Category list */}
        <div className="flex flex-col">
          {categories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center justify-between px-5 py-2.5 hover:bg-gray-50 transition-colors w-full ${
                  selectedCategory === category.id && category.id !== "all" ? "bg-gray-50" : ""
                }`}
              >
                <span
                  className={`text-sm ${
                    selectedCategory === category.id ? "text-[#f39800] font-medium" : "text-gray-900"
                  }`}
                >
                  {category.name}
                </span>
                {category.subCategories.length > 0 && category.id !== "all" && (
                  expandedCategory === category.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )
                )}
              </button>

              {/* Sub categories */}
              {expandedCategory === category.id && category.subCategories.length > 0 && (
                <div className="bg-gray-50 px-5 py-1.5">
                  <div className="flex flex-wrap gap-1.5">
                    {category.subCategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubCategoryClick(category.id, sub.id)}
                        className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                          selectedCategory === category.id && selectedSubCategory === sub.id
                            ? "bg-[#f39800] text-white"
                            : "bg-white text-gray-700 border border-gray-200"
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
