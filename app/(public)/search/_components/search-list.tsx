'use client';
import ContentEmpty from '@/components/content-empty';
import { InfiniteQueryData, QueryListResponse, useInfinityScroll } from '@/hooks/useInfinityScroll';
import useSortOrderStore from '@/store/sortOrderStore';
import { ProductResponse, ProductsListResponse } from '@/types/data';
import { Product } from '../../_components/product';
interface ProductListProps {
  keyword?: string | undefined;
  category?: number | undefined;
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

export default function SearchList({ keyword, category, initialData }: ProductListProps) {
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
  // [NOTE] 스켈레톤 작업
  if (isPending) return <div>로딩중</div>;
  return (
    <>
      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-[15px] md:gap-5" ref={ref}>
        {products ? products.map((card) => <Product key={card.id} {...card} />) : <ContentEmpty />}
      </div>
    </>
  );
}
