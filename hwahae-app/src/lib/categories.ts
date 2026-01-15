export interface SubCategory {
  id: string
  name: string
}

export interface Category {
  id: string
  name: string
  subCategories: SubCategory[]
}

export const categories: Category[] = [
  {
    id: "all",
    name: "전체",
    subCategories: [],
  },
  {
    id: "skincare",
    name: "스킨케어",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "toner", name: "스킨/토너" },
      { id: "lotion", name: "로션/에멀전" },
      { id: "essence", name: "에센스/앰플/세럼" },
      { id: "face-oil", name: "페이스오일" },
      { id: "cream", name: "크림" },
      { id: "eye-care", name: "아이케어" },
      { id: "mist", name: "미스트" },
      { id: "gel", name: "젤" },
      { id: "toner-pad", name: "스킨/토너 패드" },
      { id: "balm", name: "밤/멀티밤" },
    ],
  },
  {
    id: "cleansing",
    name: "클렌징/필링",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "foam", name: "폼 클렌저" },
      { id: "gel", name: "젤 클렌저" },
      { id: "oil", name: "오일 클렌저" },
      { id: "water", name: "클렌징 워터" },
      { id: "peeling", name: "필링" },
    ],
  },
  {
    id: "mask",
    name: "마스크/팩",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "sheet", name: "시트마스크" },
      { id: "partial", name: "부분마스크/팩" },
      { id: "wash-off", name: "워시오프 팩" },
      { id: "peel-off", name: "필오프 팩" },
      { id: "sleeping", name: "슬리핑 팩" },
    ],
  },
  {
    id: "suncare",
    name: "선케어",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "sunscreen", name: "선크림" },
      { id: "sun-stick", name: "선스틱" },
      { id: "sun-spray", name: "선스프레이" },
    ],
  },
  {
    id: "base-makeup",
    name: "베이스메이크업",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "primer", name: "프라이머" },
      { id: "foundation", name: "파운데이션" },
      { id: "cushion", name: "쿠션" },
      { id: "concealer", name: "컨실러" },
      { id: "powder", name: "파우더" },
    ],
  },
  {
    id: "eye-makeup",
    name: "아이메이크업",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "eyeshadow", name: "아이섀도우" },
      { id: "eyeliner", name: "아이라이너" },
      { id: "mascara", name: "마스카라" },
      { id: "eyebrow", name: "아이브로우" },
    ],
  },
  {
    id: "lip-makeup",
    name: "립메이크업",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "lipstick", name: "립스틱" },
      { id: "lip-gloss", name: "립글로스" },
      { id: "lip-tint", name: "립틴트" },
      { id: "lip-balm", name: "립밤" },
    ],
  },
  {
    id: "body",
    name: "바디",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "body-lotion", name: "바디로션" },
      { id: "body-wash", name: "바디워시" },
      { id: "body-scrub", name: "바디스크럽" },
    ],
  },
  {
    id: "hair",
    name: "헤어",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "shampoo", name: "샴푸" },
      { id: "treatment", name: "트리트먼트" },
      { id: "hair-oil", name: "헤어오일" },
    ],
  },
  {
    id: "nail",
    name: "네일",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "nail-polish", name: "네일폴리시" },
      { id: "nail-care", name: "네일케어" },
    ],
  },
  {
    id: "perfume",
    name: "향수",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "perfume", name: "향수" },
      { id: "body-mist", name: "바디미스트" },
    ],
  },
  {
    id: "etc",
    name: "기타",
    subCategories: [
      { id: "all", name: "전체" },
    ],
  },
  {
    id: "inner-beauty",
    name: "이너뷰티",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "supplement", name: "영양제" },
      { id: "diet", name: "다이어트" },
    ],
  },
  {
    id: "baby-mom",
    name: "베이비&맘",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "baby-skincare", name: "베이비 스킨케어" },
      { id: "baby-bath", name: "베이비 목욕" },
    ],
  },
  {
    id: "men",
    name: "남성",
    subCategories: [
      { id: "all", name: "전체" },
      { id: "men-skincare", name: "남성 스킨케어" },
      { id: "shaving", name: "면도" },
    ],
  },
]

// 속성 태그 정의
export const attributeTags = ["전체", "수분", "진정", "보습", "모공", "브라이트닝", "안티에이징", "트러블"]
