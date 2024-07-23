import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Followers from '@/components/modal/followers';
import Followees from '@/components/modal/followees';
import { useFollowUser, useUnFollowUser } from '@/hooks/follow';
import ProfileModal from '@/components/modal/profile';

interface UserProfileProps {
  id: number;
  image: string | null;
  description: string;
  nickname: string;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
  isMyPage?: boolean;
}

export default function Profile({
  id,
  image,
  nickname,
  description,
  followeesCount,
  followersCount,
  isFollowing,
  isMyPage,
}: UserProfileProps) {
  const { mutate: followUser } = useFollowUser();
  const { mutate: unFollowUser } = useUnFollowUser();

  const handleFollow = () => {
    followUser({ userId: id });
  };

  const handleUnfollow = () => {
    unFollowUser({ userId: id });
  };
  return (
    <div className="w-[335px] md:w-[509px] lg:w-[340px] h-full px-5 py-[30px] md:px-[30px] lg:px-5 lg:py-10 flex flex-col items-center border-[#353542] rounded-lg bg-[#252530] gap-[30px] lg:gap-10">
      <Avatar className="w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] rounded-full overflow-hidden">
        {image ? (
          <AvatarImage src={image} alt={`Profile of ${nickname}`} />
        ) : (
          <AvatarFallback>
            <span>{nickname[0]}</span>
          </AvatarFallback>
        )}
      </Avatar>
      <div className="w-[295px] md:w-[449px] lg:w-[300px] flex flex-col items-center gap-5">
        <h2 className="text-[#F1F1F5] text-xl lg:text-2xl font-semibold">{nickname}</h2>
        <p className="text-[#6E6E82] text-sm lg:text-base">{description}</p>
      </div>
      <div className="flex gap-[50px]">
        <div className="flex flex-col items-center gap-[10px]">
          <p className="text-[#F1F1F5] text-lg lg:text-xl font-semibold">
            <Followers userId={id} userNickname={nickname} followersCount={followersCount} />
          </p>
          <p className="text-[#9FA6B2] text-sm lg:text-base font-normal">팔로워</p>
        </div>
        <div className="h-[60px] w-px bg-gray-700"></div>
        <div className="flex flex-col items-center gap-[10px]">
          <p className="text-[#F1F1F5] text-lg lg:text-xl font-semibold">
            <Followees userId={id} userNickname={nickname} followeesCount={followeesCount} />
          </p>
          <p className="text-[#9FA6B2] text-sm lg:text-base font-normal">팔로잉</p>
        </div>
      </div>
      {isMyPage ? (
        <div className="w-full flex flex-col gap-[10px] md:gap-[15px] lg:gap-5">
          <ProfileModal />
          <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>
            로그아웃
          </Link>
        </div>
      ) : isFollowing ? (
        <Button variant="outline" onClick={handleUnfollow}>
          팔로우 취소
        </Button>
      ) : (
        <Button onClick={handleFollow}>팔로우</Button>
      )}
    </div>
  );
}
