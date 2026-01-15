# v0 프롬프트: ABCPharm 웹사이트

> 화해(hwahae.co.kr) 벤치마킹 기반 뷰티/헬스 플랫폼 제작용

## 사용 방법

### 1. v0에서 새 프로젝트 시작

1. [v0.dev](https://v0.dev)에 접속
2. 원하는 페이지의 `.txt` 파일 내용 전체를 복사
3. v0 프롬프트 입력창에 붙여넣기
4. 생성 완료 후 "Add to Codebase" 클릭

### 2. 페이지별 프롬프트 파일

| 파일명 | 페이지 | 설명 |
|--------|--------|------|
| `v0-prompt-home.txt` | 홈 | 메인 페이지 (배너, 랭킹 섹션 등) |
| `v0-prompt-rankings.txt` | 랭킹 | 카테고리별 제품 랭킹 |
| `v0-prompt-awards.txt` | 어워드 | 어워드 홈 + 명예의전당 + 효능/효과 |
| `v0-prompt-product-detail.txt` | 제품상세 | 제품 정보, 성분, 리뷰 |
| `v0-prompt-search.txt` | 검색 | 검색 결과 + 필터 |
| `v0-prompt-login.txt` | 로그인 | 소셜 로그인 (카카오, 네이버, 구글) |
| `v0-prompt-cart.txt` | 장바구니 | 상품 목록 + 결제 정보 |
| `v0-prompt-beauty-routines.txt` | 뷰티루틴 | 큐레이터 + 루틴 카드 |
| `v0-prompt-event-detail.txt` | 이벤트상세 | 이벤트 배너 + 상품 목록 |
| `v0-prompt-terms.txt` | 이용약관 | 약관 내용 + 목차 |

### 3. 권장 작업 순서

```
✅ 1. v0-prompt-home.txt
   → 메인 페이지 (핵심 컴포넌트 생성: Header, Footer, ProductCard)
   → 모든 페이지의 기본 토대

🎯 2. v0-prompt-product-detail.txt
   → 제품 상세 페이지 (가장 중요한 페이지)
   → 홈에서 제품 클릭 시 이동
   → ReviewCard, IngredientCard 등 신규 컴포넌트 추가

📊 3. v0-prompt-rankings.txt
   → 랭킹 페이지
   → 홈의 랭킹 섹션 확장판
   → ProductCard 재사용, 필터 기능 추가

🔍 4. v0-prompt-search.txt
   → 검색 페이지
   → 헤더 검색바와 연결
   → ProductCard + 필터 재사용

🏆 5. v0-prompt-awards.txt
   → 어워드 페이지 (홈/명예의전당/효능효과)
   → 홈의 어워드 섹션과 연결
   → 카드 레이아웃 재사용

💄 6. v0-prompt-beauty-routines.txt
   → 뷰티루틴 + 큐레이터 페이지
   → 홈의 루틴 섹션과 연결
   → CuratorCard 신규 컴포넌트

🎁 7. v0-prompt-event-detail.txt
   → 이벤트 상세 페이지
   → 홈 배너 클릭 시 이동
   → ProductCard 재사용

🛒 8. v0-prompt-cart.txt
   → 장바구니 페이지
   → 헤더 장바구니 아이콘과 연결
   → 인증 필요 (로그인 후 작업 권장)

🔐 9. v0-prompt-login.txt
   → 로그인 페이지
   → 장바구니, 리뷰 작성 등에서 필요
   → 소셜 로그인 UI

📄 10. v0-prompt-terms.txt
   → 이용약관 페이지
   → 푸터 링크와 연결
   → 마지막 작업 권장
```

**진행 팁:**
- 각 페이지 완성 후 다음 단계로 진행
- 컴포넌트 재사용을 위해 순서 준수 권장
- 홈 → 제품상세 → 랭킹까지는 필수 핵심 페이지

### 4. 추가 수정 프롬프트 예시

v0에서 생성된 결과물을 수정할 때 사용:

**헤더만 수정:**
```
ABCPharm 웹사이트의 헤더를 수정해주세요:
- 주황색(#f39800) 앱 다운로드 배너 (닫기 가능)
- "ABCPharm" 로고 (주황색)
- 언어선택 + 장바구니 아이콘
```

**제품 카드만 수정:**
```
제품 카드 컴포넌트를 수정해주세요:
- 순위 뱃지 (숫자 + 변동 화살표)
- 브랜드명 (회색 #727171)
- 제품명 (검정, 2줄 말줄임)
- 별점 + 리뷰수
```

---

## 브랜딩 정보

| 항목 | 값 |
|------|-----|
| 회사명 | ABCPharm |
| Primary Color | `#f39800` (주황) |
| Secondary Text | `#727171` (회색) |
| Background | `#FFFFFF` (흰색) |
| Border | `#E5E5E5` |

## 기술 스택

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Lucide React icons

## 디자인 규칙

- Mobile-first design (max-width: 480px, centered)
- Font: Pretendard or system-ui
- 모든 이미지는 placeholder 사용 (`bg-gray-200` + 텍스트 라벨)
- 모든 UI 텍스트는 한글(Korean)

---

## 참고: 화해 원본 URL

| 페이지 | URL |
|--------|-----|
| 홈 | https://www.hwahae.co.kr/ |
| 랭킹 | https://www.hwahae.co.kr/rankings |
| 어워드 홈 | https://www.hwahae.co.kr/awards/home/2025 |
| 명예의전당 | https://www.hwahae.co.kr/awards/195 |
| 효능/효과 어워드 | https://www.hwahae.co.kr/awards/198 |
| 제품상세 | https://www.hwahae.co.kr/goods/54413 |
| 검색 | https://www.hwahae.co.kr/search |
| 뷰티루틴 | https://www.hwahae.co.kr/beauty-routines |
| 큐레이터 | https://www.hwahae.co.kr/curators/1423 |
| 장바구니 | https://www.hwahae.co.kr/cart |
| 로그인 | https://www.hwahae.co.kr/auth/signin |
| 이벤트상세 | https://www.hwahae.co.kr/deal-event/2029 |
| 이용약관 | https://www.hwahae.co.kr/terms/terms-of-use |

---

## 스크린샷

`.playwright-mcp/` 폴더에 캡처된 화해 페이지 스크린샷 참고:
- `hwahae-home.png`, `hwahae-rankings.png`, `hwahae-awards-home.png` 등
