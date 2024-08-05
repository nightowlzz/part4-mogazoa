import styled from '@/app/(public)/_styles/main.module.scss';
import { CategoryResponse, RankedUserResponse } from '@/types/data';
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
      queryKey: ['ranking'],
      queryFn: async () => {
        const response = await axiosInstance.get<RankedUserResponse[]>('/users/ranking');
        return response.data;
      },
    }),
  ]);

  return (
    <div className={`${styled['main-wrap']} max-w-[1560px] m-auto`}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryList />
        {children}
        <RankingList initialData={queryClient.getQueryData(['ranking']) || []} />
      </HydrationBoundary>
    </div>
  );
}
