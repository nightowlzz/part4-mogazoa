'use client';
import SortSelector from '@/app/_styled-guide/_components/sort-selector';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { useGetMyInfo } from '@/hooks/user';
import { ReviewResponse, ReviewSortOrder } from '@/types/data';
import { useDeferredValue, useEffect, useState } from 'react';
import Review from './review';

export default function ReviewList({ productId }: { productId: string | string[] }) {
  const [sortOrder, setSortOrder] = useState<ReviewSortOrder>('recent');
  return (
    <div className="w-full max-w-[980px] px-5 mx-auto mb-[60px]">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[#F1F1F5] text-xl font-normal">상품 리뷰</h3>
        <SortSelector sort={sortOrder} setSortOrder={setSortOrder} />
      </div>
      <ReviewListContent productId={productId} sortOrder={sortOrder} />
    </div>
  );
}

export function ReviewListContent({
  productId,
  sortOrder,
}: {
  productId: string | string[];
  sortOrder: string;
}) {
  const { data: currentUserId } = useGetMyInfo();
  const [displayReviews, setDisplayReviews] = useState<ReviewResponse[]>();
  const {
    ref,
    data: getReviewList,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfinityScroll({
    queryKey: 'review',
    productId: productId,
    order: sortOrder,
  });

  useEffect(() => {
    if (!isPending || hasNextPage) {
      const result = getReviewList;
      setDisplayReviews(result);
    }
  }, [isPending, fetchNextPage, hasNextPage]);

  if (isPending)
    return (
      <div className="relative flex flex-col gap-5 mt-[30px]">
        <div className="absolute left-0 top-0 right-0 bottom-0 bg-black-600 opacity-50 z-[1]"></div>
        {displayReviews &&
          displayReviews.map((review) => (
            <Review key={review.id} {...review} currentUserId={currentUserId?.id} reviewRef={ref} />
          ))}
      </div>
    );

  if (isError) return <div>ERROR</div>;

  return (
    <>
      <div className="relative flex flex-col gap-5 mt-[30px]">
        {getReviewList &&
          getReviewList.map((review) => (
            <Review key={review.id} {...review} currentUserId={currentUserId?.id} reviewRef={ref} />
          ))}
      </div>
    </>
  );
}
