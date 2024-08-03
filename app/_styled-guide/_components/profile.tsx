import Followees from '@/components/modal/followees';
import Followers from '@/components/modal/followers';
import ProfileModal from '@/components/modal/profile';
import { Button, buttonVariants } from '@/components/ui/button';
import { useFollowUser, useUnFollowUser } from '@/hooks/follow';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DefaultImage from '@/public/assets/images/avatar-default-image.jpeg';
import { useAuth } from '@/hooks/nextauth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
  image: initialImage,
  nickname: initialNickname,
  description: initialDescription,
  followeesCount,
  followersCount,
  isFollowing,
  isMyPage,
}: UserProfileProps) {
  const [isFollow, setIsFollow] = useState(isFollowing);
  const [followCount, setFollowCount] = useState(followersCount);
  const [image, setImage] = useState(initialImage);
  const [nickname, setNickname] = useState(initialNickname);
  const [description, setDescription] = useState(initialDescription);

  const { mutate: followUser, error: followError } = useFollowUser();
  const { mutate: unFollowUser, error: unFollowError } = useUnFollowUser();
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsFollow(isFollowing);
    setFollowCount(followersCount);
  }, [isFollowing, followersCount]);

  const handleFollow = () => {
    const prevState = { isFollow, followCount };
    setIsFollow(true);
    setFollowCount(followCount + 1);

    followUser({ userId: id });

    if (followError) {
      setIsFollow(prevState.isFollow);
      setFollowCount(prevState.followCount);
    }
  };

  const handleUnfollow = () => {
    const prevState = { isFollow, followCount };
    setIsFollow(false);
    setFollowCount(followCount - 1);

    unFollowUser({ userId: id });

    if (unFollowError) {
      setIsFollow(prevState.isFollow);
      setFollowCount(prevState.followCount);
    }
  };

  const handleProfileUpdate = (updatedData: {
    nickname: string;
    description: string;
    image: string | null;
  }) => {
    setNickname(updatedData.nickname);
    setDescription(updatedData.description);
    setImage(updatedData.image);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('로그아웃에 성공했습니다.');
    router.push('/');
  };

  return (
    <div className="w-[335px] md:w-[509px] lg:w-[340px] h-full px-5 py-[30px] md:px-[30px] lg:px-5 lg:py-10 flex flex-col items-center border-[#353542] rounded-lg bg-[#252530] gap-[30px] lg:gap-10">
      <Avatar className="w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] rounded-full overflow-hidden">
        {image ? (
          <AvatarImage
            src={image}
            alt={`Profile of ${nickname}`}
            className="object-cover w-full h-full"
          />
        ) : (
          <AvatarFallback>
            <Image
              src={DefaultImage}
              alt="Default Profile"
              className="w-full h-full object-cover"
              priority
            />
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
            <Followers userId={id} userNickname={nickname} followersCount={followCount} />
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
          <ProfileModal
            nickname={nickname}
            description={description}
            image={image}
            onUpdate={handleProfileUpdate}
          />
          <button className={cn(buttonVariants({ variant: 'outline' }))} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      ) : isFollow ? (
        <Button variant="outline" onClick={handleUnfollow}>
          팔로우 취소
        </Button>
      ) : (
        <Button onClick={handleFollow}>팔로우</Button>
      )}
    </div>
  );
}
