import { useDataQuery, useDataMutation } from '../services/common';
import {
  ProductsListResponse,
  ProductUpdateRequest,
  ProductDetailResponse,
  ReviewListResponse,
  Config,
} from '../types/data';
import { UseQueryOptions, QueryKey, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetProducts = (
  params: { keyword?: string; category?: number; order?: string; cursor?: number },
  config: Config = {},
  options?: Omit<
    UseQueryOptions<ProductsListResponse, AxiosError, ProductsListResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { url = '/products' } = config;
  return useDataQuery<typeof params, ProductsListResponse>(
    ['products', params],
    url,
    params,
    options,
  );
};

export const useGetProductDetail = (
  productId: number,
  config: Config = {},
  options?: Omit<
    UseQueryOptions<ProductDetailResponse, AxiosError, ProductDetailResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { url = `/products/` } = config;
  return useDataQuery<void, ProductDetailResponse>(
    ['productDetail', productId],
    `${url}/${productId}`,
    undefined,
    options,
  );
};

export const useGetProductReviews = (
  productId: number,
  params: { order?: string; cursor?: number },
  config: Config = {},
  options?: Omit<
    UseQueryOptions<ReviewListResponse, AxiosError, ReviewListResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const { url = '/products' } = config;
  return useDataQuery<typeof params, ReviewListResponse>(
    ['productReviews', productId, params],
    `${url}/${productId}/reviews`,
    params,
    options,
  );
};

export const useCreateProduct = (
  config: Config = {},
  options?: Omit<
    UseMutationOptions<ProductDetailResponse, AxiosError, ProductUpdateRequest>,
    'mutationFn'
  >,
) => {
  const { method = 'POST', url = '/products' } = config;
  const mutation = useDataMutation<ProductUpdateRequest, ProductDetailResponse>(
    url,
    method,
    options,
  );
  return (data: ProductUpdateRequest) => mutation.mutate(data);
};

export const useUpdateProduct = (
  productId: number,
  config: Config = {},
  options?: Omit<
    UseMutationOptions<ProductDetailResponse, AxiosError, ProductUpdateRequest>,
    'mutationFn'
  >,
) => {
  const { method = 'PATCH', url = '/products' } = config;
  const mutation = useDataMutation<ProductUpdateRequest, ProductDetailResponse>(
    `${url}/${productId}`,
    method,
    options,
  );
  return (data: ProductUpdateRequest) => mutation.mutate(data);
};

export const useFavoriteProduct = (
  productId: number,
  config: Config = {},
  options?: Omit<UseMutationOptions<ProductDetailResponse, AxiosError, void>, 'mutationFn'>,
) => {
  const { method = 'POST', url = '/products' } = config;
  const mutation = useDataMutation<void, ProductDetailResponse>(
    `${url}/${productId}/favorite`,
    method,
    options,
  );
  return mutation.mutate();
};

export const useUnfavoriteProduct = (
  productId: number,
  config: Config = {},
  options?: Omit<UseMutationOptions<ProductDetailResponse, AxiosError, void>, 'mutationFn'>,
) => {
  const { method = 'DELETE', url = '/products' } = config;
  const mutation = useDataMutation<void, ProductDetailResponse>(
    `${url}/${productId}/favorite`,
    method,
    options,
  );
  return mutation.mutate();
};
