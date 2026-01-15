"use client"

import { MessageCircleQuestion, ChevronRight } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "민감한 피부에도 사용 가능한가요?",
    answerCount: 3,
    date: "2024.01.14",
  },
  {
    id: 2,
    question: "유통기한은 어떻게 되나요?",
    answerCount: 1,
    date: "2024.01.13",
  },
  {
    id: 3,
    question: "다른 세럼이랑 같이 사용해도 되나요?",
    answerCount: 5,
    date: "2024.01.10",
  },
  {
    id: 4,
    question: "아침/저녁 언제 사용하는게 좋을까요?",
    answerCount: 2,
    date: "2024.01.08",
  },
]

export default function QnaTab() {
  return (
    <div className="py-5">
      {/* Question List */}
      <div className="divide-y divide-border">
        {questions.map((q) => (
          <button key={q.id} className="w-full px-4 py-4 flex items-start gap-3 text-left">
            <span className="flex-shrink-0 px-2 py-1 bg-[#f39800] text-white text-xs font-bold rounded">Q</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground line-clamp-2 mb-1">{q.question}</p>
              <div className="flex items-center gap-2 text-xs text-[#727171]">
                <span>답변 {q.answerCount}</span>
                <span>•</span>
                <span>{q.date}</span>
              </div>
            </div>
            <ChevronRight className="flex-shrink-0 w-5 h-5 text-[#727171]" />
          </button>
        ))}
      </div>

      {/* Ask Question Button */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[600px] px-4">
        <button className="w-full py-3 bg-foreground text-white font-bold rounded-lg flex items-center justify-center gap-2">
          <MessageCircleQuestion className="w-5 h-5" />
          질문하기
        </button>
      </div>
    </div>
  )
}
