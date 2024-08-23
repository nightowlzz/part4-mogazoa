'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { useGetUserFollowers } from '@/hooks/user';
import Link from 'next/link';
import { Follower } from '../follower';

interface FollowersProps {
  userId: number;
  userNickname: string;
  followersCount: number;
}

export default function Followers({ userId, userNickname, followersCount }: FollowersProps) {
  const { data } = useInfinityScroll({
    queryKey: 'followers',
    userId: userId,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>{followersCount}</button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <div className="h-[400px] md:h-[450px] lg:h-[500px] overflow-y-auto">
          <DialogDescription className="hidden">follower content</DialogDescription>
          <DialogHeader>
            <DialogTitle className="flex flex-col mb-[20px] md:mb-[40px]">
              {userNickname}님을 팔로우하는 유저
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 lg:space-y-[25px]">
            {data &&
              data.map((followers) => (
                <div key={followers.follower.id}>
                  <Link href={`/users/${followers.follower.id}`}>
                    <Follower
                      nickname={followers.follower.nickname}
                      image={followers.follower.image}
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
