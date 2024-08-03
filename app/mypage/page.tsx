'use client';

import {
  useGetMyInfo,
  useGetUserCreatedProducts,
  useGetUserFavoriteProducts,
  useGetUserReviewedProducts,
} from '@/hooks/user';
import { useEffect, useState } from 'react';
import ProfileSection from '@/components/ProfileSection';
import { UserInfo } from '@/components/ProfileSection';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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

export default function MyPage() {
  const { data: MyInfoResponse, isLoading, isError } = useGetMyInfo();
  const { data: userReviewedProducts } = useGetUserReviewedProducts(Number(MyInfoResponse?.id));
  const { data: userCreatedProducts } = useGetUserCreatedProducts(Number(MyInfoResponse?.id));
  const { data: userFavoriteProducts } = useGetUserFavoriteProducts(Number(MyInfoResponse?.id));

  const router = useRouter();
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const [selectedCategory, setSelectedCategory] = useState('리뷰 남긴 상품');
  const options = ['리뷰 남긴 상품', '등록한 상품', '찜한 상품'];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (!accessToken) {
      router.push('/signin');
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (!MyInfoResponse) {
    return <div>유저 정보 없음</div>;
  }

  const MyInfo: UserInfo = {
    ...MyInfoResponse,
    image: MyInfoResponse.image ?? null,
    mostFavoriteCategory: MyInfoResponse.mostFavoriteCategory ?? null,
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
      userInfo={MyInfo}
      productsList={productsList}
      options={options}
      selectedCategory={selectedCategory}
      handleCategoryChange={handleCategoryChange}
      isMyPage={true}
    />
  );
}
