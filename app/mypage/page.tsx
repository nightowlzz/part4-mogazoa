'use client';

import { ActivityCategory } from '@/app/_styled-guide/_components/activity-category';
import { ActivityRating } from '@/app/_styled-guide/_components/activity-rating';
import { ActivityReview } from '@/app/_styled-guide/_components/activity-review';
import { ProductCard } from '@/app/_styled-guide/_components/card-product';
import ProductSortSelector from '@/app/_styled-guide/_components/ProductSortSelector';
import Profile from '@/app/_styled-guide/_components/profile';
import {
  useGetMyInfo,
  useGetUserCreatedProducts,
  useGetUserFavoriteProducts,
  useGetUserInfo,
  useGetUserReviewedProducts,
} from '@/hooks/user';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

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
  const { data: MyInfo } = useGetMyInfo();

  const { data: userReviewedProducts } = useGetUserReviewedProducts(Number(MyInfo?.id));
  const { data: userCreatedProducts } = useGetUserCreatedProducts(Number(MyInfo?.id));
  const { data: userFavoriteProducts } = useGetUserFavoriteProducts(Number(MyInfo?.id));

  const [selectedCategory, setSelectedCategory] = useState('리뷰 남긴 상품');
  const options = ['리뷰 남긴 상품', '등록한 상품', '찜한 상품'];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (!MyInfo) {
    return <div>유저 정보 없음</div>;
  }

  let productsList: Product[] = [];
  if (selectedCategory === '리뷰 남긴 상품') {
    productsList = userReviewedProducts?.list || [];
  } else if (selectedCategory === '등록한 상품') {
    productsList = userCreatedProducts?.list || [];
  } else if (selectedCategory === '찜한 상품') {
    productsList = userFavoriteProducts?.list || [];
  }

  const mostFavoriteCategory = MyInfo?.mostFavoriteCategory ?? null;
  const userImage = MyInfo?.image ?? null;

  return (
    <div className="w-full h-full bg-[#1C1C22] flex flex-col items-center mb-[80px]">
      <div className="flex flex-col mt-[30px] md:mt-[40px] lg:flex-row lg:justify-center lg:items-start">
        <div className="mb-[60px] lg:mr-[60px]">
          <Profile
            id={MyInfo.id}
            image={userImage}
            description={MyInfo.description}
            nickname={MyInfo.nickname}
            followeesCount={MyInfo.followeesCount}
            followersCount={MyInfo.followersCount}
            isFollowing={MyInfo.isFollowing}
            isMyPage={true}
          />
        </div>
        <div>
          <div className="mb-[61.5px]">
            <h2 className="text-white text-lg mb-[30px]">활동 내역</h2>
            <div className="flex gap-[10px] lg:gap-[20px]">
              <ActivityRating rating={MyInfo.averageRating} />
              <ActivityReview reviewCount={MyInfo.reviewCount} />
              <ActivityCategory mostFavoriteCategory={mostFavoriteCategory} />
            </div>
          </div>
          <div>
            <div className="mb-[31.5px]">
              <ProductSortSelector
                category={options}
                placeHolder="리뷰 남긴 상품"
                onChange={handleCategoryChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-[15px] lg:grid-cols-3 lg:gap-[20px]">
              {productsList.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                  <ProductCard
                    name={product.name}
                    image={product.image}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    favoriteCount={product.favoriteCount}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
