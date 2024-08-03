'use client';
import SortSelector from '@/app/_styled-guide/_components/sort-selector';
import { REVIEW_SORT_OPTIONS } from '@/constants/sortOrder';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { ReviewResponse, ReviewSortOrder } from '@/types/data';
import { useState } from 'react';
import Review from './review';

interface reviewInfoProps {
  productId: string | string[];
  currentUserId: number | null;
  productName: string;
  categoryId: number;
  categoryName: string;
}

interface reviewInfoSortOderProps extends reviewInfoProps {
  sortOrder: string;
}

export default function ReviewList({
  productId,
  currentUserId,
  productName,
  categoryId,
  categoryName,
}: reviewInfoProps) {
  const [sortOrder, setSortOrder] = useState<ReviewSortOrder>('recent');
  return (
    <div className="w-full max-w-[980px] mx-auto mb-[60px]">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[#F1F1F5] text-xl font-normal">상품 리뷰</h3>
        <SortSelector
          sort={sortOrder}
          setSortOrder={setSortOrder}
          sortSelectOption={REVIEW_SORT_OPTIONS}
        />
      </div>
      <ReviewListContent
        productId={productId}
        sortOrder={sortOrder}
        currentUserId={currentUserId}
        productName={productName}
        categoryId={categoryId}
        categoryName={categoryName}
      />
    </div>
  );
}

export function ReviewListContent({
  productId,
  currentUserId,
  productName,
  categoryId,
  categoryName,
  sortOrder,
}: reviewInfoSortOderProps) {
  const [displayReviews, setDisplayReviews] = useState<ReviewResponse[]>();
  const {
    ref,
    data: getReviewList,
    isPending,
    isError,
  } = useInfinityScroll({
    queryKey: 'review',
    productId: productId,
    order: sortOrder,
  });

  // [NOTE] 추 후 스켈레톤 작업
  if (isPending) return <div>isPending</div>;

  if (isError) return <div>ERROR</div>;

  return (
    <>
      <div className="relative flex flex-col gap-5 mt-[30px]">
        {getReviewList &&
          getReviewList.map((review) => (
            <Review
              key={review.id}
              {...review}
              currentUserId={currentUserId}
              reviewRef={ref}
              productName={productName}
              categoryId={categoryId}
              categoryName={categoryName}
            />
          ))}
      </div>
    </>
  );
}
