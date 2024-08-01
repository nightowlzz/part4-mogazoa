'use client';

import ProductCard from './_components/product-detail/product-card';
import Gnb from '@/app/_styled-guide/_components/gnb';
import { StatisticFavorite } from '@/app/_styled-guide/_components/statistics-favorite';
import { StatisticRating } from '@/app/_styled-guide/_components/statistics-rating';
import { StatisticReview } from '@/app/_styled-guide/_components/statistics-review';
import { useGetProductDetail } from '@/hooks/product';
import { useGetMyInfo } from '@/hooks/user';
import { useParams } from 'next/navigation';
import ReviewList from './_components/review/review-list';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { data: productDetail, isLoading, error } = useGetProductDetail(Number(productId));
  const { data: currentUserId } = useGetMyInfo();

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
    <div className="w-full h-full bg-[#1C1C22] flex flex-col justify-center items-center">
      <Gnb />
      <div className="w-full max-w-[980px] px-5 mx-auto mt-[60px] mb-[80px]">
        <ProductCard
          name={productDetail.name}
          description={productDetail.description}
          image={productDetail.image}
          writerId={productDetail.writerId}
          currentUserId={currentUserId ? currentUserId.id : null}
          categoryName={productDetail.category.name}
          categoryId={productDetail.category.id}
        />
      </div>
      <div className="w-full max-w-[980px] px-5 mx-auto">
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
      <ReviewList
        productId={productId}
        currentUserId={currentUserId ? currentUserId.id : null}
        categoryName={productDetail.category.name}
        categoryId={productDetail.category.id}
        productName={productDetail.name}
      />
    </div>
  );
}
