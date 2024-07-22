'use client';

import Link from 'next/link';
import { Follower } from '@/app/_styled-guide/_components/follower';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGetUserFollowers } from '@/hooks/user';

interface FollowersProps {
  userId: number;
  userNickname: string;
  followersCount: number;
}

export default function Followers({ userId, userNickname, followersCount }: FollowersProps) {
  const { data: userFollowers } = useGetUserFollowers(userId);
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
            {userFollowers?.list.map((follower) => (
              <div key={follower.follower.id}>
                <Link href={`/users/${follower.follower.id}`}>
                  <Follower nickname={follower.follower.nickname} image={follower.follower.image} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
