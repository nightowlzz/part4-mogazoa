import { useDataQuery, useDataMutation } from '../services/common';
import {
  ProductsListResponse,
  ProductUpdateRequest,
  ProductDetailResponse,
  ReviewListResponse,
} from '../types/data';
import {
  UseQueryOptions,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetProducts = (
  params?: { keyword?: string; category?: number; order?: undefined; cursor?: number },
  options?: Omit<
    UseQueryOptions<ProductsListResponse, AxiosError, ProductsListResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  const url = '/products';
  return useDataQuery<undefined, ProductsListResponse>(
    ['products'],
    url,
    undefined,
    options,
    params,
  );
};

export const useGetProductDetail = (
  productId: number,
  options?: Omit<
    UseQueryOptions<ProductDetailResponse, AxiosError, ProductDetailResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<undefined, ProductDetailResponse>(
    ['productDetail', productId],
    `/products/${productId}`,
    undefined,
    options,
  );
};

export const useGetProductReviews = (
  productId: number,
  params?: { order?: undefined; cursor?: number },
  options?: Omit<
    UseQueryOptions<ReviewListResponse, AxiosError, ReviewListResponse, QueryKey>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useDataQuery<undefined, ReviewListResponse>(
    ['productReviews', productId],
    `/products/productId}/reviews`,
    undefined,
    options,
    params,
  );
};

export const useCreateProduct = (
  options?: Omit<
    UseMutationOptions<ProductDetailResponse, AxiosError, ProductUpdateRequest>,
    'mutationFn'
  >,
) => {
  const method = 'post';
  const url = '/products';
  const mutation = useDataMutation<ProductUpdateRequest, ProductDetailResponse>(
    url,
    method,
    options,
  );
  return (data: ProductUpdateRequest) => mutation.mutate(data);
};

export const useUpdateProduct = (
  productId: number,
  options?: Omit<
    UseMutationOptions<ProductDetailResponse, AxiosError, ProductUpdateRequest>,
    'mutationFn'
  >,
) => {
  const method = 'patch';
  const mutation = useDataMutation<ProductUpdateRequest, ProductDetailResponse>(
    `/products/${productId}`,
    method,
    options,
  );
  return (data: ProductUpdateRequest) => mutation.mutate(data);
};

export const useFavoriteProduct = (
  productId: number,
  options?: Omit<UseMutationOptions<ProductDetailResponse, AxiosError, void>, 'mutationFn'>,
): (() => void) => {
  const method = 'post';
  const mutation = useDataMutation<void, ProductDetailResponse>(
    `/products/${productId}/favorite`,
    method,
    options,
  );
  return () => mutation.mutate();
};

export const useUnfavoriteProduct = (
  productId: number,
  options?: Omit<UseMutationOptions<ProductDetailResponse, AxiosError, void>, 'mutationFn'>,
): (() => void) => {
  const method = 'delete';
  const mutation = useDataMutation<void, ProductDetailResponse>(
    `/products/${productId}/favorite`,
    method,
    options,
  );
  return () => mutation.mutate();
};
