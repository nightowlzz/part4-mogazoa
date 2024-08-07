'use client';
import SortSelector from '@/app/_styled-guide/_components/sort-selector';
import { REVIEW_SORT_OPTIONS } from '@/constants/sortOrder';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import useSortOrderStore from '@/store/sortOrderStore';
import Review from './review';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

interface reviewInfoProps {
  productId: string | string[];
  currentUserId: number | null;
  productName: string;
  categoryId: number;
  categoryName: string;
}

export default function ReviewList({
  productId,
  currentUserId,
  productName,
  categoryId,
  categoryName,
}: reviewInfoProps) {
  return (
    <div className="w-full max-w-[980px] mx-auto mb-[60px]">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[#F1F1F5] text-xl font-normal text-[18px] md:text-[20px]">상품 리뷰</h3>
        <SortSelector sortSelectOption={REVIEW_SORT_OPTIONS} />
      </div>
      <ReviewListContent
        productId={productId}
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
}: reviewInfoProps) {
  const { sortOrder } = useSortOrderStore();
  const [reviewId, setReviewId] = useState();
  const {
    ref,
    data: getReviewList,
    isPending,
    isError,
  } = useInfinityScroll({
    queryKey: 'review',
    productId: productId,
    order: sortOrder,
    reviewId: reviewId,
  });

  if (isError) return <div>ERROR</div>;

  if (isPending)
    return (
      <div className="h-[150px] space-y-4 mt-[30px] opacity-50">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={'revuew' + i} className="h-full w-full" />
        ))}
      </div>
    );

  return (
    <>
      <div className="relative flex flex-col gap-5 mt-[30px]">
        {getReviewList &&
          getReviewList.map((review) => (
            <Review
              key={review.id}
              {...review}
              setReviewId={setReviewId}
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
