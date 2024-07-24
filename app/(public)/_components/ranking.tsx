import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import RankingTag from '@/components/ui/tags/RankingTag';
import { RankedUserResponse } from '@/types/data';
import Link from 'next/link';

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
    <li key={id} className="shrink-0">
      <Link href="/user/:userId" className="flex gap-[10px] mr-5 items-center w-auto">
        <Avatar className="w-9 h-9 lg:w-[42px] lg:h-[42px]">
          <AvatarImage src={image} alt={nickname} />
          <AvatarFallback>{nickname[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center justify-start gap-2 text-white text-sm lg:text-base">
            <RankingTag rank={i + 1} />
            {nickname}
          </div>
          <div className="flex lg:text-xs gap-[15px] font-light text-gray-600 text-[10px] pt-1">
            <p>팔로워 {followersCount}</p>
            <p>리뷰 {reviewCount}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
