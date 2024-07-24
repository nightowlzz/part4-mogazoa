import { ReviewProfile } from '@/app/_styled-guide/_components/review-profile';
import { Button } from '@/components/ui/button';
import { useDeleteReview } from '@/hooks/review';
import { ReviewResponse } from '@/types/data';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { LegacyRef } from 'react';
import Thumbs from './thumbs';
import { toast } from 'sonner';

interface ReviewProps extends ReviewResponse {
  currentUserId: number | undefined;
  reviewRef: LegacyRef<HTMLDivElement> | undefined;
  categoryName: string;
  productName: string;
  categoryId: number;
}

export default function Review({
  id: reviewId,
  reviewImages,
  createdAt,
  content,
  rating,
  userId,
  user,
  isLiked,
  likeCount,
  currentUserId,
  reviewRef,
  productId,
  productName,
  categoryId,
  categoryName,
}: ReviewProps) {
  const isMyReview = userId === currentUserId;
  const queryClient = useQueryClient();
  const deleteReview = useDeleteReview(reviewId, {
    onSuccess: () => {
      toast.success('리뷰가 삭제 되었습니다.');
    },
    onError: () => {
      console.error('리뷰가 삭제되지 않았습니다.');
    },
  });

  // console.log('reviewImages', reviewId, '/', reviewImages);
  const handleDataFormat = () => {
    const date = new Date(createdAt);
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
  };

  const handleDelete = () => {
    deleteReview.mutate();
    queryClient.invalidateQueries({ queryKey: ['review'] });
  };

  return (
    <div
      ref={reviewRef}
      className="flex flex-col md:flex-row lg:flex-row gap-[30px] lg:gap-[80px] p-5 md:p-[30px] bg-[#252530] border border-[#353542] rounded-xl"
    >
      <div className="w-full md:w-[160px]">
        <ReviewProfile user={user} rating={rating} />
      </div>
      <div className="text-white">{reviewId}</div>
      <div className="flex-1">
        <p
          className="text-[#F1F1F5] text-sm md:text-base font-normal whitespace-pre mt-[10px]"
          style={{ wordBreak: 'keep-all' }}
        >
          {content}
        </p>
        {reviewImages.length ? (
          <div className="flex gap-[10px] lg:gap-5 w-auto h-auto md:h-[80px] lg:h-[100px] mt-5">
            {reviewImages.map((image) => (
              <div
                key={image.id}
                className="relative w-[60px] md:w-[80px] lg:w-[110px] h-[60px] md:h-[80px] lg:h-[100px] border rounded-lg border-none"
              >
                <Image
                  fill
                  src={image.source}
                  alt={`Review Image ${image.id}`}
                  style={{ objectFit: 'cover' }}
                  sizes="200px auto"
                  priority
                />
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex items-center justify-between mt-[20px]">
          <div className="flex gap-[15px] md:gap-5 lg:gap-5">
            <p className="text-gray-600 text-xs lg:text-sm font-normal">{handleDataFormat()}</p>
            {isMyReview && (
              <div className="flex gap-[10px]">
                <Button
                  type="button"
                  variant="text"
                  size="auto"
                  className="text-gray-600 text-xs lg:text-sm font-light underline decoration-gray-600"
                  onClick={handleDelete}
                  disabled={deleteReview.isPending}
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
          <Thumbs reviewId={reviewId} isLiked={isLiked} likeCount={likeCount} />
        </div>
      </div>
    </div>
  );
}
