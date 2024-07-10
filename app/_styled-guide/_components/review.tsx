import Image from 'next/image';

interface User {
  id: number;
  image: string;
  nickname: string;
}

interface ReviewImage {
  id: number;
  source: string;
}

interface ReviewProps {
  id?: number;
  user?: User;
  reviewImages?: ReviewImage[];
  updatedAt?: string;
  createdAt: string;
  isLiked?: boolean;
  likeCount?: number;
  content: string;
  rating?: number;
  isSponsored: boolean;
  productId?: number;
  userId: number;
  currentUserId: number;
} //임시로 필요해보이는 것만 작성했습니다

export default function Review({
  reviewImages,
  createdAt,
  content,
  isSponsored,
  userId,
  currentUserId,
}: ReviewProps) {
  const isMyReview = userId === currentUserId;

  return (
    <div className="flex flex-col md:flex-row lg:flex-row w-[335px] md:w-[684px] lg:w-[940px] bg-[#252530] border rounded-xl border-solid border-[#353542]">
      <div className="w-[128px] md:w-[159px] lg:w-[150px] pt-[30px] pl-[30px] text-white whitespace-nowrap">
        review profile
      </div>
      <div className="flex flex-col gap-5 w-auto px-5 md:pl-[30px] lg:pl-[80px] md:pr-5 lg:pr-[30px] pt-[30px] pb-5 md:py-5 lg:py-[30px]">
        {isSponsored && (
          <span className="inline-block text-[10px] lg:text-sm font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#5097FA] to-[#5363FF]">
            지원받고 남기는 리뷰입니다.
          </span>
        )}
        <span
          className="text-[#F1F1F5] text-xs lg:text-base font-normal whitespace-normal"
          style={{ wordBreak: 'keep-all' }}
        >
          {content}
        </span>
        {reviewImages && (
          <div className="flex gap-[10px] lg:gap-5 w-auto h-auto md:h-[80px] lg:h-[100px]">
            {reviewImages.map((image) => (
              <div
                key={image.id}
                className="relative w-[60px] md:w-[80px] lg:w-[110px] h-[60px] md:h-[80px] lg:h-[100px] border rounded-lg border-none"
              >
                <Image src={image.source} alt={`Review Image ${image.id}`} fill />
              </div>
            ))}
          </div>
        )}
        <div className="flex w-[295px] md:w-[455px] lg:w-[650px] h-[26px] lg:h-[30px] items-center justify-between">
          <div className="flex gap-[15px] md:gap-5 lg:gap-5">
            <p className="text-gray-600 text-xs lg:text-sm font-normal">{createdAt}</p>
            {isMyReview && (
              <div className="flex gap-[10px]">
                <button className="text-gray-600 text-xs lg:text-sm font-light underline decoration-gray-600">
                  수정
                </button>
                <button className="text-gray-600 text-xs text-sm font-light underline decoration-gray-600">
                  삭제
                </button>
              </div>
            )}
          </div>
          <p className="text-white">좋아요</p>
        </div>
      </div>
    </div>
  );
}
