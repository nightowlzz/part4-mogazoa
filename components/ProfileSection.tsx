'use client';

import { ActivityCategory } from '@/app/_styled-guide/_components/activity-category';
import { ActivityRating } from '@/app/_styled-guide/_components/activity-rating';
import { ActivityReview } from '@/app/_styled-guide/_components/activity-review';
import ProductSortSelector from '@/app/_styled-guide/_components/ProductSortSelector';
import Profile from '@/app/_styled-guide/_components/profile';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ContentEmpty from './content-empty';
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
      return <ContentEmpty text={'리뷰 남긴 상품이 없습니다.'} />;
    } else if (selectedCategory === '등록한 상품' && productsList.length === 0) {
      return <ContentEmpty text={'등록한 상품이 없습니다.'} />;
    } else if (selectedCategory === '찜한 상품' && productsList.length === 0) {
      return <ContentEmpty text={'찜한 상품이 없습니다'} />;
    }
    return null;
  };

  return (
    <div className="w-full max-w-[1340px] py-[60px] m-auto">
      <div className="flex items-start justify-center flex-col md:flex-row gap-[50px] md:gap-[60px]">
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
