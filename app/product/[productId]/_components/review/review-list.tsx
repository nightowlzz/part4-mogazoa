'use client';
import SortSelector from '@/app/_styled-guide/_components/sort-selector';
import { REVIEW_SORT_OPTIONS } from '@/constants/sortOrder';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import useSortOrderStore from '@/store/sortOrderStore';
import Review from './review';

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
    <div className="w-full max-w-[980px] px-5 mx-auto mb-[60px]">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[#F1F1F5] text-xl font-normal">상품 리뷰</h3>
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
