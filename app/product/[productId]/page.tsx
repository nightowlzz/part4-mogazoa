'use client';

import ProductCard from '@/app/_styled-guide/_components/ProductCard';
import { StatisticFavorite } from '@/app/_styled-guide/_components/statistics-favorite';
import { StatisticRating } from '@/app/_styled-guide/_components/statistics-rating';
import { StatisticReview } from '@/app/_styled-guide/_components/statistics-review';
import { useGetProductDetail } from '@/hooks/product';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { productId } = useParams();

  const { data: productDetail, isLoading, error } = useGetProductDetail(Number(productId));
  //const { data: userInfo } = useGetUserInfo(currentUser.id);

  const currentUserId = 23; //임시

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!productDetail) {
    return <p>상품 정보가 없습니다.</p>;
  }

  return (
    <div className="w-full h-full bg-[#1C1C22] flex flex-col items-center">
      <div className="text-white">gnb</div>
      <div className="mt-[60px] mb-[80px]">
        <ProductCard
          name={productDetail.name}
          description={productDetail.description}
          image={productDetail.image}
          writerId={productDetail.writerId}
          currentUserId={currentUserId}
          categoryName={productDetail.category.name}
          categoryId={productDetail.category.id}
        />
      </div>
      <div>
        <h3 className="text-[#F1F1F5] text-xl font-normal">상품 통계</h3>
        <div className="flex flex-col md:flex-row mt-[30px] mb-[60px] gap-[15px] lg:gap-5">
          <StatisticRating
            rating={productDetail.rating}
            categoryMetric={productDetail.categoryMetric}
          />
          <StatisticFavorite
            favoriteCount={productDetail.favoriteCount}
            categoryMetric={productDetail.categoryMetric}
          />
          <StatisticReview
            reviewCount={productDetail.reviewCount}
            categoryMetric={productDetail.categoryMetric}
          />
        </div>
      </div>
    </div>
  );
}
