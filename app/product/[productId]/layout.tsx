import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';
import { ProductDetailResponse, UserResponse } from '@/types/data';

export default async function ProductDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { productId: string };
}) {
  const queryClient = new QueryClient();
  const { productId } = params;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['productDetail', Number(productId)],
      queryFn: async () => {
        const response = await axiosInstance.get<ProductDetailResponse>(`/products/${productId}`);
        return response.data;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['myInfo'],
      queryFn: async () => {
        const response = await axiosInstance.get<UserResponse>('/users/me');
        return response.data;
      },
    }),
  ]);

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
