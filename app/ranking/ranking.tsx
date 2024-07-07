'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  nickname: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  followersCount: number;
  reviewCount: number;
}

export function Ranking() {
  const [rankings, setRankings] = useState<User[]>([]);

  useEffect(() => {
    // GET 요청....나중에 지울거
    const fetchRankings = async () => {
      try {
        const response = await axios.get('https://mogazoa-api.vercel.app/5-6/users/ranking');
        setRankings(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRankings();
  }, []);

  return (
    <div className="bg-black-600">
      <div className="text-white mb-7 text-sm lg:text-base">리뷰어 랭킹</div>
      <ul className="lg:space-y-7 flex lg:flex-col">
        {rankings.slice(0, 5).map((user) => (
          <li key={user.id} className="flex gap-[10px] mr-5 items-center">
            <Avatar className="w-9 h-9 lg:w-[42px] lg:h-[42px]">
              <AvatarImage src={user.image} alt={user.nickname} />
              <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="text-white text-sm lg:text-base">{user.nickname}</div>
              <div className="flex lg:text-xs gap-[15px] font-light text-gray-500 text-[10px]">
                <div>팔로워 {user.followersCount}</div>
                <div>리뷰 {user.reviewCount}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
