import styled from '@/app/(public)/_styles/main.module.scss';
import { cn } from '@/lib/utils';
import { ProductResponse } from '@/types/data';
import axiosInstance from '@/utils/axiosInstance';
import { QueryClient } from '@tanstack/react-query';
import ProductList from './_components/product-list';

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['hot-product'],
      queryFn: async () => {
        const response = await axiosInstance.get<ProductResponse[]>(
          '/products?order=reviewCount&cursor=0',
        );
        return response.data;
      },
    }),

    queryClient.prefetchQuery({
      queryKey: ['high-rated-products'],
      queryFn: async () => {
        const response = await axiosInstance.get<ProductResponse[]>(
          '/products?order=rating&cursor=0',
        );
        return response.data;
      },
    }),
  ]);

  return (
    <main className={(cn(styled['main-contact']), 'py-[60px] w-full justify-self-center')}>
      <h2 className="flex items-center justify-start pb-[30px] text-[22px] text-white font-bold gap-[10px]">
        지금 핫한 상품
        <span className="flex bg-clip-text text-transparent bg-gradient-to-r from-[#5097FA] to-[#5363FF]">
          TOP6
        </span>
      </h2>
      <ProductList initialData={queryClient.getQueryData(['hot-product'])} />
      <h2 className="pb-[30px] text-[22px] text-white font-bold pt-[60px]">별점이 높은 상품</h2>
      <ProductList initialData={queryClient.getQueryData(['high-rated-products'])} />
    </main>
  );
}
