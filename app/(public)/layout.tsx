import styled from '@/app/(public)/_styles/main.module.scss';
import { CategoryResponse, ProductResponse, RankedUserResponse } from '@/types/data';
import axiosInstance from '@/utils/axiosInstance';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import CategoryList from './_components/category-list';
import RankingList from './_components/ranking-list';

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: async () => {
        const response = await axiosInstance.get<CategoryResponse[]>('/categories');
        return response.data;
      },
    }),

    queryClient.prefetchQuery({
      queryKey: ['userRanking'],
      queryFn: async () => {
        const response = await axiosInstance.get<RankedUserResponse[]>('/users/ranking');
        return response.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['products', { order: 'reviewCount', cursor: 0 }],
      queryFn: async () => {
        const response = await axiosInstance.get<ProductResponse[]>('/products', {
          params: { order: 'reviewCount', cursor: 0 },
        });
        return response.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['products', { order: 'rating', cursor: 0 }],
      queryFn: async () => {
        const response = await axiosInstance.get<ProductResponse[]>('/products', {
          params: { order: 'rating', cursor: 0 },
        });
        return response.data;
      },
    }),
  ]);

  return (
    <div className={`${styled['main-wrap']} max-w-[1560px] m-auto`}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryList />
        {children}
        <RankingList />
      </HydrationBoundary>
    </div>
  );
}
