'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ActivityCategory } from '@/app/_styled-guide/_components/activity-category';
import { ActivityRating } from '@/app/_styled-guide/_components/activity-rating';
import { ActivityReview } from '@/app/_styled-guide/_components/activity-review';
import { ProductCard } from '@/app/_styled-guide/_components/card-product';
import ProductSortSelector from '@/app/_styled-guide/_components/ProductSortSelector';
import Profile from '@/app/_styled-guide/_components/profile';
import Link from 'next/link';
import EmptyImage from '@/public/assets/images/empty-logo.svg';
import Image from 'next/image';
import { Product } from './products/product';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const queryCategory = searchParams.get('category');

    if (!queryCategory) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('category', '리뷰 남긴 상품');
      router.replace(`${pathname}?${params.toString()}`);
    } else if (options.includes(queryCategory) && queryCategory !== selectedCategory) {
      handleCategoryChange(queryCategory);
    }
  }, [searchParams, options, handleCategoryChange, selectedCategory, pathname, router]);

  const onCategoryChange = (category: string) => {
    handleCategoryChange(category);
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    router.push(`${pathname}?${params.toString()}`);
  };

  const renderEmptyMessage = () => {
    if (selectedCategory === '리뷰 남긴 상품' && productsList.length === 0) {
      return (
        <div className="flex flex-col items-center mt-32 gap-3">
          <Image src={EmptyImage} alt="상품이 없을 때 이미지" />
          <div className="text-gray-600">리뷰 남긴 상품이 없습니다</div>
        </div>
      );
    } else if (selectedCategory === '등록한 상품' && productsList.length === 0) {
      return (
        <div className="flex flex-col items-center mt-32 gap-3">
          <Image src={EmptyImage} alt="상품이 없을 때 이미지" />
          <span className="text-gray-600">등록한 상품이 없습니다</span>
        </div>
      );
    } else if (selectedCategory === '찜한 상품' && productsList.length === 0) {
      return (
        <div className="flex flex-col items-center mt-32 gap-3">
          <Image src={EmptyImage} alt="상품이 없을 때 이미지" />
          <span className="text-gray-600">찜한 상품이 없습니다</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-[1340px] py-[60px] m-auto">
      {/* w-full h-full bg-[#1C1C22] flex flex-col items-center mb-[80px] */}
      <div className="flex items-start justify-center flex-col md:flex-row gap-[50px] md:gap-[60px]">
        {/* flex flex-col mt-[30px] md:mt-[40px] lg:flex-row lg:justify-center lg:items-start */}
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
        <div className="w-full">
          <div className="mb-[61px]">
            <h2 className="text-white text-lg mb-[30px]">활동 내역</h2>
            <div className="grid grid-cols-3 gap-[10px] lg:gap-[20px]">
              <ActivityRating rating={userInfo.averageRating} />
              <ActivityReview reviewCount={userInfo.reviewCount} />
              <ActivityCategory
                mostFavoriteCategory={userInfo.mostFavoriteCategory}
                className="whitespace-nowrap"
              />
            </div>
          </div>
          <div>
            <div className="mb-[30px]">
              <ProductSortSelector
                category={options}
                placeHolder={selectedCategory}
                onChange={onCategoryChange}
              />
            </div>
            {renderEmptyMessage() || (
              <div className="grid grid-cols-2 gap-[15px] lg:grid-cols-3 lg:gap-[20px]">
                {productsList.map((product) => (
                  <Product key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
