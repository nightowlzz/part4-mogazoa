'use client';
import ContentEmpty from '@/components/content-empty';
import { Product } from '@/components/products/product';
import { Skeleton } from '@/components/ui/skeleton';
import { InfiniteQueryData, QueryListResponse, useInfinityScroll } from '@/hooks/useInfinityScroll';
import useSortOrderStore from '@/store/sortOrderStore';
import { ProductResponse, ProductsListResponse } from '@/types/data';
interface ProductListProps {
  keyword?: string | undefined;
  category?: number | undefined;
  categoryName?: string | undefined;
  initialData?: ProductsListResponse;
}

// [NOTE] useInfiniteQuery 타입 변환
const transformToInitialData = (
  data: ProductsListResponse,
): InfiniteQueryData<QueryListResponse<ProductResponse>> => {
  return {
    pages: [
      {
        list: data.list, // ProductResponse[] 형태로 변환
        nextCursor: data.nextCursor || null, // nextCursor도 전달
      },
    ],
    pageParams: [0], // 첫 페이지의 파라미터
  };
};

export default function SearchList({
  keyword,
  category,
  categoryName,
  initialData,
}: ProductListProps) {
  const { sortOrder } = useSortOrderStore();
  const {
    ref,
    data: products,
    isPending,
    isError,
  } = useInfinityScroll({
    queryKey: 'products',
    order: sortOrder,
    keyword: keyword,
    category: category,
    initialData: initialData ? transformToInitialData(initialData) : undefined, // 변환 적용
  });

  if (isError) return <div>isERROR</div>;

  if (isPending)
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-[15px] md:gap-5 opacity-50">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={'search' + i} className="space-y-4">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <>
      {products && products?.length !== 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[15px] md:gap-5" ref={ref}>
          {products.map((card) => (
            <Product key={card.id} {...card} />
          ))}
        </div>
      ) : (
        <ContentEmpty
          text={keyword ? `"${keyword}" 상품이 없습니다.` : `"${categoryName}" 상품이 없습니다.`}
        />
      )}
    </>
  );
}
