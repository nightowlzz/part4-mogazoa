'use client';

import { ActivityCategory } from '@/app/_styled-guide/_components/activity-category';
import { ActivityRating } from '@/app/_styled-guide/_components/activity-rating';
import { ActivityReview } from '@/app/_styled-guide/_components/activity-review';
import { ProductCard } from '@/app/_styled-guide/_components/card-product';
import Profile from '@/app/_styled-guide/_components/profile';
import { useGetUserInfo, useGetUserReviewedProducts } from '@/hooks/user';
import { useParams } from 'next/navigation';

export default function UserId() {
  const params = useParams();
  const userId = params.userId;
  const {
    data: userInfo,
    isLoading: userInfoLoading,
    error: userInfoError,
  } = useGetUserInfo(Number(userId));

  const {
    data: userReviewedProducts,
    isLoading: productsLoading,
    error: productsError,
  } = useGetUserReviewedProducts(Number(userId));

  if (userInfoLoading || productsLoading) {
    return <div>Loading...</div>;
  }

  if (userInfoError || productsError) {
    return <div>Error: {userInfoError?.message || productsError?.message}</div>;
  }

  if (!userInfo) {
    return <div>유저 정보 없음</div>;
  }

  const mostFavoriteCategoryName = userInfo.mostFavoriteCategory?.name ?? '';

  return (
    <div>
      <Profile
        image={userInfo.image ?? ''}
        description={userInfo.description}
        nickname={userInfo.nickname}
        followeesCount={userInfo.followeesCount}
        followersCount={userInfo.followersCount}
        isFollowing={userInfo.isFollowing}
      />
      <div>
        <div>
          <h2 className="text-white text-lg">활동 내역</h2>
          <div>
            <ActivityRating rating={userInfo.averageRating} />
            <ActivityReview reviewCount={userInfo.reviewCount} />
            <ActivityCategory categoryName={mostFavoriteCategoryName} categoryId={1} />
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg">리뷰한 제품</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3">
            {userReviewedProducts?.list.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                image={product.image ?? ''}
                rating={product.rating}
                reviewCount={product.reviewCount}
                favoriteCount={product.favoriteCount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
