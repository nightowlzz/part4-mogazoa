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
export default function RankingList() {
  const {
    data: userRanking,
    isPending,
    isError,
  } = useGetUserRanking({
    refetchInterval: 1000 * 60,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1280);
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
      <aside className={cn(styled['main-ranking'], 'pt-[45px] lx:px-[30px] overflow-hidden')}>
        <h2 className="font-sm lg:font-base text-white pb-5">
          리뷰어 랭킹{' '}
          <small className="inline-block xl:block text-gray-600">(실시간 랭킹: 1분 단위)</small>
        </h2>
        {!isMobile ? (
          <ul className="xl:space-y-7 overflow-x-auto">
            {userRanking.slice(0, 5).map((user, i) => (
              <Ranking key={user.id} {...user} i={i} />
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
      </aside>
    </>
  );
}
