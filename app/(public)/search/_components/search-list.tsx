'use client';
import styled from '@/app/(public)/_styles/main.module.scss';
import ContentEmpty from '@/components/content-empty';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { cn } from '@/lib/utils';
import { ProductSortOrder, ReviewSortOrder } from '@/types/data';
import { Product } from '../../_components/product';
interface ProductListProps {
  order?: ReviewSortOrder | ProductSortOrder | undefined;
  keyword?: string | undefined;
  category?: number | undefined;
}

export default function SearchList({ order = 'recent', keyword, category }: ProductListProps) {
  const {
    ref,
    data: products,
    isPending,
    isError,
  } = useInfinityScroll({
    queryKey: 'products',
    order: order,
    keyword: keyword,
    category: category,
  });

  if (isError) return <div>isERROR</div>;

  if (isPending)
    return (
      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-[15px] md:gap-5 opacity-40">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col bg-gray-200 rounded-lg md:rounded-xl border border-black-400 p-[10px]lg:p-2 w-full min-h-[180px] py-[48%] md:py-[50%] overflow-hidden"
          >
            <figure className="absolute inset-y-0 w-full">
              <div className={cn(styled['product-image'], 'relative w-full bg-gray-400')}></div>
              <figcaption className="px-[10px] py-[10px] sm:px-[15px] sm:py-[15px] lg:px-[20px] lg:py-[20px]">
                <h2 className="h-5 bg-gray-400"></h2>
                <div className="flex items-center justify-between">
                  <div className="w-[50%] h-5 bg-gray-400 mt-2"></div>
                  <div className="w-[20px] h-5 bg-gray-400 mt-2"></div>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-[15px] md:gap-5" ref={ref}>
        {products?.slice(0, 6).map((card) => <Product key={card.id} {...card} />)}
      </div>
      {!products?.length ? <ContentEmpty /> : null}
    </>
  );
}
