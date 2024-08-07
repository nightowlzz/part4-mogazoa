'use client';
import styled from '@/app/(public)/_styles/main.module.scss';
import { useGetUserRanking } from '@/hooks/user';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FreeMode, Mousewheel, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Ranking from './ranking';
import { RankedUserResponse } from '@/types/data';
import { Skeleton } from '@/components/ui/skeleton';
import useIsMobile from '@/hooks/useMobileDetect';

function RankingContent() {
  const isMobile = useIsMobile();
  const {
    data: userRanking,
    isPending,
    isError,
  } = useGetUserRanking({
    refetchInterval: 1000 * 60,
  });

  if (isError) return <div>에러남</div>;

  if (isPending)
    return (
      <>
        {!isMobile ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={'rank' + i} className="flex items-center mb-2 opacity-50">
              <Skeleton className="h-12 w-12 rounded-full shrink-0 mr-2" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[70%]" />
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center mb-3 opacity-50">
            <Skeleton className="h-12 w-12 rounded-full shrink-0 mr-2" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </div>
        )}
      </>
    );

  return (
    <>
      {!isMobile ? (
        <ul className="flex flex-row xl:flex-col xl:space-y-7 overflow-hidden">
          {userRanking.slice(0, 5).map((user, i) => (
            <li key={user.id} className="flex shrink-0">
              <Ranking {...user} i={i} />
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
              <Ranking {...user} i={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default function RankingList() {
  return (
    <>
      <aside className={cn(styled['main-ranking'], 'pt-[45px] lx:px-[30px] overflow-hidden')}>
        <h2 className="font-sm lg:font-base text-white pb-5">
          리뷰어 랭킹
          <small className="inline-block xl:block text-gray-600">(실시간 랭킹: 1분 단위)</small>
        </h2>
        <RankingContent />
      </aside>
    </>
  );
}
