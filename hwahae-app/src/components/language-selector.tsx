"use client"

import { useState } from "react"
import { Globe, Check } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const languages = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "简体中文" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "es", label: "Español" },
]

interface LanguageSelectorProps {
  showLabel?: boolean
}

export default function LanguageSelector({ showLabel = true }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("ko")
  const [open, setOpen] = useState(false)

  const currentLanguage = languages.find((l) => l.code === selectedLanguage)

  const handleSelect = (code: string) => {
    setSelectedLanguage(code)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-1 text-sm text-[#727171]">
          <Globe className="w-4 h-4 shrink-0" />
          {showLabel && <span className="whitespace-nowrap">{currentLanguage?.label}</span>}
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl bg-white px-0 pb-6 max-h-[80vh] overflow-y-auto [&>button]:hidden max-w-[600px] mx-auto left-0 right-0">
        <SheetTitle className="sr-only">언어 선택</SheetTitle>

        {/* Handle bar */}
        <div className="flex justify-center pt-2 pb-1 sticky top-0 bg-white z-10">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Language list */}
        <div className="flex flex-col">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleSelect(language.code)}
              className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-50 transition-colors w-full"
            >
              <span
                className={`text-sm ${
                  selectedLanguage === language.code ? "text-[#f39800] font-medium" : "text-gray-900"
                }`}
              >
                {language.label}
              </span>
              {selectedLanguage === language.code && <Check className="w-4 h-4 text-[#f39800]" />}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
