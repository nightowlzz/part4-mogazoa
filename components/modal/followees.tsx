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
import { useGetUserFollowees } from '@/hooks/user';

interface FolloweesProps {
  userId: number;
  userNickname: string;
}

export default function Followees({ userId, userNickname }: FolloweesProps) {
  const { data: userFollowees } = useGetUserFollowees(userId);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>프로필 모달</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogDescription className="hidden">followee content</DialogDescription>
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-5 md:gap-[10px]">
            {userNickname}님이 팔로우하는 유저
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 lg:space-y-[25px]">
          {userFollowees?.list.map((followee) => (
            <div key={followee.followee.id}>
              <Link href={`/users/${followee.followee.id}`}>
                <Follower nickname={followee.followee.nickname} image={followee.followee.image} />
              </Link>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
