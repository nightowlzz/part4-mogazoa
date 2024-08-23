'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  useGetMyInfo,
  useGetUserCreatedProducts,
  useGetUserFavoriteProducts,
  useGetUserInfo,
  useGetUserReviewedProducts,
} from '@/hooks/user';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileSection, { UserInfo } from '../../_components/profile-section';

interface Product {
  id: number;
  name: string;
  image?: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  writerId: number;
  categoryId: number;
}

export default function UserId() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId;
  const {
    data: userInfoResponse,
    isPending: userInfoLoading,
    error: userInfoError,
  } = useGetUserInfo(Number(userId));
  const { data: MyInfo } = useGetMyInfo();
  const { data: userReviewedProducts } = useGetUserReviewedProducts(Number(userId));
  const { data: userCreatedProducts } = useGetUserCreatedProducts(Number(userId));
  const { data: userFavoriteProducts } = useGetUserFavoriteProducts(Number(userId));

  const [selectedCategory, setSelectedCategory] = useState('리뷰 남긴 상품');

  const options = ['리뷰 남긴 상품', '등록한 상품', '찜한 상품'];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (MyInfo?.id === Number(userId)) {
      router.push('/mypage');
    }
  }, [MyInfo, userId, router]);

  if (userInfoLoading) {
    return (
      <div className="w-full max-w-[1340px] mt-[60px] m-auto opacity-50">
        <div className="flex items-start justify-center flex-col md:flex-row gap-[50px] md:gap-[70px]">
          <div className="w-full md:w-[280px] lg:w-[340px] shrink-0">
            <Skeleton className="w-full h-[450px] md:h-[500px] rounded-lg" />
          </div>
          <div className="w-full">
            <h2 className="text-white text-lg mb-[30px]">활동 내역</h2>
            <div className="grid grid-cols-3 gap-[15px] md:gap-5 ">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={'my-list' + i} className="h-[100px] w-full mr-2" />
              ))}
            </div>
            <div className="mt-[50px] md:mt-[80px]">
              <h2 className="text-white text-lg mb-[30px]">리뷰 남긴 상품</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-[15px] md:gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={'my-review' + i} className="space-y-4">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userInfoResponse?.teamId !== '5-6' || userInfoError) {
    return router.push('/not-found');
  }

  const userInfo: UserInfo = {
    ...userInfoResponse,
    image: userInfoResponse.image ?? null,
    mostFavoriteCategory: userInfoResponse.mostFavoriteCategory ?? null,
  };

  let productsList: Product[] = [];
  if (selectedCategory === '리뷰 남긴 상품') {
    productsList = userReviewedProducts?.list || [];
  } else if (selectedCategory === '등록한 상품') {
    productsList = userCreatedProducts?.list || [];
  } else if (selectedCategory === '찜한 상품') {
    productsList = userFavoriteProducts?.list || [];
  }

  return (
    <ProfileSection
      userInfo={userInfo}
      productsList={productsList}
      options={options}
      selectedCategory={selectedCategory}
      handleCategoryChange={handleCategoryChange}
      isMyPage={false}
    />
  );
}
