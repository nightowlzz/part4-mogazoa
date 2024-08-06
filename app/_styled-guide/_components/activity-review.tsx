import Image from 'next/image';

interface ActivityReviewProps {
  reviewCount: number;
}

export function ActivityReview({ reviewCount }: ActivityReviewProps) {
  return (
    <div className="flex flex-col items-center justify-center p-5 bg-black-500 rounded-xl border border-black-400 lg:p-[30px]">
      <h2 className="text-sm text-center text-gray-500 mb-[15px] lg:text-base lg:mb-[20px] break-keep">
        남긴 리뷰
      </h2>
      <div className="flex items-center justify-center">
        <div className="relative w-[20px] h-[20px] mr-[5px] lg:w-[24px] lg:h-[24px] break-all">
          <Image src="/assets/images/comment.svg" alt="Logo" fill priority />
        </div>
        <p className="text-white text-base md:text-xl lg:text-2xl">{reviewCount}</p>
      </div>
    </div>
  );
}
