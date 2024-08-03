'use client';

import {
  useGetMyInfo,
  useGetUserCreatedProducts,
  useGetUserFavoriteProducts,
  useGetUserInfo,
  useGetUserReviewedProducts,
} from '@/hooks/user';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileSection from '@/components/ProfileSection';
import { UserInfo } from '@/components/ProfileSection';

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
    isLoading: userInfoLoading,
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
    return <div>Loading...</div>;
  }

  if (userInfoError) {
    return <div>Error: {userInfoError?.message}</div>;
  }

  if (userInfoResponse?.teamId !== '5-6') {
    return <div>없는 유저 id</div>;
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
