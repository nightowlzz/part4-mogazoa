'use client';

import { ActivityCategory } from '@/app/_styled-guide/_components/activity-category';
import { ActivityRating } from '@/app/_styled-guide/_components/activity-rating';
import { ActivityReview } from '@/app/_styled-guide/_components/activity-review';
import { ProductCard } from '@/app/_styled-guide/_components/card-product';
import ProductSortSelector from '@/app/_styled-guide/_components/ProductSortSelector';
import Profile from '@/app/_styled-guide/_components/profile';
import Link from 'next/link';
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

interface Category {
  id: number;
  name: string;
}

export interface UserInfo {
  id: number;
  image: string | null;
  description: string;
  nickname: string;
  followeesCount: number;
  followersCount: number;
  isFollowing: boolean;
  averageRating: number;
  reviewCount: number;
  mostFavoriteCategory: Category | null;
}

interface ProfileSectionProps {
  userInfo: UserInfo;
  productsList: Product[];
  options: string[];
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
  isMyPage: boolean;
}

export default function ProfileSection({
  userInfo,
  productsList,
  options,
  selectedCategory,
  handleCategoryChange,
  isMyPage,
}: ProfileSectionProps) {
  return (
    <div className="w-full h-full bg-[#1C1C22] flex flex-col items-center mb-[80px]">
      <div className="flex flex-col mt-[30px] md:mt-[40px] lg:flex-row lg:justify-center lg:items-start">
        <div className="mb-[60px] lg:mr-[60px]">
          <Profile
            id={userInfo.id}
            image={userInfo.image}
            description={userInfo.description}
            nickname={userInfo.nickname}
            followeesCount={userInfo.followeesCount}
            followersCount={userInfo.followersCount}
            isFollowing={userInfo.isFollowing}
            isMyPage={isMyPage}
          />
        </div>
        <div>
          <div className="mb-[61.5px]">
            <h2 className="text-white text-lg mb-[30px]">활동 내역</h2>
            <div className="flex gap-[10px] lg:gap-[20px]">
              <ActivityRating rating={userInfo.averageRating} />
              <ActivityReview reviewCount={userInfo.reviewCount} />
              <ActivityCategory mostFavoriteCategory={userInfo.mostFavoriteCategory} />
            </div>
          </div>
          <div>
            <div className="mb-[31.5px]">
              <ProductSortSelector
                category={options}
                placeHolder={selectedCategory}
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
