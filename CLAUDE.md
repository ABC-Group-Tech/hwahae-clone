# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

화해(Hwahae) 클론 프로젝트 - 화장품 리뷰 및 랭킹 플랫폼

**프로젝트 위치**: `hwahae-app/` 디렉토리

## Development Commands

All commands should be run from the `hwahae-app/` directory:

```bash
# 개발 서버 실행 (http://localhost:3000)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트 검사
pnpm lint
```

**중요**: 이 프로젝트는 `pnpm`을 패키지 매니저로 사용합니다.

## Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Analytics**: Vercel Analytics

### Directory Structure

```
hwahae-app/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   │   ├── layout.tsx    # 루트 레이아웃 (Vercel Analytics 포함)
│   │   ├── page.tsx      # 홈 페이지
│   │   ├── auth/         # 인증 관련 페이지
│   │   ├── awards/       # 어워즈 페이지
│   │   ├── cart/         # 장바구니
│   │   ├── curator/[id]/ # 큐레이터 상세 (동적 라우팅)
│   │   ├── event/[id]/   # 이벤트 상세 (동적 라우팅)
│   │   ├── product/[id]/ # 상품 상세 (동적 라우팅)
│   │   ├── rankings/     # 랭킹 페이지
│   │   ├── routines/     # 루틴 페이지
│   │   ├── search/       # 검색 페이지
│   │   └── terms/        # 약관 페이지
│   │
│   ├── components/       # 컴포넌트 (페이지별 디렉토리 구조)
│   │   ├── auth/
│   │   ├── awards/
│   │   ├── cart/
│   │   ├── curator/
│   │   ├── event/
│   │   ├── product-detail/
│   │   ├── rankings/
│   │   ├── routines/
│   │   ├── search/
│   │   ├── terms/
│   │   ├── ui/           # Radix UI 기반 공통 UI 컴포넌트
│   │   └── *.tsx         # 공통 컴포넌트 (header, footer 등)
│   │
│   └── lib/              # 유틸리티 및 상수
│       ├── categories.ts # 카테고리 정의 (Category, SubCategory 타입)
│       └── utils.ts      # 유틸리티 함수
│
├── public/               # 정적 파일 (이미지, 아이콘)
└── next.config.ts        # Next.js 설정 (이미지 도메인 설정 포함)
```

### Component Architecture

**페이지 컴포넌트 패턴**:
- Server Component: `src/app/[route]/page.tsx`
- Client Component: `src/components/[route]/[route]-page-client.tsx`

예시:
```tsx
// src/app/rankings/page.tsx (Server Component)
import { Suspense } from "react"
import RankingsPageClient from "@/components/rankings/rankings-page-client"

export default function RankingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RankingsPageClient />
    </Suspense>
  )
}
```

**중요**: `useSearchParams()` 등 클라이언트 훅을 사용하는 컴포넌트는 반드시 `<Suspense>`로 감싸야 합니다.

### Data Structure

**카테고리 시스템** (`src/lib/categories.ts`):
```typescript
interface SubCategory {
  id: string
  name: string
}

interface Category {
  id: string
  name: string
  subCategories: SubCategory[]
}
```

14개 메인 카테고리:
- 스킨케어, 클렌징/필링, 마스크/팩, 선케어
- 베이스메이크업, 아이메이크업, 립메이크업
- 바디, 헤어, 네일, 향수
- 이너뷰티, 베이비&맘, 남성

**속성 태그**: `["전체", "수분", "진정", "보습", "모공", "브라이트닝", "안티에이징", "트러블"]`

### Routing & Navigation

**URL Query Parameters**:
랭킹 페이지는 다음 쿼리 파라미터를 사용:
- `tab`: 메인 탭 (급상승, 카테고리별, 브랜드)
- `category`: 카테고리 ID
- `subcategory`: 서브카테고리 ID
- `attribute`: 속성 태그

예시: `/rankings?tab=급상승&category=skincare&subcategory=toner&attribute=수분`

### Image Configuration

허용된 외부 이미지 도메인 (`next.config.ts`):
- `img.hwahae.co.kr`

### Styling

**Theme Color**: `#f39800` (브랜드 오렌지)

**주요 색상 팔레트**:
- Text Primary: `#1a1a1a`
- Text Secondary: `#727171`
- Background: `#F7F7F7`
- Border: `#E5E5E5`, `#F5F5F5`
- Accent: `#f39800`

**포인트 색상 규칙**:
- 강조하거나 포인트를 주어야 하는 텍스트는 `text-[#f39800]` 클래스를 사용
- 예시: 랭킹 번호, 브랜드 강조, 중요 레이블 등

**모바일 우선 디자인**:
- 최대 너비: `600px` (데스크톱에서 중앙 정렬)
- 그림자: `shadow-[0_0_20px_rgba(0,0,0,0.1)]`

### Tailwind vs 화해 디자인 시스템 차이

화해 웹사이트는 커스텀 디자인 시스템을 사용하며, 클래스명의 숫자가 실제 픽셀 값을 의미합니다.
Tailwind CSS는 4px 기반 스케일을 사용하므로 변환이 필요합니다.

**중요**: 화해 HTML을 참고할 때 클래스명을 그대로 사용하지 말고, 실제 픽셀 값으로 변환하여 적용해야 합니다.

| 화해 클래스 | 실제 크기 | Tailwind 클래스 | Tailwind 크기 |
|------------|---------|---------------|-------------|
| `p-16` | 16px | `p-4` | 16px |
| `p-4` | 4px | `p-1` | 4px |
| `mt-8` | 8px | `mt-2` | 8px |
| `mt-20` | 20px | `mt-5` | 20px |
| `gap-4` | 4px | `gap-1` | 4px |
| `gap-x-10` | 10px | `gap-x-2.5` | 10px |
| `gap-y-12` | 12px | `gap-y-3` | 12px |
| `pt-20` | 20px | `pt-5` | 20px |
| `w-60` | 60px | `w-[60px]` | 60px (직접 지정) |
| `rounded-16` | 16px | `rounded-2xl` | 16px |

**변환 공식**:
- 화해 값이 4의 배수: `tailwind_value = hwahae_value / 4`
  - 예: 화해 `p-16` (16px) → Tailwind `p-4` (16px)
- 화해 값이 4의 배수가 아님: `w-[Xpx]` 형태로 직접 지정
  - 예: 화해 `w-60` (60px) → Tailwind `w-[60px]`

**실제 적용 예시** (awards 페이지):
```tsx
// ❌ 잘못된 예 - 화해 클래스를 그대로 사용
<ul className="grid grid-cols-2 gap-x-10 gap-y-12 pt-20">  // 40px, 48px, 80px
<div className="p-16">  // 64px

// ✅ 올바른 예 - 실제 픽셀 값으로 변환
<ul className="grid grid-cols-2 gap-x-2.5 gap-y-3 pt-5">  // 10px, 12px, 20px
<div className="p-4">  // 16px
```

## Important Patterns

### Path Alias

TypeScript 경로 별칭: `@/*` → `./src/*`

```typescript
import Header from "@/components/header"
import { categories } from "@/lib/categories"
```

### Client Components

`"use client"` 디렉티브가 필요한 경우:
- React 훅 사용 (`useState`, `useEffect`, `useSearchParams` 등)
- 브라우저 API 사용 (`IntersectionObserver`, `localStorage` 등)
- 이벤트 핸들러 (`onClick`, `onChange` 등)

### Dynamic Routes

동적 라우팅 파일명 규칙:
- `[id]/page.tsx`: 단일 파라미터
- 타입 정의: `{ params: { id: string } }`

### Suspense Boundaries

Next.js 16에서 다음 훅을 사용하는 컴포넌트는 반드시 Suspense로 감싸야 함:
- `useSearchParams()`
- `usePathname()`
- `useRouter()` (특정 경우)

## Common Issues

### Build Error: Missing Suspense Boundary

**증상**: `useSearchParams() should be wrapped in a suspense boundary`

**해결**: Server Component에서 Client Component를 렌더링할 때 `<Suspense>`로 감싸기

```tsx
import { Suspense } from "react"

<Suspense fallback={<div>Loading...</div>}>
  <ClientComponent />
</Suspense>
```

### Image Loading

외부 이미지를 사용할 경우 `next.config.ts`의 `remotePatterns`에 도메인 추가 필요

## Brand & Naming

- **브랜드명**: ABCPharm (일부 코드에서 "화해" 참조)
- **메타데이터**: "화장품 리뷰 플랫폼"
- **언어**: 한국어 (lang="ko")
