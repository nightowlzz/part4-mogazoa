'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import RankingTag from '@/components/ui/tags/RankingTag';
import { useGetUserRanking } from '@/hooks/user';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
export default function RankingList() {
  const { data: userRanking, isPending, isError } = useGetUserRanking();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1279);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 상태 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isPending) return <div>로딩중..</div>;

  if (isError) return <div>에러남</div>;

  return (
    <>
      {!isMobile ? (
        <ul className="xl:space-y-7 overflow-x-auto">
          {userRanking.slice(0, 5).map((user, i) => (
            <li key={user.id} className="shrink-0">
              <Link href="/user/:userId" className="flex gap-[10px] mr-5 items-center w-auto">
                <Avatar className="w-9 h-9 lg:w-[42px] lg:h-[42px]">
                  <AvatarImage src={user.image} alt={user.nickname} />
                  <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center justify-start gap-2 text-white text-sm lg:text-base">
                    <RankingTag rank={i + 1} />
                    {user.nickname}
                  </div>
                  <div className="flex lg:text-xs gap-[15px] font-light text-gray-600 text-[10px] pt-1">
                    <p>팔로워 {user.followersCount}</p>
                    <p>리뷰 {user.reviewCount}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Swiper
          direction={'horizontal'}
          slidesPerView={'auto'}
          freeMode={true}
          scrollbar={false}
          mousewheel={true}
          modules={[FreeMode, Scrollbar, Mousewheel]}
          className="rankingSwiper"
        >
          {userRanking.slice(0, 5).map((user, i) => (
            <SwiperSlide key={user.id} className="shrink-0" style={{ width: 'auto' }}>
              <Link href="/user/:userId" className="flex gap-[10px] mr-5 items-center w-auto">
                <Avatar className="w-9 h-9 lg:w-[42px] lg:h-[42px]">
                  <AvatarImage src={user.image} alt={user.nickname} />
                  <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center justify-start gap-2 text-white text-sm lg:text-base">
                    <RankingTag rank={i + 1} />
                    {user.nickname}
                  </div>
                  <div className="flex lg:text-xs gap-[15px] font-light text-gray-600 text-[10px] pt-1">
                    <p>팔로워 {user.followersCount}</p>
                    <p>리뷰 {user.reviewCount}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}
