import styled from '@/app/(public)/_styles/main.module.scss';
import { QueryParams } from '@/hooks/useInfinityScroll';
import { ProductsListResponse, ProductSortOrder, ReviewSortOrder } from '@/types/data';
import axiosInstance from '@/utils/axiosInstance';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import SearchList from './_components/search-list';
import { addQueryParams } from '@/utils/hook-utils';
import { PRODUCT_SORT_OPTIONS } from '@/constants/sort-order';
import SortSelector from '../product/[productId]/_components/sort-selector';

interface TemplateProps {
  searchParams: {
    order?: ReviewSortOrder | ProductSortOrder | undefined;
    category?: string;
    categoryId?: string;
    keyword?: string;
    cursor?: string;
  };
}

function createMessage(categoryName: string | undefined, keyword: string | undefined) {
  if (categoryName && keyword) {
    return (
      <span>
        <strong className="text-gray-400 underline">{categoryName}</strong>상품 중
        <strong className="text-gray-400 underline pl-1">{keyword}</strong>상품
      </span>
    );
  } else if (categoryName) {
    return (
      <span>
        <strong className="text-gray-400 underline">{categoryName}</strong> 상품
      </span>
    );
  } else if (keyword) {
    return (
      <span>
        <strong className="text-gray-400 underline pl-1">{keyword}</strong> 상품
      </span>
    );
  }
}

const ProductSearchParams = ({ searchParams }: TemplateProps) => {
  return (
    <h2 className="text-[18px] md:text-[22px] text-white font-bold">
      {createMessage(searchParams.category, searchParams.keyword)}
    </h2>
  );
};

const getProducts = async ({
  cursor = 0,
  order,
  keyword,
  category,
}: QueryParams): Promise<ProductsListResponse> => {
  try {
    const response = await axiosInstance.get<ProductsListResponse>(
      `/products?${addQueryParams({ order, keyword, category, cursor })}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default async function ProductPage({ searchParams }: TemplateProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      'search-products',
      {
        order: searchParams.order,
        keyword: searchParams.keyword,
        category: Number(searchParams.categoryId),
        cursor: searchParams.cursor,
      },
    ],
    queryFn: ({ pageParam = 0 }) =>
      getProducts({
        cursor: pageParam,
        order: searchParams.order,
        keyword: searchParams.keyword,
        category: Number(searchParams.categoryId),
      }),
    initialPageParam: 0,
  });

  const initialData = queryClient.getQueryData<ProductsListResponse>(['search-products']);
  return (
    <main className={(styled['main-contact'], 'py-[60px] w-full justify-self-center')}>
      <div className="flex items-center justify-between pb-[30px] ">
        <ProductSearchParams searchParams={searchParams} />
        <SortSelector sortSelectOption={PRODUCT_SORT_OPTIONS} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchList
          categoryName={searchParams.category}
          category={Number(searchParams.categoryId)}
          keyword={searchParams.keyword ? searchParams.keyword : undefined}
          initialData={initialData}
        />
      </HydrationBoundary>
    </main>
  );
}
