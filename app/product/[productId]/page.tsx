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
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { data: productDetail, isPending, error } = useGetProductDetail(Number(productId));
  const { data: currentUserId } = useGetMyInfo();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending) {
    return (
      <div className="w-full max-w-[980px] mx-auto mt-[60px] mb-[80px] opacity-50">
        <div className="flex flex-col md:flex-low items-start justify-between mt-[60px] mb-[80px]">
          <div className="w-full md:max-w-[355px] h-[236px] md:h-[197px] lg:h-[250px] mb-5 md:mb-[88px] lg:mb-[29px] md:mr-5 lg:mr-10">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="w-full space-y-3 md:space-y-5">
            <Skeleton className="h-[20px] w-[100px]" />
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[24px] w-[80%]" />
            <Skeleton className="h-[24px] w-[40%]" />
            <div className="flex gap-[10px]">
              <Skeleton className="h-[50px] md:h-[60px] w-full" />
              <Skeleton className="h-[50px] md:h-[60px] w-full" />
            </div>
          </div>
        </div>
        <h3 className="text-[#F1F1F5] text-xl font-normal text-[18px] md:text-[20px]">상품 통계</h3>
        <div className="flex flex-col md:flex-row mt-[30px] mb-[60px] gap-[15px] lg:gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={'detail' + i} className="w-full h-[100px] md:h-[197px] lg:h-[250px]" />
          ))}
        </div>
      </div>
    );
  }

  if (!productDetail) {
    return <p>상품 정보가 없습니다.</p>;
  }

  return (
    <div className="w-full h-full bg-[#1C1C22] flex flex-col justify-center items-center">
      <div className="w-full max-w-[980px] mx-auto mt-[60px] mb-[80px]">
        <ProductCard
          name={productDetail.name}
          description={productDetail.description}
          image={productDetail.image}
          writerId={productDetail.writerId}
          currentUserId={currentUserId ? currentUserId.id : null}
          categoryName={productDetail.category.name}
          categoryId={productDetail.category.id}
          isFavorite={productDetail.isFavorite}
        />
      </div>
      <div className="w-full max-w-[980px] mx-auto">
        <h3 className="text-[#F1F1F5] text-xl font-normal text-[18px] md:text-[20px]">상품 통계</h3>
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
