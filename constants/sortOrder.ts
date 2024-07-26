export const REVIEW_SORT_OPTIONS = [
  { id: 'recent', label: '최신순' },
  { id: 'ratingDesc', label: '별점 높은순' },
  { id: 'ratingAsc', label: '별점 낮은순' },
  { id: 'likeCount', label: '좋아요순' },
] as const;

export const PRODUCT_SORT_OPTIONS = [
  { id: 'recent', label: '최신순' },
  { id: 'rating', label: '별점순' },
  { id: 'reviewCount', label: '리뷰순' },
] as const;
