import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import RankingTag from '@/components/ui/tags/RankingTag';
import { RankedUserResponse } from '@/types/data';
import Image from 'next/image';
import Link from 'next/link';
import DefaultImage from '@/public/assets/images/avatar-default-image.jpeg';

interface RankingListProps extends RankedUserResponse {
  i: number;
}

export default function Ranking({
  id,
  image,
  nickname,
  followersCount,
  reviewCount,
  i,
}: RankingListProps) {
  return (
    <Link href={`/users/${id}`} className="flex gap-[10px] mr-5 items-center w-auto">
      <Avatar className="w-9 h-9 lg:w-[42px] lg:h-[42px]">
        <AvatarImage src={image} alt={nickname} />
        <AvatarFallback>
          <Image src={DefaultImage} alt="Default Profile" className="w-full h-full object-cover" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center justify-start gap-2 text-white text-sm lg:text-base">
          <RankingTag rank={i + 1} />
          <span>{nickname}</span>
        </div>
        <div className="flex lg:text-xs gap-[15px] font-light text-gray-600 text-[10px] pt-1">
          <p>팔로워 {followersCount}</p>
          <p>리뷰 {reviewCount}</p>
        </div>
      </div>
    </Link>
  );
}
