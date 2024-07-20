'use client';
import { ReviewListResponse, ReviewResponse, ReviewSortOrder } from '@/types/data';
import instance from '@/utils/axiosInstance';
import { useInfiniteQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import Review from './review';
import { useEffect, useState } from 'react';
import { useGetMyInfo } from '@/hooks/user';
import { useInView } from 'react-intersection-observer';
import SortSelector from '@/app/_styled-guide/_components/sort-selector';

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
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { data, isPending, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ReviewListResponse>({
      queryKey: ['review', { productId, sortOrder }],
      queryFn: async ({ pageParam = null }) => {
        try {
          const res = await instance.get(
            `/products/${productId}/reviews?order=${sortOrder}&cursor=${pageParam}`,
          );
          if (!res) return;
          return res.data;
        } catch (err: any) {
          let errorMessage = '데이터를 불러 오는데 실패 했습니다.';
          if (err.response && err.response.data && err.response.data.message) {
            errorMessage = err.response.data.message;
          }
          toast.error(errorMessage);
          throw err;
        }
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    });

  const getReviewList = data?.pages.flatMap((value) =>
    value.list.map((list) => list as ReviewResponse),
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <div className="flex flex-col gap-5 mt-[30px]">
        {getReviewList &&
          getReviewList.map((review) => (
            <Review key={review.id} {...review} currentUserId={currentUserId?.id} reviewRef={ref} />
          ))}
      </div>
    </>
  );
}
