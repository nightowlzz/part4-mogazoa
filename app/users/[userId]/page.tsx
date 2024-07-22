'use client';

import { ActivityCategory } from '@/app/_styled-guide/_components/activity-category';
import { ActivityRating } from '@/app/_styled-guide/_components/activity-rating';
import { ActivityReview } from '@/app/_styled-guide/_components/activity-review';
import { ProductCard } from '@/app/_styled-guide/_components/card-product';
import Profile from '@/app/_styled-guide/_components/profile';
import { useGetUserInfo, useGetUserReviewedProducts } from '@/hooks/user';
import { useParams } from 'next/navigation';
import exImg from '@/public/assets/images/example-product.svg';
import { Button } from '@/components/ui/button';
import { IoMdAdd } from 'react-icons/io';

export default function UserId() {
  const params = useParams();
  const userId = params.userId;
  // const {
  //   data: userInfo,
  //   isLoading: userInfoLoading,
  //   error: userInfoError,
  // } = useGetUserInfo(Number(userId));

  const {
    data: userReviewedProducts,
    isLoading: productsLoading,
    error: productsError,
  } = useGetUserReviewedProducts(Number(userId));

  // if (userInfoLoading || productsLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (userInfoError || productsError) {
  //   return <div>Error: {userInfoError?.message || productsError?.message}</div>;
  // }

  // if (!userInfo) {
  //   return <div>유저 정보 없음</div>;
  // }

  const userInfo = {
    id: 284,
    nickname: 'test용닉네임입니다1',
    description: '',
    image: null,
    createdAt: '2024-07-08T17:06:03.018Z',
    updatedAt: '2024-07-08T18:19:06.888Z',
    teamId: 'proxy',
    isFollowing: false,
    followersCount: 0,
    followeesCount: 0,
    reviewCount: 4,
    averageRating: 5,
    mostFavoriteCategory: null,
  };

  const mostFavoriteCategoryName = userInfo.mostFavoriteCategory ?? '';
  return (
    <div>
      <Button
        variant="circleBlue"
        size={'auto'}
        className="w-[60px] h-[60px] fixed top-[642px] right-[20px] md:right-[30px] lg:right-[180px]"
      >
        <IoMdAdd color="white" size={30} />
      </Button>
      <div className="flex flex-col items-center mt-[30px] md:mt-[40px] lg:flex-row lg:justify-center lg:items-start">
        <div className="mb-[60px lg:mr-[60px]">
          <Profile
            image={exImg}
            description={userInfo.description}
            nickname={userInfo.nickname}
            followeesCount={userInfo.followeesCount}
            followersCount={userInfo.followersCount}
            isFollowing={userInfo.isFollowing}
          />
        </div>
        <div>
          <div className="mb-[61.5px]">
            <h2 className="text-white text-lg mb-[30px]">활동 내역</h2>
            <div className="flex gap-[10px]">
              <ActivityRating rating={userInfo.averageRating} />
              <ActivityReview reviewCount={userInfo.reviewCount} />
              <ActivityCategory categoryName={mostFavoriteCategoryName} categoryId={1} />
            </div>
          </div>
          <div>
            <h2 className="text-white text-lg mb-[31.5px]">리뷰한 제품</h2>
            <div className="grid grid-cols-2 gap-[15px] lg:grid-cols-3">
              {userReviewedProducts?.list.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  image={exImg}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  favoriteCount={product.favoriteCount}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
